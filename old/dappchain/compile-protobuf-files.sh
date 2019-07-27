#!/bin/bash
#protoc -I../UnityClient/Assets/Protobuf --csharp_out=../UnityClient/Assets/Protobuf --proto_path=../protobuf-3.6.1/csharp ../UnityClient/Assets/Protobuf/sample.proto
set -e

ROOT=../UnityClient/Assets/Protobuf
pushd ${ROOT}/ > /dev/null

protoFiles=("sample.proto")
protoFilesWithPath=()
for Path in "${protoFiles[@]}"
do
    protoFilesWithPath+=("proto/${Path}")
done

protoFilesWithPathConcat=$(printf -- "%s " ${protoFilesWithPath[*]})
protoc -I. --csharp_out . ${protoFilesWithPathConcat}
sed -i 's/global::Google.Protobuf/global::Loom.Google.Protobuf/' *.cs

popd > /dev/null