#!/bin/bash
set -e

if [ ! -f ./loom ]; then
    curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh | sh
fi

chmod +x loom

set +e

# Run loom init if it wasn't ran before
if [ ! -d ./app.db ]; then
    ./loom init
fi

set -e

./loom genkey -k priv_key -a pub_key

echo -n "PRIVATE_KEY=" > .env
cat priv_key >> .env