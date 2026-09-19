from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
BRAND = PUBLIC / 'assets' / 'brand'
TEAL = '#033932'
YELLOW = '#FFCB21'
WHITE = '#FFFFFF'

logo = Image.open(BRAND / 'logo-dark.png').convert('RGBA')
bounds = logo.getbbox()
if bounds:
    logo = logo.crop(bounds)

def icon(size: int) -> Image.Image:
    canvas = Image.new('RGBA', (size, size), TEAL)
    max_width = int(size * 0.86)
    max_height = int(size * 0.86)
    fitted = ImageOps.contain(logo, (max_width, max_height), Image.Resampling.LANCZOS)
    canvas.alpha_composite(fitted, ((size - fitted.width) // 2, (size - fitted.height) // 2))
    return canvas

icon(32).save(PUBLIC / 'favicon-32x32.png', optimize=True)
icon(180).save(PUBLIC / 'apple-touch-icon.png', optimize=True)
icon(192).save(BRAND / 'icon-192.png', optimize=True)
icon(512).save(BRAND / 'icon-512.png', optimize=True)
icon(64).save(PUBLIC / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

photo = Image.open(PUBLIC / 'assets' / 'home.jpg').convert('RGB')
photo = ImageOps.fit(photo, (1200, 630), method=Image.Resampling.LANCZOS, centering=(0.56, 0.48))
photo = ImageEnhance.Contrast(photo).enhance(0.9)
card = Image.new('RGBA', (1200, 630))
card.alpha_composite(photo.convert('RGBA'))
card.alpha_composite(Image.new('RGBA', card.size, (3, 57, 50, 172)))

mark = ImageOps.contain(logo, (390, 470), Image.Resampling.LANCZOS)
card.alpha_composite(mark, (70, (630 - mark.height) // 2))

draw = ImageDraw.Draw(card)
bold = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 67)
medium = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 29)
regular = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 25)
draw.rounded_rectangle((506, 112, 1138, 518), radius=28, fill=(10, 24, 23, 190), outline=(255, 255, 255, 45), width=2)
draw.text((555, 165), 'KILIFI CREEK', font=bold, fill=WHITE)
draw.text((555, 235), 'FESTIVAL', font=bold, fill=YELLOW)
draw.line((555, 330, 1088, 330), fill=(255, 255, 255, 65), width=2)
draw.text((555, 371), '23 – 31 OCTOBER 2026', font=medium, fill=WHITE)
draw.text((555, 427), 'Kilifi Creek, Kenya', font=regular, fill=WHITE)

card.convert('RGB').save(BRAND / 'kcf-social-card.jpg', quality=86, optimize=True, progressive=True)
print('Generated favicons, app icons, and 1200x630 social card.')
