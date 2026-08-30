#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
npm run build
pkill -f "vite preview.*4321" 2>/dev/null || true
npx vite preview --host 127.0.0.1 --port 4321 --outDir ../resume >/dev/null 2>&1 &
PID=$!
sleep 2
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="$ROOT/../assets/Aleksandar-Dimitrov-CV.pdf" \
  "http://127.0.0.1:4321/resume/"
kill "$PID" 2>/dev/null || true
echo "PDF written to assets/Aleksandar-Dimitrov-CV.pdf"
