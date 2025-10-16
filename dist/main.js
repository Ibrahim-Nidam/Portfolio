/**
 * Main TypeScript Entry Point
 * Initializes all functionality and coordinates different modules
 */
import { initTheme } from './theme.js';
import { initLanguage } from './language.js';
import { initGithubPortfolio } from './github.js';
import { initParticles } from './particles.js';
// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio initializing...');
    // Initialize theme system
    initTheme();
    // Initialize language system
    initLanguage();
    // Initialize GitHub portfolio
    initGithubPortfolio();
    // Initialize particle background
    initParticles();
    // Initialize other UI components
    initMobileMenu();
    initRotatingRoles();
    initCustomCursor();
    initScrollAnimations();
    initSkillsSection();
    initContactForm();
    initCVDownloads();
    initSmoothScrolling();
    console.log('✅ Portfolio initialized successfully!');
});
/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}
/**
 * Rotating Developer Roles
 */
/**
 * Rotating Developer Roles (Internationalized)
 */
function initRotatingRoles() {
    // Define roles in both languages - easy to add more roles
    const rolesData = {
        en: [
            'Full Stack Developer',
            'Frontend Developer',
            'Backend Developer',
            'JavaScript Developer',
            'React Developer',
            'Java Developer',
            'TypeScript Developer',
            'Node.js Developer',
        ],
        fr: [
            'Développeur Full Stack',
            'Développeur Frontend',
            'Développeur Backend',
            'Développeur JavaScript',
            'Développeur React',
            'Développeur Java',
            'Développeur TypeScript',
            'Développeur Node.js',
        ]
    };
    const roleElement = document.querySelector('.rotating-role');
    if (!roleElement)
        return;
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;
    function getCurrentLanguage() {
        return (document.documentElement.lang || 'en');
    }
    function getRoles() {
        const lang = getCurrentLanguage();
        return rolesData[lang] || rolesData.en;
    }
    function type() {
        const roles = getRoles();
        const currentRole = roles[currentIndex];
        if (isDeleting) {
            charIndex--;
        }
        else {
            charIndex++;
        }
        roleElement.textContent = currentRole.substring(0, charIndex);
        let delay = isDeleting ? deletingSpeed : typingSpeed;
        if (!isDeleting && charIndex === currentRole.length) {
            delay = pauseDuration;
            isDeleting = true;
        }
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % getRoles().length;
            delay = 500;
        }
        typingTimeout = window.setTimeout(type, delay);
    }
    // Start the animation
    type();
    // Restart animation when language changes (listen for language toggle clicks)
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.id === 'lang-toggle' || target.id === 'lang-toggle-mobile') {
            // Clear existing timeout
            clearTimeout(typingTimeout);
            // Reset and restart with new language
            currentIndex = 0;
            charIndex = 0;
            isDeleting = false;
            roleElement.textContent = '';
            // Small delay to let language change propagate
            setTimeout(type, 100);
        }
    });
}
/**
 * Custom Cursor Effect (Updated for better responsiveness)
 * Creates a glowing cursor that follows mouse movement smoothly
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor)
        return;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    // Smooth cursor animation using requestAnimationFrame
    function animateCursor() {
        // Smooth interpolation for cursor position (responsive but smooth)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = `${cursorX - 10}px`;
        cursor.style.top = `${cursorY - 10}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card-hover');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
    // Hide/show cursor when leaving/entering window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}
/**
 * Scroll Animations
 * Reveals elements as they come into viewport
 */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}
/**
 * Skills Section
 * Manages skill categories and animations
 */
