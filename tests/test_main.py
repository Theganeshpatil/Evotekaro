
import pytest
from fastapi.testclient import TestClient
from evotekaro.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert "Evotekaro" in response.json()
