/**
 * Authentication module - handles login, register, and logout
 */

/**
 * User login
 * @param {string} emailOrUsername - Email or username
 * @param {string} password - User password
 * @returns {Promise}
 */
async function login(emailOrUsername, password) {
    try {
        const response = await apiPost('/auth/login', {
            emailOrUsername,
            password,
        });
        
        if (response.success && response.data?.success) {
            const { token, user } = response.data;
            
            // Store token and user data
            setAuthToken(token);
            setCurrentUser(user);
            
            // Trigger auth change event
            dispatchAuthChangeEvent(true, user);
            
            return {
                success: true,
                message: 'Login successful',
                user,
            };
        } else {
            return {
                success: false,
                message: response.data?.message || response.error || 'Login failed',
            };
        }
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login',
        };
    }
}

/**
 * User registration
 * @param {object} formData - Registration form data
 * @returns {Promise}
 */
async function register(formData) {
    try {
        // Validate form data
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            return {
                success: false,
                message: 'All fields are required',
            };
        }
        
        // Check password match
        if (formData.password !== formData.confirmPassword) {
            return {
                success: false,
                message: 'Passwords do not match',
            };
        }
        
        // Check password length
        if (formData.password.length < 6) {
            return {
                success: false,
                message: 'Password must be at least 6 characters',
            };
        }
        
        const response = await apiPost('/auth/register', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            fullName: formData.fullName || '',
            phone: formData.phone || '',
        });
        
        if (response.success && response.data?.success) {
            const { token, user } = response.data;
            
            // Store token and user data
            setAuthToken(token);
            setCurrentUser(user);
            
            // Trigger auth change event
            dispatchAuthChangeEvent(true, user);
            
            return {
                success: true,
                message: 'Registration successful',
                user,
            };
        } else {
            return {
                success: false,
                message: response.data?.message || response.error || 'Registration failed',
            };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: 'An error occurred during registration',
        };
    }
}

/**
 * User logout
 * @returns {Promise}
 */
async function logout() {
    try {
        const token = getAuthToken();
        
        // Call logout endpoint
        if (token) {
            await apiPost('/auth/logout', {});
        }
        
        // Clear authentication data
        clearAuth();
        
        // Trigger auth change event
        dispatchAuthChangeEvent(false, null);
        
        return {
            success: true,
            message: 'Logout successful',
        };
    } catch (error) {
        console.error('Logout error:', error);
        
        // Clear auth data even if API call fails
        clearAuth();
        dispatchAuthChangeEvent(false, null);
        
        return {
            success: true,
            message: 'Logout successful',
        };
    }
}

/**
 * Dispatch custom event for auth change
 * @param {boolean} isLoggedIn
 * @param {object} user
 */
function dispatchAuthChangeEvent(isLoggedIn, user) {
    const event = new CustomEvent('authStatusChanged', {
        detail: {
            isLoggedIn,
            user,
        },
    });
    
    document.dispatchEvent(event);
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
function isUserAuthenticated() {
    return isAuthenticated();
}

/**
 * Get current authenticated user
 * @returns {object|null}
 */
function getAuthenticatedUser() {
    return getCurrentUser();
}

/**
 * Redirect to login if not authenticated
 * @param {string} redirectUrl - URL to redirect to after login
 */
function requireAuth(redirectUrl = null) {
    if (!isAuthenticated()) {
        const params = redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : '';
        window.location.href = `/login.html${params}`;
    }
}
