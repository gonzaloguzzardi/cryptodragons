
[![Build Status](https://travis-ci.com/gonzaloguzzardi/cryptodragons.svg?token=oBxkUCm6L9Ftej7DmuyY&branch=develop)](https://travis-ci.com/gonzaloguzzardi/cryptodragons)

# Overview

A template for a Loom DAppChain with a Unity client. See [Unity + Truffle + Loom Template](https://loomx.io/developers/docs/en/unity-truffle-loom-template.html) for more information.

-----------------

### Install

After cloning this repository install all the necessary dependencies use the `crypto_dragons.sh`
shell script to automatically download & install all the required dependencies:

```bash
./crypto_dragons.sh setup
```

### Running

After everything has been installed use the `crypto_dragons.sh` script to spin up all the required
services:

```bash
./crypto_dragons.sh start
```

### Stop

When you're done playing around with the example you should stop all the running services using:

```bash
./crypto_dragons.sh stop
```

### Status

To check which services are currently running:

```bash
./crypto_dragons.sh status
```

### Cleanup

If you want to start with a clean slate you can remove all the `node_modules` directories, and the
loom binary by running:

```bash
./crypto_dragons.sh cleanup
```



## Loom Network

[https://loomx.io](https://loomx.io)

## License

GNU GPLv3
