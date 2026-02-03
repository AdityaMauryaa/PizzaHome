# 📋 Pizza Ordering Portal - Development Todo

## Project Overview
Retail Ordering Portal for Pizza, Cold Drinks, and Breads - A full-stack web application for food ordering with inventory management and secure backend.

---

## Current Project Structure
```
Pizza-h/
├── package.json
├── TODO.md
├── client/                    # Empty - Frontend to be built
├── server/
│   ├── .env                   # ✅ Environment variables
│   ├── package.json           # ✅ Dependencies configured
│   └── src/
│       ├── server.js          # ✅ Basic Express setup done
│       ├── controller/        # Empty - Controllers to be created
│       ├── db/
│       │   └── db.js          # ✅ MongoDB connection configured
│       ├── models/
│       │   ├── User.js        # Empty - Schema to be defined
│       │   └── Order.js       # Empty - Schema to be defined
│       ├── routes/            # Empty - Routes to be created
│       └── utils/             # Empty - Utilities to be created
```

---

## Backend Tasks

### 1. Setup Database & Models

#### 1.1 Models to Create (in `/server/src/models/`)
- [x] **User.js** - Define schema (name, email, password, address, phone)
- [x] **Order.js** - Define schema (user, items, total, status, orderRef)
- [x] **Product.js** - Create file & schema (name, price, category, description, image)
- [x] **Category.js** - Create file & schema (name, description)
- [x] **Cart.js** - Create file & schema (user, items[], totalAmount)
- [x] **Inventory.js** - Create file & schema (product, quantity, lastUpdated)

### 2. User Authentication APIs

#### 2.1 Create Auth Controller (`/server/src/controller/authController.js`)
- [x] Register user function
- [x] Login user function
- [x] Get profile function
- [x] Update profile function

#### 2.2 Create Auth Routes (`/server/src/routes/authRoutes.js`)
- [x] POST /api/auth/register - User registration
- [x] POST /api/auth/login - User login
- [x] GET /api/auth/profile - Get user profile
- [x] PUT /api/auth/profile - Update user profile

#### 2.3 Auth Utilities (`/server/src/utils/`)
- [x] **authMiddleware.js** - JWT verification middleware
- [x] Password hashing with bcrypt
- [x] JWT token generation

### 3. Product & Category APIs

#### 3.1 Create Controllers (`/server/src/controller/`)
- [x] **productController.js** - CRUD for products
- [x] **categoryController.js** - CRUD for categories

#### 3.2 Create Routes (`/server/src/routes/`)
- [x] **productRoutes.js**
  - [x] GET /api/products - Fetch all products
  - [x] GET /api/products/:categoryId - Fetch products by category
  - [x] GET /api/products/:id - Fetch single product
- [x] **categoryRoutes.js**
  - [x] GET /api/categories - Fetch all categories

### 4. Cart Management APIs

#### 4.1 Create Controller (`/server/src/controller/cartController.js`)
- [] Add item to cart
- [x] Get cart items
- [x] Update item quantity
- [x] Remove item from cart
- [x] Clear cart

#### 4.2 Create Routes (`/server/src/routes/cartRoutes.js`)
- [x] POST /api/cart - Add item to cart
- [x] GET /api/cart - Get cart items
- [x] PUT /api/cart/:itemId - Update item quantity
- [x] DELETE /api/cart/:itemId - Remove item from cart
- [x] DELETE /api/cart - Clear cart

### 5. Order Placement API

#### 5.1 Create Controller (`/server/src/controller/orderController.js`)
- [x] Place order function
- [x] Validate stock availability
- [x] Deduct inventory on order
- [x] Generate order reference number
- [x] Get order details
- [x] Get user orders

#### 5.2 Create Routes (`/server/src/routes/orderRoutes.js`)
- [x] POST /api/orders - Place order
- [x] GET /api/orders - Get user orders
- [x] GET /api/orders/:orderId - Get order details

### 6. Inventory Management

#### 6.1 Create Controller (`/server/src/controller/inventoryController.js`)
- [x] Get inventory status
- [x] Update inventory
- [x] Check stock availability

#### 6.2 Business Logic
- [x] Real-time stock tracking
- [x] Automatic inventory updates on order
- [x] Stock validation before order confirmation
- [x] Prevent orders for out-of-stock items

#### 6.3 Create Routes (`/server/src/routes/inventoryRoutes.js`)
- [x] GET /api/inventory - Get inventory status
- [x] PUT /api/inventory/:productId - Update inventory for a product
- [x] GET /api/inventory/check/:productId - Check stock availability for a product

### 7. API Security & Middleware

#### 7.1 Create Middleware (`/server/src/utils/`)
- [x] **apiKeyMiddleware.js** - Validate x-api-key header
- [x] **errorHandler.js** - Centralized error handler
- [x] **logger.js** - Request logging

#### 7.2 Security Features
- [x] API key validation on all routes
- [x] Return 401 for unauthorized requests
- [x] Handle out-of-stock errors
- [x] Handle invalid request errors

