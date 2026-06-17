/**
 * Login page - handles login form submission
 */

// Selectors
const loginFormSelector = '[data-form="login"]';
const loginSubmitBtnSelector = '[data-login-submit]';
const loginErrorSelector = '[data-login-error]';
const loginLoadingSelector = '[data-login-loading]';

/**
 * Initialize login page
 */
function initLoginPage() {
    console.log('Initializing login page...');
    
    // Check if already logged in
    if (isUserAuthenticated()) {
        console.log('User already logged in, redirecting...');
        const redirectUrl = getRedirectUrl();
        window.location.href = redirectUrl || '/index.html';
        return;
    }
    
    // Setup form event listeners
    setupLoginForm();
}

/**
 * Setup login form
 */
function setupLoginForm() {
    const form = document.querySelector(loginFormSelector);
    
    if (!form) {
        console.warn('Login form not found');
        return;
    }
    
    form.addEventListener('submit', handleLoginSubmit);
    
    // Clear error on input focus
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            clearLoginError();
        });
    });
}

/**
 * Handle login form submission
 * @param {Event} e
 */
async function handleLoginSubmit(e) {
    e.preventDefault();
    
    const form = document.querySelector(loginFormSelector);
    const submitBtn = document.querySelector(loginSubmitBtnSelector);
    const errorDiv = document.querySelector(loginErrorSelector);
    const loadingDiv = document.querySelector(loginLoadingSelector);
    
    if (!form) return;
    
    // Get form data
    const emailOrUsername = form.querySelector('input[name="emailOrUsername"]')?.value.trim();
    const password = form.querySelector('input[name="password"]')?.value;
    
    // Validate form
    if (!emailOrUsername || !password) {
        showLoginError('Please fill in all fields');
        return;
    }
    
    // Disable submit button and show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
    }
    if (loadingDiv) {
        loadingDiv.style.display = 'block';
    }
    
    // Clear previous errors
    clearLoginError();
    
    // Perform login
    const result = await login(emailOrUsername, password);
    
    // Re-enable submit button
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
    
    if (result.success) {
        console.log('Login successful');
        
        // Show success message
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.style.borderColor = '#28a745';
            errorDiv.style.color = '#28a745';
            errorDiv.textContent = 'Login successful! Redirecting...';
        }
        
        // Redirect after short delay
        setTimeout(() => {
            const redirectUrl = getRedirectUrl();
            window.location.href = redirectUrl || '/index.html';
        }, 1000);
    } else {
        console.log('Login failed:', result.message);
        showLoginError(result.message || 'Login failed');
        
        // Clear password field
        form.querySelector('input[name="password"]').value = '';
    }
}

/**
 * Show login error message
 * @param {string} message
 */
function showLoginError(message) {
    const errorDiv = document.querySelector(loginErrorSelector);
    
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.style.borderColor = '#dc3545';
        errorDiv.style.color = '#dc3545';
        errorDiv.textContent = message;
    } else {
        alert(message);
    }
}

/**
 * Clear login error message
 */
function clearLoginError() {
    const errorDiv = document.querySelector(loginErrorSelector);
    
    if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }
}

/**
 * Get redirect URL from query parameter
 * @returns {string|null}
 */
function getRedirectUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('redirect');
}

/**
 * Handle "Register" link click
 */
function goToRegister() {
    window.location.href = '/register.html';
}

/**
 * Handle "Forgot Password" link click (optional)
 */
function goToForgotPassword() {
    // Implement forgot password functionality
    alert('Forgot password functionality coming soon!');
}

// Initialize login page when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginPage);
} else {
    initLoginPage();
}
