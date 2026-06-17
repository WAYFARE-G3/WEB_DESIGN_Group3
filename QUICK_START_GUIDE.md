# Quick Start Guide - Wayfare Authentication System

## 🚀 Cách Chạy Project

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd spring-boot-backend
   ```

2. **Build project (install dependencies):**
   ```bash
   mvn clean install
   ```

3. **Run Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```
   
   Or từ IDE (IntelliJ/Eclipse):
   - Right-click `WayFareApplication.java`
   - Select "Run 'WayFareApplication'"

4. **Verify backend is running:**
   ```
   http://localhost:8080/api/tours
   ```
   Should return JSON with tours data

### Frontend Setup

1. **Open index.html or login.html in browser:**
   ```
   file:///path/to/WEB_DESIGN_Group3/index.html
   ```

   Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 5500
   
   # Using Node.js
   npx http-server -p 5500
   ```
   
   Then access:
   ```
   http://localhost:5500/index.html
   ```

---

## 📱 Testing Authentication Flow

### 1. Register New User

**Step 1:** Go to http://localhost:5500/register.html

**Step 2:** Fill in the form:
- Username: `testuser123`
- Email: `test@example.com`
- Full Name: `Test User` (optional)
- Password: `Password@123`
- Confirm Password: `Password@123`

**Step 3:** Click "Create Account"

**Expected Result:**
- ✅ Account created successfully
- ✅ Auto-logged in
- ✅ Redirected to home page
- ✅ Navbar shows user name

### 2. Test Navbar Update

After successful registration/login:
- ✅ Login/Register buttons hidden
- ✅ User name displayed
- ✅ Profile link visible
- ✅ Logout button available

### 3. Test Logout

**Step 1:** Click "Logout" button

**Step 2:** Confirm logout

**Expected Result:**
- ✅ Logged out successfully
- ✅ Navbar reverts to Login/Register buttons
- ✅ Redirected to home page

### 4. Test Login

**Step 1:** Go to http://localhost:5500/login.html

**Step 2:** Fill in the form:
- Email or Username: `testuser123` or `test@example.com`
- Password: `Password@123`

**Step 3:** Click "Sign In"

**Expected Result:**
- ✅ Login successful
- ✅ Redirected to home page
- ✅ Navbar updated with user name

---

## 🔍 Debugging Tips

### 1. Check Browser Console

**Open DevTools:** F12 or Right-click → Inspect

**Console tab:** Should show:
```
Initializing navbar...
Initializing login page...
Auth status changed: {isLoggedIn: true, user: {...}}
```

### 2. Check Network Requests

**Network tab in DevTools:**
- Look for POST requests to `localhost:8080/api/auth/login`
- Check response status: 200 = Success, 401 = Failed

### 3. Check LocalStorage

**DevTools → Application → LocalStorage:**
- `authToken` - Should contain JWT token
- `currentUser` - Should contain user object (JSON)

### 4. Check Backend Logs

**Terminal where Spring Boot is running:**
```
POST /api/auth/login - User login attempt: test@example.com
Login successful for user: test@example.com
```

---

## ❌ Common Issues & Solutions

### Issue 1: "API request failed" or "Network error"

**Cause:** Backend not running or CORS issue

**Solution:**
```bash
# Make sure backend is running
mvn spring-boot:run

# Check if port 8080 is available
netstat -an | grep 8080  # Linux/Mac
netstat -an | findstr 8080  # Windows
```

### Issue 2: "Invalid email/username or password"

**Cause:** Wrong credentials or user doesn't exist

**Solution:**
- Make sure to register first
- Check username/email spelling
- Password is case-sensitive

### Issue 3: "Passwords do not match"

**Cause:** Password and confirm password fields don't match

**Solution:**
- Make sure both fields have identical value
- Check for extra spaces

### Issue 4: "Email already registered"

**Cause:** Email already used by another account

**Solution:**
- Use different email address
- Or login with existing account

### Issue 5: Navbar not updating after login

**Cause:** navbar.js not loaded or JavaScript error

**Solution:**
1. Check DevTools console for errors
2. Verify script tag in HTML: `<script src="assets/js/navbar.js"></script>`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Reload page (Ctrl+F5)

### Issue 6: Form not submitting

**Cause:** Form validation failed or JavaScript error

**Solution:**
1. Check DevTools console for errors
2. Check all required fields are filled
3. Verify form has correct `data-form` attribute
4. Check input `name` attributes match expected names

---

## 🔐 Security Notes

### Never Do:
- ❌ Store password in localStorage
- ❌ Send password without HTTPS (in production)
- ❌ Display JWT token in console (remove console.log in production)
- ❌ Share JWT secret key

### Best Practices:
- ✅ JWT token automatically included in API requests
- ✅ Token automatically cleared on logout
- ✅ Token automatically cleared on 401/403 response
- ✅ Password is hashed with BCrypt
- ✅ CORS configured for frontend access

---

## 📊 Database

### Database Schema

**users table:**
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url VARCHAR(255),
  role ENUM('USER', 'ADMIN', 'MODERATOR') DEFAULT 'USER',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Check Database Connection

**Check application-dev.properties or application.properties:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wayfare
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Make sure MySQL is running:
```bash
# Windows
net start MySQL80

# Linux
sudo service mysql start

# Mac
brew services start mysql
```

---

## 📝 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/auth/logout` | User logout |
| GET | `/tours` | Get all tours |
| GET | `/tours/{id}` | Get tour by ID |

### Request Headers

**Authenticated Requests:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 🎯 Next Steps

1. **Test API with Postman/Insomnia** for backend validation
2. **Add user profile page** to view/edit user info
3. **Add "Forgot Password"** functionality
4. **Add email verification** on registration
5. **Setup HTTPS** for production
6. **Add refresh token** mechanism
7. **Setup environment variables** for secrets

---

## 📞 Support

If you encounter issues:

1. **Check console errors** (F12 DevTools)
2. **Check network requests** (Network tab)
3. **Check backend logs** (Terminal)
4. **Verify all file paths** are correct
5. **Make sure all dependencies are installed** (`mvn install`)
6. **Clear browser cache** and reload

---

**Happy Coding! 🚀**
