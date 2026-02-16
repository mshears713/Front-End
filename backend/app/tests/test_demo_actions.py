from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_ping():
    response = client.get("/api/v1/actions/ping")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert "pong" in data["data"]

def test_random():
    response = client.get("/api/v1/actions/random")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert "number" in data["data"]

def test_toggle():
    response = client.post("/api/v1/actions/toggle", json={"value": True})
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert data["data"]["value"] is False
