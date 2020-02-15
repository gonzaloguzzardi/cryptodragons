#!/bin/bash

mkdir -p devnet/network/node
cd devnet

# Actualización de dependencias
add-apt-repository -y ppa:ethereum/ethereum

echo "###################### Geth Install ###########################"
apt-get install -y ethereum

echo "#################### JQ - Json Parser #########################"
apt-get install -y jq

echo "######################### Libusb ##############################"
#apt-get install -y libusb-dev
apt-get install -y apt-utils

# Creacion de cuenta si no existe una
if [ -z "$(ls -A network/node/keystore)" ]; then
    geth --datadir network/node account new
fi

ACCCOUNT_FILE=""
for file in network/node/keystore/*; do
    ACCCOUNT_FILE="network/node/keystore/${file##*/}"
    echo "$ACCCOUNT_FILE"
    break 1
done

BFA_PUB_KEY=$(jq '.address' $ACCCOUNT_FILE) 
echo $BFA_PUB_KEY > "./bfa_address"

echo "BFA ACCOUNT ADDRESS = $BFA_PUB_KEY"

# puppeth

# geth --datadir ../bfa/devnet/genesis init devnet.json