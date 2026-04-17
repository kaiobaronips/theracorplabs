import re

# Load content
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original size: {len(content)}")

# --- 1. GLOBAL CSS SANITIZATION ---
# Fix ternary leaks in CSS: prop: undefined ? col : row; -> prop: col;
content = re.sub(r'(-webkit-|-ms-|)flex-flow:[^;]*\? column :row nowrap', r'\1flex-flow:column', content)

# General ternary fix: property: A ? B : C -> property: B
# Targeting patterns that look like CSS leaks
content = re.sub(r'([a-zA-Z-]{3,}):\s*(?:undefined|true|false|null)\s*\?\s*([^:;{}]+)\s*:\s*([^;!{}]+)', r'\1: \2', content)

# Fix literal leaks specifically in style blocks
def fix_literals_in_styles(match):
    style_attr = match.group(1)
    style_body = match.group(2)
    # Replace prop: null/undefined/true/false with prop: initial
    fixed_body = re.sub(r'([a-zA-Z-]{3,}):\s*(?:null|undefined|true|false)\s*(?=;|}|\!)', r'\1: initial', style_body)
    return '<style' + style_attr + '>' + fixed_body + '</style>'

content = re.sub(r'<style([^>]*)>(.*?)</style>', fix_literals_in_styles, content, flags=re.DOTALL)

# --- 2. REBRANDING ---
def rebrand(text):
    text = text.replace('hims.com', 'theracorp.com')
    text = text.replace('Hims', 'Theracorp')
    text = text.replace('hims', 'theracorp')
    text = text.replace('HIMS', 'THERACORP')
    return text

content = rebrand(content)

# --- 3. LOGO SUBSTITUTION ---
logo_img = '<img src="./logo-theracorp.png" height="72" alt="Theracorp Logo" style="object-fit: contain; width: auto; max-width: 100%;" />'

# Header logo replacement
# Find the div with testid global-navigation-header-logo and its interior link
header_logo_regex = re.compile(r'(<div data-testid="global-navigation-header-logo"[^>]*>.*?<a[^>]*>).*?(</a>)', re.DOTALL)
content = header_logo_regex.sub(r'\1' + logo_img + r'\2', content)

# Blood hedge logo
blood_hedge_regex = re.compile(r'(<div id="blood-hedge-logo"[^>]*>).*?(</div>)', re.DOTALL)
content = blood_hedge_regex.sub(r'\1' + logo_img + r'\2', content)

# Footer logo
footer_logo_regex = re.compile(r'(<div class="footer-style__FooterLargeLogoWrapper-sc-ffd98edc-22 iQQzEH"[^>]*>).*?(</div>)', re.DOTALL)
content = footer_logo_regex.sub(r'\1' + logo_img + r'\2', content)

# --- 4. UI CLEANUP ---
# Remove hamburger menu
content = re.sub(r'<li role="none" class="global-navigation-item-style__GlobalNavigationListItem-sc-a4126e98-0 cXTNCD">.*?</li>', '', content, flags=re.DOTALL)

# Translucent header
content = re.sub(r'(\.iwldUu\{[^}]*background-color:rgba\(255,255,255,)1(\);)', 
                r'\1 0.7\2backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);', content)

# --- 5. FINISH ---
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Final size: {len(content)}")
