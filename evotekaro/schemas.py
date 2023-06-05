from typing import List, Optional
from pydantic import BaseModel
import datetime


class User(BaseModel):
    name:str
    email:str
    password:str
    department: str
    batch: int # this can't be anything other than 2021/22/23 need to restrict this
    isAdmin: bool


class ShowUser(BaseModel):
    name:str
    email:str
    department: str
    batch: int 
    isAdmin: bool
    class Config():
        orm_mode = True


class Candidates(BaseModel):
    # id :int 
    userId : int 
    electionId : int
    manisfesto : str
    class Config():
        orm_mode = True
    

class Election(BaseModel):
    # id :int
    name : str
    startTime : datetime.date
    endTime : datetime.date
    candidates : List[Candidates] = []
    class Config():
        orm_mode = True


class Votes(BaseModel):
    # id : int
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
