#!/bin/sh

host=127.0.0.1
user=jouko
password=jouko
dbname=jouko_api
sql="USE jouko-api;insert into Setting values (1, 'keycloakUrl', 'http://localhost:9080/auth');insert into Setting values (3, 'deviceCommunicator.asId', '1');insert into Setting values (4, 'deviceCommunicator.endpoint', 'LORA');"

mysql -h$host -u$user -p$password -e "$sql"