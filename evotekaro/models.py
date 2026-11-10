from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from evotekaro.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    department = Column(String)
    batch = Column(Integer)
    year = Column(Integer)
    isAdmin = Column(Boolean)
    # candidates = relationship('Candidate', back_populates='user')
    


class Election(Base):
    __tablename__ ='elections'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    startTime = Column(DateTime)
    endTime = Column(DateTime)
    rules = Column(String)
    year = Column(String)
    branch = Column(String)
    batch = Column(String)
    candidates = relationship('Candidate', back_populates='election')


class Candidate(Base):
    __tablename__ = 'candidates'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    # userId = Column(Integer, ForeignKey('users.id'))
    electionId = Column(Integer, ForeignKey('elections.id'))
    manifesto = Column(String)
    # user = relationship('User', back_populates='candidates')
    election = relationship('Election', back_populates='candidates')

class Votes(Base):
    __tablename__ = 'votes'

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey('users.id'))
    electionId = Column(Integer, ForeignKey('elections.id'))
    candidateId = Column(Integer, ForeignKey('candidates.id'))




class AuditLog(Base):
    __tablename__ = 'audit_logs'

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String)
    timestamp = Column(DateTime)
    user_id = Column(Integer, nullable=True) # Optional link
