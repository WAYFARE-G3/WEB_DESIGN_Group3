/**
 * Shared API configuration and fetch functions
 * Handles all API calls with consistent error handling and headers
 */

// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

/**
 * Utility function to make API requests
 * @param {string} endpoint - API endpoint path
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} data - Request body data (optional)
 * @param {object} headers - Additional headers (optional)
 * @returns {Promise} - API response
 */
async function apiCall(endpoint, method = 'GET', data = null, headers = {}) {
    try {
        // Get token from localStorage if available
        const token = localStorage.getItem('authToken');
        
        // Set default headers
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers,
        };
        
        // Add authorization header if token exists
        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
        
        // Prepare request options
        const options = {
            method,
            headers: defaultHeaders,
            signal: AbortSignal.timeout(REQUEST_TIMEOUT),
        };
        
        // Add body for non-GET requests
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        
        // Make the API call
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        let result;
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            result = await response.text();
        }
        
        // Check if response is successful
        if (!response.ok) {
            throw {
                status: response.status,
                data: result,
                message: result?.message || `API Error: ${response.status}`,
            };
        }
        
        return {
            success: true,
            status: response.status,
            data: result,
        };
    } catch (error) {
        console.error('API Call Error:', error);
        
        // Handle specific error types
        if (error.name === 'AbortError') {
            return {
                success: false,
                error: 'Request timeout',
            };
        }
        
        if (error.status) {
            // Handle authentication errors
            if (error.status === 401 || error.status === 403) {
                // Clear token and redirect to login
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
                window.location.href = '/login.html';
            }
            
            return {
                success: false,
                status: error.status,
                error: error.message || 'API request failed',
            };
        }
        
        return {
            success: false,
            error: error.message || 'Network error',
        };
    }
}

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {object} headers - Additional headers (optional)
 * @returns {Promise}
 */
async function apiGet(endpoint, headers = {}) {
    return apiCall(endpoint, 'GET', null, headers);
}

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @param {object} headers - Additional headers (optional)
 * @returns {Promise}
 */
async function apiPost(endpoint, data, headers = {}) {
    return apiCall(endpoint, 'POST', data, headers);
}

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body
 * @param {object} headers - Additional headers (optional)
 * @returns {Promise}
 */
async function apiPut(endpoint, data, headers = {}) {
    return apiCall(endpoint, 'PUT', data, headers);
}

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @param {object} headers - Additional headers (optional)
 * @returns {Promise}
 */
async function apiDelete(endpoint, headers = {}) {
    return apiCall(endpoint, 'DELETE', null, headers);
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

/**
 * Get current user from localStorage
 * @returns {object|null}
 */
function getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

/**
 * Get auth token from localStorage
 * @returns {string|null}
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Set auth token in localStorage
 * @param {string} token
 */
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

/**
 * Set current user in localStorage
 * @param {object} user
 */
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * Clear authentication data
 */
function clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
}