function initSkillsSection() {
    const skillsData = [
        // Frontend
        { name: 'HTML5', category: 'frontend', icon: 'html', level: 95 },
        { name: 'CSS3', category: 'frontend', icon: 'css', level: 90 },
        { name: 'JavaScript', category: 'frontend', icon: 'js', level: 90 },
        { name: 'TypeScript', category: 'frontend', icon: 'ts', level: 90 },
        { name: 'React', category: 'frontend', icon: 'react', level: 85 },
        { name: 'Tailwind CSS', category: 'frontend', icon: 'tailwind', level: 90 },
        // Backend
        { name: 'Java', category: 'backend', icon: 'java', level: 88 },
        { name: 'Spring Boot', category: 'backend', icon: 'spring', level: 82 },
        { name: 'Laravel', category: 'backend', icon: 'laravel', level: 80 },
        { name: 'Node.js', category: 'backend', icon: 'node', level: 85 },
        // Database
        { name: 'MySQL', category: 'database', icon: 'mysql', level: 85 },
        { name: 'PostgreSQL', category: 'database', icon: 'postgresql', level: 88 },
        { name: 'MongoDB', category: 'database', icon: 'mongodb', level: 80 },
        // Tools
        { name: 'Git', category: 'tools', icon: 'git', level: 90 },
        { name: 'GitHub', category: 'tools', icon: 'github', level: 90 },
        { name: 'Jira', category: 'tools', icon: 'jira', level: 75 },
        { name: 'Trello', category: 'tools', icon: 'trello', level: 80 },
    ];
    const skillsGrid = document.getElementById('skills-grid');
    const skillTabs = document.querySelectorAll('.skill-tab');
    if (!skillsGrid)
        return;
    // Render skills
    function renderSkills(category = 'all') {
        const filteredSkills = category === 'all'
            ? skillsData
            : skillsData.filter(skill => skill.category === category);
        skillsGrid.innerHTML = filteredSkills.map(skill => `
            <div class="skill-card card-hover bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all" data-category="${skill.category}">
                <div class="flex flex-col items-center space-y-4">
                    <div class="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center">
                        <div class="text-4xl">${getSkillIcon(skill.icon)}</div>
                    </div>
                    <h3 class="text-lg font-bold text-black dark:text-white text-center">${skill.name}</h3>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div class="skill-bar bg-gradient-to-r from-gold-400 to-gold-600 h-full rounded-full" style="width: 0%" data-width="${skill.level}%"></div>
                    </div>
                    <span class="text-sm text-gold-500 font-semibold">${skill.level}%</span>
                </div>
            </div>
        `).join('');
        // Animate skill bars
        setTimeout(() => {
            const skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.dataset.width || '0%';
                bar.style.width = width;
                bar.classList.add('animate');
            });
        }, 100);
    }
    // Initial render
    renderSkills();
    // Tab click handlers
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category') || 'all';
            // Update active tab
            skillTabs.forEach(t => {
                t.classList.remove('active', 'bg-gold-500', 'text-white');
                t.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            });
            tab.classList.add('active', 'bg-gold-500', 'text-white');
            tab.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            // Filter skills
            renderSkills(category);
        });
    });
}
/**
 * Get skill icon emoji
 */
function getSkillIcon(icon) {
    const icons = {
        html: '🌐',
        css: '🎨',
        js: '⚡',
        ts: '🔷',
        react: '⚛️',
        tailwind: '💨',
        java: '☕',
        spring: '🍃',
        laravel: '🔴',
        node: '🟢',
        mysql: '🐬',
        postgresql: '🐘',
        mongodb: '🍃',
        git: '📦',
        github: '🐙',
        jira: '📊',
        trello: '📋'
    };
    return icons[icon] || '💻';
}
/**
 * Contact Form Handler
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            // In a real application, you would send this to a backend
            console.log('Form submitted:', data);
            // Create mailto link as fallback
            const mailtoLink = `mailto:ibrahim.nidam22@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`)}`;
            window.location.href = mailtoLink;
            // Reset form
            form.reset();
            // Show success message
            alert('Thank you for your message! Your email client will open to send the message.');
        });
    }
}
/**
 * CV Download Handlers
 */
function initCVDownloads() {
    const downloadBtnEN = document.getElementById('download-cv-en');
    const downloadBtnFR = document.getElementById('download-cv-fr');
    if (downloadBtnEN) {
        downloadBtnEN.addEventListener('click', () => {
            downloadCV('en');
        });
    }
    if (downloadBtnFR) {
        downloadBtnFR.addEventListener('click', () => {
            downloadCV('fr');
        });
    }
}
/**
 * Download CV file
 */
function downloadCV(lang) {
    const fileName = lang === 'en' ? 'Ibrahim_Nidam_CV_EN.pdf' : 'Ibrahim_Nidam_CV_FR.pdf';
    const filePath = `./assets/cv/${fileName}`;
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
//# sourceMappingURL=main.js.map