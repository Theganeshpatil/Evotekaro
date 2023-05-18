from fastapi import FastAPI
from evotekaro import  models
from evotekaro.database import engine
from evotekaro.routers import user, authentication, election

app = FastAPI()

models.Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(user.router)
app.include_router(election.router)
