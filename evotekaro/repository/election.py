from sqlalchemy.orm import Session, joinedload
from evotekaro import models, schemas
from fastapi import HTTPException, status
import json


def get_all(db: Session):
    election = db.query(models.Election).all()
    return election

def create(request: schemas.Election, db: Session):
    new_elec = models.Election(
        name=request.name,
        startTime=request.startTime,
        endTime=request.endTime,
        rules=request.rules
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
    return 'Deleted'


# def update(id: int, request: schemas.Election, db: Session):
#     election = db.query(models.Election).filter(models.Election.id == id)

#     if not election.first():
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Election with id {id} not found")
    
#     update_elec = models.Election(name=request.name, startTime=request.startTime,endTime=request.endTime)
#     election.update(update_elec)
#     db.commit()
#     return 'updated'


def update(id: int, request: schemas.Election, db: Session):
    election = db.query(models.Election).filter(models.Election.id == id).first()

    if not election:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Election with id {id} not found")

    update_values = {
        "name": request.name,
        "startTime": request.startTime,
        "endTime": request.endTime,
    }

    if request.candidates:
        update_values["candidates"] = json.dumps(request.candidates)

    db.query(models.Election).filter(models.Election.id == id).update(update_values)
    db.commit()

    return 'updated'




def show(id: int, db: Session):
    election = db.query(models.Election).filter(models.Election.id == id).first()
    if not election:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Election with the id {id} is not available")
    return election
