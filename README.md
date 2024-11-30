# Node.js Interview Task
This project is simple Node application built as part of an interview task.

## Features
- User authentication using JWT (JSON Web Tokens).
- Password hashing using bcrypt for secure storage.
- MongoDB integration for data storage.

## Tech Stack
- Backend Framework: Node.js with Express.
- Database: MongoDB.
- Authentication: JWT, bcrypt.
- Programming language: TypeScript.
- Environment Management: dotenv.

## Steps to Run Locally
- Clone the repository.
- Install dependencies.
- Start the development server(npm start).
- Use Postman or any API client to make requests to(http://localhost:5001).

## API Documentation
- Base URL: ```http://localhost:5000/api```.
- Authentication:
    - Route: ```/login```
    - Method: ```POST```
    - Payload:
      ```
      {
      "email": "user@example.com",
      "password": "password123"
      }
      ```
  - Response:
    ```
      {
      "token": "JWT_TOKEN"
      }
    ```
  - Route: ```/register```
    - Method: ```POST```
    - Payload:
      ```
      {
      "firstName": "user",
      "lastName": "name"
      "email": "user@example.com",
      "password": "password123"
      }
      ```
  - Response:
    ```
      {
      "message": "User signed up successfully."
      }
    ```
  - Route: ```/products```
    - Method: ```GET```
  - Response:
    ```
      [{
      {
        "id": 1,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    }
      }]
    ```
## Environment Variables
- Added DB connection string url and jwt token in config folder instead od .env file.


## Known Issues
- Token expiration not handled dynamically.
- No validation implemented for user inputs.
