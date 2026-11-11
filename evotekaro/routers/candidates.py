from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from evotekaro import database, oauth2, schemas
from evotekaro.repository import candidates

router = APIRouter(
    prefix="/candidates",
    tags=['Candidates']
)

get_db = database.get_db


@router.post('/', response_model=schemas.Candidates)
async def create_candidate(request: schemas.Candidates, db: AsyncSession = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return await candidates.create(request, db)


@router.get('/{id}', response_model=schemas.Candidates)
async def get_candidates(id: int, db: AsyncSession = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_current_user)):
    return await candidates.show(id, db)

@router.get('/', response_model=list[schemas.Candidates])
async def show_candidates(db: AsyncSession=Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_current_user)):
    return await candidates.show_users(db)


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: AsyncSession = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return await candidates.delete_candidate(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update(id: int, request: schemas.Candidates, db: AsyncSession = Depends(get_db), current_user: schemas.Candidates = Depends(oauth2.get_admin_user)):
    return await candidates.update_candidate(id, request, db)
