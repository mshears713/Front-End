from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_form_validation_success():
    response = client.post("/api/v1/forms/validate", json={
        "name": "Jane Doe",
        "email": "jane@example.com",
        "age": 25,
        "notes": "Testing"
    })
    assert response.status_code == 200
    assert response.json()["ok"] is True

def test_form_validation_failure():
    response = client.post("/api/v1/forms/validate", json={
        "name": "J",
        "email": "invalid-email",
        "age": 5,
        "notes": ""
    })
    assert response.status_code == 400
    data = response.json()
    assert data["ok"] is False
    assert data["error"]["code"] == "VALIDATION_ERROR"
    assert "name" in data["error"]["details"]
    assert "email" in data["error"]["details"]
    assert "age" in data["error"]["details"]