### 8. Register Routes in Server.js
- [x] Import and use authRoutes
- [x] Import and use productRoutes
- [x] Import and use categoryRoutes
- [x] Import and use cartRoutes
- [x] Import and use orderRoutes
- [x] Add error handling middleware
- [x] Add API key middleware

---

## Frontend Tasks (in `/client/`)

### 9. Setup React Project
- [x] Initialize React app (Vite or CRA)
- [x] Install dependencies (axios, react-router-dom, etc.)
- [x] Setup folder structure (components, pages, services, context)

### 10. Build Frontend - Menu Display
- [x] Create Navbar component
- [x] Create category navigation component
- [x] Create product card component
- [x] Create product listing page
- [x] Display product name, price, availability
- [x] Style menu cards

### 11. Build Frontend - Cart UI
- [x] Create CartContext for state management
- [x] Create shopping cart component
- [x] Add quantity controls (+/-)
- [x] Display individual prices
- [x] Calculate and display total amount
- [x] Remove item functionality

### 12. Build Frontend - User Auth
- [x] Create Login page
- [x] Create Register page
- [x] Create Profile page
- [x] Store JWT in localStorage/cookies

### 13. Build Frontend - Order Confirmation
- [x] Create checkout page
- [x] Create order placement button
- [x] Show loading state during order
- [x] Create order confirmation page
- [x] Display order reference number
- [x] Show order summary

### 14. API Integration
- [x] Create API service (`/client/src/services/api.js`)
- [x] Configure axios with base URL and x-api-key header
- [x] Create auth service
- [x] Create product service
- [x] Create cart service
- [x] Create order service

---

## Data & Testing

### 15. Seed Database with Products
- [ ] Create seed script (`/server/src/seeds/seedData.js`)
- [ ] Add categories (Pizza, Cold Drinks, Breads)
- [ ] Add Pizza products (Margherita, Pepperoni, BBQ Chicken, etc.)
- [ ] Add Cold Drinks (Coca-Cola, Pepsi, Sprite, etc.)
- [ ] Add Breads (Garlic Bread, Cheese Sticks, Breadsticks, etc.)
- [ ] Set initial inventory quantities

### 16. Integration & Testing
- [ ] Test user registration/login
- [ ] Test menu browsing flow
- [ ] Test cart operations
- [ ] Test order placement
- [ ] Test inventory updates
- [ ] Test error scenarios
- [ ] Test API security

---

## Tech Stack
- **Frontend:** React.js (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + API Key (x-api-key header)
- **Packages Installed:**
  - express, dotenv, cookie-parser, jsonwebtoken, nodemon
  - (Need to install): mongoose, bcryptjs, cors

---

## Files to Create Summary

### Models (6 files)
| File | Status |
|------|--------|
| User.js | 📄 Exists (empty) |
| Order.js | 📄 Exists (empty) |
| Product.js | ❌ Create |
| Category.js | ❌ Create |
| Cart.js | ❌ Create |
| Inventory.js | ❌ Create |

### Controllers (6 files)
| File | Status |
|------|--------|
| authController.js | ❌ Create |
| productController.js | ❌ Create |
| categoryController.js | ❌ Create |
| cartController.js | ❌ Create |
| orderController.js | ❌ Create |
| inventoryController.js | ❌ Create |

### Routes (5 files)
| File | Status |
|------|--------|
| authRoutes.js | ❌ Create |
| productRoutes.js | ❌ Create |
| categoryRoutes.js | ❌ Create |
| cartRoutes.js | ❌ Create |
| orderRoutes.js | ❌ Create |

### Utils/Middleware (4 files)
| File | Status |
|------|--------|
| authMiddleware.js | ❌ Create |
| apiKeyMiddleware.js | ❌ Create |
| errorHandler.js | ❌ Create |
| logger.js | ❌ Create |

---

## Progress Tracker
| Task | Status |
|------|--------|
| MongoDB Connection | ✅ Done |
| Express Server Setup | ✅ Done |
| User Model | 🟡 File exists, schema needed |
| Order Model | 🟡 File exists, schema needed |
| Other Models | ⬜ Not Started |
| User Authentication APIs | ⬜ Not Started |
| Product & Category APIs | ⬜ Not Started |
| Cart Management APIs | ⬜ Not Started |
| Order Placement API | ⬜ Not Started |
| Inventory Management | ⬜ Not Started |
| API Security | ⬜ Not Started |
| Error Handling & Logging | ⬜ Not Started |
| Frontend Setup | ⬜ Not Started |
| Frontend - Menu Display | ⬜ Not Started |
| Frontend - Cart UI | ⬜ Not Started |
| Frontend - Order Confirmation | ⬜ Not Started |
| Seed Database | ⬜ Not Started |
| Integration & Testing | ⬜ Not Started |

**Legend:** ⬜ Not Started | 🟡 In Progress | ✅ Completed
