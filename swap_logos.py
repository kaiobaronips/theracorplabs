import re

TARGET_FILE = 'index.html'

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HEADER LOGO REPLACEMENT
print("Replacing Header Logo...")
# Target the anchor with aria-label="Home" and its internal SVG/content
# We replace the entire inner content of the <a> tag
# Regex explanation: find <a ... aria-label="Home" ...> ... </a>
header_logo_pattern = r'(<a[^>]+aria-label="Home"[^>]*>).*?(</a>)'
replacement_img = r'\1<img src="./logo-theracorp.png" height="32" alt="Theracorp Logo" style="display: block; width: auto; max-width: 150px;">\2'
content = re.sub(header_logo_pattern, replacement_img, content, flags=re.DOTALL | re.IGNORECASE)

# 2. FOOTER LOGO REPLACEMENT / REINFORCEMENT
print("Standardizing Footer Logo...")
# The audit mentioned footer-style__FooterLargeLogoWrapper-sc-ffd98edc-22
footer_logo_container_pattern = r'(<div class="footer-style__FooterLargeLogoWrapper-sc-ffd98edc-22[^>]*>).*?(</div>)'
footer_img = r'\1<img src="./logo-theracorp.png" height="64" alt="Theracorp Logo" style="object-fit: contain; width: auto; max-width: 100%;">\2'
content = re.sub(footer_logo_container_pattern, footer_img, content, flags=re.DOTALL | re.IGNORECASE)

# 3. SCRUB REMAINING HIMS SVGs (Backgrounds/Watermarks)
print("Scrubbing remaining Hims branding elements...")
# Remove any SVG that contains "hims" in its paths or titles
# This targets the large watermark found in audit
svg_blocks = re.findall(r'<svg.*?</svg>', content, flags=re.DOTALL | re.IGNORECASE)
for svg in svg_blocks:
    if 'hims' in svg.lower():
        # Replace with an empty div or nothing if it looks like a background watermark
        # If it's the large one, its characteristic is usually in its container
        content = content.replace(svg, '<!-- Removed Legacy Logo -->')

# 4. FINAL TEXT NODES SWEEP
content = re.sub(r'>hims<', '>Theracorp<', content, flags=re.IGNORECASE)
content = content.replace('logo="hims"', 'logo="Theracorp"')

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Branding swap for {TARGET_FILE} complete.")
