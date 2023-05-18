from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from evotekaro import schemas, database, models, oauth2
from sqlalchemy.orm import Session
from evotekaro.repository import election

router = APIRouter(
    prefix="/election",
    tags=['Election']
)

get_db = database.get_db


@router.get('/', response_model=List[schemas.Election])
def all(db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return election.get_all(db)


@router.post('/', status_code=status.HTTP_201_CREATED,)
def create(request: schemas.Election, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return election.create(request, db)


@router.delete('/{id}', status_code=status.HTTP_200_OK)
def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return election.destroy(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id: int, request: schemas.Election, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return election.update(id, request, db)


@router.get('/{id}', status_code=200, response_model=schemas.Election)
def show(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return election.show(id, db)
