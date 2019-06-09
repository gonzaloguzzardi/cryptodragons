#!/bin/bash
set -e

curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh

chmod +x loom

./loom init

./loom genkey -k priv_key -a pub_key

echo -n "PRIVATE_KEY=" > .env
cat priv_key >> .env