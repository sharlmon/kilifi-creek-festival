"""Generate uncropped responsive derivatives; never overwrite source artwork."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json

root = Path(__file__).resolve().parents[1]
asset_map = json.loads((root / 'app/assets/asset-map.json').read_text())
sources = {url: root / 'public/assets' / name for name, url in asset_map.items()}
for name in ('logo-light.png', 'logo-dark.png'):
    sources['/assets/brand/' + name] = root / 'public/assets/brand' / name
out = root / 'public/assets/responsive'
out.mkdir(exist_ok=True)
manifest = {}
for url, source in sources.items():
    image = ImageOps.exif_transpose(Image.open(source))
    if image.mode not in ('RGB', 'RGBA'):
        image = image.convert('RGBA' if 'transparency' in image.info else 'RGB')
    logo = '/brand/' in url or '/logo/' in url
    poster = 'Call for submissions' in url or '2025prog' in url
    # Cap enlarged photos at 2048 pixels on the long edge; retain all source files.
    limit = image.width if logo or poster else min(image.width, max(1, round(2048 * image.width / max(image.size))))
    widths = [160, 320] if logo else [320, 640, 960, 1440, 1920, limit]
    widths = sorted(set(min(w, limit) for w in widths))
    # Include the encoding policy so immutable URLs change when compression changes.
    digest = hashlib.sha256(source.read_bytes() + b'webp-v2-q76-q70-longedge2048').hexdigest()[:16]
    variants = []
    for width in widths:
        height = max(1, round(image.height * width / image.width))
        variant = image.resize((width, height), Image.Resampling.LANCZOS)
        name = f'{digest}-{width}.webp'
        quality = 85 if poster else (70 if width >= 1440 else 76)
        variant.save(out / name, 'WEBP', quality=quality, method=6, lossless=logo)
        variants.append({'src': '/assets/responsive/' + name, 'width': width, 'bytes': (out / name).stat().st_size})
    manifest[url] = {'width': image.width, 'height': image.height, 'sourceBytes': source.stat().st_size, 'variants': variants}
(root / 'app/assets/responsive-images.json').write_text(json.dumps(manifest, indent=2))
print(f'Generated responsive derivatives for {len(manifest)} original assets')
