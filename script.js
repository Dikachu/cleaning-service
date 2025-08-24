// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeBtn');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
});

function closeMobileNav() {
    mobileNav.classList.remove('active');
}

// Active Navigation Links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Statistics Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 16);
    });
}

// Gallery Filter
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');

        // Update active tab
        galleryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter gallery items
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 100);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Submission
function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    if (name && email && phone && service && message) {
        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! We will get back to you within 24 hours with your free quote.');

            // Reset form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('service').value = '';
            document.getElementById('message').value = '';

            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message & Get Free Quote';
            submitBtn.disabled = false;
        }, 2000);
    } else {
        alert('Please fill in all required fields.');
    }
}

// Quote Modal Function
function openQuoteModal(service) {
    const message = `I'm interested in your ${service} service. Please provide me with a detailed quote.`;
    document.getElementById('service').value = service.toLowerCase().replace(/[^a-z0-9]/g, '-');
    document.getElementById('message').value = message;

    // Scroll to contact form
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.1)';
    }
});

// Service Cards and Other Elements Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Trigger stats animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateStats();
            }
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

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.backgroundPositionY = speed + 'px';
    }
});

// Add hover effects to navigation
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Add pulse effect to CTA buttons
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(btn => {
    setInterval(() => {
        btn.classList.add('pulse');
        setTimeout(() => {
            btn.classList.remove('pulse');
        }, 2000);
    }, 10000);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active navigation
    updateActiveNav();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// Add scroll-to-top functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!document.querySelector('.scroll-top')) {
            const scrollTop = document.createElement('button');
            scrollTop.className = 'scroll-top';
            scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollTop.style.cssText = `
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
                    `;

            scrollTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            scrollTop.addEventListener('mouseenter', () => {
                scrollTop.style.transform = 'scale(1.1)';
            });

            scrollTop.addEventListener('mouseleave', () => {
                scrollTop.style.transform = 'scale(1)';
            });

            document.body.appendChild(scrollTop);
        }
    } else {
        const scrollTop = document.querySelector('.scroll-top');
        if (scrollTop) {
            scrollTop.remove();
        }
    }
});