# To-Do Express
To-Do Express is a simple web application for managing your to-do lists. It's built with React.js as front-end and Django as backend, and uses sqlite3 for data storage.
# Features
Create, edit, and delete to-do lists and tasks

Mark tasks as complete

Set due dates and reminders for tasks

Search and filter tasks by status, due date, and more
# Installation
Clone the repository to your local machine

Create a .env file in the project root and set the following environment variables:

Copy code:
```
SECRET_KEY=(a secret string for Django server)
```

### Run both backend and frontend

Open 2 terminals
In your first terminal go to Client folder

Install dependancies by running `npm install`

Start the server with `npm start`


In your second terminal go to Server folder

Install dependancies by running `pip install -r requirements.txt`

Start the server with `python manage.py runserver`

Shut down the server in any convenient way in order to apply migrations.

Run `python manage.py migrate` and then start the server again
# Usage
well i guess theres no usage yet, front-end is served at https://localhost:3000/
# License
This project is licensed under the MIT License. See the LICENSE file for more information.
