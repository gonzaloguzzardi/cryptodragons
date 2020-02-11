#!/bin/bash

mkdir -p ../bfa/devnet/network/node
cd ../bfa/devnet

# Actualización de dependencias
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update

echo "###################### Geth Install ###########################"
sudo apt-get install ethereum

echo "#################### JQ - Json Parser #########################"
sudo apt-get install jq

echo "######################### Libusb ##############################"
sudo apt-get install libusb-dev

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
if [ ! -e "./bfa_address" ]; then
  echo $BFA_PUB_KEY > "./bfa_address"
fi

echo "BFA ACCOUNT ADDRESS = $BFA_PUB_KEY"

puppeth

# geth --datadir ../bfa/devnet/network/node init devnet.json