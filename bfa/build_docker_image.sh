#!/bin/bash

docker image build -t gonzaloguzzardi/cryptodragons:bfa_node_v005 .

# push image --> docker push gonzaloguzzardi/cryptodragons:bfa_node
# login --> docker login --username <userId>
# run -->  docker run -i -t gonzaloguzzardi/cryptodragons:bfa_node 
# docker run -p 8545:8545 -p 8546:8546 -p 8547:8547 -p 30303:30303 -i -t gonzaloguzzardi/cryptodragons:bfa_node_v001 