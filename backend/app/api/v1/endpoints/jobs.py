from fastapi import APIRouter, HTTPException
from app.models.schemas import ResponseEnvelope, JobStatus
from app.services.jobs_service import JobsService

router = APIRouter()

@router.post("", response_model=ResponseEnvelope[dict])
async def create_job():
    job_id = JobsService.create_job()
    return {
        "ok": True,
        "data": {"job_id": job_id},
        "meta": {}
    }

@router.get("/{job_id}", response_model=ResponseEnvelope[JobStatus])
async def get_job(job_id: str):
    job = JobsService.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {
        "ok": True,
        "data": job,
        "meta": {}
    }
