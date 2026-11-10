from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from evotekaro import database, oauth2, schemas
from evotekaro.repository import votes

router = APIRouter(
    prefix="/votes",
    tags=['Vote']
)

get_db = database.get_db


# @router.get('/', response_model=List[schemas.Votes])
# async def all(db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
#     return votes.get_all(db)


@router.post('/', status_code=status.HTTP_201_CREATED,)
async def create(request: schemas.Votes, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return await votes.create(request, db, current_user)


@router.get('/{election_id}', status_code=200, response_model=list[schemas.VoteResult])
async def show_result(election_id: int, db: AsyncSession = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return await votes.show_result(election_id, db)
