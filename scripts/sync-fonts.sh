
---

## 🔧 الخطوة 4 — `scripts/sync-fonts.sh`

أنشئ `scripts/sync-fonts.sh` (لتحديث الخطوط بأمر واحد):

```bash
#!/usr/bin/env bash
# Sync font files from node_modules to public/fonts/.
# Run after upgrading @fontsource/* packages.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/public/fonts"

mkdir -p "$DEST"

copy() {
  local src="$1"
  local dst="$2"
  if [[ ! -f "$src" ]]; then
    echo "❌ Missing source: $src" >&2
    exit 1
  fi
  cp "$src" "$dst"
  echo "✅ $(basename "$dst")"
}

copy \
  "$ROOT/node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2" \
  "$DEST/geist-latin-variable.woff2"

copy \
  "$ROOT/node_modules/@fontsource/tajawal/files/tajawal-arabic-400-normal.woff2" \
  "$DEST/tajawal-arabic-400.woff2"

copy \
  "$ROOT/node_modules/@fontsource/tajawal/files/tajawal-arabic-700-normal.woff2" \
  "$DEST/tajawal-arabic-700.woff2"

copy \
  "$ROOT/node_modules/@fontsource/tajawal/files/tajawal-latin-500-normal.woff2" \
  "$DEST/tajawal-latin-500.woff2"

echo "🎉 Fonts synced to public/fonts/"