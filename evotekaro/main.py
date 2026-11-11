from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from evotekaro import models
from evotekaro.database import engine
from evotekaro.routers import authentication, candidates, election, user, votes

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(levelname)s: %(message)s',
                    filename='app.log')
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


origins = [
    "http://localhost:3000","http://localhost:3001",
    "http://localhost", "https://evotekaro.vercel.app",
    "evotekaro-theganeshpatil.vercel.app", "evotekaro-git-main-theganeshpatil.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Async create_all requires an async context manager, typically done during app startup event
@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.get('/')
async def Home():
    return "Evotekaro - Secure Voting System | go to `/docs` for api documentation"

app.include_router(authentication.router)
app.include_router(user.router)
app.include_router(election.router)
app.include_router(votes.router)
app.include_router(candidates.router)
