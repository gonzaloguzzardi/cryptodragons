## Pasos a seguir

````
$ cd dappchain

$ wget https://private.delegatecall.com/loom/osx/stable/loom
$ chmod +x loom
$ ./loom genkey -k priv_key -a pub_key

$ npm install -g truffle@v5.0.5
$ truffle compile
$ npm install truffle-hdwallet-provider loom-truffle-provider dotenv --save-dev

````

Abrir en otra shell la sidechain
````
$ ./setup.sh
$ ./resume_chain.sh
````

Deployar los contratos en la sidechain
````
$ ./deploy.sh
````

Y ahora levantar la webapp
````
$ cd ..
$ cd frontend
$ npm i
$ npm start
````
