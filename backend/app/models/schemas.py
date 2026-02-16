from typing import Any, Dict, Generic, Optional, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")

class ResponseEnvelope(BaseModel, Generic[T]):
    ok: bool
    data: Optional[T] = None
    meta: Optional[Dict[str, Any]] = Field(default_factory=dict)

class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[Dict[str, Any]] = Field(default_factory=dict)

class ErrorEnvelope(BaseModel):
    ok: bool = False
    error: ErrorDetail

class HealthData(BaseModel):
    status: str
    version: str

class PingData(BaseModel):
    pong: str
    timestamp: float

class RandomData(BaseModel):
    number: int
    message: Optional[str] = None

class ToggleRequest(BaseModel):
    value: bool

class ToggleData(BaseModel):
    value: bool

class FormRequest(BaseModel):
    name: str
    email: str
    age: int
    notes: Optional[str] = None

class ItemBase(BaseModel):
    title: str
    description: str
    tags: list[str] = Field(default_factory=list)

class Item(ItemBase):
    id: str

class ItemList(BaseModel):
    items: list[Item]

class JobStatus(BaseModel):
    job_id: str
    status: str # queued | running | completed | failed
    progress: int
    result: Optional[Any] = None
