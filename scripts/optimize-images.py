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
    widths = [160, 320] if logo else [320, 640, 960, 1440, 1920]
    widths = sorted(set([min(w, image.width) for w in widths]))
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:16]
    variants = []
    for width in widths:
        height = max(1, round(image.height * width / image.width))
        variant = image.resize((width, height), Image.Resampling.LANCZOS)
        name = f'{digest}-{width}.webp'
        variant.save(out / name, 'WEBP', quality=85, method=6, lossless=logo)
        variants.append({'src': '/assets/responsive/' + name, 'width': width, 'bytes': (out / name).stat().st_size})
    manifest[url] = {'width': image.width, 'height': image.height, 'sourceBytes': source.stat().st_size, 'variants': variants}
(root / 'app/assets/responsive-images.json').write_text(json.dumps(manifest, indent=2))
print(f'Generated responsive derivatives for {len(manifest)} original assets')
