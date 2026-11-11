# Use Cases and Feature Overviews

Evotekaro is a secure voting system designed to facilitate online elections. This document outlines the primary use cases and existing features from both the Admin and User perspectives.

## Key Features

1. **Role-Based Access Control (RBAC):** Distinct interfaces and capabilities for Admins and standard Users.
2. **Secure Authentication:** JWT-based login mechanism ensuring that votes and administrative actions are tied to authenticated identities.
3. **Automated Notifications:** Email notifications integrated on actions like user account creation.
4. **Election Lifecycle Management:** Separation of upcoming and ongoing elections.
5. **Real-time Results Tracking:** Retrieval of voting results tied to specific elections.

---

## Primary Use Cases

### 1. Administrative Workflows (Admin Users)

Admins are responsible for configuring the system, setting up elections, and managing user access.

- **Manage Users:**
  - *Use Case:* An admin needs to onboard new voters.
  - *Action:* The admin navigates to `/admin/users` on the frontend and creates user profiles. An automated email is sent to notify the user. Admins can also edit or delete users.
- **Manage Elections:**
  - *Use Case:* An admin wants to create a new voting event (e.g., Student Council Election).
  - *Action:* The admin accesses `/admin/conduct_election` to specify election details, dates, and parameters. They can later view and modify these at `/admin/elections`.
- **Manage Candidates:**
  - *Use Case:* After setting up an election, candidates need to be added to the ballot.
  - *Action:* Admins link candidates to specific elections.

### 2. Voter Workflows (Standard Users)

Standard users participate in the elections set up by administrators.

- **Authentication & Profile Management:**
  - *Use Case:* A voter logs into the system to cast their vote.
  - *Action:* The user navigates to `/login` (if not authenticated) or `/profile` to view their details. A JWT is issued upon successful login, verifying their identity for subsequent actions.
- **Participating in Elections:**
  - *Use Case:* A user wants to view available elections and cast a vote.
  - *Action:* The user accesses the dashboard (`/`). They navigate to `/elections`, which displays categorized lists of `ongoing` and `upcoming` elections. During an ongoing election, they can select a candidate and submit their vote securely.
- **Accessing Help/Information:**
  - *Use Case:* A user needs clarification on the voting process.
  - *Action:* The user visits the `/help` section to read FAQs.
