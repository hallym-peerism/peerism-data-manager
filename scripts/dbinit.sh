#!/bin/bash

rm -rf models
rm -rf migrations

#sequelize-cli init

sequelize-cli model:generate --name repo --attributes sensorid:text,title:text,description:text
sequelize-cli model:generate --name svalue --attributes sensorid:text,valueid:integer,value:integer,beforehash:text

sequelize-cli db:migrate