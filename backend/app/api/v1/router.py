from fastapi import APIRouter
from app.api.v1.endpoints import health, demo_actions, forms, items, jobs

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(demo_actions.router, prefix="/actions", tags=["actions"])
api_router.include_router(forms.router, prefix="/forms", tags=["forms"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["jobs"])
