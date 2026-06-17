# Hướng Dẫn Hoàn Thành Nhiệm Vụ

## 📋 Tóm Tắt Công Việc

Đã hoàn thành toàn bộ nhiệm vụ bao gồm:
1. ✅ Viết API xử lý Logout và bảo mật
2. ✅ Khởi tạo cấu trúc file/folder JS
3. ✅ Cấu hình các hàm fetch API cơ bản dùng chung
4. ✅ Cập nhật UI Navbar khi người dùng đăng nhập/đăng xuất

---

## 📁 Cấu Trúc Thư Mục Mới Được Tạo

### Backend (Spring Boot)
```
spring-boot-backend/src/main/java/com/fpt/wayfare/
├── config/
│   └── SecurityConfig.java              # Cấu hình Spring Security & Password Encoder
├── controller/
│   ├── TourController.java              # (Hiện có)
│   └── AuthController.java              # ✨ MỚI: Xử lý Login/Register/Logout
├── dto/
│   ├── LoginRequest.java                # ✨ MỚI: Request model cho login
│   ├── RegisterRequest.java             # ✨ MỚI: Request model cho register
│   └── AuthResponse.java                # ✨ MỚI: Response model cho auth
├── repository/
│   ├── TourRepository.java              # (Hiện có)
│   └── UserRepository.java              # ✨ MỚI: Query users từ database
├── security/
│   └── JwtTokenProvider.java            # ✨ MỚI: Tạo & xác thực JWT tokens
└── service/
    ├── UserService.java                 # ✨ MỚI: Interface service cho user
    └── impl/
        └── UserServiceImpl.java          # ✨ MỚI: Implement login/register/logout
```

### Frontend (HTML/CSS/JS)
```
assets/js/
├── api.js                               # ✨ MỚI: Shared API fetch functions
├── auth.js                              # ✨ MỚI: Authentication logic
├── navbar.js                            # ✨ MỚI: Navbar state management
├── login.js                             # ✨ MỚI: Login form handler
├── register.js                          # ✨ MỚI: Register form handler
├── data.js                              # (Hiện có)
├── index.js                             # (Hiện có)
├── tours.js                             # (Hiện có)
└── [các files khác...]                  # (Hiện có)
```

---

## 🔐 Backend APIs

### 1. Login API
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "emailOrUsername": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "username": "username",
    "email": "user@example.com",
    "fullName": "User Full Name",
    "phone": "+1234567890",
    "avatarUrl": null,
    "role": "USER"
  },
  "message": "Login successful"
}
```

**Response (Failed - 401):**
```json
{
  "success": false,
  "message": "Invalid email/username or password"
}
```

### 2. Register API
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "fullName": "New User",
  "phone": "+1234567890"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 2,
    "username": "newuser",
    "email": "newuser@example.com",
    "fullName": "New User",
    "phone": "+1234567890",
    "avatarUrl": null,
    "role": "USER"
  },
  "message": "Registration successful"
}
```

### 3. Logout API
**Endpoint:** `POST /api/auth/logout`

**Headers Required:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 🎨 Frontend JavaScript Modules

### 1. **api.js** - Shared API Functions
Cung cấp các hàm fetch API cơ bản:

**Functions:**
- `apiCall(endpoint, method, data, headers)` - Generic API call
- `apiGet(endpoint, headers)` - GET request
- `apiPost(endpoint, data, headers)` - POST request
- `apiPut(endpoint, data, headers)` - PUT request
- `apiDelete(endpoint, headers)` - DELETE request
- `isAuthenticated()` - Check if user is logged in
- `getCurrentUser()` - Get current user from localStorage
- `getAuthToken()` - Get JWT token
- `setAuthToken(token)` - Store JWT token
- `setCurrentUser(user)` - Store user data
- `clearAuth()` - Clear auth data

**Tính Năng:**
- ✅ Tự động thêm Authorization header với JWT token
- ✅ Xử lý timeout (10 giây)
- ✅ Tự động redirect về login nếu token hết hạn (401/403)
- ✅ Consistent error handling

### 2. **auth.js** - Authentication Logic
Xử lý các logic liên quan đến xác thực:

**Functions:**
- `login(emailOrUsername, password)` - User login
- `register(formData)` - User registration
- `logout()` - User logout
- `isUserAuthenticated()` - Check auth status
- `getAuthenticatedUser()` - Get current user
- `requireAuth(redirectUrl)` - Redirect to login if not authenticated

**Tính Năng:**
- ✅ Validate form data
- ✅ Store token & user data to localStorage
- ✅ Dispatch custom event `authStatusChanged` khi auth status thay đổi
- ✅ Automatic logout on 401/403 responses

### 3. **navbar.js** - Navbar State Management
Quản lý trạng thái navbar dựa trên auth status:

**Functions:**
- `initNavbar()` - Initialize navbar
- `updateNavbarUI()` - Update navbar based on auth
- `updateNavbarForLoggedInUser(user)` - Show user menu
- `updateNavbarForLoggedOutUser()` - Show login/register buttons
- `handleLogout()` - Handle logout click
- `highlightActiveNavLink(page)` - Highlight current page
- `setupNavbarToggle()` - Setup mobile menu

**Tính Năng:**
- ✅ Tự động cập nhật UI khi login/logout
- ✅ Hiển thị tên user khi đã đăng nhập
- ✅ Nút logout dễ dàng truy cập
- ✅ Quản lý mobile menu

