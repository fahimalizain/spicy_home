#!/bin/bash

echo "✅ next export";
set -e

# The following is system specific to WorkPC
export PATH=/usr/local/cuda/bin:/home/fahimalizain/.pyenv/shims:/usr/local/cuda/bin:/home/fahimalizain/.cargo/bin:/home/fahimalizain/.nvm/versions/node/v18.17.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/fahimalizain/.rvm/bin

TAURI_ROOT=$NX_WORKSPACE_ROOT/apps/hungerstation/src-tauri


# Build
cd $TAURI_ROOT
npx tauri build --target x86_64-pc-windows-msvc
