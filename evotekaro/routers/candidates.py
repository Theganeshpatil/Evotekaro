from fastapi import APIRouter
from evotekaro import database, schemas, models, oauth2
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from evotekaro.repository import candidates
from typing import List

router = APIRouter(
    prefix="/candidates",
    tags=['Candidates']
)

get_db = database.get_db


@router.post('/', response_model=schemas.Candidates)
def create_candidate(request: schemas.Candidates, db: Session = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return candidates.create(request, db)


@router.get('/{id}', response_model=schemas.Candidates)
def get_candidates(id: int, db: Session = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return candidates.show(id, db)

@router.get('/', response_model=List[schemas.Candidates])
def show_candidates(db:Session=Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return candidates.show_users(db)


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return candidates.delete_candidate(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id: int, request: schemas.Candidates, db: Session = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return candidates.update_candidate(id, request, db)
