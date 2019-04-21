# Protobuf
-----------------------
## Installing protoc
-----------------------
### Prerequesites
```
$ sudo apt-get install autoconf automake libtool curl make g++ unzip
```

### Installation
1. From [this page](https://github.com/protocolbuffers/protobuf/releases/tag/v3.6.1), download the protobuf-all-[VERSION].tar.gz.
2. Extract the contents and change to that directory
3. ./configure
4. make
5. make check
6. sudo make install
7. sudo ldconfig # refresh shared library cache.

### Check if it works
```
$ protoc --version
libprotoc 3.6.1
```

## Adding transaction types
-----------------------
Create a new .proto file in the Assets\Protobuf directory, refer to Google Protocol Buffers for syntax details etc. You'll need to download the protoc compiler to generate C# classes from the .proto files.