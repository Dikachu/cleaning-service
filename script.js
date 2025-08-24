// Performance and Accessibility Optimized JavaScript
'use strict';

// Mobile Navigation Toggle with Accessibility
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeBtn');

// Accessibility: Update ARIA attributes
function updateMobileNavAccessibility(isOpen) {
    menuToggle.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
    
    if (isOpen) {
        // Trap focus in mobile nav
        mobileNav.focus();
    }
}

menuToggle.addEventListener('click', () => {
    mobileNav.classList.add('active');
    updateMobileNavAccessibility(true);
});

closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    updateMobileNavAccessibility(false);
    menuToggle.focus(); // Return focus to toggle button
});

function closeMobileNav() {
    mobileNav.classList.remove('active');
    updateMobileNavAccessibility(false);
}

// Close mobile nav on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileNav();
    }
});

// Active Navigation Links with Performance Optimization
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Debounced scroll handler for performance
let scrollTimeout;
function updateActiveNav() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update navigation states
        [navLinks, mobileNavLinks].forEach(linkArray => {
            linkArray.forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        });
    }, 10); // 10ms debounce
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Smooth Scrolling with Accessibility
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Announce to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Navigating to ${target.querySelector('h1, h2, h3')?.textContent || 'section'}`;
            document.body.appendChild(announcement);
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Focus management for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
            
            // Clean up announcement
            setTimeout(() => {
                announcement.remove();
            }, 1000);
        }
    });
});

// Statistics Counter Animation with Intersection Observer
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        // Use requestAnimationFrame for better performance
        function updateCounter() {
            current += increment;
            if (current >= target) {
                current = target;
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                return;
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Gallery Filter with Performance Optimization
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        
        // Update active tab with accessibility
        galleryTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-pressed', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-pressed', 'true');
        
        // Filter gallery items with smooth transitions
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const shouldShow = category === 'all' || itemCategory === category;
            
            if (shouldShow) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('show'), 10);
            } else {
                item.classList.remove('show');
                setTimeout(() => {
                    if (!item.classList.contains('show')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// Contact Form Handling with Validation and Accessibility
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation checks
        if (!name || !email || !phone || !service || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System with Accessibility
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times" aria-hidden="true"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for Animations with Performance Optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .pricing-card, .process-step, .stats');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Parallax Effect for Hero Section with Performance Optimization
let ticking = false;
function updateParallax() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            if (parallax) {
                const speed = scrolled * 0.3; // Reduced speed for better performance
                parallax.style.backgroundPositionY = speed + 'px';
            }
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateParallax, { passive: true });

// Enhanced Navigation Hover Effects
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// CTA Button Pulse Effect with Performance Optimization
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(btn => {
    let pulseInterval;
    
    const startPulse = () => {
        pulseInterval = setInterval(() => {
            btn.classList.add('pulse');
            setTimeout(() => {
                btn.classList.remove('pulse');
            }, 2000);
        }, 10000);
    };
    
    const stopPulse = () => {
        if (pulseInterval) {
            clearInterval(pulseInterval);
        }
    };
    
    // Start pulse when button is visible
    const btnObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startPulse();
            } else {
                stopPulse();
            }
        });
    });
    
    btnObserver.observe(btn);
});

// Initialize page with Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active navigation
    updateActiveNav();
    
    // Add loading animation
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
    
    // Initialize stats animation when visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        statsObserver.observe(statsSection);
    }
});

// Scroll-to-top functionality with Performance Optimization
let scrollTopButton = null;
let scrollTopTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTopTimeout);
    scrollTopTimeout = setTimeout(() => {
        if (window.scrollY > 500) {
            if (!scrollTopButton) {
                scrollTopButton = document.createElement('button');
                scrollTopButton.className = 'scroll-top';
                scrollTopButton.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
                scrollTopButton.setAttribute('aria-label', 'Scroll to top');
                scrollTopButton.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: var(--gradient-primary);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    z-index: 1000;
                    box-shadow: var(--shadow);
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: scale(0.8);
                `;
                
                scrollTopButton.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                
                scrollTopButton.addEventListener('mouseenter', () => {
                    scrollTopButton.style.transform = 'scale(1.1)';
                });
                
                scrollTopButton.addEventListener('mouseleave', () => {
                    scrollTopButton.style.transform = 'scale(1)';
                });
                
                document.body.appendChild(scrollTopButton);
                
                // Animate in
                requestAnimationFrame(() => {
                    scrollTopButton.style.opacity = '1';
                    scrollTopButton.style.transform = 'scale(1)';
                });
            }
        } else if (scrollTopButton) {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (scrollTopButton && scrollTopButton.parentNode) {
                    scrollTopButton.remove();
                    scrollTopButton = null;
                }
            }, 300);
        }
    }, 100);
}, { passive: true });

// Service Quote Modal Function
function openQuoteModal(serviceName) {
    // Create modal for service quotes
    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modal-title">Get Quote for ${serviceName}</h3>
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>Please contact us for a detailed quote for ${serviceName}.</p>
                <div class="modal-actions">
                    <a href="#contact" class="cta-button">Contact Us</a>
                    <button class="modal-close-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    });
    
    // Close functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    };
    
    modal.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .pulse {
        animation: pulse 2s ease-in-out;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .gallery-item {
        transition: all 0.3s ease;
    }
    
    .gallery-item.show {
        opacity: 1;
        transform: scale(1);
    }
    
    .gallery-item:not(.show) {
        opacity: 0;
        transform: scale(0.9);
    }
`;
document.head.appendChild(style);