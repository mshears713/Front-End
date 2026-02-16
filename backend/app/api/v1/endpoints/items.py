from typing import Optional
from fastapi import APIRouter, Query, HTTPException
from app.models.schemas import ResponseEnvelope, Item, ItemBase, ItemList
from app.services.items_service import ItemsService

router = APIRouter()

@router.get("", response_model=ResponseEnvelope[list[Item]])
async def list_items(
    q: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100)
):
    items, total = ItemsService.list_items(q, page, page_size)
    return {
        "ok": True,
        "data": items,
        "meta": {
            "page": page,
            "page_size": page_size,
            "total": total
        }
    }

@router.get("/{item_id}", response_model=ResponseEnvelope[Item])
async def get_item(item_id: str):
    item = ItemsService.get_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {
        "ok": True,
        "data": item,
        "meta": {}
    }

@router.post("", response_model=ResponseEnvelope[Item])
async def create_item(item: ItemBase):
    new_item = ItemsService.create_item(item)
    return {
        "ok": True,
        "data": new_item,
        "meta": {}
    }

@router.put("/{item_id}", response_model=ResponseEnvelope[Item])
async def update_item(item_id: str, item: ItemBase):
    updated = ItemsService.update_item(item_id, item)
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found")
    return {
        "ok": True,
        "data": updated,
        "meta": {}
    }

@router.delete("/{item_id}", response_model=ResponseEnvelope[dict])
async def delete_item(item_id: str):
    deleted = ItemsService.delete_item(item_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Item not found")
    return {
        "ok": True,
        "data": {"message": "Item deleted"},
        "meta": {}
    }
