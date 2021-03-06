# WorkoutTime 

#### By Zaire Paterson 

WorkoutTime is a web app that helps you plan your next workout effortlessly. It imports your Google calendar data to calculate your free time, and suggests workout times based on your preferences, then you just click to add the suggested workouts that work for you.

Tech Stack: React, Bootstrap, Express, Node, PostgreSQl

---

* This project is based on Techtonica's Final Project Guidelines:	       	
  https://github.com/Techtonica/curriculum/blob/master/projects/final-project/final-project.md

* Project Prep Doc:
  https://docs.google.com/document/d/1IMB1hRjxAjNe0VZ3nIze7-p2CBnpvkHwPQGuCClmwZs/edit?usp=sharing

* This project was bootstrapped with Create React App & Express-Generator: 
  https://github.com/facebookincubator/create-react-app
  https://www.npmjs.com/package/express-generator


---
## PostgresSQL Database Setup:
Download PostgresSQL https://www.postgresql.org/

Open Terminal, and enter the following commands:
##### Note: if you get a "Permission denied" error use the chmod command below:
```
//creating the database

cd workout-time-project
./create_db_script.sh 

chmod +rwx ./create_db_script.sh
./create_db_script.sh

----------------------------------

// deleting the database
  
cd workout-time-project
./teardown_db_script.sh 

chmod +rwx ./teardown_db_script.sh
./teardown_db_script.sh

```
----
## Application Setup:

1. Go onto your desktop and then clone this repo to your local machine
   cd desktop and git clone https://github.com/zpaterson/workout_time_project

2. Go into that project folder
   cd workout-time-project

3. Install all dependencies

   go into into server folder 
   ```
    cd server 
    npm install 
    npm start \\ to start the Express server
   ```
   go into into client folder 
   ```
    cd client
    npm install 
    npm start \\ to start the React app
   ```   
----
## Features list
* Google Calendar API integration
* Free time calculation 
* Workout time suggestion
* Posting events to user's Google Calendar 
