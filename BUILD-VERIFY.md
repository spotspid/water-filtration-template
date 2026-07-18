# BUILD-VERIFY: Mandatory End-of-Build Checklist

Every site build must pass all three checks before it is considered done.
Run from the site root directory after deploying to the draft alias.

---

## Check A: Zero Unfilled Tokens

```
grep -r "{{" . --include="*.html" --include="*.xml" --include="*.txt" --exclude-dir=node_modules
```

Expected result: zero matches. Any `{{` hit means the build is incomplete. Stop and fill the token. A "known" hit means the wrong file is in the folder -- fix that before deploying.

---

## Check B: Every Image Reference Has a Committed File

Run from the site root:

```bash
# List every images/ reference in HTML
grep -rh "images/" *.html services/*.html service-area.html 2>/dev/null \
  | grep -oE 'images/[^"'\'' >]+' | sort -u | while read f; do
    git ls-files --error-unmatch "$f" 2>/dev/null \
      && echo "OK: $f" || echo "MISSING (not committed): $f"
  done
```

Expected result: every line starts with `OK:`. Any `MISSING` means a referenced image is not committed -- either copy the template default into the site's images/ folder and commit it, or verify the filename casing matches exactly (case-exact on Linux/Netlify CDN).

Also verify favicon.ico is committed:
```bash
git ls-files --error-unmatch favicon.ico && echo "OK: favicon.ico" || echo "MISSING: favicon.ico"
```

---

## Check C: Every Image URL Returns 200 After Deploy

After `netlify deploy --alias draft`, substitute your draft URL below and run:

```bash
DRAFT_URL="https://draft--YOUR-SITE-NAME.netlify.app"

# Collect all image hrefs from the deployed index page and check each
curl -s "$DRAFT_URL" | grep -oE 'images/[^"'\'' >]+' | sort -u | while read img; do
  code=$(curl -o /dev/null -s -w "%{http_code}" "$DRAFT_URL/$img")
  echo "$code $img"
done
```

Expected result: every line starts with `200`. Any non-200 means the file is missing or misnamed on the deployed site. Fix, re-commit, re-deploy, and re-check.

---

## Check D: Img Tag Integrity

No `<img` tag may contain duplicate attributes or injected HTML comments inside the tag opener. Run from the site root:

```bash
# Detect duplicate alt, duplicate loading, or comments injected inside <img
grep -rn 'alt="[^"]*" alt=\|loading="lazy"[^>]*loading="lazy"\|<img<!--' \
  --include="*.html" . | grep -v node_modules | grep -v ".netlify"
```

Expected result: zero matches. Any hit means a malformed tag that browsers may misparse.

After deploying the draft, also visually spot-check the homepage and the RO page for:
- Hero image rendering (not showing HTML comment text as visible content)
- RO faucet grid (four images visible, no raw attribute text on screen)
- Footer logo rendering in every page type

If any raw HTML syntax (`alt=`, `src=`, `<!--`, `loading=`) appears as visible page text, a tag is still broken. Fix in source, re-commit, re-deploy.

---

## The Build Is Not Done Until All Four Pass

Do not hand off, announce, or mark complete until A, B, C, and D all pass on the deployed draft URL.
