import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update primary promo color
content = content.replace('#FFC671', '#00D4AA')

# Update hover variant (FCBB5B is roughly a darker version of FFC671)
# We replace it with a darker teal (e.g. #00A88A or similar)
content = content.replace('#FCBB5B', '#00A88A')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated promo banner colors to Teal Primary (#00D4AA).")
