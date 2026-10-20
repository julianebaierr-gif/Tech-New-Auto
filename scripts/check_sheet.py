import requests
import csv
import os
import glob
import json

sheet_url = "https://docs.google.com/spreadsheets/d/1ksudXZ2GVgcCccHuvRRQC9OMTrBqjZtJYNxUEM1X93A/export?format=csv"
r = requests.get(sheet_url, timeout=10)
lines = r.text.splitlines()
reader = csv.reader(lines)
rows = list(reader)

print(f"Total rows in sheet: {len(rows)}")
if rows:
    print(f"Header: {rows[0]}")

# Collect existing published keywords from content/posts/
existing_keywords = set()
for pf in glob.glob("content/posts/*.json"):
    try:
        with open(pf, "r", encoding="utf-8") as f:
            d = json.load(f)
            if "target_keyword" in d:
                existing_keywords.add(d["target_keyword"].strip().lower())
    except Exception as e:
        pass

print(f"Existing published keywords count: {len(existing_keywords)}")

# Find next unpublished keywords in sheet
next_keywords = []
for i, row in enumerate(rows[1:], start=2):
    if row and len(row) > 0:
        kw = row[0].strip()
        status = row[3].strip() if len(row) > 3 else ""
        if kw and kw.lower() not in existing_keywords and status.lower() != "published":
            next_keywords.append((i, kw, status))

print(f"\nNext unpublished keywords from sheet (first 10):")
for item in next_keywords[:10]:
    print(f"Row {item[0]}: '{item[1]}' (status: '{item[2]}')")
