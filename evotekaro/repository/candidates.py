from sqlalchemy.orm import Session
from evotekaro import models, schemas
from fastapi import HTTPException, status
from evotekaro.hashing import Hash
import logging

def create(request: schemas.Candidates, db: Session):
    # Check if the election exists
    election = db.query(models.Election).filter(models.Election.id == request.electionId).first()
    if not election:
        raise HTTPException(status_code=404, detail="Election not found")
    new_candidate = models.Candidate(
        name=request.name, electionId=request.electionId,manifesto=request.manifesto)
    db.add(new_candidate)
    db.commit()
    db.refresh(new_candidate)
    logging.info(f"New candidate created with id {new_candidate.id} - {new_candidate.name}")
    return new_candidate


def show(id: int, db: Session):
    candidate = db.query(models.Candidate).filter(models.Candidate.id == id).first()
    if not candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Candidate with the id {id} is not available")
    return candidate


def show_users(db: Session):
    return db.query(models.Candidate).all()


def delete_candidate(id: int, db: Session):
    candidate = db.query(models.Candidate).filter(models.Candidate.id == id)

    if not candidate.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Candidate with id {id} not found")

    candidate.delete(synchronize_session=False)
    db.commit()
    logging.info(f"Candidate with id {id} deleted - {candidate.first().name}")
    return 'Candidate Deleted'


def update_candidate(id: int, request: schemas.Candidates, db: Session):
    candidate = db.query(models.Candidate).filter(models.Candidate.id == id)

    if not candidate.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"candidate with id {id} not found")

    update_values = {
            "name": request.name,
            "electionId": request.electionId,
            "manifesto": request.manifesto  
    }

    candidate.update(update_values)
    db.commit()
    logging.info(f"Candidate with id {id} updated - {candidate.first().name}")
    return 'candidate details updated'