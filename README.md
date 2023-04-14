# Library Management System

Library Management System that manages and stores books information electronically according to readers' needs. The system helps both readers and library manager to keep a constant track of all the books available in the library.

## Project Structure

This project consists of a frontend and a backend. The frontend is built using Vue.js, while the backend is built using FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.

The frontend and backend projects are organized in separate directories:

- **frontend/** - Contains the source code for the Vue.js frontend application.
- **backend/** - Contains the source code for the FastAPI backend application.
## Tech Stack

The Library Management System application is built using the following technologies:

- **Frontend:** Vue.js, Vuex, Vue Router, axios
- **Backend:** Python, FastAPI, SQLAlchemy, Alembic, MySQL, Pydantic
- **Testing:** Jest, Vue Test Utils, Pytest
## Requirements

Before running the application, make sure you have the following software installed:

- Node.js (v14 or later)
- Python (v3.9 or later)
- MySQL
## Configuration

This project expects a **.env** file to be present in the root directory of the backend project. This file should contain environment variables that are used to configure the application.

Here's an example .env file:

``` makefile
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_SERVER=localhost
MYSQL_PORT=3306
MYSQL_DB=library_management_db
MYSQL_TEST_DB=test_library_management_db
SECRET_KEY=1e6bbe9fb6685cc5e7860be8e043dacd3e4db3794903a4e3399220f90f42924c
```

## Backend Project
### Project Setup
To get started with the backend project, follow these steps:
``` bash
# Open a terminal window and navigate to the `backend/` directory
cd library-management-system/backend/

# create a virtual environment
python -m venv venv

# activate the environment
source ./venv/Scripts/activate

# make sure you are using the correct virtual environment
which pip

# upgrade pip
python -m pip install --upgrade pip

# install dependencies
pip install -r requirements.txt

# serve with hot reload at localhost:8000
uvicorn main:app --reload
```
For a detailed explanation on how things work, check out the [guide](https://fastapi.tiangolo.com/).
## Frontend Project
### Project Setup
To get started with the frontend project, follow these steps:
``` bash
# Open a terminal window and navigate to the `frontend/` directory
cd library-management-system/frontend/

# Install the required dependencies
npm install

# Start a local development server
npm run serve
```
See [Configuration Reference](https://cli.vuejs.org/config/).
## Authors

- [@EDemirsoz](https://github.com/EDemirsoz)
- [@Hodaak](https://github.com/Hodaak)
- [@Jessica0192](https://github.com/Jessica0192)


## Demo

