#!/usr/bin/env bash

set -euo pipefail

SOURCE_FILE="${1:-./adhkar-salah-full-source.ts}"
OUTPUT_DIR="${2:-./assets/audio/adhkar}"

BASE_URL="https://raw.githubusercontent.com/islamicapi/masnun-dua/main/audio"

mkdir -p "$OUTPUT_DIR"

echo "Parsing $SOURCE_FILE ..."
echo ""

FAILED=()

slugify() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E "s/['’]//g" \
    | sed -E 's/[^a-z0-9]+/-/g' \
    | sed -E 's/^-+|-+$//g' \
    | sed -E 's/-+/-/g'
}

current_id=""
current_title=""

while IFS= read -r line; do
  if [[ $line =~ sourceId:[[:space:]]*([0-9]+) ]]; then
    current_id="${BASH_REMATCH[1]}"
  fi

  if [[ $line =~ title:[[:space:]]*\"(.*)\" ]]; then
    current_title="${BASH_REMATCH[1]}"

    if [[ -n "$current_id" ]]; then
      slug=$(slugify "$current_title")

      filename="${current_id}-${slug}.mp3"
      dest="$OUTPUT_DIR/$filename"
      url="$BASE_URL/${current_id}.mp3"

      if [[ -f "$dest" ]]; then
        echo "[skip] $filename"
      else
        echo "[fetch] $filename"

        if curl -sSL \
          --fail \
          --retry 3 \
          --retry-delay 2 \
          -o "$dest" \
          "$url"; then

          size=$(du -h "$dest" | cut -f1)
          echo "        done ($size)"
        else
          echo "        no audio upstream"
          FAILED+=("$current_id")
          rm -f "$dest"
        fi
      fi

      current_id=""
      current_title=""
    fi
  fi
done < "$SOURCE_FILE"

echo ""

if [ ${#FAILED[@]} -eq 0 ]; then
  echo "All available audio files downloaded."
else
  echo "Missing audio for these sourceIds:"
  printf '  %s\n' "${FAILED[@]}"
fi

echo ""

if ls "$OUTPUT_DIR"/*.mp3 >/dev/null 2>&1; then
  du -ch "$OUTPUT_DIR"/*.mp3 | tail -1
fi