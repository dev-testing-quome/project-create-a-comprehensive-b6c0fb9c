from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    is_instructor: Optional[bool] = False

class User(BaseModel):
    id: int
    username: str
    email: str
    is_instructor: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class CourseCreate(BaseModel):
    title: str
    description: str

class Course(BaseModel):
    id: int
    title: str
    description: str
    instructor_id: int
    created_at: datetime
    updated_at: datetime
    instructor: User

    class Config:
        orm_mode = True

class ModuleCreate(BaseModel):
    title: str
    content: str

class Module(BaseModel):
    id: int
    title: str
    content: str
    course_id: int
    created_at: datetime
    updated_at: datetime
    course: Course

    class Config:
        orm_mode = True

class AssignmentCreate(BaseModel):
    title: str
    description: str

class Assignment(BaseModel):
    id: int
    title: str
    description: str
    module_id: int
    created_at: datetime
    updated_at: datetime
    module: Module

    class Config:
        orm_mode = True

class SubmissionCreate(BaseModel):
    assignment_id: int
    user_id: int
    grade: Optional[int] = None
    feedback: Optional[str] = None

class Submission(BaseModel):
    id: int
    assignment_id: int
    user_id: int
    submitted_at: datetime
    grade: Optional[int] = None
    feedback: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    assignment: Assignment
    user: User

    class Config:
        orm_mode = True
