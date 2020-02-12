#!/bin/bash

# Pull docker image if it doesn't exist
if [[ "$(docker images -q gonzaloguzzardi/cryptodragons:bfa_node_v002 2> /dev/null)" == "" ]]; then
    docker pull gonzaloguzzardi/cryptodragons:bfa_node_v002
fi

docker run -p 8545:8545 -p 8546:8546 -p 8547:8547 -p 30303:30303 -i -t gonzaloguzzardi/cryptodragons:bfa_node_v002