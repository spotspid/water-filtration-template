# BUILD-VERIFY: Mandatory End-of-Build Checklist

Every site build must pass all five checks before it is considered done.

---

## Gate Enumeration Rule

**Gate file enumeration must never use `git ls-files`.**

When `git ls-files "*.html"` runs in a shell where the working directory is not the git repo (the shell's cwd resets silently between tool calls), it returns an empty list — no error, no output, no indication. Any loop over that list iterates zero times, reports zero hits, and the gate passes trivially. The same silent false-clean risk applies to `grep -r "{{" .` or any command that enumerates from `.`: if cwd is wrong, it scans nothing.

**Every gate that scans files must:**
1. Use `Get-ChildItem -Recurse` with an **explicit absolute path** — never `.` or a relative path.
2. Exclude `dist\` and `node_modules\` explicitly.
3. Print the number of files and the total number of lines scanned alongside every hit count.
4. **A gate reporting zero hits with zero lines scanned is a FAILURE, not a pass. Stop and diagnose — do not treat it as clean.**

**Correct command pattern (PowerShell — immune to cwd reset):**
```powershell
$site = "C:\Sites\your-client-site"  # Replace with the absolute path to the client folder
$htmlFiles = Get-ChildItem -Recurse -Include "*.html" -Path $site |
    Where-Object { $_.FullName -notmatch '\\dist\\|\\node_modules\\' }
$lineCount = ($htmlFiles | Get-Content | Measure-Object -Line).Lines
Write-Output "Files: $($htmlFiles.Count) | Lines: $lineCount"
$hits = $htmlFiles | ForEach-Object {
    Select-String -Path $_.FullName -Pattern "YOUR_PATTERN" -CaseSensitive:$false
}
Write-Output "Hits: $($hits.Count)"
# Zero hits with zero lines means the scan was empty — that is a FAILURE, not a clean result.
```

---

## Step 0: Build dist/ and Deploy (Required Before Every Check)

**Run this before every check and before every deploy.**

1. Populate `dist/` with the current session's site files:
   ```
   python build.py
   ```
2. Deploy to the draft alias from `dist/`, not from the site root:
   ```
   netlify deploy --dir dist --alias draft
   ```

**Never use `netlify deploy --dir .`** — deploying from the site root exposes build-tool files, config files, and README to the CDN. The `netlify.toml` publish directory is `dist`; every deploy must honor it. Check E is meaningless if the deploy used the wrong source directory.

Run all checks below from the site root after completing Step 0.

---

## Check A: Zero Unfilled Tokens

```
grep -r "{{" . --include="*.html" --include="*.xml" --include="*.txt" --include="*.mjs" --exclude-dir=node_modules
```

Expected result: zero matches. Any `{{` hit means the build is incomplete. Stop and fill the token. A "known" hit means the wrong file is in the folder -- fix that before deploying.

**Brand pass scope:** Every brand pass (hex replacement, font swap, or any token fill) must grep `.mjs`, `.json`, `.xml`, `.txt`, and `.md` files, not only `.html`. `gen-favicons.mjs` carries `{{BRAND_PRIMARY}}` and will produce a broken favicon if the token is left unfilled. Hex-only passes that target `.html` exclusively will silently leave stale colors in script files.

---

## Check B: Every Image Reference Has a Committed File

Use `Get-ChildItem` with an explicit absolute path (see Gate Enumeration Rule above — `git ls-files` is forbidden here):

```powershell
$site = "C:\Sites\your-client-site"  # Replace with the absolute path to the client folder
$htmlFiles = Get-ChildItem -Recurse -Include "*.html" -Path $site |
    Where-Object { $_.FullName -notmatch '\\dist\\|\\node_modules\\' }
$lineCount = ($htmlFiles | Get-Content | Measure-Object -Line).Lines
Write-Output "Files: $($htmlFiles.Count) | Lines: $lineCount"
$refs = $htmlFiles | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    [regex]::Matches($content, 'images/[^"'' >)\r\n]+') | ForEach-Object { $_.Value.Trim() }
} | Sort-Object -Unique
Write-Output "Image refs found: $($refs.Count)"
foreach ($ref in $refs) {
    $full = Join-Path $site $ref
    if (Test-Path $full) { Write-Output "OK: $ref" } else { Write-Output "MISSING: $ref" }
}
if (Test-Path (Join-Path $site "favicon.ico")) {
    Write-Output "OK: favicon.ico"
} else {
    Write-Output "MISSING: favicon.ico"
}
```

Expected result: every line starts with `OK:`. Any `MISSING` means a referenced image is not present in the client folder — either copy the file into `images/` and commit it, or verify the filename casing matches exactly (case-exact on Linux/Netlify CDN).

---

## Check C: Every Image URL Returns 200 After Deploy

After `netlify deploy --dir dist --alias draft`, substitute your draft URL below and run:

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

---

## Check E: Nothing Outside the Site File Set Is Served

Check E - nothing outside the site file set is served. After deploy, fetch README.md, SITES.md, BUILD-VERIFY.md, package.json, package-lock.json, and every .mjs, .js, .py, .toml, .txt, and .md file present at the repo root. Every one must return 404. A 200 on any of them fails the build. This check exists because the other four checks confirm that intended things work and none confirm that unintended things are absent.

---

## Check F: Default Template Images Must Not Ship

After the client's real logo, favicon, and headshot are committed and all HTML references updated, delete every unreferenced template default image from `images/`. These four files **must not be present in `images/` on any deployed client site**:

- `owner-headshot.webp`
- `logo.webp`
- `logo-footer.webp`
- `logo-og.png`

Also check for other unreferenced template defaults: `equipment-ro.webp`, `lifestyle-family.webp`, `lifestyle-kitchen.webp`, `lifestyle-shower.webp`.

Run the reference audit from Check B first. If any of these files IS referenced, fix the reference before deleting. Then `git rm` the unreferenced files, commit, run `python build.py`, and verify the deleted paths return 404 on the deployed draft.

A client site that ships with `logo.webp` or `owner-headshot.webp` in `images/` did not complete this step.

---

## Check G: Superlative and Absolute-Claim Compliance

No page may carry marketing superlatives or absolute-performance claims in copy text. Run from the client site root:

```powershell
$site = "C:\Sites\your-client-site"  # Replace with the absolute path to the client folder
$htmlFiles = Get-ChildItem -Recurse -Include "*.html" -Path $site |
    Where-Object { $_.FullName -notmatch '\\dist\\|\\node_modules\\' }
$lineCount = ($htmlFiles | Get-Content | Measure-Object -Line).Lines
Write-Output "Files: $($htmlFiles.Count) | Lines: $lineCount"
$patterns = @("cleanest","purest","pure","safest","best","removes everything","100%","guaranteed","completely","totally","eliminates")
foreach ($pat in $patterns) {
    $hits = $htmlFiles | ForEach-Object { Select-String -Path $_.FullName -Pattern $pat -CaseSensitive:$false }
    Write-Output "[$pat]: $($hits.Count) hits"
    if ($hits.Count -gt 0) {
        $hits | ForEach-Object { Write-Output "  $($_.Filename):$($_.LineNumber) -> $($_.Line.Trim().Substring(0,120))" }
    }
}
```

**Expected:** zero hits in copy text. Investigate every hit before shipping.

**False positives to disregard:**
- `100%` — produces many hits from CSS values (`max-width:100%`, `top:100%`, `width:100%` inside `<style>` blocks). Any `100%` hit on a line that is clearly CSS is not a compliance issue. Any `100%` in `<p>`, `<h1>`–`<h6>`, `<li>`, meta `content=`, or JSON-LD requires review.
- `completely` — "commercially reasonable security measures" in the privacy policy is standard legal boilerplate, not a marketing claim.
- `pure` / `purely` — legitimate adverbial use in legal or explanatory text is not a superlative. Review context.

**Copy hits that require a fix:** `cleanest`, `purest`, `safest`, `best` (as in "best-tasting"), `removes everything`, `guaranteed`, `totally`, `eliminates` in any marketing copy (`<h1>`–`<h6>`, `<p>`, `<li>`, meta descriptions, JSON-LD descriptions, scard/pcard body text).

---

## The Build Is Not Done Until All Seven Pass

Do not hand off, announce, or mark complete until A, B, C, D, E, F, and G all pass on the deployed draft URL.
