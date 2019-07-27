#!/bin/bash

# sudo apt-get install dos2unix

find ./ -type d \( -path ./transfer-gateway-scripts/node_modules -o -path ./truffle-dappchain/node_modules -o -path ./truffle-ethereum/node_modules -o -path ./webclient/node_modules \) -prune -o -type f -exec dos2unix {} \;
