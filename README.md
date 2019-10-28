
[![Build Status](https://travis-ci.com/gonzaloguzzardi/cryptodragons.svg?token=oBxkUCm6L9Ftej7DmuyY&branch=develop)](https://travis-ci.com/gonzaloguzzardi/cryptodragons)

# Overview

Aplicación descentralizada (DApp) que utiliza el concepto de [2-way peg (2WP)](https://www.rsk.co/es/noticia/sidechains-drivechains-and-rsk-2-way-peg-design/) para permitir la transferencia de tokens no fungibles ERC721 entre una blockchain principal basada en ethereum y una blockchain secundaria (sidechain), lo cual ofrece una series de ventjas como:

- Tener una blockchain dedicada a la DApp que mejor satisfaga sus requerimientos
- Velocidad de transacciones al utilizar un algoritmo de concenso mas laxo
- Evitar la competencia por la resolucion de las transacciones entre distintas DApps de la blockchain. Esto es un problema que se evidenció con la salida de [Cryptokitties](https://www.bbc.com/news/technology-42237162).
- Permitir a los usuaris proteger sus tokens en blockchains con algoritmos de consenso de alta seguridad, utilizando una blockchain de principal segura.

-----------------

## General Setup

Antes que nada, debemos setear la versión correcta de Node que utilizamos en el proyecto, con el siguiente comando:
```
$ nvm use
```

```bash
$ sudo apt-get update & sudo apt-get upgrade
$ sudo apt-get install yarn
```

#### 1. Setup Node.js
```bash
$ sudo apt-get install curl python-software-properties
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash 
```
Una vez instalado node, se deben instalar algunos modulos globalmente.
```
$ npm install -g node-gyp
$ npm install -g truffle
```
#### 2. Descargar el proyecto
```bash
$ https://github.com/gonzaloguzzardi/cryptodragons.git
```

#### 3. Instalar dependencias
```bash
$ npm install
```

## Sidechain

Asegurarse de estar en el directorio `truffle-project`

#### 1. Descargar Loom
```bash
$ yarn get:loom
```

#### 2. Generar claves para loom
```bash
$ yarn gen:loom-key
```

#### 3. Inicializar loom
```bash
$ yarn loom:init
```

#### 4. Correr la sidechain
```bash
$ yarn loom:run
```

#### 5. Deploy de contratos a la sidechain
```bash
$ yarn deploy
```

Para sustituir contratos ya existentes en la blockchain:
```bash
$ yarn deploy:reset
```

## Mainchain - Ganache

Asegurarse de estar en el directorio `truffle-project`

#### 1. Descargar Ganache

[Descargar Ganache](https://www.trufflesuite.com/ganache)

#### 2. Generar claves para ganache
```bash
$ yarn gen:ganache-key
```

#### 3. Correr ganache
Abrir ganache y asegurarse que corra en `localhost` puerto 8545 con chain id 5777.

#### 4. Deploy de contratos a ganache
```bash
$ yarn deploy:ganache
```

Para sustituir contratos ya existentes en la blockchain:
```bash
$ yarn deploy:reset:ganache
```

## Loom Network

[https://loomx.io](https://loomx.io)

## License

GNU GPLv3
 
