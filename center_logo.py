import re

TARGET_FILE = 'index.html'

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. INJECT CENTERING STYLES
print("Injecting centering and scaling styles...")
centering_css = """
<style id="theracorp-logo-centering">
    /* Centralize Logo & Upscale */
    .global-navigation-header-style__LogoWrapper-sc-4d0b1105-4 {
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        transform: translate(-50%, -50%) !important;
        z-index: 100 !important;
        width: auto !important;
        max-width: none !important;
    }
    
    .global-navigation-header-style__LogoWrapper-sc-4d0b1105-4 img {
        height: 96px !important;
        width: auto !important;
        max-width: none !important;
    }

    /* Increase Header Height to accommodate large logo */
    .global-navigation-header-style__GlobalNavigationBackground-sc-4d0b1105-1 {
        height: 120px !important;
    }
    
    /* Adjust internal content alignment if needed */
    .global-navigation-header-style__GlobalNavigationHeaderContent-sc-4d0b1105-2 {
        height: 120px !important;
        position: relative !important;
    }
</style>
"""

if '</head>' in content:
    content = content.replace('</head>', f'{centering_css}</head>')

# 2. UPDATE IMG TAG HEIGHT
print("Updating img tag height property...")
content = re.sub(r'(<a[^>]+aria-label="Home"[^>]*>.*?)height="\d+"(.*?</a>)', r'\1height="96"\2', content, flags=re.DOTALL)

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Centering and resizing for {TARGET_FILE} complete.")
