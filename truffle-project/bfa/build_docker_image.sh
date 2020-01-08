#!/bin/bash

docker image build -t gonzaloguzzardi/cryptodragons:bfa_node . 

# push image --> docker push gonzaloguzzardi/cryptodragons:bfa_node
# login --> docker login --username <userId>
# run -->  docker run -i -t gonzaloguzzardi/cryptodragons:bfa_node  