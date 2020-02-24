
#!/bin/bash
# Remember to run  docker pull gonzaloguzzardi/cryptodragons:bfa_node_v003 before
docker run -d -p 8545:8545 -p 8546:8546 -p 8547:8547 -p 30303:30303 -i -t gonzaloguzzardi/cryptodragons:bfa_node_v003