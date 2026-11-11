# Product Requirements Document (PRD)

## 1. Introduction
**Product Name:** Evotekaro
**Description:** A secure, web-based voting platform designed to handle elections, candidate management, and voting mechanics with role-based access for administrators and standard users.

## 2. Goals & Objectives
- Provide a reliable and tamper-evident platform for conducting elections.
- Offer an intuitive user interface for standard voters to view and participate in ongoing elections.
- Provide a comprehensive administrative dashboard for creating elections, managing users, and monitoring results.

## 3. Target Audience
- **Administrators:** Responsible for system setup, user onboarding, and election lifecycle management.
- **Voters:** Standard users who log in to view their profile and cast votes in authorized elections.

## 4. Current Functionality Overview
The application currently supports:
- **Authentication:** OAuth2 password flow with JWT access tokens.
- **User Management:** Admins can CRUD (Create, Read, Update, Delete) users. System sends notification emails on creation.
- **Election Management:** Admins can create and manage elections.
- **Candidate Management:** Admins can register candidates for elections.
- **Voting Mechanics:** Users can cast votes for ongoing elections, and results are retrievable.

## 5. Non-Functional Requirements
- **Security:** Passwords must be hashed. Routes must be protected based on user role (Admin vs Standard User).
- **Performance:** System must handle concurrent read/write operations during peak voting hours. (Current backend is FastAPI, which natively supports high concurrency).
- **Technology Stack:**
  - Frontend: React 18
  - Backend: FastAPI (Python)
  - Database: PostgreSQL (via Neon) mapped via SQLAlchemy.

## 6. Assumptions and Constraints
- Only pre-registered users (created by Admin) can log in and vote (as per current workflow).
- The system relies on email for user onboarding notifications.
- Users are categorized by department, batch, and year (as seen in token generation data).
