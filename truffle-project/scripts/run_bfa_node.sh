
#!/bin/bash
cd ../bfa/devnet

BFA_ADDRESS=$(cat "$bfa_address")
echo $BFA_ADDRESS
geth --datadir network/node/ --syncmode 'full' --port 30303 --rpc --rpcaddr 'localhost' --rpcport 8545 --rpcapi 'personal,db,eth,net,web3,txpool,miner' --networkid 12345 --gasprice '1' --unlock "$BFA_ADDRESS" --password /dev/null --mine
