set -e

cd ../truffle-dappchain
truffle build

cd ../dappchain-scripts
./start-chain.sh reset