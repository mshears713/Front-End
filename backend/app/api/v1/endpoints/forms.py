import re
from fastapi import APIRouter, Response
from fastapi.responses import JSONResponse
from app.models.schemas import ResponseEnvelope, FormRequest

router = APIRouter()

@router.post("/validate")
async def validate_form(payload: FormRequest):
    errors = {}
    
    if not payload.name or len(payload.name) < 2:
        errors["name"] = "Name is required and must be at least 2 characters"
        
    if not re.match(r"[^@]+@[^@]+\.[^@]+", payload.email):
        errors["email"] = "Invalid email format"
        
    if payload.age < 13 or payload.age > 120:
        errors["age"] = "Age must be between 13 and 120"
        
    if errors:
        return JSONResponse(
            status_code=400,
            content={
                "ok": False,
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Please correct the errors in the form",
                    "details": errors
                }
            }
        )
        
    return {
        "ok": True,
        "data": {"message": "Validation successful"},
        "meta": {}
    }
