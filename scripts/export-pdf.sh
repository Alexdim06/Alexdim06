#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Select an interpreter with reportlab and pypdf installed.
"${PYTHON:-python3}" "$ROOT/scripts/export_pdf.py"
