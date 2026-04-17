import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update text "Saber mais" to "Saiba mais"
print("Updating all occurrences of 'Saber mais' to 'Saiba mais'...")
content = content.replace('Saber mais', 'Saiba mais')

# 2. Reinforce the secondary button pattern for all relevant elements
# Looking for buttons that are "Secondary" or used for "Learn more" types
# I'll add a global style override at the end of the style block to be sure.

# Find the end of the large style block
style_end_marker = '/*!sc*/\n</style>'
if style_end_marker in content:
    print("Injecting global button pattern reinforcement...")
    global_overrides = """
/* Reinforce Secondary Button Pattern for Saiba Mais */
.jclMmE, .gmlcvs, .ibWIvc, a[href*="Saiba"], button:contains("Saiba") {
    color: rgba(255,255,255,1) !important;
    background-color: transparent !important;
    border: 2px solid rgba(255,255,255,1) !important;
    transition: all 0.3s ease !important;
}
.jclMmE:hover, .gmlcvs:hover, .ibWIvc:hover {
    background-color: rgba(0,0,0,1) !important;
    color: rgba(255,255,255,1) !important;
    border-color: rgba(0,0,0,1) !important;
}
"""
    # Simple injection before </style>
    content = content.replace(style_end_marker, global_overrides + style_end_marker)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Update complete.")
