// ============================================
// CREATIVE PORTFOLIO - JAVASCRIPT PERFECTIONNÉ
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION & CONSTANTS
    // ============================================
    const CONFIG = {
        particles: {
            count: 50,
            minSize: 1,
            maxSize: 3,
            minDuration: 10,
            maxDuration: 20
        },
        loader: {
            hideDelay: 2500
        },
        roles: [
            'Backend Developer',
            'Django Expert',
            'Spring Boot Developer',
            '.NET Specialist',
            'DevOps Engineer',
            'API Architect'
        ],
        roleTyping: {
            typeSpeed: 100,
            deleteSpeed: 50,
            pauseDuration: 2000,
            startDelay: 3000
        },
        scroll: {
            threshold: 0.2,
            navUpdateThrottle: 100
        }
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    /**
     * Debounce function pour optimiser les événements fréquents
     */
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

    /**
     * Throttle function pour limiter l'exécution
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Vérifier si un élément est visible dans le viewport
     */
    function isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -threshold &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Générer un nombre aléatoire entre min et max
     */
    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const CustomCursor = {
        init() {
            // Vérifier si c'est un appareil tactile
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                return; // Ne pas initialiser le curseur sur mobile
            }

            this.cursorDot = document.querySelector('.cursor-dot');
            this.cursorOutline = document.querySelector('.cursor-outline');
            
            if (!this.cursorDot || !this.cursorOutline) return;

            this.mouseX = 0;
            this.mouseY = 0;
            this.dotX = 0;
            this.dotY = 0;
            this.outlineX = 0;
            this.outlineY = 0;

            this.bindEvents();
            this.animate();
        },

        bindEvents() {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });

            // Ajouter effet hover
            const hoverElements = document.querySelectorAll(
                'a, button, .glass-card, .project-item, .hex-wrapper, .about-card-3d, .filter-chip'
            );
            
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    document.body.classList.add('cursor-hover');
                });
                
                el.addEventListener('mouseleave', () => {
                    document.body.classList.remove('cursor-hover');
                });
            });
        },

        animate() {
            // Smooth follow pour le point
            this.dotX += (this.mouseX - this.dotX) * 0.3;
            this.dotY += (this.mouseY - this.dotY) * 0.3;
            
            // Slower follow pour le contour
            this.outlineX += (this.mouseX - this.outlineX) * 0.15;
            this.outlineY += (this.mouseY - this.outlineY) * 0.15;
            
            this.cursorDot.style.left = this.dotX + 'px';
            this.cursorDot.style.top = this.dotY + 'px';
            this.cursorOutline.style.left = this.outlineX + 'px';
            this.cursorOutline.style.top = this.outlineY + 'px';
            
            requestAnimationFrame(() => this.animate());
        }
    };

    // ============================================
    // PARTICLES BACKGROUND
    // ============================================
    const ParticlesBackground = {
        init() {
            this.container = document.getElementById('particles');
            if (!this.container) return;

            this.createParticles();
        },

        createParticles() {
            const { count, minSize, maxSize, minDuration, maxDuration } = CONFIG.particles;
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = randomBetween(minSize, maxSize);
                const x = randomBetween(0, window.innerWidth);
                const y = randomBetween(0, window.innerHeight);
                const duration = randomBetween(minDuration, maxDuration);
                const delay = randomBetween(0, 5);
                
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.animationDuration = duration + 's';
                particle.style.animationDelay = delay + 's';
                
                fragment.appendChild(particle);
            }

            this.container.appendChild(fragment);
        }
    };

    // ============================================
    // LOADER
    // ============================================
    const Loader = {
        init() {
            this.loader = document.querySelector('.creative-loader');
            if (!this.loader) return;

            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.hide();
                }, CONFIG.loader.hideDelay);
            });
        },

        hide() {
            this.loader.classList.add('hidden');
            // Permettre le focus après le chargement
            document.body.style.overflow = '';
        }
    };

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const ScrollProgress = {
        init() {
            this.progressBar = document.querySelector('.scroll-progress-bar');
            if (!this.progressBar) return;

            const updateProgress = () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                this.progressBar.style.width = scrolled + '%';
                this.progressBar.parentElement.setAttribute('aria-valuenow', Math.round(scrolled));
            };

            window.addEventListener('scroll', throttle(updateProgress, 50));
            updateProgress(); // Initial call
        }
    };

    // ============================================
    // FLOATING NAVIGATION
    // ============================================
    const FloatingNav = {
        init() {
            this.navDots = document.querySelectorAll('.nav-dot');
            this.sections = document.querySelectorAll('section[id]');
            
            if (this.navDots.length === 0 || this.sections.length === 0) return;

            this.bindEvents();
            this.updateActiveNav(); // Initial call
        },

        bindEvents() {
            // Smooth scroll au clic
            this.navDots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = dot.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80; // Offset pour le header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Update au scroll
            window.addEventListener('scroll', 
                debounce(() => this.updateActiveNav(), CONFIG.scroll.navUpdateThrottle)
            );
        },

        updateActiveNav() {
            const scrollY = window.scrollY + 150; // Offset
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    this.navDots.forEach(dot => {
                        dot.classList.remove('active');
                        if (dot.getAttribute('href') === `#${sectionId}`) {
                            dot.classList.add('active');
                        }
                    });
                }
            });
        }
    };

    // ============================================
    // MOBILE MENU
    // ============================================
    const MobileMenu = {
        init() {
            this.toggle = document.querySelector('.mobile-menu-toggle');
            this.menu = document.querySelector('.mobile-nav');
            this.closeBtn = document.querySelector('.mobile-nav-close');
            
            if (!this.toggle || !this.menu) return;

            this.bindEvents();
        },

        bindEvents() {
            // Toggle menu
            this.toggle.addEventListener('click', () => this.toggleMenu());
            
            // Close button
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.closeMenu());
            }

            // Close au clic sur un lien
            const menuLinks = this.menu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu();
                    // Permettre la navigation
                    setTimeout(() => {
                        const href = link.getAttribute('href');
                        if (href && href.startsWith('#')) {
                            const target = document.querySelector(href);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    }, 300);
                });
            });

            // Close au clic en dehors
            this.menu.addEventListener('click', (e) => {
                if (e.target === this.menu) {
                    this.closeMenu();
                }
            });

            // Close avec Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.menu.classList.contains('active')) {
                    this.closeMenu();
                }
            });
        },

        toggleMenu() {
            const isActive = this.menu.classList.toggle('active');
            this.toggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        },

        closeMenu() {
            this.menu.classList.remove('active');
            this.toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    };

    // ============================================
    // HOLOGRAPHIC CARD GLOW EFFECT
    // ============================================
    const HolographicCard = {
        init() {
            this.card = document.querySelector('.holographic-card');
            this.glow = document.querySelector('.card-glow');
            
            if (!this.card || !this.glow) return;

            this.card.addEventListener('mousemove', (e) => {
                const rect = this.card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                this.glow.style.setProperty('--x', x + '%');
                this.glow.style.setProperty('--y', y + '%');
            });
        }
    };

    // ============================================
    // ANIMATED ROLE TYPING
    // ============================================
    const RoleTyping = {
        init() {
            this.element = document.querySelector('.animated-role');
            if (!this.element) return;

            this.roles = CONFIG.roles;
            this.roleIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            
            setTimeout(() => this.type(), CONFIG.roleTyping.startDelay);
        },

        type() {
            const currentRole = this.roles[this.roleIndex];
            
            if (this.isDeleting) {
                this.element.textContent = currentRole.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentRole.substring(0, this.charIndex + 1);
                this.charIndex++;
            }
            
            let typeSpeed = this.isDeleting ? 
                CONFIG.roleTyping.deleteSpeed : 
                CONFIG.roleTyping.typeSpeed;
            
            if (!this.isDeleting && this.charIndex === currentRole.length) {
                this.isDeleting = true;
                typeSpeed = CONFIG.roleTyping.pauseDuration;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.roleIndex = (this.roleIndex + 1) % this.roles.length;
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    };

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const CounterAnimation = {
        init() {
            this.counters = document.querySelectorAll('.stat-value[data-target]');
            if (this.counters.length === 0) return;

            this.setupObserver();
        },

        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        this.animateCounter(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: CONFIG.scroll.threshold });

            this.counters.forEach(counter => observer.observe(counter));
        },

        animateCounter(element, target) {
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            const originalText = element.textContent;
            const hasPlus = originalText.includes('+');
            const hasPercent = originalText.includes('%');
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (hasPlus) displayValue += '+';
                if (hasPercent) displayValue += '%';
                
                element.textContent = displayValue;
            }, 16);
        }
    };

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const AnimateOnScroll = {
        init() {
            this.elements = document.querySelectorAll(
                '.about-card-3d, .hex-wrapper, .glass-card, .project-item, .info-card-modern, .edu-item'
            );
            
            if (this.elements.length === 0) return;

            this.setupObserver();
        },

        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        // Ne pas unobserve pour permettre la répétition si nécessaire
                    }
                });
            }, { 
                threshold: CONFIG.scroll.threshold,
                rootMargin: '0px 0px -50px 0px'
            });

            this.elements.forEach(el => observer.observe(el));
        }
    };

    // ============================================
    // 3D TILT EFFECT
    // ============================================
    const TiltEffect = {
        init() {
            this.cards = document.querySelectorAll('.glass-card[data-tilt]');
            if (this.cards.length === 0) return;

            this.bindEvents();
        },

        bindEvents() {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
                card.addEventListener('mouseleave', () => this.resetTilt(card));
            });
        },

        handleTilt(e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        },

        resetTilt(card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        }
    };

    // ============================================
    // PROJECTS FILTER
    // ============================================
    const ProjectsFilter = {
        init() {
            this.filterChips = document.querySelectorAll('.filter-chip');
            this.projectItems = document.querySelectorAll('.project-item');
            
            if (this.filterChips.length === 0 || this.projectItems.length === 0) return;

            this.bindEvents();
        },

        bindEvents() {
            this.filterChips.forEach(chip => {
                chip.addEventListener('click', () => this.filter(chip));
            });
        },

        filter(activeChip) {
            // Update active chip
            this.filterChips.forEach(chip => {
                chip.classList.remove('active');
                chip.setAttribute('aria-pressed', 'false');
            });
            activeChip.classList.add('active');
            activeChip.setAttribute('aria-pressed', 'true');
            
            const filter = activeChip.getAttribute('data-filter');
            
            // Filter projects
            this.projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('fade-in'), 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        }
    };

    // ============================================
    // LIGHTBOX
    // ============================================
    const Lightbox = {
        init() {
            this.viewBtns = document.querySelectorAll('.view-btn');
            if (this.viewBtns.length === 0) return;

            this.bindEvents();
        },

        bindEvents() {
            this.viewBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const imgSrc = btn.getAttribute('href');
                    this.open(imgSrc);
                });
            });
        },

        open(imgSrc) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.setAttribute('role', 'dialog');
            lightbox.setAttribute('aria-modal', 'true');
            lightbox.setAttribute('aria-label', 'Image en plein écran');
            
            lightbox.innerHTML = `
                <div class="lightbox-wrapper">
                    <button class="lightbox-close" aria-label="Fermer">&times;</button>
                    <img src="${imgSrc}" alt="Project en grand">
                </div>
            `;
            
            // Styles
            this.applyStyles(lightbox);
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Focus sur le bouton de fermeture
            const closeBtn = lightbox.querySelector('.lightbox-close');
            setTimeout(() => closeBtn.focus(), 100);
            
            // Event listeners
            closeBtn.addEventListener('click', () => this.close(lightbox));
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) this.close(lightbox);
            });
            
            // Keyboard support
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    this.close(lightbox);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        },

        close(lightbox) {
            lightbox.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        },

        applyStyles(lightbox) {
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s;
            `;
            
            const wrapper = lightbox.querySelector('.lightbox-wrapper');
            wrapper.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const img = lightbox.querySelector('img');
            img.style.cssText = `
                max-width: 100%;
                max-height: 90vh;
                border-radius: 15px;
                border: 3px solid #bd9f67;
                box-shadow: 0 0 50px rgba(189, 159, 103, 0.5);
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -50px;
                right: 0;
                width: 50px;
                height: 50px;
                background: #bd9f67;
                color: #0a0e27;
                border: none;
                border-radius: 50%;
                font-size: 30px;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.transform = 'rotate(90deg) scale(1.1)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.transform = 'rotate(0) scale(1)';
            });
        }
    };

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const ScrollToTop = {
        init() {
            this.createButton();
            this.bindEvents();
        },

        createButton() {
            const btn = document.createElement('button');
            btn.className = 'scroll-top-btn';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.setAttribute('aria-label', 'Retour en haut de la page');
            
            document.body.appendChild(btn);
            this.button = btn;
        },

        bindEvents() {
            window.addEventListener('scroll', throttle(() => {
                if (window.scrollY > 500) {
                    this.button.classList.add('visible');
                } else {
                    this.button.classList.remove('visible');
                }
            }, 100));
            
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ============================================
    // SMOOTH SCROLL FOR ALL LINKS
    // ============================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href.length > 1) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            const offsetTop = target.offsetTop - 80;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }
    };

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    const KeyboardNav = {
        init() {
            // Améliorer la navigation au clavier
            document.addEventListener('keydown', (e) => {
                // Tab trap dans le menu mobile si ouvert
                const mobileMenu = document.querySelector('.mobile-nav.active');
                if (mobileMenu && e.key === 'Tab') {
                    this.trapFocus(e, mobileMenu);
                }
            });
        },

        trapFocus(e, container) {
            const focusableElements = container.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const LazyLoading = {
        init() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            if ('loading' in HTMLImageElement.prototype) {
                // Le navigateur supporte le lazy loading natif
                return;
            }
            
            // Fallback pour les navigateurs plus anciens
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    };

    // ============================================
    // CONSOLE ART
    // ============================================
    const ConsoleArt = {
        init() {
            console.log('%c' +
                '  ╔═══════════════════════════════════╗\n' +
                '  ║   CHEIKH IDOUMOU - PORTFOLIO     ║\n' +
                '  ║   Backend Developer & DevOps     ║\n' +
                '  ╚═══════════════════════════════════╝',
                'color: #bd9f67; font-size: 14px; font-weight: bold;'
            );
            
            console.log('%cBienvenue sur mon portfolio! 🚀', 
                'color: #bd9f67; font-size: 16px; font-weight: bold;'
            );
            
            console.log('%cTech Stack: HTML5, CSS3, Vanilla JavaScript', 
                'color: #94a3b8; font-size: 12px;'
            );
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }
    }

    function initializeApp() {
        // Initialiser tous les modules
        CustomCursor.init();
        ParticlesBackground.init();
        Loader.init();
        ScrollProgress.init();
        FloatingNav.init();
        MobileMenu.init();
        HolographicCard.init();
        RoleTyping.init();
        CounterAnimation.init();
        AnimateOnScroll.init();
        TiltEffect.init();
        ProjectsFilter.init();
        Lightbox.init();
        ScrollToTop.init();
        SmoothScroll.init();
        KeyboardNav.init();
        LazyLoading.init();
        ConsoleArt.init();

        // Log de succès
        console.log('%c✓ Portfolio initialisé avec succès', 
            'color: #22c55e; font-weight: bold;'
        );
    }

    // Démarrer l'application
    init();

})();