# Rumours server side app
## Overview

## Developer guide

### How to start
`$ npm install`
`$ npm start`

### Pulling the database from Heroku
Let's say you want to pull the production environment to your local machine as a database called 'projman' and do some testing / developing.
1. Pull the heroku postgresql database
	1. Start a postgresql server locally.\
	`$ brew services start postgresql`
	2. Pull database from heroku into a local database called 'projman'\
	`$ heroku pg:pull DATABASE_URL rumours --app rtd-rumours-server`
	3. Open the database (optional)\
	`$ psql rumours`
1. You are ready to go!

### Pushing the database to Heroku
Run the following.
`$ heroku pg:reset --confirm rtd-rumours-server; heroku pg:push rumours DATABASE_URL --app rtd-rumours-server`

### Pushing the code to Heroku
`$ git push heroku master` (if you want to push local master).\
`$ git push heroku whatever_local_branch:master` (if you want to push a local branch other than master)

### Checking the API from terminal / browser
Method | Command
:-: | :-
GET | Go to http://localhost:8000/ 
POST | `$ curl -X POST http://localhost:8000/ -d "data=some data"`
PUT | `$ curl -X PUT http://localhost:8000/ -d "data=some data"`
DELETE | `$ curl -X DELETE http://localhost:8000/`


## Database
## Database
### channels
Column | Type | Collation | Nullable | Default
:-: | :-: | :-: | :-: | :-:
id     | integer               |           | not null | nextval('channels_id_seq'::regclass)
name   | character varying(50) |           | not null | 

### rumours
Column | Type | Collation | Nullable | Default
:-: | :-: | :-: | :-: | :-:
id         | integer                     |           | not null | nextval('rumours_id_seq'::regclass)
time       | timestamp without time zone |           | not null | timezone('utc'::text, now())
text       | character varying(140)      |           | not null | 
channel_id | integer                     |           | not null | 