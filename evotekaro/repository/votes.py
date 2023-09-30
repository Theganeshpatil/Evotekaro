from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from evotekaro import models, schemas
from fastapi import HTTPException, status
from datetime import datetime

# def get_all(db: Session):
#     votes = db.query(models.Votes).all()
#     return votes

def get_all(db: Session):
    votes = db.query(models.Votes).all()
    return [schemas.Votes(**vote.__dict__) for vote in votes]


def create(request: schemas.Votes, db: Session):
    # Check if the user exists
    user = db.query(models.User).filter(models.User.id == request.userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the election exists
    election = db.query(models.Election).filter(models.Election.id == request.electionId).first()
    if not election:
        raise HTTPException(status_code=404, detail="Election not found")

    # Check if the candidate exists
    candidate = db.query(models.Candidate).filter(models.Candidate.id == request.candidateId).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    # Check if the user has already voted for this election
    existing_vote = db.query(models.Votes).filter(
        models.Votes.userId == request.userId,
        models.Votes.electionId == request.electionId
    ).first()

    if existing_vote:
        raise HTTPException(status_code=400, detail="User has already voted for this election")

    new_vote = models.Votes(
        userId=request.userId,
        electionId=request.electionId,
        candidateId=request.candidateId
    )
    db.add(new_vote)
    db.commit()
    db.refresh(new_vote)
    return new_vote
## not ideal to delete a vote
## no need to update a vote also


def show_result(id: int, db: Session):
    election = db.query(models.Election).get(id)
    
    if not election:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Election with id {id} not found")
    
    current_time = datetime.now()
    if current_time < election.endTime:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Election results are not available yet")
    
    results = (
        db.query(
            models.Votes.candidateId,
            models.Candidate.name,
            func.count(models.Votes.candidateId).label("vote_count")
        )
        .join(models.Candidate, models.Candidate.id == models.Votes.candidateId)
        .filter(models.Votes.electionId == id)
        .group_by(models.Votes.candidateId, models.Candidate.name)
        .order_by(func.count(models.Votes.candidateId).desc())
        .all()
    )
    return [{"candidateId": result[0], "candidateName": result[1], "vote_count": result[2]} for result in results]

