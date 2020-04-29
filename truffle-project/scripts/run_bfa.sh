
#!/bin/bash
# Remember to run  docker pull nicomoccagatta/cryptodragons:bfa_node_v010 before

# Pull docker image if it doesn't exist
if [[ "$(docker images -q nicomoccagatta/cryptodragons:bfa_node_v010 2> /dev/null)" == "" ]]; then
    docker pull nicomoccagatta/cryptodragons:bfa_node_v010
fi

docker run -d -p 8545:8545 -p 8546:8546 -p 8547:8547 -p 30303:30303 -i -t nicomoccagatta/cryptodragons:bfa_node_v010
