#!/usr/bin/env bash
# Reads dependencies from package.json and shows latest versions

set -euo pipefail

# Ensure jq and npm are installed
command -v jq >/dev/null 2>&1 || { echo "jq is required (apt install jq)"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is required"; exit 1; }

PKG_FILE="package.json"
if [ ! -f "$PKG_FILE" ]; then
  echo "No package.json found in current directory."
  exit 1
fi

echo "Checking latest versions for dependencies in $PKG_FILE..."
echo

# Extract dependencies + devDependencies
deps=$(jq -r '.dependencies // {} | to_entries[] | "\(.key)"' "$PKG_FILE")
dev_deps=$(jq -r '.devDependencies // {} | to_entries[] | "\(.key)"' "$PKG_FILE")

check_latest () {
  local dep="$1"
  current=$(jq -r --arg dep "$dep" '.dependencies[$dep] // .devDependencies[$dep]' "$PKG_FILE")
  latest=$(npm show "$dep" version 2>/dev/null || echo "N/A")
  echo "$dep: current=$current latest=$latest"
  #npm install "$dep@latest" --save
}

for dep in $deps $dev_deps; do
  check_latest "$dep"
done
