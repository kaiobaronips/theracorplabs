import re

FILES = ['index.html', 'website.html']

for target in FILES:
    print(f"Updating {target}...")
    try:
        with open(target, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update the style block specifically
        # Remove shadows and make static (no transition)
        content = re.sub(r'box-shadow: [^;!]+(!important)?;', 'box-shadow: none !important;', content)
        content = re.sub(r'transition: [^;!]+(!important)?;', 'transition: none !important;', content)
        
        # Ensure box-shadow: none is present in the hover state if it was missing or different
        # In my previously injected block, I had a specific shadow.
        # I'll replace the whole block or target it carefully.
        
        # Targeted replacement for my specific block
        content = content.replace('box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37) !important;', 'box-shadow: none !important;')
        
        with open(target, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated {target}")
    except FileNotFoundError:
        print(f"File {target} not found, skipping.")

print("Shadow removal and static state configuration complete.")
