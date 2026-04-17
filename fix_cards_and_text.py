import re

TARGET_FILE = 'index.html'

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. ASSET PATH RESTORATION (Images/CSS)
print("Restoring functional asset domains and paths...")
domain_map = {
    'cloudinary.fortheracorp.com': 'cloudinary.forhims.com',
    'investors.fortheracorp.com': 'investors.forhims.com',
    'support.fortheracorp.com': 'support.forhims.com',
    'support.theracorp.com': 'support.hims.com',
    'news.theracorp.com': 'news.hims.com',
    'tm.theracorp.com': 'tm.hims.com',
    'www.fortheracorp.co.uk': 'www.forhims.co.uk',
    'theracorp.ca': 'hims.ca',
}

for branded, original in domain_map.items():
    content = content.replace(branded, original)

# Restoring root-relative paths in index.html as well
content = content.replace('src="/fortheracorp/', 'src="https://www.forhims.com/forhims/')
content = content.replace('href="/fortheracorp/', 'href="https://www.forhims.com/forhims/')
content = content.replace('src="/static/', 'src="https://www.hims.com/static/')
content = content.replace('href="/static/', 'href="https://www.hims.com/static/')
content = content.replace('url("/css/', 'url("https://www.hims.com/css/')
content = content.replace('href="/css/', 'href="https://www.hims.com/css/')

# 2. BRANDING CLEANUP (Hims -> Theracorp)
print("Performing branding cleanup...")
# Specifically targeting text that was missed
content = re.sub(r'\bhims\b', 'Theracorp', content, flags=re.IGNORECASE)
content = re.sub(r'\bfor\s*hims\b', 'for Theracorp', content, flags=re.IGNORECASE)

# 3. HEADER LOGO INJECTION (Forcing the fix)
print("Standardizing header logo...")
# Look for common header logo structures
content = re.sub(r'<img[^>]+alt="hims"[^>]*>', '<img src="./logo-theracorp.png" height="32" alt="Theracorp Logo">', content, flags=re.IGNORECASE)
content = re.sub(r'<img[^>]+alt="Theracorp"[^>]*>', '<img src="./logo-theracorp.png" height="32" alt="Theracorp Logo">', content, flags=re.IGNORECASE)

# 4. CARD TEXT OVERFLOW FIX
print("Fixing card title clipping...")
card_fix_style = """
<style id="theracorp-card-fixes">
    /* Prevent text clipping in cards */
    .category-tile__Title-sc-e6e232fe-3, 
    [class*="Title"], 
    [class*="Label"] {
        overflow: visible !important;
        white-space: normal !important;
        text-overflow: clip !important;
        line-height: 1.2 !important;
    }
    /* Ensure containers allow overflow */
    [class*="TileWrapper"], [class*="GridItem"] {
        overflow: visible !important;
    }
</style>
"""
if '</head>' in content:
    content = content.replace('</head>', f'{card_fix_style}</head>')

# 5. LABS SECTION OVERLAP FIX (Image based anchors)
# This is usually handled by restoring images, but let's ensure z-index
content = content.replace('</head>', '<style>.labs-anatomical-points { z-index: 10 !important; }</style></head>')

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Update of {TARGET_FILE} complete.")