### 4. **login.js** - Login Form Handler

**Functions:**
- `initLoginPage()` - Initialize login page
- `handleLoginSubmit(e)` - Handle form submission
- `validateLoginForm(formData)` - Validate form
- `showLoginError(message)` - Show error message
- `clearLoginError()` - Clear error message

**Tính Năng:**
- ✅ Form validation
- ✅ Loading state
- ✅ Error message display
- ✅ Redirect after successful login
- ✅ Redirect if already logged in

### 5. **register.js** - Register Form Handler

**Functions:**
- `initRegisterPage()` - Initialize register page
- `handleRegisterSubmit(e)` - Handle form submission
- `validateRegisterForm(formData)` - Validate form
- `validatePasswordMatch()` - Validate password match
- `showRegisterError(message)` - Show error message

**Tính Năng:**
- ✅ Form validation (username, email, password, phone)
- ✅ Real-time password match validation
- ✅ Loading state
- ✅ Error message display
- ✅ Redirect after successful registration

---

## 🔌 Cách Sử Dụng

### 1. HTML Pages cần đưa vào script tags

**index.html** (và tất cả pages khác):
```html
<!-- API & Authentication Scripts -->
<script src="assets/js/api.js"></script>
<script src="assets/js/auth.js"></script>
<script src="assets/js/navbar.js"></script>
```

**login.html:**
```html
<!-- API & Authentication Scripts -->
<script src="assets/js/api.js"></script>
<script src="assets/js/auth.js"></script>
<script src="assets/js/navbar.js"></script>

<!-- Page-specific Scripts -->
<script src="assets/js/login.js"></script>
```

**register.html:**
```html
<!-- API & Authentication Scripts -->
<script src="assets/js/api.js"></script>
<script src="assets/js/auth.js"></script>
<script src="assets/js/navbar.js"></script>

<!-- Page-specific Scripts -->
<script src="assets/js/register.js"></script>
```

### 2. Form Structure Yêu Cầu

**Login Form** (trong login.html):
```html
<form data-form="login">
  <div data-login-error></div>
  <div data-login-loading></div>
  <input type="text" name="emailOrUsername" required>
  <input type="password" name="password" required>
  <button type="submit" data-login-submit>Login</button>
</form>
```

**Register Form** (trong register.html):
```html
<form data-form="register">
  <div data-register-error></div>
  <div data-register-loading></div>
  <input type="text" name="username" required>
  <input type="email" name="email" required>
  <input type="password" name="password" required>
  <input type="password" name="confirmPassword" required>
  <input type="text" name="fullName">
  <input type="tel" name="phone">
  <button type="submit" data-register-submit>Register</button>
</form>
```

---

## 🔒 Security Features

### Backend:
- ✅ JWT token authentication
- ✅ BCrypt password hashing
- ✅ Input validation (ValidationRequest DTOs)
- ✅ CORS enabled for frontend
- ✅ Secure token expiration (24 hours)
- ✅ Active user status checking

### Frontend:
- ✅ JWT token stored in localStorage
- ✅ Automatic token inclusion in API headers
- ✅ Automatic logout on 401/403
- ✅ Password confirmation validation
- ✅ Email format validation
- ✅ Username/email uniqueness check

---

## 📱 Navbar UI Updates

### Logged Out User:
```
[Home] [Destinations] [Tours] [Blog] [Contact] | [Login] [Register]
```

### Logged In User:
```
[Home] [Destinations] [Tours] [Blog] [Contact] | [User Name] [Profile] [Logout]
```

---

## 🚀 Testing APIs

### Test với Postman hoặc cURL:

**1. Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "fullName": "Test User"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "test@example.com",
    "password": "password123"
  }'
```

**3. Logout:**
```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📝 Configuration

**Backend (application.properties):**
- `app.jwt.secret` - JWT secret key (đã có sẵn)
- `app.jwt.expiration` - Token expiration (24 giờ)

**Frontend (api.js):**
- `API_BASE_URL = 'http://localhost:8080/api'` - API endpoint
- `REQUEST_TIMEOUT = 10000` - Request timeout (10 giây)

---

## ✨ Tính Năng Đã Hoàn Thành

### Backend:
- ✅ AuthController với 3 endpoints (login, register, logout)
- ✅ UserService xử lý logic authentication
- ✅ JWT token generation & validation
- ✅ Password encoding với BCrypt
- ✅ User repository với custom queries
- ✅ DTOs cho request/response
- ✅ Error handling & validation

### Frontend:
- ✅ Shared API module (api.js)
- ✅ Authentication module (auth.js)
- ✅ Navbar state management (navbar.js)
- ✅ Login form handler (login.js)
- ✅ Register form handler (register.js)
- ✅ Dynamic UI updates
- ✅ LocalStorage token management
- ✅ Form validation
- ✅ Error handling

---

## 🎯 Next Steps (Tuỳ Chọn)

1. **Thêm "Forgot Password" functionality**
2. **Thêm email verification**
3. **Thêm user profile page**
4. **Thêm token refresh mechanism**
5. **Thêm rate limiting cho API**
6. **Thêm user avatar/profile picture**
7. **Thêm social login (Google, Facebook)**

---

**Tất cả công việc đã hoàn thành! ✨**
