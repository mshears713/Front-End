from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_items_pagination():
    response = client.get("/api/v1/items?page=1&page_size=5")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert len(data["data"]) == 5
    assert data["meta"]["total"] >= 100
    assert data["meta"]["page"] == 1

def test_items_search():
    response = client.get("/api/v1/items?q=Item 10")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    # Should find at least "Item 10", "Item 100"
    assert len(data["data"]) >= 2

def test_item_crud():
    # Create
    response = client.post("/api/v1/items", json={
        "title": "New Item",
        "description": "New Desc",
        "tags": ["new"]
    })
    assert response.status_code == 200
    item_id = response.json()["data"]["id"]
    
    # Get
    response = client.get(f"/api/v1/items/{item_id}")
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "New Item"
    
    # Update
    response = client.put(f"/api/v1/items/{item_id}", json={
        "title": "Updated Item",
        "description": "Updated Desc",
        "tags": ["updated"]
    })
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Updated Item"
    
    # Delete
    response = client.delete(f"/api/v1/items/{item_id}")
    assert response.status_code == 200
    
    # Verify deleted
    response = client.get(f"/api/v1/items/{item_id}")
    assert response.status_code == 404
