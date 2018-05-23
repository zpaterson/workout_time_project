# psql workoutTime
create database workout_time;

CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(40)
);


CREATE TABLE preferences (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id SERIAL REFERENCES users(id),
	time_of_day VARCHAR(40),
	days_per_week INTEGER,
	hours_per_week INTEGER,
	date_created TIMESTAMP WITH TIMEZONE
);
