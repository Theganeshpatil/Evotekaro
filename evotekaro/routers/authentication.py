from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from evotekaro import database, models, schemas, token
from evotekaro.hashing import Hash

router = APIRouter(tags=['Authentication'])


@router.post('/login')
async def login(request: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(database.get_db)):
    user_res = await db.execute(select(models.User).filter(models.User.email == request.username))
    user = user_res.scalars().first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid Credentials")
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect password")

    access_token = token.create_access_token(data={"sub": user.email, "userId":user.id, "isAdmin": user.isAdmin, "batch": str(user.batch), "branch":user.department, "year": str(user.year)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post('/register')
async def register(user_request: schemas.User, db: AsyncSession = Depends(database.get_db)):
    from evotekaro.repository.user import create
    # Just reusing create user from repo, since it hashes pass and does email!
    return await create(user_request, db)
