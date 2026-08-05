"""
build.py -- populate dist/ with site-deliverable files only.
Run: python build.py
"""
import shutil, os, glob

SITE_ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(SITE_ROOT, 'dist')

# Wipe and recreate dist/
if os.path.exists(DIST):
    shutil.rmtree(DIST)
os.makedirs(DIST)

# HTML files (root level)
for f in glob.glob(os.path.join(SITE_ROOT, '*.html')):
    shutil.copy2(f, DIST)

# HTML files in subdirectories (services/, service-area/, etc.)
for f in glob.glob(os.path.join(SITE_ROOT, '**', '*.html'), recursive=True):
    if 'node_modules' in f or os.path.abspath(f).startswith(DIST):
        continue
    rel = os.path.relpath(f, SITE_ROOT)
    dest = os.path.join(DIST, rel)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(f, dest)

# images/ — all except README.md
images_src = os.path.join(SITE_ROOT, 'images')
images_dst = os.path.join(DIST, 'images')
os.makedirs(images_dst, exist_ok=True)
for f in os.listdir(images_src):
    if f == 'README.md':
        continue
    src = os.path.join(images_src, f)
    if os.path.isfile(src):
        shutil.copy2(src, os.path.join(images_dst, f))

# Individual site deliverables
for name in ['favicon.ico', 'robots.txt', 'sitemap.xml']:
    src = os.path.join(SITE_ROOT, name)
    if os.path.exists(src):
        shutil.copy2(src, DIST)

print(f'dist/ populated:')
for root, dirs, files in os.walk(DIST):
    dirs.sort()
    for f in sorted(files):
        rel = os.path.relpath(os.path.join(root, f), DIST)
        print(f'  {rel}')
