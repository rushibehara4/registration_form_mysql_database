# SignUp Component

A React component for user registration with input validation and error handling.

## Features

- **User Registration Form**: Includes fields for username, password, and confirm password.
- **Input Validation**: Displays error messages when inputs lose focus.
- **Form Submission**: Handles form submission with error reporting for mismatched passwords.
- **API Integration**: Fetches existing user details and submits registration data to a backend API.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rushibehara4/registration_form_mysql_database/tree/main

2. **Navigate into the project directory:**

    Frontend:   
                1. Navigate to frontend
                cd client

                2. Install dependencies:
                npm install

                3. Start the development server:
                npm start

    Backend:    
                1. Navigate to backend
                cd server

                2. Install dependencies:
                npm install

                3. Start the development server:
                npm start

3. **API Endpoints**

    GET /users: Fetches the list of existing users.
    POST /signup: Submits user registration data.
