from typing import List, Optional
from app.models.schemas import Item, ItemBase

# In-memory storage
_items = [
    {"id": str(i), "title": f"Item {i}", "description": f"Description for item {i}", "tags": ["tag1", "tag2"]}
    for i in range(1, 101)
]

class ItemsService:
    @staticmethod
    def list_items(q: Optional[str] = None, page: int = 1, page_size: int = 10):
        filtered = _items
        if q:
            filtered = [item for item in _items if q.lower() in item["title"].lower() or q.lower() in item["description"].lower()]
        
        total = len(filtered)
        start = (page - 1) * page_size
        end = start + page_size
        return filtered[start:end], total

    @staticmethod
    def get_item(item_id: str):
        for item in _items:
            if item["id"] == item_id:
                return item
        return None

    @staticmethod
    def create_item(item_data: ItemBase):
        new_id = str(len(_items) + 1)
        item = {"id": new_id, **item_data.dict()}
        _items.append(item)
        return item

    @staticmethod
    def update_item(item_id: str, item_data: ItemBase):
        for i, item in enumerate(_items):
            if item["id"] == item_id:
                _items[i] = {"id": item_id, **item_data.dict()}
                return _items[i]
        return None

    @staticmethod
    def delete_item(item_id: str):
        global _items
        for i, item in enumerate(_items):
            if item["id"] == item_id:
                return _items.pop(i)
        return None
