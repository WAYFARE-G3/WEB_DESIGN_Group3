package com.fpt.wayfare.controller;

import com.fpt.wayfare.dto.AuthResponse;
import com.fpt.wayfare.dto.LoginRequest;
import com.fpt.wayfare.dto.RegisterRequest;
import com.fpt.wayfare.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class AuthController {
    
    private final UserService userService;
    
    
    /**
     * Login endpoint
     * POST /api/auth/login
     * 
     * Request body: {
     *   "emailOrUsername": "user@example.com",
     *   "password": "password123"
     * }
     * 
     * @param loginRequest login credentials
     * @return JWT token and user info on success
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        log.info("POST /api/auth/login - User login attempt: {}", loginRequest.getEmailOrUsername());
        
        AuthResponse response = userService.login(loginRequest);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    
    /**
     * Register endpoint
     * POST /api/auth/register
     * 
     * Request body: {
     *   "username": "newuser",
     *   "email": "newuser@example.com",
     *   "password": "password123",
     *   "confirmPassword": "password123",
     *   "fullName": "New User",
     *   "phone": "1234567890"
     * }
     * 
     * @param registerRequest registration data
     * @return JWT token and user info on success
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        log.info("POST /api/auth/register - User registration attempt: {}", registerRequest.getEmail());
        
        AuthResponse response = userService.register(registerRequest);
        
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    
    /**
     * Logout endpoint
     * POST /api/auth/logout
     * 
     * @param token JWT token from Authorization header
     * @return logout message
     */
    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logout(@RequestHeader(value = "Authorization", required = false) String token) {
        log.info("POST /api/auth/logout - User logout");
        
        // Remove "Bearer " prefix if present
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        
        String message = userService.logout(token);
        
        return ResponseEntity.ok(AuthResponse.builder()
                .success(true)
                .message(message)
                .build());
    }
}
