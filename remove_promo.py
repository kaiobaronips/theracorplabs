import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the promo banner wrapper and its contents
# The wrapper starts with promo-banner-style__PromoBannerWrapper-sc-589b5437-5
pattern = re.compile(r'<div class="blockstyle__Block-web-components__sc-u030pm-0 promo-banner-style__PromoBannerWrapper[^>]*>.*?</div>\s*</div>\s*</a>\s*</div>', re.DOTALL)

# Let's try a simpler pattern first or more specific one based on the text
# A pílula GLP-1 chegou

text_pattern = re.compile(r'<div class="blockstyle__Block-web-components__sc-u030pm-0 promo-banner-style__PromoBannerWrapper-sc-589b5437-5.*?(?=<!-- START CONTENT -->|$)')
# Actually, the grep showed it near the beginning of root content.

# Re-read the grep to be exact.
# <div class="blockstyle__Block-web-components__sc-u030pm-0 promo-banner-style__PromoBannerWrapper-sc-589b5437-5 lnVrhO ehupWf" data-transparent-ignore="true">
# ... contents ...
# </div>

# Let's use a non-regex approach for safety or a very precise regex.

start_tag = '<div class="blockstyle__Block-web-components__sc-u030pm-0 promo-banner-style__PromoBannerWrapper-sc-589b5437-5'
if start_tag in content:
    start_index = content.find(start_tag)
    # Find the closing div for this wrapper. This can be tricky with nested divs.
    # But often these monoliths have a predictable structure.
    
    # Actually, I'll just look for the text and find the surrounding div.
    target_text = "A pílula GLP-1 chegou"
    if target_text in content:
        # Find the start of the wrapper div before this text
        wrapper_start = content.rfind('<div class="blockstyle__Block-web-components__sc-u030pm-0 promo-banner-style__PromoBannerWrapper', 0, content.find(target_text))
        
        # Now find the end of this div. It contains an <a> which contains 3 <div>s.
        # wrapper
        #   <a>
        #     <div> content
        #     <div> background
        #   </a>
        # </div>
        
        # Find </a></div>
        end_mark = '</a></div>'
        end_index = content.find(end_mark, wrapper_start) + len(end_mark)
        
        if wrapper_start != -1 and end_index != -1:
            new_content = content[:wrapper_start] + content[end_index:]
            print("Promo banner removed.")
            with open('index.html', 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            print("Could not find start or end indices.")
    else:
        print("Target text not found.")
else:
    print("Start tag not found.")
