## 2024-05-24 - N+1 Problem in FastAPI/SQLAlchemy Async
**Learning:** Returning SQLAlchemy models directly from FastAPI endpoints without eagerly loading relationships triggers an N+1 query problem, or worse, throws a `MissingGreenlet` error in async environments if relationships are lazily evaluated outside the async session context.
**Action:** Always use `joinedload` on relationships when returning SQLAlchemy models that might access them, especially in FastAPI endpoints using `AsyncSession`.
