# Architecture Overview

This document provides a high-level overview of the architecture of the **Evotekaro** application.

Evotekaro follows a classic decoupled client-server architecture, comprising a React frontend and a FastAPI backend, interacting via RESTful APIs.

## High-Level Architecture Diagram

```text
+-----------------------+          +-----------------------+          +-----------------------+
|                       |   REST   |                       |  ORMs/   |                       |
|   Frontend (React)    | <------> |   Backend (FastAPI)   | <------> |   Database (Postgres) |
|                       |          |                       |   SQL    |                       |
+-----------------------+          +-----------------------+          +-----------------------+
        Client                               Server                             Storage
```

## 1. Frontend (Client-Side)
- **Framework:** React.js
- **Routing:** React Router (`react-router-dom`)
- **Key Characteristics:**
  - Single Page Application (SPA).
  - Handles UI logic, state management, and user interaction.
  - Role-based routing depending on user status (e.g., standard users vs. admin routes like `/admin/elections`).

## 2. Backend (Server-Side)
- **Framework:** FastAPI (Python)
- **Server:** Uvicorn (ASGI server)
- **Key Characteristics:**
  - Exposes RESTful API endpoints for authentication, user management, elections, candidates, and voting.
  - Implements route protection via JWT (JSON Web Tokens) and role-based access control (RBAC).
  - Handles business logic, including email notifications and password hashing (bcrypt).
  - Uses dependency injection for database sessions and authentication checking.

## 3. Database Layer (Storage)
- **Database:** PostgreSQL (Neon is mentioned as the online provider).
- **ORM (Object Relational Mapping):** SQLAlchemy.
- **Key Characteristics:**
  - Manages persistent storage of application data models (Users, Elections, Candidates, Votes).
  - SQLAlchemy manages translations between Python models (`models.py`) and PostgreSQL tables.

## 4. Security
- **Authentication:** OAuth2 with Password Flow (JWT Bearer tokens).
- **Data Protection:** Passwords are hashed using bcrypt.
- **CORS:** Controlled via FastAPI `CORSMiddleware`, allowing specific frontend origins.

## 5. Deployment
- The backend relies on standard ASGI deployment (e.g., Uvicorn).
- The frontend is designed to be built into static assets (`npm run build`) and hosted on static site providers (e.g., Vercel, as seen in CORS configurations).
