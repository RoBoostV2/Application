// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeHeroAnimation();
    initializeDownloads();
    initializeFAQ();
    initializeScrollAnimations();
    initializeProgressBars();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero section animations
function initializeHeroAnimation() {
    const heroProgress = document.getElementById('heroProgress');
    
    if (heroProgress) {
        // Animate the hero progress bar
        setTimeout(() => {
            heroProgress.style.width = '100%';
        }, 1000);
        
        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            setTimeout(() => {
                progressText.textContent = 'System Ready - Download Available';
            }, 2000);
        }
    }
}

// Download functionality
function initializeDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const modal = document.getElementById('downloadModal');
    const closeModal = document.querySelector('.close');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            startDownload(platform);
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function startDownload(platform) {
    const modal = document.getElementById('downloadModal');
    const downloadStatus = document.getElementById('downloadStatus');
    
    if (modal && downloadStatus) {
        modal.style.display = 'block';
        
        // Simulate download process
        const steps = [
            'Preparing download...',
            'Selecting best server...',
            'Initializing download...',
            'Download started successfully!'
        ];
        
        let currentStep = 0;
        const interval = setInterval(() => {
            downloadStatus.textContent = steps[currentStep];
            currentStep++;
            
            if (currentStep >= steps.length) {
                clearInterval(interval);
                setTimeout(() => {
                    downloadStatus.textContent = `RoBoost V2 for ${platform} is downloading...`;
                    // Here you would typically trigger the actual download
                    triggerDownload(platform);
                }, 1000);
            }
        }, 800);
    }
}

function triggerDownload(platform) {
    // In a real application, this would download the actual file
    const downloadUrls = {
        'windows': '#', // Replace with actual download URL
        'mac': '#',     // Replace with actual download URL
        'linux': '#'    // Replace with actual download URL
    };
    
    // Simulate file download (in real app, this would be actual file URLs)
    console.log(`Starting download for ${platform}`);
    
    // Close modal after a delay
    setTimeout(() => {
        const modal = document.getElementById('downloadModal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Show success notification
        showNotification(`Download started for ${platform}!`, 'success');
    }, 2000);
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes to elements
    const elementsToAnimate = [
        '.download-card',
        '.step',
        '.requirement-card',
        '.support-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    });
}

// Progress bar animations
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width || '0%';
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Support functionality
function initializeSupportOptions() {
    const supportButtons = document.querySelectorAll('.support-card .btn');
    
    supportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardTitle = this.closest('.support-card').querySelector('h3').textContent;
            
            switch(cardTitle) {
                case 'Live Chat':
                    openLiveChat();
                    break;
                case 'Email Support':
                    openEmailSupport();
                    break;
                case 'Documentation':
                    openDocumentation();
                    break;
            }
        });
    });
}

function openLiveChat() {
    showNotification('Live chat feature coming soon!', 'info');
}

function openEmailSupport() {
    window.location.href = 'mailto:support@roboost.com?subject=RoBoost V2 Support Request';
}

function openDocumentation() {
    showNotification('Documentation will open in a new tab', 'info');
    // In real app, this would open documentation
    // window.open('/docs', '_blank');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--success-color)' : 
                   type === 'error' ? 'var(--error-color)' : 
                   'var(--primary-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--box-shadow)',
        zIndex: '3000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(31, 41, 55, 0.98)';
    } else {
        header.style.background = 'rgba(31, 41, 55, 0.95)';
    }
});

// Initialize support options when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSupportOptions();
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(31, 41, 55, 0.98)';
    } else {
        header.style.background = 'rgba(31, 41, 55, 0.95)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Loading state management
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        element.disabled = false;
        element.innerHTML = element.dataset.originalText || 'Download';
    }
}

// Store original button text
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.dataset.originalText = btn.innerHTML;
});

// Error handling for downloads
function handleDownloadError(platform, error) {
    console.error(`Download error for ${platform}:`, error);
    showNotification(`Download failed for ${platform}. Please try again.`, 'error');
    
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Browser compatibility checks
function checkBrowserCompatibility() {
    const isModernBrowser = 'IntersectionObserver' in window && 
                           'fetch' in window && 
                           'Promise' in window;
    
    if (!isModernBrowser) {
        showNotification('Your browser may not support all features. Please update for the best experience.', 'warning');
    }
}

// Initialize compatibility check
document.addEventListener('DOMContentLoaded', checkBrowserCompatibility);
