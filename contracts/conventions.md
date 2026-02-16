# API Conventions

## Base URL
- API Base: `/api/v1`
- Local: `http://localhost:8000/api/v1`

## Response Envelope
All successful responses use this format:
```json
{
  "ok": true,
  "data": { ... },
  "meta": { ... }
}
```

## Error Envelope
All error responses use this format:
```json
{
  "ok": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable summary",
    "details": { ... }
  }
}
```

## Common Error Codes
- `VALIDATION_ERROR`: Form validation failed. Details contain field-specific errors.
- `NOT_FOUND`: Resource not found.
- `INTERNAL_ERROR`: Unexpected server error.

## Pagination
- Query params: `q` (search), `page` (1-indexed), `page_size`.
- Meta format:
```json
"meta": {
  "page": 1,
  "page_size": 10,
  "total": 123
}
```

## Jobs
- Statuses: `queued` | `running` | `completed` | `failed`.
- Transitions: Jobs start as `queued` or `running` and progress to `completed`.
- Result is only available when status is `completed`.
