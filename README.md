# PROJECT - API (Backend-baserad webbutveckling, DT207G)

## Overview

This API is part of the final project for the course Backend-baserad webbutveckling, dt207g, at Mittuniversitet, Sundsvall. It serves as the backend for *The Green Slice* restaurant admin and frontend sites. 
<br><br>
Link to the live API: [API](https://projectdt207g-api.onrender.com)
<br><br>
The other parts of the project are:
* The frontend website: [The Green Slice website repository](https://github.com/gustafsson96/projectdt207g-site.git)
* Frontend admin page: [Admin page repository](https://github.com/gustafsson96/projectdt207g-admin.git)

## Features
* **User Authentication:** User authentication with JWT.
* **Password Hashing:** Password hashing with bcrypt.
* **Full CRUD:** Creat, read, update and delete menu items.
* **Protected Routes:** Admin routes requiring valid JWT tokens.
* **Reservation Routes:** Routes that handles table reservations.
* **MongoDB Atlas:** A MongoDB Atlas database used to store data. 

## API Endpoints

| Method     | End Point      | Description         | Public/Protected        |
|------------|----------------|---------------------|---------------------|
| POST       | /admin/login   | Logs in an existing user and returns a JWT token.| Public  |
| GET        | /menu          | Retrieves all menu items  | Public     |
| POST       | /menu          | Creates a new menu item   | Protected  |
| PUT        | /menu/:id      | Updates a menu item by id | Protected  |
| DELETE     | /menu/:id      | Deletes a menu item by id | Protected  |
| POST       | /reservation   | Creates a new reservation | Public     |
| GET        | /reservation   | Retrieves all reservations | Protected |
| DELETE     | /menu/:id      | Deletes a reservation by id| Protected |

## Installation

Ensure node.js is installed and then follow these steps:

1. Clone the repository: git clone https://github.com/gustafsson96/projectdt207g-api.git
2. Navigate into the project folder: cd your-project-folder-name
3. Install dependencies by running: npm install.
4. Create a .env file and add in your environment variables:
* PORT=
* DATABASE=
* JWT_SECRET_KEY=
5. Start the server with nodemon by running: npm run dev

## Create User
Creating a new user is currently handled manually. The provided hashPassword.js script is used to hash a password before inserting a new user into the MongoDB database:
* Replace the value "password" of the variable "plainPassword" in hashPassword.js
* Run: node hashpassword.js
* Copy the hashed password from the terminal and insert together with username into a new user document to MongoDB Atlas.

## Techonologies Used 
* Node.js
* Express
* MongoDB Atlas (via Mongoose)
* bcrypt for password hashing
* jsonwebtoken for JWT authentication
* dotenv for environment variables
* cors for cross-origin resource sharing 



