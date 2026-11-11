from sqlalchemy.ext.asyncio import AsyncSession
import logging
from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy import func
from sqlalchemy.future import select

from evotekaro import models, schemas

# def get_all(db: AsyncSession):
#     votes = (await db.execute(select(models.Votes))).scalars().all()
#     return votes

async def get_all(db: AsyncSession):
    votes = (await db.execute(select(models.Votes))).scalars().all()
    return [schemas.Votes(**vote.__dict__) for vote in votes]


async def create(request: schemas.Votes, db: AsyncSession, current_user: schemas.ShowUser):

    # Check if the user exists
    user = (await db.execute(select(models.User).filter(models.User.id == request.userId))).scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the election exists
    election = (await db.execute(select(models.Election).filter(models.Election.id == request.electionId))).scalars().first()
    if not election:
        raise HTTPException(status_code=404, detail="Election not found")

    # Check if the candidate exists
    candidate = (await db.execute(select(models.Candidate).filter(models.Candidate.id == request.candidateId))).scalars().first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    # Check if the user has already voted for this election
    existing_vote = db.query(models.Votes).filter(
        models.Votes.userId == request.userId,
        models.Votes.electionId == request.electionId
    ).first()

    if existing_vote:
        raise HTTPException(status_code=400, detail="User has already voted for this election")

    # Check if user is trying to vote as different user
    if current_user != request.userId:
        logging.critical(f"User with id {current_user} is trying to vote for user {user.name}")
        raise HTTPException(status_code=403, detail="User can only vote for themselves")
    
    new_vote = models.Votes(
        userId=request.userId,
        electionId=request.electionId,
        candidateId=request.candidateId
    )
    db.add(new_vote)
    await db.commit()
    await db.refresh(new_vote)
    logging.info(f"New vote created with id {new_vote.id} by user {user.name} for candidate {candidate.name} in election {election.name}")
    return new_vote
## not ideal to delete a vote
## no need to update a vote also


async def show_result(id: int, db: AsyncSession):
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

