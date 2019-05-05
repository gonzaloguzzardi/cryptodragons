#!/bin/bash

# Include modules
source ./utils.sh
source ./crypto_dragons_functions.sh

# Ports used
ganache_port=8546
dapp_port=8080
dappchain_port_1=46657
dappchain_port_2=46658
build_number=499

# Check available platforms
platform='unknown'
unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
  platform='linux'
elif [[ "$unamestr" == 'Darwin' ]]; then
  platform='osx'
else
  echo "Platform not supported on this script yet"
  exit -1
fi

# Execute
case "$1" in
setup)
  echo "------------------------------------------------------------------------------------------"
  echo "Installing necessary packages, this can take up to 3 minutes (depending on internet speed)"
  echo "------------------------------------------------------------------------------------------"
  echo

  if [ $(is_setup_already) = 1 ]; then
    echo "Setup already ran"
    exit -1
  fi

  setup

  echo
  echo "-------------------------------------"
  echo "Done, packages installed with success"
  echo "-------------------------------------"

  ;;
status)
  echo "-----------------"
  echo "Services statuses"
  echo "-----------------"
  echo

  [[ $(check_file_exists truffle-ethereum/ganache.pid) = 1 ]] && echo "Truffle Ethereum(ganache) running" || echo "Truffle Ethereum(ganache) stopped"
  [[ $(check_file_exists dappchain/loom.pid) = 1 ]] && echo "DAppChain running" || echo "DAppChain stopped"
  [[ $(check_file_exists webclient/webclient.pid) = 1 ]] && echo "WebApp running" || echo "WebApp stopped"

  echo

  ;;
start)
  echo "-------------------------------------------------------------------"
  echo "Initializing background services, it can take (40 seconds) ..."
  echo "-------------------------------------------------------------------"
  echo

  if [ $(is_setup_already) = 0 ]; then
    echo "Please use the setup command first: ./crypto_dragons setup"
    echo
    exit -1
  fi

  if [ $(check_port $ganache_port) != 0 ]; then
    echo "Ganache port $ganache_port is already in use"
    echo
    exit -1
  fi

  if [ $(check_port $dapp_port) != 0 ]; then
    echo "Dapp port $dapp_port is already in use"
    echo
    exit -1
  fi

  if [ $(check_port $dappchain_port_1) != 0 ] || [ $(check_port $dappchain_port_2) != 0 ]; then
    echo "Some port from DAppChain already in use [$dappchain_port_1 or $dappchain_port_2]"
    echo
    exit -1
  fi

  start_and_deploy_truffle_ethereum
  #start_dappchain
  #deploy_truffle_dappchain
  #start_webapp
  #run_mapping

  echo
  echo "-----------------------------------------------------------"
  echo "Services initialized and ready, check http://localhost:8080"
  echo "-----------------------------------------------------------"

  ;;
stop)
  echo "-----------------"
  echo "Stopping services"
  echo "-----------------"
  echo

  stop_webdapp
  stop_dappchain
  stop_truffle_ethereum

  echo
  echo "----------------"
  echo "Services stopped"
  echo "----------------"

  ;;
restart)
  $0 stop
  sleep 1
  $0 start

  ;;
cleanup)
  echo "-----------------------------------------"
  echo "Cleaning packages and binaries downloaded"
  echo "-----------------------------------------"
  echo

  echo "Cleaning DAppChain"
  rm -rf dappchain/loom
  rm -rf dappchain/genesis.json
  rm -rf dappchain/app.db
  rm -rf dappchain/chaindata
  rm -rf dappchain/loom.pid
  
  echo "Cleaning Transfer Gateway Scripts"
  rm -rf transfer-gateway-scripts/node_modules
  
  echo "Cleaning Truffle DAppChain"
  rm -rf truffle-dappchain/node_modules
  rm -rf truffle-dappchain/build
  rm -rf truffle-dappchain/loom.pid
  
  echo "Cleaning Truffle Ethereum"
  rm -rf truffle-ethereum/node_modules
  rm -rf truffle-ethereum/build
  
  echo "Cleaning WebApp"
  rm -rf webclient/node_modules
  
  echo
  echo "-----"
  echo "Clear"
  echo "-----"

  ;;
*)
   echo "Usage: $0 {setup|start|status|stop|restart|cleanup}"
esac

exit 0
