
from sqlalchemy.orm import Session
from evotekaro import models, schemas
from fastapi import HTTPException, status
from evotekaro.hashing import Hash


def create(request: schemas.Candidates, db: Session):
    new_candidate = models.Candidate(
        userId=request.userId, electionId=request.electionId,manisfesto=request.manisfesto)
    db.add(new_candidate)
    db.commit()
    db.refresh(new_candidate)
    return new_candidate


def show(id: int, db: Session):
    candidate = db.query(models.Candidate).filter(models.Candidate.id == id).first()
    if not candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Candidate with the id {id} is not available")
    return candidate


def show_users(db: Session):
    return db.query(models.Candidate).all()