AI-Assisted Frontend Assimilation Demo

A docs-style demo site designed to test a hybrid AI workflow: UI generation (Bolt) → backend creation (FastAPI) → IDE agent integration (Anti-Gravity) → automated test loops → “functional + pretty”.

Purpose

This project is a teaching and integration playground, not a production app.

It exists to demonstrate—and repeatedly test—common frontend/backend integration patterns:

Simple actions (“Ping”, “Random”, “Toggle”)

Forms and validation errors

List + search + pagination

Async jobs with status polling

Optional streaming events/logs

A built-in API Inspector to make integration visible and debuggable

Definition of Done (MVP)

The build is considered complete when:

Frontend runs and renders all pages with a clean layout.

Backend runs and responds to all required endpoints.

Frontend is wired to backend using a single API client module.

A user can complete the “Golden Flows” listed below.

Tests pass:

Backend: pytest suite passes

Frontend: unit tests (minimal) + e2e smoke tests (preferred) pass

“Pretty” means: consistent spacing, typography, and components—not bespoke visual design.

Project Structure (Required)

Use this repo layout and naming so an IDE agent can navigate predictably:

/README.md
/contracts/
  openapi.json                 # Exported from FastAPI once stable
  conventions.md               # Error format, pagination, auth assumptions
/backend/
  app/
    main.py
    api/
      v1/
        router.py
        endpoints/
          health.py
          demo_actions.py
          forms.py
          items.py
          jobs.py
          events.py             # optional streaming
    core/
      config.py
      errors.py
    models/
      schemas.py               # Pydantic request/response models
    services/
      items_service.py
      jobs_service.py
    tests/
      test_health.py
      test_demo_actions.py
      test_forms.py
      test_items.py
      test_jobs.py
  pyproject.toml or requirements.txt
/frontend/
  src/
    app/ or pages/             # depends on tool output; normalize if needed
    components/
      ApiInspector/
      Layout/
      DocCallout/
    lib/
      api/
        client.ts              # SINGLE source of API calls
        types.ts               # shared types for API responses
        routes.ts              # endpoint path constants
    tests/
      unit/
      e2e/
  package.json

Rule: Frontend network calls must be centralized in frontend/src/lib/api/client.ts. No direct fetch() calls inside random components after integration.

Conventions (Hard Rules)
Naming Conventions
API routes

Prefix all API routes with: /api/v1

Use nouns for resources: /items, /jobs

Use verbs only for demo actions: /actions/ping, /actions/random

Response envelope

All successful responses use:

{
  "ok": true,
  "data": { },
  "meta": { }
}

All error responses use:

{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable summary",
    "details": { }
  }
}

Common error codes

VALIDATION_ERROR

NOT_FOUND

CONFLICT

INTERNAL_ERROR

UPSTREAM_ERROR (if simulating third-party failures)

Pagination

Use query params:

q (string search)

page (1-based integer)

page_size (integer)

Meta format:

"meta": {
  "page": 1,
  "page_size": 10,
  "total": 123
}

IDs

Use string IDs in API responses (even if internally generated).

CORS

Backend must enable CORS for local development.

Backend Requirements (FastAPI)
Core Requirements

FastAPI app served at /

OpenAPI available at /openapi.json

API base: /api/v1

Minimal in-memory storage is fine (no DB required)

Required Endpoints
Health

GET /api/v1/health

Returns server status and version

Response:

{"ok": true, "data": {"status": "up", "version": "0.1.0"}, "meta": {}}

Demo Actions

GET /api/v1/actions/ping

Returns pong + timestamp

GET /api/v1/actions/random

Returns random number + optional message

POST /api/v1/actions/toggle

Body: { "value": boolean }

Returns toggled state

Forms + Validation

POST /api/v1/forms/validate

Accepts fields that will sometimes fail validation to test UI error handling.

Request:

{
  "name": "string",
  "email": "string",
  "age": 0,
  "notes": "string"
}

Behavior:

Validate email format

Age must be between 13 and 120

Name required, min length 2

Return structured validation errors in error.details

Items (List + detail)

GET /api/v1/items

Query params: q, page, page_size

Returns list of items + pagination meta

GET /api/v1/items/{item_id}

Returns item detail or NOT_FOUND

POST /api/v1/items

Create item (simple fields: title, description, tags[])

Returns created item

PUT /api/v1/items/{item_id}

Update item

DELETE /api/v1/items/{item_id}

Delete item

Jobs (Async simulation)

POST /api/v1/jobs

Starts a “job” that completes after a delay (simulate async processing)

Returns job_id

GET /api/v1/jobs/{job_id}

Returns status: queued | running | completed | failed

Include progress percentage and result when done

Optional:

Provide a job type like "type": "summarize" to simulate an AI-ish action

Events (Optional but valuable)

If included, implement either:

SSE: GET /api/v1/events/stream
or

WebSocket: /api/v1/events/ws

Used for streaming logs from jobs or server events.

If omitted, frontend should gracefully hide streaming UI.

Backend Tests (Required)

Use pytest with FastAPI TestClient.

Minimum tests:

health returns ok

each demo action returns ok + correct data shape

