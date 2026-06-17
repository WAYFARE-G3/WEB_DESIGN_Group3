/**
 * Navbar module - handles navbar state and updates
 */

// Selectors
const navbarActionsSelector = '.navbar__actions';
const navbarMobileActionsSelector = '.navbar__mobile-actions';
const loginBtnSelector = '.btn-nav-auth--login';
const registerBtnSelector = '.btn-nav-auth--register';

/**
 * Initialize navbar
 */
function initNavbar() {
    console.log('Initializing navbar...');
    
    // Listen for auth status changes
    document.addEventListener('authStatusChanged', handleAuthStatusChange);
    
    // Initialize navbar based on current auth status
    updateNavbarUI();
    
    // Setup responsive navbar toggle
    setupNavbarToggle();
}

/**
 * Handle auth status changes
 * @param {CustomEvent} event
 */
function handleAuthStatusChange(event) {
    console.log('Auth status changed:', event.detail);
    updateNavbarUI();
}

/**
 * Update navbar UI based on auth status
 */
function updateNavbarUI() {
    const isLoggedIn = isUserAuthenticated();
    const user = getAuthenticatedUser();
    
    console.log('Updating navbar UI - Logged in:', isLoggedIn, 'User:', user);
    
    if (isLoggedIn && user) {
        updateNavbarForLoggedInUser(user);
    } else {
        updateNavbarForLoggedOutUser();
    }
}

/**
 * Update navbar for logged in user
 * @param {object} user
 */
function updateNavbarForLoggedInUser(user) {
    const navbarActions = document.querySelector(navbarActionsSelector);
    const navbarMobileActions = document.querySelector(navbarMobileActionsSelector);
    
    if (!navbarActions && !navbarMobileActions) {
        console.warn('Navbar actions not found');
        return;
    }
    
    // Create logged in menu HTML
    const menuHTML = `
        <div class="navbar__user-menu">
            <div class="navbar__user-info">
                <span class="navbar__user-name">${user.fullName || user.username}</span>
            </div>
            <div class="navbar__user-actions">
                <a href="profile.html" class="btn-nav-auth btn-nav-auth--profile">Profile</a>
                <button class="btn-nav-auth btn-nav-auth--logout" onclick="handleLogout()">Logout</button>
            </div>
        </div>
    `;
    
    // Update desktop navbar
    if (navbarActions) {
        navbarActions.innerHTML = menuHTML;
    }
    
    // Update mobile navbar
    if (navbarMobileActions) {
        navbarMobileActions.innerHTML = menuHTML;
    }
    
    console.log('Navbar updated for logged in user');
}

/**
 * Update navbar for logged out user
 */
function updateNavbarForLoggedOutUser() {
    const navbarActions = document.querySelector(navbarActionsSelector);
    const navbarMobileActions = document.querySelector(navbarMobileActionsSelector);
    
    if (!navbarActions && !navbarMobileActions) {
        console.warn('Navbar actions not found');
        return;
    }
    
    // Create logged out menu HTML
    const menuHTML = `
        <a href="login.html" class="btn-nav-auth btn-nav-auth--login" data-nav-link="login">Login</a>
        <a href="register.html" class="btn-nav-auth btn-nav-auth--register" data-nav-link="register">Register</a>
    `;
    
    // Update desktop navbar
    if (navbarActions) {
        navbarActions.innerHTML = menuHTML;
    }
    
    // Update mobile navbar
    if (navbarMobileActions) {
        navbarMobileActions.innerHTML = menuHTML;
    }
    
    console.log('Navbar updated for logged out user');
}

/**
 * Handle logout button click
 */
async function handleLogout() {
    // Show confirmation dialog (optional)
    if (confirm('Are you sure you want to logout?')) {
        const result = await logout();
        
        if (result.success) {
            console.log('Logout successful');
            // Redirect to home page
            window.location.href = '/index.html';
        } else {
            alert('Logout failed: ' + result.message);
        }
    }
}

/**
 * Setup navbar toggle for mobile
 */
function setupNavbarToggle() {
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navMobile = document.querySelector('[data-nav-mobile]');
    const navLinks = document.querySelectorAll('[data-nav-link]');
    
    if (!navToggle || !navMobile) {
        console.warn('Navbar toggle elements not found');
        return;
    }
    
    // Toggle menu on button click
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMobile.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navMobile.classList.remove('active');
        });
    });
}

/**
 * Get navbar action buttons
 * @returns {object}
 */
function getNavbarActionButtons() {
    return {
        loginBtn: document.querySelector(loginBtnSelector),
        registerBtn: document.querySelector(registerBtnSelector),
    };
}

/**
 * Highlight active navbar link
 * @param {string} page - Current page name
 */
function highlightActiveNavLink(page) {
    const navLinks = document.querySelectorAll('[data-nav-link]');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-nav-link');
        
        if (linkPage === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Update navbar active state based on current page
 */
function updateActiveNavLink() {
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
        highlightActiveNavLink(currentPage);
    }
}

// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initNavbar();
        updateActiveNavLink();
    });
} else {
    initNavbar();
    updateActiveNavLink();
}
