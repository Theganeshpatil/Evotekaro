## 2024-05-17 - FastAPI N+1 query problem with relationship serialization
**Learning:** Returning SQLAlchemy models with relationships directly from FastAPI route without eager loading (`joinedload`) triggers N+1 queries when FastAPI serializes the response.
**Action:** Use `joinedload` on relationships when returning models that FastAPI will serialize containing those relationships.
