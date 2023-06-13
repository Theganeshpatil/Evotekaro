from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime as dt


class User(BaseModel):
    name:str
    email:str
    password:str
    department: str
    batch: int # this can't be anything other than 2021/22/23 need to restrict this
    isAdmin: bool


class ShowUser(BaseModel):
    id: int
    name:str
    email:str
    department: str
    batch: int 
    isAdmin: bool
    class Config():
        orm_mode = True


class Candidates(BaseModel):
    id :int 
    name : str 
    electionId : int
    manifesto : str
    class Config():
        orm_mode = True

class AddCandidates(Candidates):
    name: str
    manifesto:str
    

class Election(BaseModel):
    id :int
    name : str
    startTime : dt
    endTime : dt
    rules: str
    candidates : List[AddCandidates] = []
    class Config():
        orm_mode = True


class Votes(BaseModel):
    id : int
    userId : int
    electionId : int
    candidateId : int

class VoteResult(BaseModel):
    candidateId: int
    vote_count: int

## AUTHENTICATIONS

class Login(BaseModel):
    username: str
    password:str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
