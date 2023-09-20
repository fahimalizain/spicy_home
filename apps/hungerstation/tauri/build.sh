#!/bin/bash

echo "✅ next export";
set -e

# The following is system specific to WorkPC
export PATH=/usr/local/cuda/bin:/home/fahimalizain/.pyenv/shims:/usr/local/cuda/bin:/home/fahimalizain/.cargo/bin:/home/fahimalizain/.nvm/versions/node/v18.17.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/fahimalizain/.rvm/bin
JQ=/home/linuxbrew/.linuxbrew/bin/jq

TAURI_ROOT=$NX_WORKSPACE_ROOT/libs/src-tauri

cat $TAURI_ROOT/tauri.conf.json | \
    $JQ '(.build.distDir = "../../dist/apps/hungerstation/exported") | (.package.productName = "hungerstation") | (.tauri.windows[0].title = "Hungerstation")' \
    > $TAURI_ROOT/tauri.conf.json.tmp && mv $TAURI_ROOT/tauri.conf.json.tmp $TAURI_ROOT/tauri.conf.json

# Build
cd $TAURI_ROOT
npx tauri build --target x86_64-pc-windows-msvc

# Cleanup
git checkout $TAURI_ROOT/tauri.conf.json