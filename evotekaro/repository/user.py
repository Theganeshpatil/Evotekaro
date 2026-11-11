import logging

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from evotekaro import email, models, schemas
from evotekaro.hashing import Hash


async def create(request: schemas.User, db: AsyncSession):
    new_user = models.User(
        name=request.name, email=request.email, password=Hash.bcrypt(request.password),department=request.department, batch=request.batch, isAdmin = request.isAdmin, year = request.year)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    email.login_details(new_user.email, new_user.name, request.password)
    logging.info(f"New user created with id {new_user.id} - {new_user.name}")
    return new_user


async def show(id: int, db: AsyncSession):
    user = (await db.execute(select(models.User).filter(models.User.id == id))).scalars().first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user


async def show_users(db: AsyncSession):
    return (await db.execute(select(models.User))).scalars().all()


async def delete_user(id: int, db: AsyncSession):
    user_res = await db.execute(select(models.User).filter(models.User.id == id))
    user = user_res.scalars()

    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    if id == 1 :
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail="Keep the admin user in your app")
    user
    await db.commit()
    logging.info(f"User with id {id} deleted - {user.first().name}")
    return 'User Deleted'


async def update_user(id: int, request: schemas.User, db: AsyncSession):
    user_res = await db.execute(select(models.User).filter(models.User.id == id))
    user = user_res.scalars()

    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")

    update_values = {
        "name": request.name,
        "email": request.email,
        "password": request.password,
        "department": request.department,
        "batch": request.batch,
        "isAdmin":request.isAdmin,
        "year": request.year
    }

    user.update(update_values)
    await db.commit()
    logging.info(f"User with id {id} updated - {user.first().name}")
    return 'User details updated'