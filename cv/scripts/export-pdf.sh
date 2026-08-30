#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO="$(cd "$ROOT/.." && pwd)"
PDF="$REPO/assets/Aleksandar-Dimitrov-CV.pdf"
URL="http://127.0.0.1:4321/Alexdim06/resume?print=1"

cd "$ROOT"
npm run build

pkill -f "vite preview.*4321" 2>/dev/null || true
npx vite preview --host 127.0.0.1 --port 4321 >/tmp/vite-preview.log 2>&1 &
PID=$!

cleanup() {
  kill "$PID" 2>/dev/null || true
}
trap cleanup EXIT

for _ in {1..30}; do
  if curl -fsS "$URL" >/dev/null 2>&1; then
    break
  fi
  sleep 0.5
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
  echo "Chrome/Chromium not found. Install Chrome to export PDF." >&2
  exit 1
fi

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=20000 \
  --print-to-pdf="$PDF" \
  "$URL"

SIZE=$(wc -c < "$PDF" | tr -d ' ')
if [[ "$SIZE" -lt 50000 ]]; then
  echo "PDF looks too small (${SIZE} bytes) — export may have failed." >&2
  exit 1
fi

echo "PDF written to assets/Aleksandar-Dimitrov-CV.pdf (${SIZE} bytes)"
