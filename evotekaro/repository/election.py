from sqlalchemy.orm import Session, joinedload
from evotekaro import models, schemas
from fastapi import HTTPException, status
import json
import logging


def get_all(db: Session):
    election = db.query(models.Election).all()
    return election

def create(request: schemas.Election, db: Session):
    new_elec = models.Election(
        name=request.name,
        startTime=request.startTime,
        endTime=request.endTime,
        rules=request.rules,
        branch = request.branch,
        batch= request.batch,
        year = request.year
    )
    for candidate_data in request.candidates:
        candidate = models.Candidate(
            name=candidate_data.name,
            electionId=new_elec.id,
            manifesto=candidate_data.manifesto
        )
        new_elec.candidates.append(candidate)
    db.add(new_elec)
    db.commit()
    db.refresh(new_elec)
    election = db.query(models.Election).filter(models.Election.id == new_elec.id).first()
    logging.info(f"New election created with id {new_elec.id} - {election.name}")
    return election



def destroy(id: int, db: Session):
    election = db.query(models.Election).filter(models.Election.id == id)

    if not election.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"election with id {id} not found")

    candidates = db.query(models.Candidate).options(joinedload(models.Candidate.election)).filter(models.Candidate.electionId == id).all()

    for candidate in candidates:
        db.delete(candidate)

    election.delete(synchronize_session=False)
    db.commit()
    logging.info(f"election with id {id} deleted - {election.first().name}")
    return 'Deleted'


def update(id: int, request: schemas.Election, db: Session):
    election = db.query(models.Election).filter(models.Election.id == id).first()

    if not election:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Election with id {id} not found")

    update_values = {
        "name": request.name,
        "startTime": request.startTime,
        "endTime": request.endTime,
        "rules":request.rules,
        "branch" : request.branch,
        "batch": request.batch,
        "year" :request.year
    }

    if request.candidates:
        candidates_data = []
        for candidate_data in request.candidates:
            candidate = {
                "name": candidate_data.name,
                "electionId": id,
                "manifesto": candidate_data.manifesto
            }
            candidates_data.append(candidate)

        # Update candidates separately
        db.query(models.Candidate).filter(models.Candidate.electionId == id).delete()
        for candidate_data in candidates_data:
            candidate = models.Candidate(**candidate_data)
            db.add(candidate)

    db.query(models.Election).filter(models.Election.id == id).update(update_values)
    db.commit()
    logging.info(f"Election with id {id} updated - {election.name}")
    return 'updated'



def show(id: int, db: Session):
    election = db.query(models.Election).filter(models.Election.id == id).first()
    if not election:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Election with the id {id} is not available")
    return election
