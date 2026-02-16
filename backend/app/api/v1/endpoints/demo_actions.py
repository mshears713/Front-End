import time
import random
from fastapi import APIRouter
from app.models.schemas import ResponseEnvelope, PingData, RandomData, ToggleRequest, ToggleData

router = APIRouter()

@router.get("/ping", response_model=ResponseEnvelope[PingData])
async def ping():
    return {
        "ok": True,
        "data": {"pong": "pong", "timestamp": time.time()},
        "meta": {}
    }

@router.get("/random", response_model=ResponseEnvelope[RandomData])
async def get_random():
    return {
        "ok": True,
        "data": {"number": random.randint(1, 100), "message": "Here is your random number"},
        "meta": {}
    }

@router.post("/toggle", response_model=ResponseEnvelope[ToggleData])
async def toggle(payload: ToggleRequest):
    return {
        "ok": True,
        "data": {"value": not payload.value},
        "meta": {}
    }
