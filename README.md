# Sospet - Angular App with Node.js Backend and SQL

## Description
Sospet is a website built with Angular that allows users to share information about lost or found animals. The application uses JSON Web Tokens (JWT) for authentication and has a backend developed in Node.js, with data storage in an SQL database.

## Features
- **User Registration and Authentication:** Users can register on the site, and the system uses JWT tokens to authenticate requests.

- **Lost and Found Pet Posts:** Users can post lost or found animals, including details such as name, breed, species, gender, and last location on the 'Post Pet' page.

- **Pet Search:** A search functionality allows users to find posts of lost or found animals on the 'Find Pet' page.

- **Profile Management:** Users can view and edit their profile information.

- **Lazy load:** Lazy loading defers the loading of non-essential resources until they are required, optimizing page performance.

## Project Structure

### 1. Frontend (Angular)
The frontend was developed using the Angular framework.

### 2. Backend (Node.js and SQL)
The backend was developed using Node.js as the server and an SQL database to store information.

## Configuration and Execution

### Frontend (Angular)
1. Navigate to the `/my app directory`.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the development server.

### Backend (Node.js and SQL)
1. Navigate to the `/my app backend directory`.
2. Run `npm install` to install dependencies.
3. Configure the database connection information in the `db.js` file.
4. Run `npm start` to start the backend server.

Ensure you have an SQL database configured and accessible for the backend.

## Technologies Used
- Angular
- Node.js
- SQL (Database)
- JWT (JSON Web Token)

This is a fictional project created for illustrative purposes only. Be sure to adjust settings and security implementations as needed for a real production environment.