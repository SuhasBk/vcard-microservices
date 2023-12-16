#!/bin/bash

cd discovery-service;
./mvnw spring-boot:run &> /dev/null &

sleep 5;

cd ../api-gateway;
./mvnw spring-boot:run &> /dev/null &

sleep 3;

cd ../user-service;
./mvnw spring-boot:run &> /dev/null &

cd ../giphy-service;
./mvnw spring-boot:run &> /dev/null &

cd ../virtual-card;
./mvnw spring-boot:run &> /dev/null &

cd ../;
sleep 5;

cd vcard-gui/;
npm run start &> /dev/null &

exit 1;