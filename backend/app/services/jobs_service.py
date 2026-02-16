import time
import uuid
import threading
from typing import Dict, Any, Optional

# In-memory storage for jobs
_jobs: Dict[str, Dict[str, Any]] = {}

class JobsService:
    @staticmethod
    def create_job():
        job_id = str(uuid.uuid4())
        _jobs[job_id] = {
            "job_id": job_id,
            "status": "queued",
            "progress": 0,
            "result": None,
            "created_at": time.time()
        }
        
        # Start a thread to simulate the job
        thread = threading.Thread(target=JobsService._run_job, args=(job_id,))
        thread.start()
        
        return job_id

    @staticmethod
    def _run_job(job_id: str):
        job = _jobs[job_id]
        
        # Update to running
        job["status"] = "running"
        job["progress"] = 10
        time.sleep(1) # Simulate some work
        
        job["progress"] = 50
        time.sleep(1)
        
        job["progress"] = 90
        time.sleep(1)
        
        # Update to completed
        job["status"] = "completed"
        job["progress"] = 100
        job["result"] = {"summary": "Job completed successfully", "processed_at": time.time()}

    @staticmethod
    def get_job(job_id: str):
        return _jobs.get(job_id)
