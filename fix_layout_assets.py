import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. DOMAIN REVERSION (Restoring functional asset sources)
print("Reverting asset domains to functional sources...")
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

# 2. PATH CORRECTION (Converting root-relative to absolute functional URLs)
print("Fixing absolute paths for local viewing...")
# Common paths used by Hims/Theracorp template
# Prepend the base domain to paths starting with / that are clearly assets
# Paths like /fortheracorp/... should become https://www.forhims.com/forhims/...
# (Assuming the original path was /forhims/ and I replaced it with /fortheracorp/)
content = content.replace('src="/fortheracorp/', 'src="https://www.forhims.com/forhims/')
content = content.replace('href="/fortheracorp/', 'href="https://www.forhims.com/forhims/')
content = content.replace('src="/static/', 'src="https://www.hims.com/static/')
content = content.replace('href="/static/', 'href="https://www.hims.com/static/')
content = content.replace('url("/css/', 'url("https://www.hims.com/css/')
content = content.replace('href="/css/', 'href="https://www.hims.com/css/')
content = content.replace('url("/static/', 'url("https://www.hims.com/static/')

# Single quotes case for url()
content = content.replace("url('/css/", "url('https://www.hims.com/css/")
content = content.replace("url('/static/", "url('https://www.hims.com/static/")

# Specific fix for fonts that might be root-relative without quotes in some places
content = re.sub(r'src:\s*url\("/', r'src: url("https://www.hims.com/', content)

# 3. EXTRA LOCALIZATION CHECK (Ensuring 'fortheracorp' in strings doesn't break logic but assets work)
# We already did domain reversion. Now let's handle the specific path /fortheracorp/ to /forhims/ 
# only if it's in a URL context.
content = content.replace('/fortheracorp/image/', 'https://www.forhims.com/forhims/image/')

# 4. PROTECT LOCAL ASSETS
# Ensure the local logo we added remains ./logo-theracorp.png
# (Already handled since it starts with ./ but double checking or reverting if path fix was too broad)
# Actually, the logic above targets "/ but not "./ so it should be fine.

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Layout asset fix complete.")
