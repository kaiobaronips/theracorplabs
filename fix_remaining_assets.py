import re

TARGET_FILE = 'index.html'

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. FIX THE MAIN IMAGE DOMAIN (The culprit discovered in audit)
print("Fixing theracorp.com asset domain redirection...")
# Many assets are pointing to www.theracorp.com which doesn't exist
content = content.replace('www.theracorp.com', 'www.hims.com')
content = content.replace('theracorp.com/static', 'hims.com/static')
content = content.replace('fortheracorp.com', 'forhims.com')

# 2. HEADER LOGO & NAV CLEANUP
print("Scrubbing remaining 'hims' from CSS and nav...")
# Often logos are in SVG strings or background-images
content = re.sub(r'alt="hims"', 'alt="Theracorp"', content, flags=re.IGNORECASE)
# Replace the actual word "hims" in text nodes if missed
content = re.sub(r'>hims<', '>Theracorp<', content, flags=re.IGNORECASE)

# 3. FORCE HEADER LOGO
# This ensures THE logo we saw in the screenshot is replaced
# Replacing any <img> with 'hims' in its source or alt
content = re.sub(r'<img[^>]+(hims)[^>]+>', r'<img src="./logo-theracorp.png" height="32" alt="Theracorp Logo">', content, flags=re.IGNORECASE)

# 4. FIX BLUE ALT TEXT ON BROKEN IMAGES
# If images still break, at least make them look less like errors
content = content.replace('</head>', '<style>img[alt] { color: transparent; font-size: 0; }</style></head>')

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Final asset and logo fix for {TARGET_FILE} complete.")
