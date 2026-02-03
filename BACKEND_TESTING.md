# 🧪 Backend API Testing Guide

## Setup

**Base URL (Development):** `http://localhost:3000/api`

**Start Server:**
```bash
cd server
npm run dev
```

---

## How to Test

You can use:
- **Postman** (recommended)
- **Thunder Client** (VS Code extension)
- **cURL** (command line)
- **Browser console** (fetch)

---

## 1️⃣ PUBLIC ROUTES (No Authentication Needed)

### Register New User

**Method:** `POST`  
**URL:** `http://localhost:3000/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

**Response:** Returns token - **SAVE THIS TOKEN!**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login User

**Method:** `POST`  
**URL:** `http://localhost:3000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Returns token - **SAVE THIS TOKEN!**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Get All Categories

**Method:** `GET`  
**URL:** `http://localhost:3000/api/categories`

**Headers:** None needed

**Body:** None

**Response:**
```json
[
  {
    "_id": "65abc123",
    "name": "Pizza",
    "description": "Delicious pizzas"
  }
]
```

---

### Get All Products

**Method:** `GET`  
**URL:** `http://localhost:3000/api/products`

**Headers:** None needed

**Body:** None

**Response:**
```json
[
  {
    "_id": "65abc456",
    "name": "Margherita Pizza",
    "description": "Classic cheese pizza",
    "price": 12.99,
    "category": "65abc123",
    "image": "margherita.jpg",
    "available": true
  }
]
```

---

### Get Product by ID

**Method:** `GET`  
**URL:** `http://localhost:3000/api/products/65abc456`  
(Replace `65abc456` with actual product ID)

**Headers:** None needed

**Body:** None

**Response:**
```json
{
  "_id": "65abc456",
  "name": "Margherita Pizza",
  "price": 12.99
}
```

---

### Get Products by Category

**Method:** `GET`  
**URL:** `http://localhost:3000/api/products/category/65abc123`  
(Replace `65abc123` with actual category ID)

**Headers:** None needed

**Body:** None

**Response:**
```json
[
  {
    "_id": "65abc456",
    "name": "Margherita Pizza",
    "category": "65abc123"
  }
]
```

---

## 2️⃣ PROTECTED ROUTES (Need Authentication Token)

**IMPORTANT:** For all routes below, add this header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```
(Replace `YOUR_TOKEN_HERE` with the token from login/register)

---

### Get User Profile

**Method:** `GET`  
**URL:** `http://localhost:3000/api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
{
  "_id": "65abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

---

### Update User Profile

**Method:** `PUT`  
**URL:** `http://localhost:3000/api/auth/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": "456 New St"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "name": "John Updated",
    "phone": "9876543210"
  }
}
```

---

### Get Cart

**Method:** `GET`  
**URL:** `http://localhost:3000/api/cart`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
{
  "_id": "65cart123",
  "user": "65abc123",
  "items": [
    {
      "product": {
        "name": "Margherita Pizza",
        "price": 12.99
      },
      "quantity": 2
    }
  ],
  "totalAmount": 25.98
}
```

---

### Add Item to Cart

**Method:** `POST`  
**URL:** `http://localhost:3000/api/cart`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "65abc456",
  "quantity": 2
}
```
(Replace `65abc456` with actual product ID from step "Get All Products")

**Response:**
```json
{
  "message": "Item added to cart",
  "cart": {
    "items": [...],
    "totalAmount": 25.98
  }
}
```

---

### Update Cart Item Quantity

**Method:** `PUT`  
**URL:** `http://localhost:3000/api/cart/65item1`  
(Replace `65item1` with actual item ID from your cart)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "quantity": 3
}
```

**Response:**
```json
{
  "message": "Cart updated",
  "cart": {
    "totalAmount": 38.97
  }
}
```

---

### Remove Item from Cart

**Method:** `DELETE`  
**URL:** `http://localhost:3000/api/cart/65item1`  
(Replace `65item1` with actual item ID)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
{
  "message": "Item removed from cart"
}
```

---

### Clear Entire Cart

**Method:** `DELETE`  
**URL:** `http://localhost:3000/api/cart`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
{
  "message": "Cart cleared successfully"
}
```

---

### Place Order

**Method:** `POST`  
**URL:** `http://localhost:3000/api/orders`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "items": [
    {
      "product": "65abc456",
      "quantity": 2,
      "price": 12.99
    }
  ],
  "totalAmount": 25.98,
  "deliveryAddress": "123 Main St, City",
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "65order123",
    "totalAmount": 25.98,
    "status": "pending"
  }
}
```

---

### Get All User Orders

**Method:** `GET`  
**URL:** `http://localhost:3000/api/orders`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
[
  {
    "_id": "65order123",
    "totalAmount": 25.98,
    "status": "pending",
    "createdAt": "2026-02-04T10:30:00.000Z"
  }
]
```

---

### Get Order by ID

**Method:** `GET`  
**URL:** `http://localhost:3000/api/orders/65order123`  
(Replace `65order123` with actual order ID)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
{
  "_id": "65order123",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [...],
  "totalAmount": 25.98,
  "status": "pending"
}
```

---

### Get Inventory Status

**Method:** `GET`  
**URL:** `http://localhost:3000/api/inventory`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
[
  {
    "_id": "65inv123",
    "product": "65abc456",
    "stock": 50
  }
]
```

---

### Update Inventory

**Method:** `PUT`  
**URL:** `http://localhost:3000/api/inventory/65abc456`  
(Replace `65abc456` with actual product ID)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**
```json
{
  "stock": 75
}
```

**Response:**
```json
{
  "message": "Inventory updated successfully",
  "inventory": {
    "product": "65abc456",
    "stock": 75
  }
}
```

---

### Check Stock Availability

**Method:** `GET`  
**URL:** `http://localhost:3000/api/inventory/check/65abc456`  
(Replace `65abc456` with actual product ID)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body:** None

**Response:**
```json
{
  "productId": "65abc456",
  "available": true,
  "stock": 75
}
```

---

## 🎯 Quick Testing Steps

1. **Start server:** `cd server && npm run dev`
2. **Register user** → Copy the token
3. **Test public routes** (categories, products) - no token needed
4. **Test protected routes** (cart, orders) - use token in header
5. Done!

---

## 💡 Tips

### In Postman:
1. Create new request
2. Set method (GET, POST, PUT, DELETE)
3. Enter URL
4. Add headers in "Headers" tab
5. Add body in "Body" tab → select "raw" → select "JSON"
6. Click "Send"

### Common Errors:

- **401 Unauthorized** → Add/fix Authorization header with token
- **400 Bad Request** → Check your JSON body format
- **404 Not Found** → Check URL is correct
- **500 Server Error** → Check server logs

---

## 📝 Test Checklist

- [ ] Register works - returns token
- [ ] Login works - returns token
- [ ] Get categories works - no auth needed
- [ ] Get products works - no auth needed
- [ ] Get profile works - with auth token
- [ ] Add to cart works - with auth token
- [ ] Get cart works - with auth token
- [ ] Place order works - with auth token
- [ ] Get orders works - with auth token

**All working? Ready for production! 🚀**
