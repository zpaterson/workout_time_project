#!/bin/bash
set -e # Flag causes script to exit if there's an error

# Set variables
database_name='workout_time'
table1_name='users'
table2_name='preferences'

read -p "Are you sure you want to drop table $table2_name? Reply y or n " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
   echo Dropping table $table2_name...
    psql -d $database_name -c "DROP TABLE $table2_name"
fi

read -p "Are you sure you want to drop table $table1_name? Reply y or n " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
   echo Dropping table $table1_name...
    psql -d $database_name -c "DROP TABLE $table1_name"
fi


read -p "Are you sure you want to drop table $database_name? Reply y or n " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
   echo Dropping database $database_name...
    psql -c "DROP DATABASE $database_name"
fi