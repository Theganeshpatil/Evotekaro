from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from evotekaro import database, oauth2, schemas
from evotekaro.repository import user

router = APIRouter(
    prefix="/user",
    tags=['Users']
)

get_db = database.get_db


@router.post('/', response_model=schemas.ShowUser)
async def create_user(request: schemas.User, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return await user.create(request, db)


@router.get('/{id}', response_model=schemas.ShowUser)
async def get_user(id: int, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return await user.show(id, db)


@router.get('/', response_model=list[schemas.ShowUser])
async def show_users(db: AsyncSession=Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return await user.show_users(db)


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return await user.delete_user(id, db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
async def update(id: int, request: schemas.User, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_admin_user)):
    return await user.update_user(id, request, db)