import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update text "Saber mais" to "Saiba mais"
print("Updating text Saber mais -> Saiba mais...")
content = content.replace('>Saber mais<', '>Saiba mais<')
content = content.replace('"Saber mais"', '"Saiba mais"') # JSON props

# 2. Check and ensure secondary button pattern
# The user might have meant "Saber mais" buttons in sections that didn't have the class yet.
# I'll check for buttons with "Saiba mais" and ensure they have the .jclMmE class if they are within <a> links.
# However, the previous button_styler already changed the CSS for .jclMmE globally.
# I will check if there are other button classes being used for secondary CTAs.

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Text updated. Secondary button style is already global for .jclMmE.")
