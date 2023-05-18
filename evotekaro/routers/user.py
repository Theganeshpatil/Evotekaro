from fastapi import APIRouter
from evotekaro import database, schemas, models
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from evotekaro.repository import user
from typing import List

router = APIRouter(
    prefix="/user",
    tags=['Users']
)

get_db = database.get_db


@router.post('/', response_model=schemas.ShowUser)
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return user.create(request, db)


@router.get('/{id}', response_model=schemas.ShowUser)
def get_user(id: int, db: Session = Depends(get_db)):
    return user.show(id, db)

@router.get('/', response_model=List[schemas.ShowUser])
def show_users(db:Session=Depends(get_db)):
    return user.show_users(db)