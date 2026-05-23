from pydantic import BaseModel
from typing import List

class PostureSession(BaseModel):
    user_id: str
    score: int
    grade: str
    issues: List[str]
    duration_seconds: int