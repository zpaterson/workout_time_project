#!/bin/bash
set -e # Flag causes script to exit if there's an error

# Set variables
database_name='workout_time'
table1_name='users'
table2_name='preferences'


echo Creating database $database_name...
psql -c "CREATE DATABASE $database_name"

echo Creating table $table1_name...
psql -d $database_name -c "CREATE TABLE $table1_name(
	id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(40)
);"


echo Creating table $table2_name...
psql -d $database_name -c "CREATE TABLE $table2_name(
	id SERIAL PRIMARY KEY NOT NULL,
	user_id SERIAL REFERENCES users(id),
	time_of_day VARCHAR(40),
	days_per_week INTEGER,
	hours_per_week INTEGER,
	date_created TIMESTAMP WITH TIME ZONE
);"
