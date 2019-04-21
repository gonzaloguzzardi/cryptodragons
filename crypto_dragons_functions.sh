#!/bin/bash

function is_setup_already {
  if [ $(check_directory_exists truffle-ethereum/node_modules) = 1 ] &&
     [ $(check_directory_exists truffle-dappchain/node_modules) = 1 ] &&
     
     [ $(check_directory_exists transfer-gateway-scripts/node_modules) = 1 ] &&
     [ $(check_directory_exists webclient/node_modules) = 1 ]; then
    echo 1
  else
    echo 0
  fi
}

# Setup function does the first work of download node_packages and loom binary
function setup {
  cd webclient
  echo "Install WebApp"
  npm install
  cd ../truffle-dappchain
  echo "Install DappChain"
  yarn
  cd ../truffle-ethereum
  echo "Install Truffle Ethereum(ganache)"
  yarn
  cd ../transfer-gateway-scripts
  echo "Install Transfer Gateway Scripts"
  yarn
  cd ..
}

function start_and_deploy_truffle_ethereum {
  if [ $(check_file_exists truffle-ethereum/ganache.pid) = 0 ]; then
    echo "Start and Deploy Truffle Ethereum(ganache)"
    cd truffle-ethereum
    yarn ganache-cli:dev > /dev/null 2>&1
    sleep 5
    yarn deploy > /dev/null 2>&1
    cd ..
  else
    echo "Truffle Ethereum(ganache) is deployed and running"
  fi
}

function stop_truffle_ethereum {
  if [ $(check_file_exists truffle-ethereum/ganache.pid) = 1 ]; then
    echo "Stop Truffle Ethereum(ganache)"
    cd truffle-ethereum
    pid=$(cat ganache.pid)
    kill -9 $pid
    rm ganache.pid
    cd ..
    rm gateway_address
    rm dragon_token_address
    rm dragon_token_tx_hash
  else
    echo "Truffle Ethereum(ganache) not running"
  fi
}

function start_dappchain {
  if [ $(check_file_exists dappchain/loom.pid) = 0 ]; then
    echo "Start DAppChain"
    cd dappchain-scripts
    # Make a folder for DAppChain instance
    if [ ! -d ./build ]; then
        mkdir build
    fi
    cd build
    if [ ! -f ./loom ]; then
        ../download-loom.sh 288
    fi
    #./loom reset; ./loom run > /dev/null 2>&1 &
    ./loom init; ./loom run > /dev/null 2>&1 &
    loom_pid=$!
    cd ..
    echo $loom_pid > loom.pid
    sleep 2
    cd ..
  else
    echo "DAppChain is running"
  fi
}

function stop_dappchain {
  if [ $(check_file_exists dappchain-scripts/loom.pid) = 1 ]; then
    echo "Stop DAppChain"
    cd dappchain-scripts
    pid=$(cat loom.pid)
    kill -9 $pid
    rm loom.pid
    cd ..
  else
    echo "DAppChain not running"
  fi
}

function deploy_truffle_dappchain {
  if [ $(check_file_exists webclient/webclient.pid) = 0 ]; then
    echo "Deploy Truffle DAppChain"
    cd truffle-dappchain
    yarn deploy > /dev/null 2>&1 &
    cd ..
    sleep 20
  else
    echo "Truffle DAppChain is deployed"
  fi
}

# Mapping is necessary to "mirroring" the token on mainnet and dappchain
function run_mapping {
  echo "Running mapping"
  cd transfer-gateway-scripts
  node mapping_crypto_dragons.js > /dev/null 2>&1
  node mapping_game_token.js > /dev/null 2>&1
  cd ..
}

function start_webapp {
  if [ $(check_file_exists webclient/webclient.pid) = 0 ]; then
    echo "Running WebApp"
    cd webclient
    npm run serve > /dev/null 2>&1 &
    sleep 5
    cd ..
  else
    echo "WebApp is running"
  fi
}

function stop_webdapp {
  if [ $(check_file_exists webclient/webclient.pid) = 1 ]; then
    echo "Stop WebApp"
    cd webclient
    pid=$(cat webclient.pid)
    kill -9 $pid
    rm webclient.pid
    cd ..
  else
    echo "WebApp not running"
  fi
}