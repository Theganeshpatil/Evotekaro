from sqlalchemy.ext.asyncio import AsyncSession
import logging

from fastapi import HTTPException, status
from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload

from evotekaro import models, schemas


async def get_all(db: AsyncSession):
    election = (await db.execute(select(models.Election))).scalars().all()
    return election

async def create(request: schemas.Election, db: AsyncSession):
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
    await db.commit()
    await db.refresh(new_elec)
    election = (await db.execute(select(models.Election).filter(models.Election.id == new_elec.id))).scalars().first()
    logging.info(f"New election created with id {new_elec.id} - {election.name}")
    return election



async def destroy(id: int, db: AsyncSession):
    election_res = await db.execute(select(models.Election).filter(models.Election.id == id))
    election = election_res.scalars()

    if not election.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"election with id {id} not found")

    candidates = (await db.execute(select(models.Candidate).options(joinedload(models.Candidate.election)).filter(models.Candidate.electionId == id))).scalars().all()

    for candidate in candidates:
        db.delete(candidate)

    election
    await db.commit()
    logging.info(f"election with id {id} deleted - {election.first().name}")
    return 'Deleted'


async def update(id: int, request: schemas.Election, db: AsyncSession):
    election = (await db.execute(select(models.Election).filter(models.Election.id == id))).scalars().first()

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
    await db.commit()
    logging.info(f"Election with id {id} updated - {election.name}")
    return 'updated'



async def show(id: int, db: AsyncSession):
    election = (await db.execute(select(models.Election).filter(models.Election.id == id))).scalars().first()
    if not election:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Election with the id {id} is not available")
    return election
