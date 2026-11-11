# API Reference

This document outlines the API endpoints exposed by the Evotekaro backend. The API is built using FastAPI and organized by routers.

**Note:** You can also view interactive API documentation (Swagger UI) by navigating to `http://127.0.0.1:8000/docs` while the server is running.

## Base URL
`/` (typically `http://127.0.0.1:8000` locally)

---

## 1. Authentication
Endpoints for authenticating users and obtaining tokens.

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **POST** | `/login` | Authenticate user (using form data `username` and `password`) and return a JWT access token. | Public |

---

## 2. Users (`/user`)
Manage users within the system. Note: Users are typically managed by admins.

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **GET** | `/user/` | Retrieve a list of all users. | Admin |
| **GET** | `/user/{id}` | Retrieve a specific user by ID. | Admin |
| **POST** | `/user/` | Create a new user. | Admin |
| **PUT** | `/user/{id}` | Update an existing user. | Admin |
| **DELETE** | `/user/{id}` | Delete a user. | Admin |

---

## 3. Election (`/election`)
Manage elections within the system.

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **GET** | `/election/` | Retrieve a list of all elections. | Authenticated User |
| **GET** | `/election/{id}` | Retrieve details of a specific election. | Authenticated User |
| **POST** | `/election/` | Create a new election. | Admin |
| **PUT** | `/election/{id}` | Update an existing election. | Admin |
| **DELETE** | `/election/{id}` | Delete an election. | Admin |

---

## 4. Candidates (`/candidates`)
Manage candidates associated with elections.

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **GET** | `/candidates/` | Retrieve a list of all candidates. | Authenticated User |
| **GET** | `/candidates/{id}` | Retrieve details of a specific candidate. | Authenticated User |
| **POST** | `/candidates/` | Add a new candidate. | Admin |
| **PUT** | `/candidates/{id}` | Update candidate details. | Admin |
| **DELETE** | `/candidates/{id}` | Remove a candidate. | Admin |

---

## 5. Votes (`/votes`)
Manage user voting and results.

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **POST** | `/votes/` | Cast a vote for a candidate in an election. | Authenticated User |
| **GET** | `/votes/{election_id}`| View the voting results for a specific election. | Authenticated User |

---

## Request & Response Formats
- Request and response bodies generally adhere to the Pydantic models defined in `evotekaro/schemas.py`.
- Authentication uses a Bearer token (JWT) passed in the `Authorization` header: `Authorization: Bearer <token>`.
