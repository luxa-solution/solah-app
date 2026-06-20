#!/usr/bin/env bash
#
# Downloads only the masnun-dua audio files referenced by sourceId into your
# Expo project's assets folder. Works perfectly on older Bash 3.2+ environments.

set -euo pipefail

OUTPUT_DIR="${1:-./assets/audio/adhkar}"
BASE_URL="https://raw.githubusercontent.com/islamicapi/masnun-dua/main/audio"

# Format: "sourceId:filename"
AUDIO_ITEMS=(
  "154:before-6-leaving-house.mp3"
  "165:before-5-after-adhan.mp3"
  "169:before-1-before-wudu.mp3"
  "170:before-2a-after-wudu-shahada.mp3"
  "171:before-2b-after-wudu-tawwabin.mp3"
  "173:before-3-going-to-mosque.mp3"
  "175:before-4-entering-mosque.mp3"
  "195:during-2-ruku.mp3"
  "203:during-3b-rising-from-ruku.mp3"
  "213:during-4-sujud.mp3"
  "222:during-5a-between-sujud-short.mp3"
  "223:during-5b-between-sujud-long.mp3"
  "232:during-6-after-tashahhud.mp3"
  "239:after-4-extra-dua.mp3"
  "250:after-1a-astaghfcirullah.mp3"
  "251:after-1b-assalam.mp3"
)

mkdir -p "$OUTPUT_DIR"

echo "Downloading ${#AUDIO_ITEMS[@]} audio files to $OUTPUT_DIR ..."
echo ""

FAILED=()

for item in "${AUDIO_ITEMS[@]}"; do
  # Split the key and value using string manipulation
  source_id="${item%%:*}"
  filename="${item#*:}"
  
  dest="$OUTPUT_DIR/$filename"
  url="$BASE_URL/${source_id}.mp3"

  if [ -f "$dest" ]; then
    echo "  [skip] $filename already exists"
    continue
  fi

  echo "  [fetch] dua_${source_id}.mp3 -> $filename"

  if curl -sSL --fail --retry 3 --retry-delay 2 -o "$dest" "$url"; then
    # Cross-platform check: use 'ls -lh' if 'du -h' yields inconsistent styling
    size=$(du -h "$dest" | cut -f1)
    echo "          done ($size)"
  else
    echo "          FAILED"
    FAILED+=("$source_id")
    rm -f "$dest"
  fi
done

echo ""
if [ ${#FAILED[@]} -eq 0 ]; then
  echo "All files downloaded successfully."
else
  echo "Failed to download: ${FAILED[*]}"
  echo "Check your network or whether these IDs still exist upstream."
  exit 1
fi

echo ""
# Use a safer fallback in case no files match the wildcard on first run
if ls "$OUTPUT_DIR"/*.mp3 >/dev/null 2>&1; then
  du -ch "$OUTPUT_DIR"/*.mp3 | tail -1
fi