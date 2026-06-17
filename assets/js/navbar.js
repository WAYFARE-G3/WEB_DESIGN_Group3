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
    
    const displayName = user.fullName || user.username || 'User';
    const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const isAdmin = user.role === 'ADMIN';

    const adminMenuItem = isAdmin ? `
                <a href="admin-tours.html" class="user-dropdown__item" role="menuitem" style="color:var(--primary);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Admin Panel
                </a>
                <div class="user-dropdown__divider"></div>` : '';

    const desktopHTML = `
        <div class="user-dropdown" id="userDropdown">
            <button class="user-dropdown__trigger" id="userDropdownTrigger" aria-expanded="false" aria-haspopup="true">
                <span class="user-dropdown__avatar">${initials}</span>
                <span class="user-dropdown__name">${displayName}</span>
                <svg class="user-dropdown__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
            </button>
            <div class="user-dropdown__menu" id="userDropdownMenu" role="menu">
                <div class="user-dropdown__header">
                    <span class="user-dropdown__header-name">${displayName}</span>
                    <span class="user-dropdown__header-email">${user.email || ''}</span>
                </div>
                <div class="user-dropdown__divider"></div>
                ${adminMenuItem}
                <a href="profile.html" class="user-dropdown__item" role="menuitem">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    My Profile
                </a>
                <div class="user-dropdown__divider"></div>
                <button class="user-dropdown__item user-dropdown__item--danger" role="menuitem" onclick="handleLogout()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                </button>
            </div>
        </div>
    `;

    const mobileHTML = `
        <div class="navbar__mobile-user">
            <span class="user-dropdown__avatar user-dropdown__avatar--sm">${initials}</span>
            <span class="user-dropdown__name">${displayName}</span>
        </div>
        ${isAdmin ? `<a href="admin-tours.html" class="btn-ghost-nav" style="color:var(--primary);">Admin Panel</a>` : ''}
        <a href="profile.html" class="btn-ghost-nav">My Profile</a>
        <button class="btn-ghost-nav text-danger" onclick="handleLogout()" style="background:none;border:none;cursor:pointer;text-align:left;color:var(--destructive);">Logout</button>
    `;
    
    if (navbarActions) navbarActions.innerHTML = desktopHTML;
    if (navbarMobileActions) navbarMobileActions.innerHTML = mobileHTML;

    // Wire up dropdown toggle
    const trigger = document.getElementById('userDropdownTrigger');
    const menu = document.getElementById('userDropdownMenu');
    const dropdown = document.getElementById('userDropdown');

    if (trigger && menu) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('open');
            trigger.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    }
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
    const result = await logout();
    if (result.success) {
        window.location.href = '/index.html';
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
