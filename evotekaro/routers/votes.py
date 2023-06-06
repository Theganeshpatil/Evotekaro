from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from evotekaro import schemas, database, models, oauth2
from sqlalchemy.orm import Session
from evotekaro.repository import votes

router = APIRouter(
    prefix="/votes",
    tags=['Vote']
)

get_db = database.get_db


@router.get('/', response_model=List[schemas.Votes])
def all(db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return votes.get_all(db)


@router.post('/', status_code=status.HTTP_201_CREATED,)
def create(request: schemas.Votes, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return votes.create(request, db)


@router.get('/{id}', status_code=200, response_model=List[schemas.VoteResult])
def show_result(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return votes.show_result(id, db)
