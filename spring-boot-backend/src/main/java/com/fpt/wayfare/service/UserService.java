package com.fpt.wayfare.service;

import com.fpt.wayfare.dto.AuthResponse;
import com.fpt.wayfare.dto.LoginRequest;
import com.fpt.wayfare.dto.RegisterRequest;
import com.fpt.wayfare.entity.User;

public interface UserService {
    
    /**
     * Authenticate user with email/username and password
     * @param loginRequest login credentials
     * @return authentication response with token and user info
     */
    AuthResponse login(LoginRequest loginRequest);
    
    /**
     * Register new user
     * @param registerRequest registration data
     * @return authentication response with token and user info
     */
    AuthResponse register(RegisterRequest registerRequest);
    
    /**
     * Logout user
     * @param token JWT token (optional, can be used for token blacklisting)
     * @return logout message
     */
    String logout(String token);
    
    /**
     * Get user by ID
     * @param id user ID
     * @return user entity
     */
    User getUserById(Long id);
    
    /**
     * Get user by email
     * @param email user email
     * @return user entity
     */
    User getUserByEmail(String email);
}
