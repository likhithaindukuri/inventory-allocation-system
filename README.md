# Inventory Allocation System

## Overview
This project demonstrates backend orchestration, API discipline, and concurrency-safe stock allocation.
The system exposes exactly one API for order placement and ensures data consistency under concurrent requests.

---

## Tech Stack
- Backend: Node.js, Express, Sequelize, PostgreSQL
- Frontend: React.js, Flutter
- Database: PostgreSQL

---

## Project Structure

```
backend/
  routes/
  controllers/
  services/
  repositories/
  models/
frontend-react/
frontend-flutter/
```

---

## API Design
### POST /api/order
This single API performs:
- Product existence validation
- Stock availability check
- Stock deduction
- Order creation
- Prevention of negative stock

No other APIs are exposed to strictly follow API discipline.

---

## Business Logic Responsibility
- Controller: Handles request and response only
- Service: Contains complete business logic
- Repository: Handles database access
- Models: Define database schema

---

## Concurrency Handling
Concurrency is handled using:
- Database transactions
- Row-level locking (`SELECT ... FOR UPDATE`)

This ensures that when multiple orders are placed concurrently:
- Only one request can update stock at a time
- Stock never becomes negative

---

## Frontend Responsibility
Both React and Flutter frontends:
- Consume the same POST /api/order API
- Do not contain any business or stock logic
- Are intentionally minimal as backend logic is the focus.
