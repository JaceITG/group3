# Group 3 Quiz Application

lorem ipsum lol

## Todo

-stylize front end (questions, summary) with css

-add question pagination buttons (previous, next question)

## Backend

Using Node API server:

-see group3/crud-example

-testing:

```bash
cd crud-example
npm install
node othertest.js
```

Only shows results of some random person-related tests atm. Can modify client.js and server.js to better represent our quiz application later.

Possible modifications:

-use parameter in requests json from client script to specify whether the operation is for a question or user profile (person) object

-read existing question data from a database file on server socket construction, then persist any possible changes back to the database on `socket.end()` received

-will probably need more secure version of this persistence for user profiles (usernames/pswords) 

-outsource credential system to ISU authentication?

-maybe useful?
    [create-react-app server article](https://www.newline.co/fullstack-react/articles/using-create-react-app-with-a-server/)

-fetch('/api/...") calls *(not sure if this is the correct approach, but keeping it on the table)*
