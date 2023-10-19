## --- Flipkart Clone --- ##
This is a simple e-commerce website that allows users to browse and purchase products. 
It includes features such as product display, cart functionality, user authentication, 
and order placement. The website fetches product data from the FakeStoreAPI and uses 
local storage for cart management and mongoDB for user authorization and authentication.

## Features
  - User Sigin Up
  - User Authentication
  - User Authorization
  - User Login
  - User Logout
  - Browse and view products.
  - Add products to the cart.
  - Modify the quantity of items in the cart.
  - Remove items from the cart.
  - See total cost of product
  - Place orders and see a confetti animation.
  - User authentication and login/logout functionality.
  - Search for products by category.
  - Getting Started
  - Prerequisites

## User Authentication
  - The website includes user authentication functionality.
  - Users can log in or log out from the website.
  - Unauthorized users are redirected to the login page.
  - User authentication is implemented using sessions.

## Usage
  - TO use the application users needs to register first by filling all the inputs field.
  - After successfully register user can use their email and password to login.
  - As soon as user login, user will land on home page.
  - Now user can enjoy all shopping experience.
  - Click on a product to view more details.
  - Add products to the cart by clicking the "Add to Cart" button.
  - Modify the quantity of items in the cart using the "+" and "-" buttons.
  - Remove items from the cart by clicking the "REMOVE" button in the cart.
  - Click the "PLACE ORDER" button to place an order and see a confetti animation.
  - Use the search box to search for products by category.
  - Easy to log out by just click on Logout button.

# --- Express Authentication Server --- #
This is a simple Express.js authentication server with user registration, login,
and protected routes. It uses JSON Web Tokens (JWT) for authentication and stores 
user data in a MongoDB database.

# Getting Started (Server Side)

# Before you begin, make sure you have the following installed on your system:
- Node.js
- MongoDB

# Installation

1. Clone this repository:
   - `git clone <repository-url>`

2. Navigate to the project directory:
   - cd server

3. Install the required dependencies:
   - npm install

4. Create a .env file in the project root directory and add the following environment variables:
   - `PORT=8000`
   - `MONGODB_URI=<your-mongodb-connection-string>`

# Start the server:
   - npm start

Server is Running on PORT 8000(or the PORT you will specify in .env file)
Mongodb connected with server: 127.0.0.1

# Endpoints:

- **POST /signup**: Register a new user.
- **POST /login**: Login in an existing user.
- **GET /logout**: Log out the user.
- **GET /**: Get all products.

1. User Registration
  `POST /signup`

- Request Body for User Registration

  `{
   "username": "deepak",
   "email": "deep@example.com",
   "password": "yourPassword123"
 }`

- Response (Success):

  `{"msg": "User Registered Successfully"}`

- Response (Error - Email Already Exists):

  `{"msg": "Email already exists"}`

- Response (Error - Validation Failed):

  `{"msg": "All input fields are required"}`

2. User Login
  `POST /login`

- Request Body for User Login:

  `{
    "email": "deep@example.com",
    "password": "yourPassword123"
  }`

- Response (Success):

  `{"msg": "User Login Successfully"}`

- Response (Error - Wrong Password):

  `{"msg": "Wrong Password"}`

- Response (Error - Account Not Found):

  `{"msg": "No Account associated with this email}`

- Response (Error - Validation Failed):

  `{"msg": "All input fields are required"}`

3. `GET /` protected-route - Access a protected route.

- Requires a valid JWT token in the token cookie.
Response:

`{
  "message": "Authenticated User",
  "user": {
    "username": "example",
    "email": "example@example.com",
    "userId": "user-id"
  }
}`

4. User Logout
`GET /logout` - Logout a user by clearing the token cookie.

Response:

`{"message": "Success"}`

# Error Handling

    In case of an error, the API will respond with an appropriate HTTP status code and an error
    message in the response body.

# Common HTTP Status Codes:

- 200 OK: The request was successful.
- 400 Bad Request: The request was invalid or could not be processed.
- 401 Unauthorized: Authentication failed or user is not authorized.
- 404 Not Found: The requested resource could not be found.
- 501 Not Implemented: The requested feature or functionality is not yet implemented.
  How to Run.
- Make sure you have Node.js and MongoDB installed on your system.
- Clone the repository and navigate to the root folder in your terminal.
- Create a .env file in the root folder and set the following environment variables:

  PORT=8000 # Set the port number for the server
  MONGO_URI=your_mongo_db_connection_string # Set the MongoDB connection string

# Install the dependencies mentioned below:

- Express.js: A web application framework for Node.js.
- Mongoose: A MongoDB ODM library for Node.js.
- Cors: A middleware for enabling CORS (Cross-Origin Resource Sharing).
- Dotenv: A module for loading environment variables from a .env file.
- Nodemon: A utility that helps in development by automatically restarting the server on code
  changes. (Development Dependency).

## Technologies and Dependencies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jwt
- nodemon
- cookie-parser
- jsonwebtoken
- cors
- dotenv

## ------------------- END ------------------- ##






