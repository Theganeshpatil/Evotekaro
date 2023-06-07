from fastapi import APIRouter
from evotekaro import database, schemas, models, oauth2
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
def create_user(request: schemas.User, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return user.create(request, db)


@router.get('/{id}', response_model=schemas.ShowUser)
def get_user(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return user.show(id, db)


@router.get('/', response_model=List[schemas.ShowUser])
def show_users(db:Session=Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return user.show_users(db)


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return user.delete_user(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id: int, request: schemas.User, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return user.update_user(id, request, db)