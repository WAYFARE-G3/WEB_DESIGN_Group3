/**
 * Register page - handles registration form submission
 */

// Selectors
const registerFormSelector = '[data-form="register"]';
const registerSubmitBtnSelector = '[data-register-submit]';
const registerErrorSelector = '[data-register-error]';
const registerLoadingSelector = '[data-register-loading]';
const registerPasswordSelector = 'input[name="password"]';
const registerConfirmPasswordSelector = 'input[name="confirmPassword"]';
const registerPasswordMatchSelector = '[data-password-match]';

/**
 * Initialize register page
 */
function initRegisterPage() {
    console.log('Initializing register page...');
    
    // Check if already logged in
    if (isUserAuthenticated()) {
        console.log('User already logged in, redirecting...');
        window.location.href = '/index.html';
        return;
    }
    
    // Setup form event listeners
    setupRegisterForm();
}

/**
 * Setup register form
 */
function setupRegisterForm() {
    const form = document.querySelector(registerFormSelector);
    
    if (!form) {
        console.warn('Register form not found');
        return;
    }
    
    form.addEventListener('submit', handleRegisterSubmit);
    
    // Setup password match validation
    const passwordInput = form.querySelector(registerPasswordSelector);
    const confirmPasswordInput = form.querySelector(registerConfirmPasswordSelector);
    
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', validatePasswordMatch);
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }
    
    // Clear error on input focus
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            clearRegisterError();
        });
    });
}

/**
 * Validate password match
 */
function validatePasswordMatch() {
    const form = document.querySelector(registerFormSelector);
    const passwordInput = form.querySelector(registerPasswordSelector);
    const confirmPasswordInput = form.querySelector(registerConfirmPasswordSelector);
    const matchDiv = document.querySelector(registerPasswordMatchSelector);
    
    if (!passwordInput || !confirmPasswordInput || !matchDiv) return;
    
    if (confirmPasswordInput.value === '') {
        matchDiv.style.display = 'none';
        return;
    }
    
    if (passwordInput.value === confirmPasswordInput.value) {
        matchDiv.style.display = 'block';
        matchDiv.style.color = '#28a745';
        matchDiv.textContent = '✓ Passwords match';
    } else {
        matchDiv.style.display = 'block';
        matchDiv.style.color = '#dc3545';
        matchDiv.textContent = '✗ Passwords do not match';
    }
}

/**
 * Handle register form submission
 * @param {Event} e
 */
async function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const form = document.querySelector(registerFormSelector);
    const submitBtn = document.querySelector(registerSubmitBtnSelector);
    const errorDiv = document.querySelector(registerErrorSelector);
    const loadingDiv = document.querySelector(registerLoadingSelector);
    
    if (!form) return;
    
    // Get form data
    const formData = {
        username: form.querySelector('input[name="username"]')?.value.trim(),
        email: form.querySelector('input[name="email"]')?.value.trim(),
        password: form.querySelector('input[name="password"]')?.value,
        confirmPassword: form.querySelector('input[name="confirmPassword"]')?.value,
        fullName: form.querySelector('input[name="fullName"]')?.value.trim() || '',
        phone: form.querySelector('input[name="phone"]')?.value.trim() || '',
    };
    
    // Validate form
    const validation = validateRegisterForm(formData);
    if (!validation.valid) {
        showRegisterError(validation.error);
        return;
    }
    
    // Disable submit button and show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';
    }
    if (loadingDiv) {
        loadingDiv.style.display = 'block';
    }
    
    // Clear previous errors
    clearRegisterError();
    
    // Perform registration
    const result = await register(formData);
    
    // Re-enable submit button
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
    }
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
    
    if (result.success) {
        console.log('Registration successful');
        
        // Show success message
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.style.borderColor = '#28a745';
            errorDiv.style.color = '#28a745';
            errorDiv.textContent = 'Registration successful! Redirecting...';
        }
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = '/index.html';
        }, 1000);
    } else {
        console.log('Registration failed:', result.message);
        showRegisterError(result.message || 'Registration failed');

        // Keep error visible for 5 seconds
        setTimeout(() => {
            clearRegisterError();
        }, 5000);
    }
}

/**
 * Validate register form
 * @param {object} formData
 * @returns {object}
 */
function validateRegisterForm(formData) {
    // Check required fields
    if (!formData.username) {
        return { valid: false, error: 'Username is required' };
    }
    
    if (!formData.email) {
        return { valid: false, error: 'Email is required' };
    }
    
    if (!formData.password) {
        return { valid: false, error: 'Password is required' };
    }
    
    if (!formData.confirmPassword) {
        return { valid: false, error: 'Please confirm your password' };
    }
    
    // Validate username length
    if (formData.username.length < 3) {
        return { valid: false, error: 'Username must be at least 3 characters' };
    }
    
    if (formData.username.length > 50) {
        return { valid: false, error: 'Username must not exceed 50 characters' };
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return { valid: false, error: 'Please enter a valid email address' };
    }
    
    // Validate password length
    if (formData.password.length < 6) {
        return { valid: false, error: 'Password must be at least 6 characters' };
    }
    
    // Check password match
    if (formData.password !== formData.confirmPassword) {
        return { valid: false, error: 'Passwords do not match' };
    }
    
    // Validate phone format if provided
    if (formData.phone && !/^[0-9\s\-\+\(\)]*$/.test(formData.phone)) {
        return { valid: false, error: 'Please enter a valid phone number' };
    }
    
    return { valid: true };
}

/**
 * Show register error message
 * @param {string} message
 */
function showRegisterError(message) {
    const errorDiv = document.querySelector(registerErrorSelector);
    
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
 * Clear register error message
 */
function clearRegisterError() {
    const errorDiv = document.querySelector(registerErrorSelector);
    
    if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }
}

/**
 * Handle "Login" link click
 */
function goToLogin() {
    window.location.href = '/login.html';
}

// Initialize register page when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegisterPage);
} else {
    initRegisterPage();
}