forms validation returns VALIDATION_ERROR with expected detail fields on bad input

items list paginates + returns meta.total

jobs progress transitions over time (can fake time / shorten delay in tests)

Frontend Requirements (React Docs-Style Site)
UX Goals

Docs-style navigation: sidebar + content area

Each page describes a concept and includes a live demo component

Built-in API Inspector visible via:

a docked panel on the right, OR

a collapsible bottom drawer, OR

a dedicated “Inspector” page (but panel is preferred)

Required Pages

1) Home

What this project is

How to use it

Golden flows checklist

1) API Basics

“Ping / Random / Toggle” demos

Show loading + success states

1) Forms & Validation

Form demo that calls /forms/validate

Must display field-level errors and a general message

1) Lists & Pagination

Data table calling /items

Must support:

search input (q)

pagination controls

empty state when no results

1) Async Jobs

Button that triggers job creation

UI shows:

job status

progress

completion result

If streaming is present, show live updates; if not, poll status

1) Frameworks Overview

Docs content page that briefly explains:

React (what it is used for, component model)

Vue

Angular

Svelte

Next.js vs Vite (high level)
This page is mostly static content with clean formatting.

1) API Inspector

If it’s a panel, this page explains how to use it.
If it’s a page, it shows recent calls.

API Inspector Requirements

The API Inspector must track (at minimum):

request method + URL

request body (if any)

response status

response body

latency (approx)

timestamp

It must support:

a list of recent calls (latest first)

click to expand details

“clear history” button

Integration rule: The API Inspector must be fed exclusively by the centralized API client module.

Frontend Tests (Required)

Minimum:

Unit: API client returns data and handles error envelope

E2E smoke (preferred):

Visit Home page

Use Ping demo and see “pong”

Submit invalid form and see validation message

Load items list and paginate

Start job and see completion

Golden Flows (Manual + Automated Targets)

These are the MVP demo flows:

Ping flow: Open API Basics → click Ping → see result + inspector entry

Validation flow: Open Forms → submit invalid email → see field error + inspector entry

List flow: Open Lists → search something → paginate → inspector entries reflect params

Async flow: Open Jobs → start job → observe progress → completion result

Integration & Assimilation Rules (For IDE Agent)

These rules keep integration sane and reversible.

Non-negotiables

Do not redesign the UI.

Do not change page structure unless required to make it functional.

Prefer minimal adapters over refactors.

Allowed changes

Add/modify API client module

Add types and endpoint constants

Replace mock data with real API calls

Add small UI affordances for error/loading states if missing

Normalize environment config for API base URL

Artifacts to produce/update

/contracts/openapi.json exported from backend once stable

/contracts/conventions.md describing any deviations from README

A short “Integration Notes” section appended to this README:

what was changed

known limitations

how to run tests

Local Environment Assumptions (MVP)

Backend runs on <http://localhost:8000>

Frontend runs on <http://localhost:3000> (or tool default)

Frontend reads API base URL from an env var, e.g.:

VITE_API_BASE_URL or NEXT_PUBLIC_API_BASE_URL

Backend must allow CORS for the frontend origin

Non-goals (Explicitly Out of Scope)

Authentication (unless you decide to add a trivial “fake auth” later)

Database persistence

Production deployment

Perfect UI polish

Full accessibility compliance (nice-to-have only)

Suggested “Reasonable Defaults” (So Agents Don’t Argue)

Use in-memory storage for items/jobs

Use polling for jobs if streaming is too much work

Keep job durations short (1–3 seconds) for fast test loops

Keep API Inspector simple and visible

Appendix: Conventions.md Template (for /contracts/conventions.md)

Include:

API base URL and versions

Exact error envelope

Pagination behavior

Notes on job status transitions

Any differences from README

## Integration Notes

### What was changed

1. **Backend Implementation**: Built a robust FastAPI backend following the specification exactly.
    - Implemented in-memory storage for items and jobs.
    - Added comprehensive error handling and CORS support.
    - Added background polling support for async jobs.
2. **Frontend Wiring**:
    - Created a centralized `apiClient` in `frontend/src/lib/api/client.ts`.
    - Implemented real-time **API Inspector** logging into the client.
    - Built out documentation-style pages for all "Golden Flows".
3. **Contracts**:
    - Exported `contracts/openapi.json`.
    - Created `contracts/conventions.md`.
4. **Testing**:
    - Backend: `pytest` suite for all endpoints.
    - Frontend: `vitest` unit tests for the API client.

### How to run

#### Backend

```bash
cd backend
pip install -r requirements.txt
python -m app.main
```

The backend will run on `http://localhost:8000`.

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`. Make sure to set `VITE_API_BASE_URL` if different from default.

### How to run tests

#### Backend

```bash
cd backend
$env:PYTHONPATH="backend"; pytest app/tests
```

#### Frontend

```bash
cd frontend
npx vitest run
```

### Known limitations

- **Persistence**: All data is in-memory. Restarting the backend resets items and jobs.
- **Streaming**: Implemented as polling (1s interval) as a fallback as permitted by the spec.
- **Auth**: No authentication is implemented in this MVP.
