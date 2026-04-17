import re

TARGET_FILE = 'index.html'

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. ADD UI TWEAKS TO STYLE BLOCK
print("Injecting final UI tweaks...")
ui_tweaks = """
<style id="theracorp-ui-cleanup">
    /* 1. Hide Hamburger Menu */
    button[aria-label="Slide Menu Toggle"], 
    [data-testid="GlobalNavigationButton"] {
        display: none !important;
    }

    /* 2. Update Top Banner Color to Teal Primary */
    .promo-banner-style__PromoBannerBackground-sc-589b5437-4,
    [class*="PromoBannerBackground"] {
        background-color: #00D4AA !important;
    }
    
    /* Ensure hover doesn't revert to orange */
    .ehupWf:hover .promo-banner-style__PromoBannerBackground-sc-589b5437-4,
    [class*="PromoBannerWrapper"]:hover [class*="PromoBannerBackground"] {
        background-color: #00BFA5 !important; /* Slightly darker teal for hover */
    }
</style>
"""

if '</head>' in content:
    content = content.replace('</head>', f'{ui_tweaks}</head>')

# 2. ALSO DIRECTLY REPLACE IN INLINE STYLES IF POSSIBLE (Standard protocol)
content = content.replace('background-color:#FFC671', 'background-color:#00D4AA')
content = content.replace('background-color:#FCBB5B', 'background-color:#00BFA5')

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Final UI tweaks for {TARGET_FILE} complete.")
