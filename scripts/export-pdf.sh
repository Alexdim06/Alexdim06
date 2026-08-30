#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PDF="$ROOT/assets/Aleksandar-Dimitrov-CV.pdf"
URL="http://127.0.0.1:8765/resume/?pdf=1"

cd "$ROOT"

pkill -f "python3 -m http.server 8765" 2>/dev/null || true
python3 -m http.server 8765 >/tmp/alexdim06-cv-server.log 2>&1 &
PID=$!

cleanup() {
  kill "$PID" 2>/dev/null || true
}
trap cleanup EXIT

for _ in {1..30}; do
  if curl -fsS "$URL" >/dev/null 2>&1; then
    break
  fi
  sleep 0.25
done

CHROME=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary" \
  "google-chrome" \
  "chromium" \
  "chromium-browser"; do
  if command -v "$candidate" >/dev/null 2>&1 || [[ -x "$candidate" ]]; then
    CHROME="$candidate"
    break
  fi
done

if [[ -z "$CHROME" ]]; then
  echo "Chrome/Chromium not found. Install Chrome to export the CV PDF." >&2
  exit 1
fi

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=15000 \
  --prefer-css-page-size \
  --print-to-pdf="$PDF" \
  --print-to-pdf-no-header \
  "$URL"

SIZE=$(wc -c < "$PDF" | tr -d ' ')
if [[ "$SIZE" -lt 50000 ]]; then
  echo "PDF looks too small (${SIZE} bytes) — export may have failed." >&2
  exit 1
fi

echo "PDF written to assets/Aleksandar-Dimitrov-CV.pdf (${SIZE} bytes)"
