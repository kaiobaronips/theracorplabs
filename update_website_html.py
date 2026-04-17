import re

TARGET_FILE = 'website.html'

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. BUTTON STYLING (The requested "White & Translucent" theme)
print("Injecting premium button styles into website.html...")

button_style_block = """
<!-- THERACORP PREMIUM BUTTON DESIGN SYSTEM -->
<style id="theracorp-button-standardization">
    /* Primary Buttons: White + Glass Hover */
    .cSumzE, .eiXXfK, .stacked-cta-card-style__Button-sc-142aa7a5-4, .cQmTqT, .gxNPCY {
        background-color: #ffffff !important;
        color: #000000 !important;
        border-radius: 50px !important;
        border: none !important;
        transition: all 0.3s ease !important;
        font-weight: 600 !important;
        text-transform: capitalize !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    .cSumzE:hover, .eiXXfK:hover, .cQmTqT:hover, .gxNPCY:hover {
        background-color: rgba(255, 255, 255, 0.22) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        color: #ffffff !important;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;
    }

    /* Secondary Buttons: Translucent (Glass) + Black Hover */
    .jclMmE, .gmlcvs, .bDlTdl, .cfPMpa, .ibWIvc, .kzysoS, .ejZhuM {
        background-color: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        color: #ffffff !important;
        border-radius: 50px !important;
        border: none !important;
        transition: all 0.3s ease !important;
        font-weight: 500 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    .jclMmE:hover, .gmlcvs:hover, .bDlTdl:hover, .cfPMpa:hover, .ibWIvc:hover, .kzysoS:hover, .ejZhuM:hover {
        background-color: #000000 !important;
        color: #ffffff !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
    }
</style>
"""

# Inject before </head>
if '</head>' in content:
    content = content.replace('</head>', f'{button_style_block}</head>')
else:
    # Fallback to after <head>
    content = content.replace('<head>', f'<head>{button_style_block}')

# 2. ASSET PATH RESTORATION (Restoring images and CSS)
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
    'www.theracorp.com': 'www.hims.com',
}

for branded, original in domain_map.items():
    content = content.replace(branded, original)

content = content.replace('src="/fortheracorp/', 'src="https://www.forhims.com/forhims/')
content = content.replace('href="/fortheracorp/', 'href="https://www.forhims.com/forhims/')
content = content.replace('src="/static/', 'src="https://www.hims.com/static/')
content = content.replace('href="/static/', 'href="https://www.hims.com/static/')
content = content.replace('url("/css/', 'url("https://www.hims.com/css/')
content = content.replace('href="/css/', 'href="https://www.hims.com/css/')
content = re.sub(r'url\("?/(static|css|forhims|fortheracorp)/', r'url("https://www.hims.com/\1/', content)

# Specific logo fix (preserving local asset)
content = content.replace('="/logo-theracorp.png"', '="./logo-theracorp.png"')

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Update of {TARGET_FILE} complete.")
