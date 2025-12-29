// ============================================
// PORTFOLIO MORPHIQUE - JAVASCRIPT OPTIMISÉ V2
// ============================================
// Performance-first + Mobile optimized
// UX: Transitions morphiques fluides
// ============================================

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        particles: {
            count: window.innerWidth < 768 ? 30 : 50,
            minSize: 1,
            maxSize: 3
        },
        loader: {
            hideDelay: 2000
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
            pauseDuration: 2000
        },
        morphReveal: {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        }
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    };

    const randomBetween = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    // ============================================
    // LAZY LOADING IMAGES WITH BLUR EFFECT
    // ============================================
    const LazyImageLoader = {
        init() {
            this.images = document.querySelectorAll('img[loading="lazy"]');
            if (this.images.length === 0) return;

            // Wrap images in lazy-image-wrapper if not already wrapped
            this.images.forEach(img => {
                if (!img.parentElement.classList.contains('lazy-image-wrapper')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'lazy-image-wrapper';
                    wrapper.style.borderRadius = getComputedStyle(img.parentElement).borderRadius || '16px';
                    img.parentNode.insertBefore(wrapper, img);
                    wrapper.appendChild(img);
                }
                img.classList.add('lazy-image');
            });

            // Native lazy loading support
            if ('loading' in HTMLImageElement.prototype) {
                this.images.forEach(img => {
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    
                    // If image is already loaded (cached)
                    if (img.complete) {
                        img.classList.add('loaded');
                    }
                });
                return;
            }
            
            // Fallback: Intersection Observer
            this.setupObserver();
        },

        setupObserver() {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                        
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            }, { 
                rootMargin: '50px'
            });

            this.images.forEach(img => imageObserver.observe(img));
        }
    };

    // ============================================
    // CUSTOM CURSOR (Desktop only)
    // ============================================
    const CustomCursor = {
        init() {
            if (window.innerWidth < 1024 || !matchMedia('(hover: hover)').matches) {
                return;
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
            }, { passive: true });

            const hoverElements = document.querySelectorAll(
                'a, button, .morph-card, .filter-btn, .view-btn'
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
            this.dotX += (this.mouseX - this.dotX) * 0.3;
            this.dotY += (this.mouseY - this.dotY) * 0.3;
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
            
            // Recréer les particules si la fenêtre est redimensionnée
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this.container.innerHTML = '';
                    CONFIG.particles.count = window.innerWidth < 768 ? 30 : 50;
                    this.createParticles();
                }, 250);
            });
        },

        createParticles() {
            const { count, minSize, maxSize } = CONFIG.particles;
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = randomBetween(minSize, maxSize);
                const x = randomBetween(0, window.innerWidth);
                const y = randomBetween(0, window.innerHeight);
                const duration = randomBetween(10, 20);
                const delay = randomBetween(0, 5);
                
                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    animation: float ${duration}s ease-in-out ${delay}s infinite;
                `;
                
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
            this.loader = document.querySelector('.morph-loader');
            if (!this.loader) return;

            window.addEventListener('load', () => {
                setTimeout(() => this.hide(), CONFIG.loader.hideDelay);
            });
        },

        hide() {
            this.loader.classList.add('hidden');
        }
    };

    // ============================================
    // SCROLL PROGRESS
    // ============================================
    const ScrollProgress = {
        init() {
            this.progressBar = document.querySelector('.scroll-bar');
            if (!this.progressBar) return;

            const updateProgress = () => {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                this.progressBar.style.width = scrolled + '%';
            };

            window.addEventListener('scroll', throttle(updateProgress, 50), { passive: true });
            updateProgress();
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
            this.updateActiveNav();
        },

        bindEvents() {
            this.navDots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = dot.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });

            window.addEventListener('scroll', 
                debounce(() => this.updateActiveNav(), 100), 
                { passive: true }
            );
        },

        updateActiveNav() {
            const scrollY = window.scrollY + 150;
            
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
            this.toggle.addEventListener('click', () => this.toggleMenu());
            
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.closeMenu());
            }

            const menuLinks = this.menu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    this.closeMenu();
                    
                    // Smooth scroll
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        setTimeout(() => {
                            const target = document.querySelector(href);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 300);
                    }
                });
            });

            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.menu.classList.contains('active')) {
                    this.closeMenu();
                }
            });

            // Close on outside click
            this.menu.addEventListener('click', (e) => {
                if (e.target === this.menu) {
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
    // MORPH CARD GLOW EFFECT
    // ============================================
    const MorphCardGlow = {
        init() {
            const cards = document.querySelectorAll('.morph-card');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    
                    card.style.setProperty('--x', x + '%');
                    card.style.setProperty('--y', y + '%');
                });
            });
        }
    };

    // ============================================
    // ROLE TYPING ANIMATION
    // ============================================
    const RoleTyping = {
        init() {
            this.element = document.querySelector('.animated-role');
            if (!this.element) return;

            this.roles = CONFIG.roles;
            this.roleIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            
            setTimeout(() => this.type(), 1000);
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
            }, { threshold: 0.5 });

            this.counters.forEach(counter => observer.observe(counter));
        },

        animateCounter(element, target) {
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
    };

    // ============================================
    // MORPHIC REVEAL ANIMATIONS - VERSION AMÉLIORÉE
    // ============================================
    const MorphReveal = {
        init() {
            // Sélectionner tous les éléments à animer
            this.revealElements = [
                // Cards standards
                ...document.querySelectorAll('.about-card'),
                ...document.querySelectorAll('.skill-card'),
                ...document.querySelectorAll('.service-card'),
                ...document.querySelectorAll('.project-card'),
                ...document.querySelectorAll('.contact-item'),
                // Education items
                ...document.querySelectorAll('.edu-item')
            ];

            if (this.revealElements.length === 0) return;

            // Appliquer les classes d'animation appropriées
            this.assignAnimationClasses();

            // Setup Intersection Observer
            this.setupObserver();
        },

        assignAnimationClasses() {
            this.revealElements.forEach((element, index) => {
                // Pattern d'alternance pour créer un effet de vague
                const pattern = index % 3;
                
                if (pattern === 0) {
                    element.classList.add('morph-reveal');
                } else if (pattern === 1) {
                    element.classList.add('morph-reveal-left');
                } else {
                    element.classList.add('morph-reveal-right');
                }

                // Cas spéciaux
                if (element.classList.contains('skill-card')) {
                    // Skills: effet scale
                    element.classList.remove('morph-reveal', 'morph-reveal-left', 'morph-reveal-right');
                    element.classList.add('morph-reveal-scale');
                }

                if (element.classList.contains('service-card')) {
                    // Services: alternance left-right
                    const serviceIndex = [...document.querySelectorAll('.service-card')].indexOf(element);
                    element.classList.remove('morph-reveal', 'morph-reveal-scale');
                    element.classList.add(serviceIndex % 2 === 0 ? 'morph-reveal-left' : 'morph-reveal-right');
                }
            });
        },

        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Petit délai pour un effet plus naturel
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                            
                            // Animation des barres de compétences
                            if (entry.target.classList.contains('skill-card')) {
                                const fill = entry.target.querySelector('.skill-fill');
                                if (fill) {
                                    const percent = fill.getAttribute('data-percent');
                                    fill.style.setProperty('--percent', percent + '%');
                                }
                            }
                        }, 100);
                        
                        // Désactiver l'observation après l'animation
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: CONFIG.morphReveal.threshold,
                rootMargin: CONFIG.morphReveal.rootMargin
            });

            this.revealElements.forEach(el => observer.observe(el));
        }
    };

    // ============================================
    // PROJECTS FILTER
    // ============================================
    const ProjectsFilter = {
        init() {
            this.filterBtns = document.querySelectorAll('.filter-btn');
            this.projectCards = document.querySelectorAll('.project-card');
            
            if (this.filterBtns.length === 0 || this.projectCards.length === 0) return;

            this.bindEvents();
        },

        bindEvents() {
            this.filterBtns.forEach(btn => {
                btn.addEventListener('click', () => this.filter(btn));
            });
        },

        filter(activeBtn) {
            // Update active button
            this.filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
            
            const filter = activeBtn.getAttribute('data-filter');
            
            // Filter projects with animation
            this.projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    // Réappliquer l'animation morphique
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 50);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => card.style.display = 'none', 300);
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
                    e.stopPropagation();
                    const imgSrc = btn.getAttribute('data-img');
                    this.open(imgSrc);
                });
            });
        },

        open(imgSrc) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.setAttribute('role', 'dialog');
            lightbox.setAttribute('aria-modal', 'true');
            
            lightbox.innerHTML = `
                <div class="lightbox-wrapper">
                    <button class="lightbox-close" aria-label="Fermer">&times;</button>
                    <img src="${imgSrc}" alt="Projet en grand" class="lazy-image loaded">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            setTimeout(() => closeBtn.focus(), 100);
            
            closeBtn.addEventListener('click', () => this.close(lightbox));
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) this.close(lightbox);
            });
            
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
                            target.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            });
        }
    };

    // ============================================
    // PERFORMANCE MONITORING
    // ============================================
    const PerformanceMonitor = {
        init() {
            if ('performance' in window) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        console.log('⚡ Performance Metrics:');
                        console.log(`  DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd)}ms`);
                        console.log(`  Page Load Complete: ${Math.round(perfData.loadEventEnd)}ms`);
                        
                        // Web Vitals approximatifs
                        const paintEntries = performance.getEntriesByType('paint');
                        paintEntries.forEach(entry => {
                            console.log(`  ${entry.name}: ${Math.round(entry.startTime)}ms`);
                        });
                    }, 0);
                });
            }
        }
    };

    // ============================================
    // CONSOLE ART
    // ============================================
    const ConsoleArt = {
        init() {
            const styles = [
                'color: #bd9f67',
                'font-size: 16px',
                'font-weight: bold',
                'padding: 10px',
                'text-shadow: 2px 2px 4px rgba(0,0,0,0.5)'
            ].join(';');
            
            console.log('%c' +
                '╔════════════════════════════════════╗\n' +
                '║   CHEIKH IDOUMOU - PORTFOLIO V2  ║\n' +
                '║   Backend Developer & DevOps      ║\n' +
                '║   Morphic Design + Performance    ║\n' +
                '╚════════════════════════════════════╝',
                styles
            );
            
            console.log('%c🚀 Portfolio chargé avec succès!', 
                'color: #22c55e; font-size: 14px; font-weight: bold;'
            );
            console.log('%c✨ Animations morphiques activées', 
                'color: #bd9f67; font-size: 12px;'
            );
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeApp);
        } else {
            initializeApp();
        }
    }

    function initializeApp() {
        console.log('🎬 Initialisation du portfolio...');

        // Initialize all modules
        LazyImageLoader.init();
        CustomCursor.init();
        ParticlesBackground.init();
        Loader.init();
        ScrollProgress.init();
        FloatingNav.init();
        MobileMenu.init();
        MorphCardGlow.init();
        RoleTyping.init();
        CounterAnimation.init();
        MorphReveal.init(); // ⭐ Nouveau module d'animations morphiques
        ProjectsFilter.init();
        Lightbox.init();
        SmoothScroll.init();
        PerformanceMonitor.init();
        ConsoleArt.init();

        console.log('✅ Tous les modules initialisés');
        console.log('🎨 Expérience utilisateur améliorée');
    }

    // Start the application
    init();

})();