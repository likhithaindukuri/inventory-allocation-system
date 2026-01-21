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

## API Flow
1. Client sends `POST /api/order` with `{ productId, quantity }`
2. **Route** (`routes/orderRoutes.js`) receives request and forwards to controller
3. **Controller** (`controllers/orderController.js`) extracts `productId` and `quantity` from request body
4. Controller calls `Service.placeOrder(productId, quantity)`
5. **Service** (`services/orderService.js`) starts a database transaction
6. Service locks the product row using `SELECT ... FOR UPDATE` (prevents concurrent access)
7. Service validates product exists (throws error if not found)
8. Service validates `stock >= quantity` (throws error if insufficient)
9. Service calculates new stock: `updatedStock = product.stock - quantity`
10. Service calls `ProductRepository.updateStock()` to deduct stock (within transaction)
11. Service calls `OrderRepository.create()` to create order record (within transaction)
12. Transaction commits (or rolls back automatically on any error)
13. Controller receives order object from service
14. Controller returns `201` response with success message and order data
15. If any error occurs, controller catches it and returns `400` with error message

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
