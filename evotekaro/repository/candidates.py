from sqlalchemy.ext.asyncio import AsyncSession
import logging

from fastapi import HTTPException, status
from sqlalchemy.future import select

from evotekaro import models, schemas


async def create(request: schemas.Candidates, db: AsyncSession):
    # Check if the election exists
    election = (await db.execute(select(models.Election).filter(models.Election.id == request.electionId))).scalars().first()
    if not election:
        raise HTTPException(status_code=404, detail="Election not found")
    new_candidate = models.Candidate(
        name=request.name, electionId=request.electionId,manifesto=request.manifesto)
    db.add(new_candidate)
    await db.commit()
    await db.refresh(new_candidate)
    logging.info(f"New candidate created with id {new_candidate.id} - {new_candidate.name}")
    return new_candidate


async def show(id: int, db: AsyncSession):
    candidate = (await db.execute(select(models.Candidate).filter(models.Candidate.id == id))).scalars().first()
    if not candidate:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Candidate with the id {id} is not available")
    return candidate


async def show_users(db: AsyncSession):
    return (await db.execute(select(models.Candidate))).scalars().all()


async def delete_candidate(id: int, db: AsyncSession):
    candidate_res = await db.execute(select(models.Candidate).filter(models.Candidate.id == id))
    candidate = candidate_res.scalars()

    if not candidate.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Candidate with id {id} not found")

    candidate
    await db.commit()
    logging.info(f"Candidate with id {id} deleted - {candidate.first().name}")
    return 'Candidate Deleted'


async def update_candidate(id: int, request: schemas.Candidates, db: AsyncSession):
    candidate_res = await db.execute(select(models.Candidate).filter(models.Candidate.id == id))
    candidate = candidate_res.scalars()

    if not candidate.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"candidate with id {id} not found")

    update_values = {
            "name": request.name,
            "electionId": request.electionId,
            "manifesto": request.manifesto  
    }

    candidate.update(update_values)
    await db.commit()
    logging.info(f"Candidate with id {id} updated - {candidate.first().name}")
    return 'candidate details updated'