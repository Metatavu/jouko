#!/bin/sh

mkdir -p target/generated-sources/protobuf/java
protoc -I=./src/main/proto --java_out=./target/generated-sources/protobuf/java ./src/main/proto/laiteviestit.proto
mvn package
