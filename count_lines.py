with open('index.html', 'rb') as f:
    content = f.read()

lf = content.count(b'\n')
cr = content.count(b'\r')
crlf = content.count(b'\r\n')

print(f"LF: {lf}")
print(f"CR: {cr}")
print(f"CRLF: {crlf}")
print(f"Total logical lines (assuming CR only): {cr - crlf + lf}")
