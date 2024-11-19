# Painting Management API Documentation

## Overview

This project is a **Painting Management API** built using **Node.js**, **Express.js** and **MySQL**. The API provides endpoints to manage paintings, including user authentication with JWT. It supports CRUD operations for paintings, user authentication, and query-based filtering for fetching data.

---

## Features

- **Painting Management**: Add, update, delete, and fetch paintings.
- **Authentication**: Secure access using JWT-based authentication.
- **Query Parameters**: Filter paintings by attributes such as `sold` status, `price`, and `name`.
- **Error Handling**: Provides meaningful error responses for invalid requests.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the API.
- **MySQL**: Database for storing paintings and user information.
- **JWT (jsonwebtoken)**: For secure user authentication.
- **bcrypt**: For password hashing and validation.
- **dotenv**: To manage environment variables.

---

## Endpoints

### Paintings

#### 1. **Get All Paintings**
- **URL**: `/api/paintings`
- **Method**: `GET`
- **Query Parameters**:
  - `sold`: Filter by sale status (`true` or `false`).
  - `price`: Sort by price (`asc` or `desc`).
  - `name`: Sort by name (`asc` or `desc`).
- **Response**:
  - `200`: List of paintings.
  - `404`: No paintings found.
  - `500`: Server error.

#### 2. **Get Painting by ID**
- **URL**: `/api/paintings/:id`
- **Method**: `GET`
- **Response**:
  - `200`: Painting details.
  - `404`: Painting not found.
  - `500`: Server error.

#### 3. **Add Painting**
- **URL**: `/api/paintings`
- **Method**: `POST`
- **Authentication**: Required.
- **Request Body**:
  - `name` (string, required)
  - `image_url` (string, required)
  - `price` (number, required)
  - `description` (string, optional)
  - `sold` (boolean, optional)
  - `height` (number, required)
  - `width` (number, required)
  - `discount` (number, optional)
- **Response**:
  - `200`: Created painting details.
  - `400`: Missing mandatory fields.
  - `500`: Server error.

#### 4. **Update Painting**
- **URL**: `/api/paintings/:id`
- **Method**: `PUT`
- **Authentication**: Required.
- **Request Body**:
  - Same fields as "Add Painting."
- **Response**:
  - `200`: Success message.
  - `404`: Painting not found.
  - `500`: Server error.

#### 5. **Delete Painting**
- **URL**: `/api/paintings/:id`
- **Method**: `DELETE`
- **Authentication**: Required.
- **Response**:
  - `200`: Success message.
  - `404`: Painting not found.
  - `500`: Server error.

---

### Authentication

#### 1. **Get Token**
- **URL**: `/api/users/token`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: Basic `nickname:password` (base64 encoded).
- **Response**:
  - `200`: JSON Web Token.
  - `400`: Missing authorization header.
  - `401`: Invalid credentials format.
  - `404`: User not found.
  - `500`: Server error.

---

## Middleware

### JWT Middleware
- Verifies the validity of a JWT from the `Authorization` header.
- Attaches the user object to `req.user` if the token is valid.
- Sets `req.user = null` for invalid or expired tokens.

### Authentication Middleware
- Ensures the user is authenticated.
- Returns a `401 Unauthorized` error if the user is not authorized.

---

## Environment Variables

- `DB_HOST`: Database host.
- `DB_USER`: Database username.
- `DB_PASS`: Database password.
- `DB_NAME`: Database name.
- `JWT_SECRET`: Secret key for signing JWTs.
- `PORT`: Port number for the server.

---

## Database Schema

### Paintings Table
| Column      | Type      | Description                |
|-------------|-----------|----------------------------|
| `id`        | INT       | Primary key.               |
| `name`      | VARCHAR   | Name of the painting.      |
| `image_url` | VARCHAR   | URL of the painting image. |
| `price`     | DECIMAL   | Price of the painting.     |
| `description` | TEXT    | Description of the painting.|
| `sold`      | BOOLEAN   | Whether the painting is sold.|
| `height`    | DECIMAL   | Height of the painting.    |
| `width`     | DECIMAL   | Width of the painting.     |
| `discount`  | DECIMAL   | Discount on the painting.  |

### Users Table
| Column      | Type      | Description              |
|-------------|-----------|--------------------------|
| `id`        | INT       | Primary key.             |
| `nickname`  | VARCHAR   | User nickname.           |
| `password`  | VARCHAR   | Hashed user password.    |

---
