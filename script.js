/* ==========================================
   CYBER TECH - Main JavaScript
   ========================================== */

// Show/Hide Sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Update nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    const activeNav = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Save preference
    localStorage.setItem('lastSection', sectionId);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.news-card, .app-card, .tool-card, .card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (searchTerm === '' || text.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.altKey) {
        switch(e.key.toUpperCase()) {
            case 'H':
                showSection('home');
                break;
            case 'N':
                showSection('news');
                break;
            case 'A':
                showSection('apps');
                break;
            case 'T':
                showSection('tools');
                break;
            case 'P':
                showSection('profile');
                break;
        }
    }
});

// Navigation triggers
document.querySelectorAll('.nav-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        showSection(section);
    });
});

// Load last section from localStorage
window.addEventListener('load', function() {
    const lastSection = localStorage.getItem('lastSection') || 'home';
    showSection(lastSection);
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add glow effect on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.8)';
    } else {
        header.style.boxShadow = 'var(--glow-green)';
    }
});

// Animate cards on load
function animateCards() {
    const cards = document.querySelectorAll('.glow-card, .card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.5s ease-in ${index * 0.1}s forwards`;
    });
}

// Call animation when section changes
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.classList.contains('active')) {
            animateCards();
        }
    });
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section, { attributes: true, attributeFilter: ['class'] });
});

// Initialize animations on page load
window.addEventListener('load', animateCards);

// Dark mode toggle (optional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Log startup message
console.log('%cCYBER TECH 🛡️', 'font-size: 20px; color: #00ff88; font-weight: bold; text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);');
console.log('%cKaribu - Teknolojia na Cybersecurity Tips\nVersion 1.0.0\n\nKeyboard Shortcuts:\nAlt+H - Home\nAlt+N - News\nAlt+A - Apps\nAlt+T - Tools\nAlt+P - Profile', 'color: #00d9ff; font-size: 12px; line-height: 1.8;');