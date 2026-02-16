from fastapi import APIRouter
from app.models.schemas import ResponseEnvelope, HealthData

router = APIRouter()

@router.get("", response_model=ResponseEnvelope[HealthData])
async def get_health():
    return {
        "ok": True,
        "data": {"status": "up", "version": "0.1.0"},
        "meta": {}
    }
