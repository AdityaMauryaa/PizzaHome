# 🚀 Production Deployment Guide

## Issues Fixed
Your app was broken in production because:
1. ❌ Client was using localhost URLs in production
2. ❌ Unnecessary x-api-key middleware blocking requests
3. ❌ MongoDB connection leak (duplicate database name)
4. ❌ CORS configuration not logging rejected origins
5. ❌ Missing production environment files

✅ **All fixed! Authentication is now purely JWT-based via Authorization headers**

---

## 📋 Pre-Deployment Checklist

### 1. **Server Setup** (Backend)

#### Create `.env` file in `/server` folder:
```bash
cd server
cp .env.production.example .env
```

#### Edit `/server/.env` with your production values:
```env
# MongoDB Atlas - MUST include database name in URI
MONGO_URI=mongodb+srv://username:password@your-cluster.mongodb.net/pizzahome?retryWrites=true&w=majority

# Server Port (use your hosting provider's PORT or leave as-is)
PORT=3000

# JWT Secret - Generate using:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_64_character_random_string_here

# Production frontend URLs (comma-separated, no spaces)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 2. **Client Setup** (Frontend)

#### Edit `/client/.env.production` with your production backend URL:
```env
# Replace with your actual production backend URL
VITE_API_BASE_URL=https://your-production-backend.com/api
```

**Note:** No API key needed anymore! Authentication is purely JWT-based.

---

## 🔧 Deployment Steps

### Option A: Deploy to Vercel (Recommended for Client)

#### **Frontend (Client):**
1. Push code to GitHub
2. Import project in Vercel
3. Set **Root Directory** to `client`
4. Add environment variable in Vercel dashboard:
   - `VITE_API_BASE_URL` = your backend URL (e.g., `https://your-backend.com/api`)
5. Deploy!

#### **Backend (Server):**
Deploy to Railway, Render, or Heroku:
1. Set environment variables from your `.env` file
2. Ensure `start` script uses: `node src/server.js`
3. Deploy and note your backend URL

### Option B: Deploy to Single Platform (e.g., Railway)

1. Deploy backend first and get the URL
2. Update `client/.env.production` with that URL
3. Deploy frontend with correct env vars

---

## ✅ Post-Deployment Verification

1. **Check Backend:**
   - Visit: `https://your-backend-url.com/api/health` (if you have a health endpoint)
   - Verify CORS allows your frontend domain

2. **Check Frontend:**
   - Open browser console (F12)
   - Look for API errors
   - Verify requests go to production URL (not localhost)

3. **Test Critical Flows:**
   - User registration
   - Login
   - Add to cart
   - Checkout

---

## 🐛 Common Production Issues & Fixes

### Issue: "Network Error" or "Failed to fetch"
**Fix:** Check that `VITE_API_BASE_URL` in `.env.production` matches your backend URL

### Issue: "CORS Error"
**Fix:** Add your frontend URL to `ALLOWED_ORIGINS` in server `.env`
- Example: `ALLOWED_ORIGINS=https://myapp.vercel.app,https://www.myapp.com`
- Check server logs for "CORS blocked origin" messages

### Issue: "Unauthorized" or "Invalid token"
**Fix:** 
- Check that JWT token is being saved to localStorage on login
- Verify Authorization header is being sent with requests
- Check JWT_SECRET is set correctly in production

### Issue: "MongoDB Connection Failed"
**Fix:** 
- Whitelist your server's IP in MongoDB Atlas
- Or use `0.0.0.0/0` for all IPs (less secure)

---

## 📝 Environment Variables Summary

### Server (Backend) `.env`:
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/pizzahome?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=<64-char-random-string>
ALLOWED_ORIGINS=https://yourdomain.com
```

### Client (Frontend) `.env.production`:
```env
VITE_API_BASE_URL=https://your-backend.com/api
```

---

## 🔧 Authentication System

**Your app uses JWT token-based authentication:**
- ✅ Login/Register returns JWT token
- ✅ Token stored in localStorage on client
- ✅ Token sent via `Authorization: Bearer <token>` header
- ✅ Server validates JWT on protected routes
- ❌ No cookies, no API keys, no session management

---

## 🔒 Security Notes

1. **Never commit `.env` files** to Git (already in .gitignore)
2. **Generate strong random secrets** for production
3. **Use HTTPS** for both frontend and backend in production
4. **Restrict CORS** to only your frontend domains
5. **Whitelist specific IPs** in MongoDB Atlas if possible

---

## 🎯 Quick Fix Commands
Commands

Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Build client for production:
```bash
cd client
npm run build
```

Test production build locally:
```bash
cd client
npm run preview
```

---

## Need Help?

If you're still seeing issues:
1. Check browser console for errors (F12)
2. Check server logs for errors
3. Verify all environment variables are set correctly
4. Ensure your backend URL is accessible (not behind firewall)
