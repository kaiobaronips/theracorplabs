import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Increase logo size in the header
# We will match the specific img tag inside the global-navigation-header-logo
logo_pattern = re.compile(r'(<div data-testid="global-navigation-header-logo"[^>]*>.*?<img src="\./logo-theracorp\.png" height=")24(" alt="Theracorp Logo"[^>]*>.*?</div>)')

def logo_repl(match):
    return match.group(1) + "42" + match.group(2)

content, logo_count = logo_pattern.subn(logo_repl, content)
print(f"Increased logo size, matches: {logo_count}")

# Remove the hamburger menu icon
hamburger_pattern = re.compile(r'<li role="none" class="global-navigation-item-style__GlobalNavigationListItem[^>]*>\s*<button data-testid="GlobalNavigationButton"[^>]*>.*?</button>\s*</li>')

content, hamburger_count = hamburger_pattern.subn('', content)
print(f"Removed hamburger menus, matches: {hamburger_count}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
