#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO="$(cd "$ROOT/.." && pwd)"
cd "$ROOT"

# SPA entry + GitHub Pages fallback
cp "$ROOT/dist/index.html" "$REPO/index.html"
cp "$ROOT/dist/index.html" "$REPO/404.html"

# Hashed JS/CSS bundles
mkdir -p "$REPO/assets"
rsync -a "$ROOT/dist/assets/" "$REPO/assets/"

# Keep static profile images and PDF at repo assets root
cp "$ROOT/public/assets/profile.png" "$REPO/assets/profile.png"
cp "$ROOT/public/assets/profile-480.webp" "$REPO/assets/profile-480.webp"
cp "$ROOT/public/assets/favicon.svg" "$REPO/assets/favicon.svg"

# Legacy CV URL redirect
cat > "$REPO/resume.html" <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/Alexdim06/resume">
  <link rel="canonical" href="https://alexdim06.github.io/Alexdim06/resume">
  <script>location.replace('/Alexdim06/resume');</script>
  <title>Redirecting to CV…</title>
</head>
<body><p><a href="/Alexdim06/resume">Continue to CV</a></p></body>
</html>
EOF

echo "Deployed SPA to repo root."
