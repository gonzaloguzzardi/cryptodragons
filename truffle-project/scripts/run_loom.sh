#!/bin/bash

# Pull docker image if it doesn't exist
if [[ "$(docker images -q gonzaloguzzardi/cryptodragons:loom_node_v001 2> /dev/null)" == "" ]]; then
    docker pull gonzaloguzzardi/cryptodragons:loom_node_v001
fi

docker run -p 46656:46656 -p 46658:46658 gonzaloguzzardi/cryptodragons:loom_node_v001