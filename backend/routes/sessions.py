from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from supabase import create_client

router = APIRouter()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
)


class PostureSession(BaseModel):
    user_id: str
    score: int
    grade: str
    issues: List[str]
    duration_seconds: Optional[int] = None


@router.post("/sessions")
def create_session(session: PostureSession):
    try:
        result = (
            supabase.table("posture_sessions")
            .insert(session.model_dump())
            .execute()
        )

        return result.data[0]

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


@router.get("/sessions/{user_id}")
def get_sessions(user_id: str):
    try:
        result = (
            supabase.table("posture_sessions")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )

        return result.data

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
    
    