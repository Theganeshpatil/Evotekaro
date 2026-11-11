from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from evotekaro import database, oauth2, schemas
from evotekaro.repository import election

router = APIRouter(
    prefix="/election",
    tags=['Election']
)

get_db = database.get_db


@router.get('/', response_model=list[schemas.Election])
async def all(db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return election.get_all(db)


@router.post('/', status_code=status.HTTP_201_CREATED,)
async def create(request: schemas.Election, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return await election.create(request, db)


@router.delete('/{id}', status_code=status.HTTP_200_OK)
async def destroy(id: int, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return election.destroy(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update(id: int, request: schemas.Election, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return election.update(id, request, db)


@router.get('/{id}', status_code=200, response_model=schemas.Election)
async def show(id: int, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return await election.show(id, db)
