# Evotekaro - Secure Voting System

Evotekaro is a secure, web-based voting platform designed to handle elections, candidate management, and voting mechanics with role-based access for administrators and standard users. It features a React frontend and a FastAPI backend with PostgreSQL.

## 📚 Documentation Directory

We have prepared comprehensive documentation for understanding, maintaining, and improving this project. Please refer to the files in the `docs/` folder:
- **[API Reference](docs/API_Reference.md):** Detailed overview of backend endpoints and their access levels.
- **[Architecture Overview](docs/Architecture.md):** High-level view of the decoupled client-server architecture.
- **[Use Cases and Features](docs/Use_Cases_and_Features.md):** Primary user flows and feature descriptions.
- **[Product Requirements Document (PRD)](docs/PRD.md):** Product overview, goals, constraints, and current state.
- **[Workstream Proposals](docs/Workstream_Proposals.md):** Proposed improvements, best practices, and new feature integrations.

---

## 🚀 How to Start the Application

### Backend (FastAPI)
1. **Set up virtual environment:** `python -m venv venv` and activate it.
2. **Install dependencies:** `pip install -r requirements.txt`
3. **Start the Uvicorn server:** `uvicorn main:app --reload`
4. Visit `http://127.0.0.1:8000` to access the API.
5. Visit `http://127.0.0.1:8000/docs` for interactive API documentation (Swagger UI).

### Frontend (React)
1. Navigate to the frontend directory: `cd frontend`
2. **Install dependencies:** `npm install`
3. **Start the development server:** `npm start`

---

## 🔐 Demo User Credentials

**Admin user:**
- **Email:** `ganesh@iiitk.com`
- **Password:** `pass`

## ✨ Application Highlights
- **Role-Based Access Control:** Distinct admin vs user privileges and routes.
- **Automated Notifications:** Email integration for user notification on account creation.
- **Database:** Uses Neon for an online PostgreSQL database connected via SQLAlchemy.
- **Logging:** Maintains system logs in `app.log`.
