set -e

cd ../truffle-dappchain
truffle build

cd ../dappchain
./start-chain.sh reset