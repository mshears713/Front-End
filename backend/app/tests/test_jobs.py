import time
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_job_flow():
    # Create
    response = client.post("/api/v1/jobs")
    assert response.status_code == 200
    job_id = response.json()["data"]["job_id"]
    
    # Check initial status
    response = client.get(f"/api/v1/jobs/{job_id}")
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["status"] in ["queued", "running"]
    
    # We won't wait for completion in unit tests to keep them fast,
    # but we could mock time if needed.
    # For now, just verifying the job exists and has a valid status.
