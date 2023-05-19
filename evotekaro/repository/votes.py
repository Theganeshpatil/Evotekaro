from sqlalchemy.orm import Session
from evotekaro import models, schemas
from fastapi import HTTPException, status


def get_all(db: Session):
    votes = db.query(models.Votes).all()
    return votes


def create(request: schemas.Votes, db: Session):
    new_vote = models.Votes(userId=request.userId, electionId=request.electionId,candidateId=request.candidateId)
    db.add(new_vote)
    db.commit()
    db.refresh(new_vote)
    return new_vote

## not ideal to delete a vote
## no need to update a vote also


def show(id: int, db: Session):
    vote = db.query(models.Votes).filter(models.Votes.id == id).first()
    if not vote:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"vote with the id {id} is not available")
    return vote
