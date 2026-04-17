import re

TARGET_FILE = 'index.html'

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update/Inject Polish Styles
print("Injecting header polish styles...")
polish_css = """
<style id="theracorp-header-polish">
    /* Header Polish: Compact & Fade */
    .global-navigation-header-style__GlobalNavigationBackground-sc-4d0b1105-1 {
        height: 80px !important;
        transition: opacity 0.4s ease, height 0.4s ease !important;
        background-color: #ffffff !important;
    }
    
    .global-navigation-header-style__GlobalNavigationHeaderContent-sc-4d0b1105-2 {
        height: 80px !important;
    }

    /* Clean Logo Container - Removing excessive borders/padding */
    .global-navigation-header-style__LogoWrapper-sc-4d0b1105-4 {
        padding: 0 !important;
        margin: 0 !important;
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        transform: translate(-50%, -50%) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    /* Large Logo fitting the 80px header */
    .global-navigation-header-style__LogoWrapper-sc-4d0b1105-4 img {
        height: 72px !important; /* Large and prominent, but fits 80px height */
        width: auto !important;
        margin: 0 !important;
        border: none !important;
        display: block !important;
    }
    
    /* Fade State */
    .header-faded {
        opacity: 0.75 !important;
    }
</style>
"""

# Inject CSS
if '</head>' in content:
    content = content.replace('</head>', f'{polish_css}</head>')

# 2. Inject Scroll Script
print("Injecting scroll-fade script...")
scroll_script = """
<script id="theracorp-fade-script">
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.global-navigation-header-style__GlobalNavigationBackground-sc-4d0b1105-1');
        if (header) {
            if (window.scrollY > 20) {
                header.classList.add('header-faded');
            } else {
                header.classList.remove('header-faded');
            }
        }
    });
</script>
"""

if '</body>' in content:
    content = content.replace('</body>', f'{scroll_script}</body>')

# 3. Clean up previous centering style if it exists to avoid conflicts
content = content.replace('<style id="theracorp-logo-centering">', '<style id="theracorp-logo-centering" style="display:none;">')

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Header polish for {TARGET_FILE} complete.")
