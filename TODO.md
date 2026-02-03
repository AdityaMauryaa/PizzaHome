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
- [ ] Register user function
- [ ] Login user function
- [ ] Get profile function
- [ ] Update profile function

#### 2.2 Create Auth Routes (`/server/src/routes/authRoutes.js`)
- [ ] POST /api/auth/register - User registration
- [ ] POST /api/auth/login - User login
- [ ] GET /api/auth/profile - Get user profile
- [ ] PUT /api/auth/profile - Update user profile

#### 2.3 Auth Utilities (`/server/src/utils/`)
- [ ] **authMiddleware.js** - JWT verification middleware
- [ ] Password hashing with bcrypt
- [ ] JWT token generation

### 3. Product & Category APIs

#### 3.1 Create Controllers (`/server/src/controller/`)
- [ ] **productController.js** - CRUD for products
- [ ] **categoryController.js** - CRUD for categories

#### 3.2 Create Routes (`/server/src/routes/`)
- [ ] **productRoutes.js**
  - [ ] GET /api/products - Fetch all products
  - [ ] GET /api/products/:categoryId - Fetch products by category
  - [ ] GET /api/products/:id - Fetch single product
- [ ] **categoryRoutes.js**
  - [ ] GET /api/categories - Fetch all categories

### 4. Cart Management APIs

#### 4.1 Create Controller (`/server/src/controller/cartController.js`)
- [ ] Add item to cart
- [ ] Get cart items
- [ ] Update item quantity
- [ ] Remove item from cart
- [ ] Clear cart

#### 4.2 Create Routes (`/server/src/routes/cartRoutes.js`)
- [ ] POST /api/cart - Add item to cart
- [ ] GET /api/cart - Get cart items
- [ ] PUT /api/cart/:itemId - Update item quantity
- [ ] DELETE /api/cart/:itemId - Remove item from cart
- [ ] DELETE /api/cart - Clear cart

### 5. Order Placement API

#### 5.1 Create Controller (`/server/src/controller/orderController.js`)
- [ ] Place order function
- [ ] Validate stock availability
- [ ] Deduct inventory on order
- [ ] Generate order reference number
- [ ] Get order details
- [ ] Get user orders

#### 5.2 Create Routes (`/server/src/routes/orderRoutes.js`)
- [ ] POST /api/orders - Place order
- [ ] GET /api/orders - Get user orders
- [ ] GET /api/orders/:orderId - Get order details

### 6. Inventory Management

#### 6.1 Create Controller (`/server/src/controller/inventoryController.js`)
- [ ] Get inventory status
- [ ] Update inventory
- [ ] Check stock availability

#### 6.2 Business Logic
- [ ] Real-time stock tracking
- [ ] Automatic inventory updates on order
- [ ] Stock validation before order confirmation
- [ ] Prevent orders for out-of-stock items

### 7. API Security & Middleware

#### 7.1 Create Middleware (`/server/src/utils/`)
- [ ] **apiKeyMiddleware.js** - Validate x-api-key header
- [ ] **errorHandler.js** - Centralized error handler
- [ ] **logger.js** - Request logging

#### 7.2 Security Features
- [ ] API key validation on all routes
- [ ] Return 401 for unauthorized requests
- [ ] Handle out-of-stock errors
- [ ] Handle invalid request errors

### 8. Register Routes in Server.js
- [ ] Import and use authRoutes
- [ ] Import and use productRoutes
- [ ] Import and use categoryRoutes
- [ ] Import and use cartRoutes
- [ ] Import and use orderRoutes
- [ ] Add error handling middleware
- [ ] Add API key middleware

---

## Frontend Tasks (in `/client/`)

### 9. Setup React Project
- [ ] Initialize React app (Vite or CRA)
- [ ] Install dependencies (axios, react-router-dom, etc.)
- [ ] Setup folder structure (components, pages, services, context)

### 10. Build Frontend - Menu Display
- [ ] Create Navbar component
- [ ] Create category navigation component
- [ ] Create product card component
- [ ] Create product listing page
- [ ] Display product name, price, availability
- [ ] Style menu cards

### 11. Build Frontend - Cart UI
- [ ] Create CartContext for state management
- [ ] Create shopping cart component
- [ ] Add quantity controls (+/-)
- [ ] Display individual prices
- [ ] Calculate and display total amount
- [ ] Remove item functionality

### 12. Build Frontend - User Auth
- [ ] Create Login page
- [ ] Create Register page
- [ ] Create Profile page
- [ ] Store JWT in localStorage/cookies

### 13. Build Frontend - Order Confirmation
- [ ] Create checkout page
- [ ] Create order placement button
- [ ] Show loading state during order
- [ ] Create order confirmation page
- [ ] Display order reference number
- [ ] Show order summary

### 14. API Integration
- [ ] Create API service (`/client/src/services/api.js`)
- [ ] Configure axios with base URL and x-api-key header
- [ ] Create auth service
- [ ] Create product service
- [ ] Create cart service
- [ ] Create order service

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
