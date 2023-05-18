from sqlalchemy import Column, Integer, String, ForeignKey, Date
from evotekaro.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)
    department = Column(String)
    batch = Column(Integer)

    # Use the class name 'Candidate' instead of 'candidates'
    candidates = relationship('Candidate', back_populates='user')


class Election(Base):
    __tablename__ ='elections'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    startTime = Column(Date)
    endTime = Column(Date)

    # Use the class name 'Candidate' instead of 'candidates'
    candidates = relationship('Candidate', back_populates='election')


class Candidate(Base):
    __tablename__ = 'candidates'

    id = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey('users.id'))
    electionId = Column(Integer, ForeignKey('elections.id'))
    manisfesto = Column(String)

    # Use the class name 'User' instead of 'user'
    user = relationship('User', back_populates='candidates')
    # Use the class name 'Election' instead of 'elections'
    election = relationship('Election', back_populates='candidates')

# class Votes(Base):
#     __tablename__ = 'votes'

#     id = Column(Integer, primary_key=True, index=True)
#     userId = Column(Integer, ForeignKey('users.id'))
#     electionId = Column(Integer, ForeignKey('elections.id'))
#     candidateId = Column(Integer, ForeignKey('candidates.id'))


