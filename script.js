// ==========================================
// CYBER TECH - JavaScript Functionality
// ==========================================

// DOM Elements
const contentSection = document.getElementById('content');
const navItems = document.querySelectorAll('.nav-item');
const contactModal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close');
const sections = document.querySelectorAll('.section');

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the section name
        const sectionName = item.getAttribute('data-section');
        
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Remove active class from all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to the target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Set home as default active
document.querySelector('[data-section="home"]').classList.add('active');
document.getElementById('home').classList.add('active');

// ==========================================
// CONTACT MODAL FUNCTIONALITY
// ==========================================

function openContact() {
    contactModal.classList.add('show');
}

function closeContact() {
    contactModal.classList.remove('show');
}

// Close modal when clicking the X button
if (closeBtn) {
    closeBtn.addEventListener('click', closeContact);
}

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        closeContact();
    }
});

// ==========================================
// PROFILE FUNCTIONS
// ==========================================

function editProfile() {
    alert('Rekebisha profile feature - Coming soon! 🚀');
    // TODO: Implement profile edit modal
}

function logout() {
    if (confirm('Je, una hakika unataka kuondoka?')) {
        // Clear any stored user data
        localStorage.removeItem('userProfile');
        alert('Umeondoka kwa mafanikio!');
        // Redirect to home
        window.location.reload();
    }
}

// ==========================================
// USER PROFILE DATA
// ==========================================

const userProfile = {
    name: 'Cyber Tech User',
    email: 'user@cybertech.com',
    username: '@cybertech_user',
    status: 'Active Developer',
    bio: '👨‍💻 Developer | 🔐 Cybersecurity Enthusiast | 🌐 Tech Blogger',
    posts: 12,
    followers: 345,
    following: 89,
    joinDate: '26 April 2026'
};

// Load user profile
function loadUserProfile() {
    const storedProfile = localStorage.getItem('userProfile');
    const profile = storedProfile ? JSON.parse(storedProfile) : userProfile;
    
    const profileNameEl = document.getElementById('profile-name');
    if (profileNameEl) {
        profileNameEl.textContent = profile.name;
    }
}

// Initialize profile on page load
loadUserProfile();

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query === '') {
            // Show all cards
            document.querySelectorAll('.card, .news-card, .app-card, .tool-card').forEach(card => {
                card.style.display = '';
            });
            return;
        }

        // Search through all cards
        document.querySelectorAll('.card, .news-card, .app-card, .tool-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
    // Alt + H = Home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        document.querySelector('[data-section="home"]').click();
    }
    
    // Alt + N = News
    if (e.altKey && e.key === 'n') {
        e.preventDefault();
        document.querySelector('[data-section="news"]').click();
    }
    
    // Alt + A = Apps
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        document.querySelector('[data-section="apps"]').click();
    }
    
    // Alt + T = Tools
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        document.querySelector('[data-section="tools"]').click();
    }
    
    // Alt + P = Profile
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        document.querySelector('[data-section="profile"]').click();
    }
});

// ==========================================
// LOCAL STORAGE MANAGEMENT
// ==========================================

// Save user preferences
function savePreferences(preferences) {
    localStorage.setItem('cybertech_preferences', JSON.stringify(preferences));
}

// Load user preferences
function loadPreferences() {
    const stored = localStorage.getItem('cybertech_preferences');
    return stored ? JSON.parse(stored) : {
        theme: 'dark',
        notifications: true,
        language: 'sw'
    };
}

// ==========================================
// THEME TOGGLE (Future Enhancement)
// ==========================================

function toggleTheme() {
    const prefs = loadPreferences();
    prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark';
    savePreferences(prefs);
    // TODO: Implement theme switching logic
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 300;
            animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        .notification-info {
            background: rgba(0, 217, 255, 0.8);
        }
        .notification-success {
            background: rgba(0, 255, 136, 0.8);
        }
        .notification-error {
            background: rgba(255, 0, 110, 0.8);
        }
        .notification-warning {
            background: rgba(255, 165, 0, 0.8);
        }
        .notification.hide {
            animation: slideOut 0.3s ease;
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('🌐 Cyber Tech loaded successfully!');
    console.log('Keyboard shortcuts: Alt+H (Home), Alt+N (News), Alt+A (Apps), Alt+T (Tools), Alt+P (Profile)');
});

// ==========================================
// ERROR HANDLING
// ==========================================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    showNotification('Karibu kuwa na error! Tafadhali jaribu tena.', 'error');
});

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Load preferences
    const prefs = loadPreferences();
    
    // Initialize tooltips
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseover', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 255, 136, 0.9);
                color: #0a0e27;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
            `;
            el.appendChild(tooltip);
        });
        
        el.addEventListener('mouseout', () => {
            const tooltip = el.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Animate counter
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Intersection Observer for lazy loading
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for lazy loading animation
document.querySelectorAll('.card, .news-card, .app-card, .tool-card').forEach(card => {
    observer.observe(card);
});

// ==========================================
// SERVICE WORKER (Optional for PWA)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration - uncomment to enable PWA features
        // navigator.serviceWorker.register('sw.js').then(reg => {
        //     console.log('Service Worker registered');
        // }).catch(err => {
        //     console.log('Service Worker registration failed:', err);
        // });
    });
}

// ==========================================
// ANALYTICS & TRACKING (Optional)
// ==========================================

// Track page views
function trackPageView(sectionName) {
    console.log(`Page viewed: ${sectionName}`);
    // TODO: Integrate with analytics service (Google Analytics, etc.)
}

// Track events
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // TODO: Integrate with analytics service
}

// Export functions for global use
window.CyberTech = {
    openContact,
    closeContact,
    editProfile,
    logout,
    showNotification,
    trackEvent,
    trackPageView
};
