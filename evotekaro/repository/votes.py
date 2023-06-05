from sqlalchemy.orm import Session
from sqlalchemy import func
from evotekaro import models, schemas
from fastapi import HTTPException, status


# def get_all(db: Session):
#     votes = db.query(models.Votes).all()
#     return votes

def get_all(db: Session):
    votes = db.query(models.Votes).all()
    return [schemas.Votes(**vote.__dict__) for vote in votes]



def create(request: schemas.Votes, db: Session):
    new_vote = models.Votes(userId=request.userId, electionId=request.electionId,candidateId=request.candidateId)
    db.add(new_vote)
    db.commit()
    db.refresh(new_vote)
    return new_vote

## not ideal to delete a vote
## no need to update a vote also


def show_result(id: int, db: Session):
    ## get a result count of max voters and return it here
    results = (
        db.query(models.Votes.candidateId, func.count(models.Votes.candidateId).label("vote_count"))
        .filter(models.Votes.electionId == id)
        .group_by(models.Votes.candidateId)
        .order_by(func.count(models.Votes.candidateId).desc())
        .all()
    )

    return [{"candidateId": result[0], "vote_count": result[1]} for result in results]