from sqlalchemy.orm import Session
from evotekaro import models, schemas, email
from fastapi import HTTPException, status
from evotekaro.hashing import Hash

def create(request: schemas.User, db: Session):
    new_user = models.User(
        name=request.name, email=request.email, password=Hash.bcrypt(request.password),department=request.department, batch=request.batch, isAdmin = request.isAdmin, year = request.year)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    email.login_details(new_user.email, new_user.name, request.password)

    return new_user


def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user


def show_users(db: Session):
    return db.query(models.User).all()


def delete_user(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id)

    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    if id == 1 :
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail=f"Keep the admin user in your app")
    user.delete(synchronize_session=False)
    db.commit()
    return 'User Deleted'


def update_user(id: int, request: schemas.User, db: Session):
    user = db.query(models.User).filter(models.User.id == id)

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
    db.commit()
    return 'User details updated'