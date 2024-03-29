from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from evotekaro import schemas, database, models, token
from evotekaro.hashing import Hash
from sqlalchemy.orm import Session

router = APIRouter(tags=['Authentication'])


@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(
        models.User.email == request.username).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f"Invalid Credentials")
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f"Incorrect password")

    access_token = token.create_access_token(data={"sub": user.email, "userId":user.id, "isAdmin": user.isAdmin, "batch": str(user.batch), "branch":user.department, "year": str(user.year)})
    return {"access_token": access_token, "token_type": "bearer"}
