"""
build_extension.py
==================
Reads vocabulario.js, extracts all vocabulary entries, and generates
vietnamita-extension/content.js (from content_template.js).

Run whenever you add new vocabulary:
  python build_extension.py
"""
import re
import json
import os

BASE     = os.path.dirname(os.path.abspath(__file__))
VOCAB_JS = os.path.join(BASE, "vietnamita-app", "src", "data", "vocabulario.js")
TEMPLATE = os.path.join(BASE, "vietnamita-extension", "content_template.js")
OUTPUT   = os.path.join(BASE, "vietnamita-extension", "content.js")

def extract_vocab(path):
    with open(path, encoding="utf-8") as f:
        content = f.read()

    # Find all occurrences of each field using position-based extraction.
    # For each vn: "..." match, scan forward to grab pt/en/categoria/gramNote
    # before the next vn: occurrence.
    vn_positions = [(m.start(), m.group(1)) for m in re.finditer(r'vn:\s*"([^"]+)"', content)]

    entries = []
    for idx, (start, vn_val) in enumerate(vn_positions):
        end = vn_positions[idx + 1][0] if idx + 1 < len(vn_positions) else len(content)
        block = content[start:end]

        pt  = re.search(r'\bpt:\s*"([^"]*)"',        block)
        en  = re.search(r'\ben:\s*"([^"]*)"',        block)
        cat = re.search(r'\bcategoria:\s*"([^"]*)"', block)
        gn  = re.search(r'\bgramNote:\s*"([^"]*)"',  block)

        if not (pt and cat):
            continue

        entries.append({
            "v": vn_val,
            "p": pt.group(1),
            "e": en.group(1) if en else "",
            "c": cat.group(1),
            "g": gn.group(1) if gn else "",
        })

    return entries

def main():
    print("Reading vocabulario.js ...")
    entries = extract_vocab(VOCAB_JS)
    print(f"  Found {len(entries)} entries.")

    with open(TEMPLATE, encoding="utf-8") as f:
        template = f.read()

    vocab_json = json.dumps(entries, ensure_ascii=False, separators=(",", ":"))
    output = template.replace("__VOCAB_DATA__", vocab_json)

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(output)

    size_kb = os.path.getsize(OUTPUT) / 1024
    print(f"  Generated: {OUTPUT}")
    print(f"  Size: {size_kb:.1f} KB")
    print("\nDone! To update the extension in Chrome:")
    print("  1. Go to chrome://extensions")
    print("  2. Find 'Vietnamita — Vocabulario' and click the reload icon (↺)")

if __name__ == "__main__":
    main()
