// ============================================
// PORTFOLIO MORPHIQUE - JAVASCRIPT OPTIMISÉ V3
// ============================================
// ✅ TOUTES LES CORRECTIONS APPLIQUÉES:
// - Performance loader optimisée
// - Particules réduites (30 max)
// - Focus trap pour mobile menu
// - Event manager avec cleanup
// - Gestion sélection de texte
// - Animations moins agressives
// - Support prefers-reduced-motion
// ============================================

(function() {
    'use strict';

    // ============================================
    // EVENT MANAGER - CLEANUP ✅
    // ============================================
    class EventManager {
        constructor() {
            this.listeners = [];
        }
        
        add(element, event, handler, options) {
            if (!element) return;
            element.addEventListener(event, handler, options);
            this.listeners.push({ element, event, handler, options });
        }
        
        cleanup() {
            this.listeners.forEach(({ element, event, handler, options }) => {
                element.removeEventListener(event, handler, options);
            });
            this.listeners = [];
        }
    }

    const eventManager = new EventManager();

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        particles: {
            count: window.innerWidth < 768 ? 15 : 30, // ✅ Réduit de 50%
            minSize: 1,
            maxSize: 3
        },
        loader: {
            minimumDisplay: 800 // ✅ Temps minimum d'affichage
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
    
    const randomBetween = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    // ✅ Vérifier si prefers-reduced-motion
    const prefersReducedMotion = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };

    // ============================================
    // LAZY LOADING IMAGES WITH BLUR EFFECT
    // ============================================
    const LazyImageLoader = {
        init() {
            this.images = document.querySelectorAll('img[loading="lazy"]');
            if (this.images.length === 0) return;

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

            if ('loading' in HTMLImageElement.prototype) {
                this.images.forEach(img => {
                    const loadHandler = () => {
                        img.classList.add('loaded');
                    };
                    
                    eventManager.add(img, 'load', loadHandler);
                    
                    if (img.complete) {
                        img.classList.add('loaded');
                    }
                });
                return;
            }
            
            this.setupObserver();
        },

        setupObserver() {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        const loadHandler = () => {
                            img.classList.add('loaded');
                        };
                        
                        eventManager.add(img, 'load', loadHandler);
                        
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
            this.running = false;
            this.rafId = null;
            this.animateBound = () => this.animate();

            this.bindEvents();
        },

        bindEvents() {
            const mouseMoveHandler = (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.start();
            };

            eventManager.add(document, 'mousemove', mouseMoveHandler, { passive: true });

            const hoverElements = document.querySelectorAll(
                'a, button, .morph-card, .filter-btn, .view-btn'
            );
            
            hoverElements.forEach(el => {
                const enterHandler = () => document.body.classList.add('cursor-hover');
                const leaveHandler = () => document.body.classList.remove('cursor-hover');
                
                eventManager.add(el, 'mouseenter', enterHandler);
                eventManager.add(el, 'mouseleave', leaveHandler);
            });

            // ✅ Gestion sélection de texte
            const selectStartHandler = () => document.body.classList.add('selecting');
            const selectionChangeHandler = () => {
                if (window.getSelection().toString() === '') {
                    document.body.classList.remove('selecting');
                }
            };
            
            eventManager.add(document, 'selectstart', selectStartHandler);
            eventManager.add(document, 'selectionchange', selectionChangeHandler);
        },

        start() {
            if (!this.running) {
                this.running = true;
                this.rafId = requestAnimationFrame(this.animateBound);
            }
        },

        animate() {
            this.dotX += (this.mouseX - this.dotX) * 0.3;
            this.dotY += (this.mouseY - this.dotY) * 0.3;
            this.outlineX += (this.mouseX - this.outlineX) * 0.15;
            this.outlineY += (this.mouseY - this.outlineY) * 0.15;

            // ✅ PERF: transform (couche composite) au lieu de left/top (layout + paint)
            this.cursorDot.style.transform =
                `translate(${this.dotX}px, ${this.dotY}px) translate(-50%, -50%)`;
            this.cursorOutline.style.transform =
                `translate(${this.outlineX}px, ${this.outlineY}px) translate(-50%, -50%)`;

            // ✅ PERF: stopper la boucle rAF quand le curseur a rejoint la souris
            if (Math.abs(this.mouseX - this.dotX) < 0.1 &&
                Math.abs(this.mouseY - this.dotY) < 0.1 &&
                Math.abs(this.mouseX - this.outlineX) < 0.1 &&
                Math.abs(this.mouseY - this.outlineY) < 0.1) {
                this.dotX = this.outlineX = this.mouseX;
                this.dotY = this.outlineY = this.mouseY;
                this.running = false;
                return;
            }

            this.rafId = requestAnimationFrame(this.animateBound);
        }
    };

    // ============================================
    // PARTICLES BACKGROUND - GPU OPTIMISÉ ✅
    // ============================================
    const ParticlesBackground = {
        init() {
            this.container = document.getElementById('particles');
            if (!this.container) return;

            this.createParticles();
            
            let resizeTimer;
            const resizeHandler = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this.container.innerHTML = '';
                    CONFIG.particles.count = window.innerWidth < 768 ? 15 : 30;
                    this.createParticles();
                }, 250);
            };
            
            eventManager.add(window, 'resize', resizeHandler);
        },

        createParticles() {
            if (prefersReducedMotion()) return; // ✅ Respect prefers-reduced-motion
            
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
                
                // ✅ GPU-accelerated transform
                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    transform: translate(${x}px, ${y}px);
                    animation: float-gpu ${duration}s ease-in-out ${delay}s infinite;
                `;
                
                fragment.appendChild(particle);
            }

            this.container.appendChild(fragment);
            
            // Ajouter animation GPU
            this.addGPUAnimation();
        },
        
        addGPUAnimation() {
            if (document.getElementById('particle-animation')) return;
            
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float-gpu {
                    0%, 100% {
                        transform: translate(var(--x, 0), var(--y, 0));
                    }
                    50% {
                        transform: translate(
                            calc(var(--x, 0) + ${randomBetween(-50, 50)}px),
                            calc(var(--y, 0) + ${randomBetween(-50, 50)}px)
                        );
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ============================================
    // LOADER - PERFORMANCE OPTIMISÉE ✅
    // ============================================
    const Loader = {
        init() {
            this.loader = document.querySelector('.morph-loader');
            if (!this.loader) return;

            this.startTime = Date.now();

            const loadHandler = () => {
                const elapsed = Date.now() - this.startTime;
                const remainingTime = Math.max(0, CONFIG.loader.minimumDisplay - elapsed);
                
                setTimeout(() => this.hide(), remainingTime);
            };
            
            eventManager.add(window, 'load', loadHandler);
        },

        hide() {
            if (this.loader) {
                this.loader.classList.add('hidden');
            }
        }
    };

    // ============================================
    // SCROLL PROGRESS
    // ============================================
    const ScrollProgress = {
        init() {
            this.progressBar = document.querySelector('.scroll-bar');
            if (!this.progressBar) return;

            this.maxScroll = 0;
            this.ticking = false;

            // ✅ PERF: scrollHeight calculé au load/resize, pas à chaque scroll (évite un reflow forcé)
            const computeMax = () => {
                this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            };

            const render = () => {
                this.ticking = false;
                const scrolled = this.maxScroll > 0 ? (window.scrollY / this.maxScroll) * 100 : 0;
                this.progressBar.style.width = scrolled + '%';
            };

            const onScroll = () => {
                if (!this.ticking) {
                    this.ticking = true;
                    requestAnimationFrame(render);
                }
            };

            computeMax();
            eventManager.add(window, 'scroll', onScroll, { passive: true });
            eventManager.add(window, 'resize', () => { computeMax(); render(); }, { passive: true });
            eventManager.add(window, 'load', computeMax);
            render();
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

            this.offsets = [];
            this.ticking = false;
            this.activeId = null;

            this.computeOffsets();
            this.bindEvents();
            this.updateActiveNav();
        },

        // ✅ PERF: offsets mesurés une fois (et au resize/load), pas à chaque scroll
        computeOffsets() {
            this.offsets = Array.from(this.sections).map(section => ({
                id: section.getAttribute('id'),
                top: section.offsetTop,
                height: section.offsetHeight
            }));
        },

        bindEvents() {
            this.navDots.forEach(dot => {
                const clickHandler = (e) => {
                    e.preventDefault();
                    const targetId = dot.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                };

                eventManager.add(dot, 'click', clickHandler);
            });

            // ✅ PERF: une mise à jour par frame, sans lecture de layout
            const onScroll = () => {
                if (!this.ticking) {
                    this.ticking = true;
                    requestAnimationFrame(() => {
                        this.ticking = false;
                        this.updateActiveNav();
                    });
                }
            };
            eventManager.add(window, 'scroll', onScroll, { passive: true });
            eventManager.add(window, 'resize', () => this.computeOffsets(), { passive: true });
            eventManager.add(window, 'load', () => this.computeOffsets());
        },

        updateActiveNav() {
            const scrollY = window.scrollY + 150;

            for (const section of this.offsets) {
                if (scrollY > section.top && scrollY <= section.top + section.height) {
                    if (this.activeId !== section.id) {
                        this.activeId = section.id;
                        this.navDots.forEach(dot => {
                            dot.classList.toggle('active', dot.getAttribute('href') === `#${section.id}`);
                        });
                    }
                    break;
                }
            }
        }
    };

    // ============================================
    // MOBILE MENU - FOCUS TRAP ✅
    // ============================================
    // ============================================
    // MOBILE MENU - AVEC PARTICULES MORPHIQUES ✅
    // ============================================
    const MobileMenu = {
        init() {
            this.toggle = document.querySelector('.mobile-menu-toggle');
            this.menu = document.querySelector('.mobile-nav');
            this.closeBtn = document.querySelector('.mobile-nav-close');
            this.previousFocus = null;
            this.firstFocusable = null;
            this.lastFocusable = null;
            
            if (!this.toggle || !this.menu) return;

            this.createBackdrop();
            this.bindEvents();
        },

        createBackdrop() {
            this.backdrop = document.createElement('div');
            this.backdrop.className = 'mobile-nav-backdrop';
            document.body.appendChild(this.backdrop);
            
            const backdropClickHandler = () => this.closeMenu();
            eventManager.add(this.backdrop, 'click', backdropClickHandler);
        },

        // ✅ Effet particules morphiques
        createParticles() {
            if (prefersReducedMotion()) return;
            
            const rect = this.toggle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Créer 12 particules
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.className = 'mobile-nav-particle';
                
                const angle = (i / 12) * Math.PI * 2;
                const distance = 100 + Math.random() * 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                particle.style.cssText = `
                    left: ${centerX}px;
                    top: ${centerY}px;
                    --tx: ${tx}px;
                    --ty: ${ty}px;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }, 800);
            }
        },

        bindEvents() {
            const toggleHandler = () => this.toggleMenu();
            eventManager.add(this.toggle, 'click', toggleHandler);
            
            if (this.closeBtn) {
                const closeHandler = () => this.closeMenu();
                eventManager.add(this.closeBtn, 'click', closeHandler);
            }

            const menuLinks = this.menu.querySelectorAll('a');
            menuLinks.forEach(link => {
                const linkHandler = (e) => {
                    this.closeMenu();
                    
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        setTimeout(() => {
                            const target = document.querySelector(href);
                            if (target) {
                                target.scrollIntoView({ 
                                    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                                    block: 'start' 
                                });
                            }
                        }, 300);
                    }
                };
                
                eventManager.add(link, 'click', linkHandler);
            });

            const escapeHandler = (e) => {
                if (e.key === 'Escape' && this.menu.classList.contains('active')) {
                    this.closeMenu();
                }
            };
            eventManager.add(document, 'keydown', escapeHandler);
        },

        toggleMenu() {
            const isActive = this.menu.classList.toggle('active');
            
            // ✅ Particules lors de l'ouverture
            if (isActive) {
                this.createParticles();
            }
            
            this.backdrop.classList.toggle('active', isActive);
            
            this.toggle.setAttribute('aria-expanded', isActive);
            this.menu.setAttribute('aria-hidden', !isActive);
            
            if (isActive) {
                document.body.classList.add('mobile-menu-open');
                this.trapFocus();
            } else {
                document.body.classList.remove('mobile-menu-open');
                this.releaseFocus();
            }
        },

        closeMenu() {
            this.menu.classList.remove('active');
            this.backdrop.classList.remove('active');
            this.toggle.setAttribute('aria-expanded', 'false');
            this.menu.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('mobile-menu-open');
            this.releaseFocus();
        },

        trapFocus() {
            this.previousFocus = document.activeElement;
            
            const focusableElements = this.menu.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            
            this.firstFocusable = focusableElements[0];
            this.lastFocusable = focusableElements[focusableElements.length - 1];
            
            this.handleTabKey = (e) => {
                if (e.key !== 'Tab') return;
                
                if (e.shiftKey) {
                    if (document.activeElement === this.firstFocusable) {
                        e.preventDefault();
                        this.lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === this.lastFocusable) {
                        e.preventDefault();
                        this.firstFocusable.focus();
                    }
                }
            };
            
            eventManager.add(document, 'keydown', this.handleTabKey);
            
            setTimeout(() => {
                if (this.closeBtn) {
                    this.closeBtn.focus();
                } else if (this.firstFocusable) {
                    this.firstFocusable.focus();
                }
            }, 500); // ✅ Délai augmenté pour attendre l'animation
        },

        releaseFocus() {
            if (this.handleTabKey) {
                document.removeEventListener('keydown', this.handleTabKey);
                this.handleTabKey = null;
            }
            
            if (this.previousFocus) {
                this.previousFocus.focus();
                this.previousFocus = null;
            }
        }
    };

    // ============================================
    // MORPH CARD GLOW EFFECT
    // ============================================
    const MorphCardGlow = {
        init() {
            // ✅ PERF: halo au survol — inutile (et coûteux) sur appareils tactiles
            if (!matchMedia('(hover: hover)').matches) return;

            const cards = document.querySelectorAll('.morph-card');

            cards.forEach(card => {
                let rafId = null;
                let lastX = 0;
                let lastY = 0;

                const mouseMoveHandler = (e) => {
                    lastX = e.clientX;
                    lastY = e.clientY;

                    // ✅ PERF: une seule écriture de style par frame (throttle rAF)
                    if (rafId !== null) return;
                    rafId = requestAnimationFrame(() => {
                        rafId = null;
                        const rect = card.getBoundingClientRect();
                        const x = ((lastX - rect.left) / rect.width) * 100;
                        const y = ((lastY - rect.top) / rect.height) * 100;
                        card.style.setProperty('--x', x + '%');
                        card.style.setProperty('--y', y + '%');
                    });
                };

                eventManager.add(card, 'mousemove', mouseMoveHandler, { passive: true });
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
            if (prefersReducedMotion()) {
                // ✅ Mode réduit: afficher directement sans animation
                this.element.textContent = this.roles[0];
                return;
            }
            
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
            if (prefersReducedMotion()) {
                // ✅ Mode réduit: afficher directement
                element.textContent = target;
                return;
            }
            
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
    // MORPHIC REVEAL ANIMATIONS - MOINS AGRESSIF ✅
    // ============================================
    const MorphReveal = {
        init() {
            this.revealElements = [
                ...document.querySelectorAll('.about-card'),
                ...document.querySelectorAll('.skill-card'),
                ...document.querySelectorAll('.service-card'),
                ...document.querySelectorAll('.project-card'),
                ...document.querySelectorAll('.contact-item'),
                ...document.querySelectorAll('.edu-item')
            ];

            if (this.revealElements.length === 0) return;

            if (prefersReducedMotion()) {
                // ✅ Mode réduit: afficher tout immédiatement
                this.revealElements.forEach(el => el.classList.add('visible'));
                return;
            }

            this.assignAnimationClasses();
            this.setupObserver();
        },

        assignAnimationClasses() {
            this.revealElements.forEach((element, index) => {
                const pattern = index % 3;
                
                if (pattern === 0) {
                    element.classList.add('morph-reveal');
                } else if (pattern === 1) {
                    element.classList.add('morph-reveal-left');
                } else {
                    element.classList.add('morph-reveal-right');
                }

                if (element.classList.contains('skill-card')) {
                    element.classList.remove('morph-reveal', 'morph-reveal-left', 'morph-reveal-right');
                    element.classList.add('morph-reveal-scale');
                }

                if (element.classList.contains('service-card')) {
                    const serviceIndex = [...document.querySelectorAll('.service-card')].indexOf(element);
                    element.classList.remove('morph-reveal', 'morph-reveal-scale');
                    element.classList.add(serviceIndex % 2 === 0 ? 'morph-reveal-left' : 'morph-reveal-right');
                }
            });
        },

        setupObserver() {
            // ✅ Limiter animations simultanées
            let animationQueue = [];
            let isAnimating = false;
            const maxSimultaneous = 3;

            const processQueue = () => {
                if (animationQueue.length === 0 || isAnimating) return;
                
                isAnimating = true;
                const batch = animationQueue.splice(0, maxSimultaneous);
                
                batch.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                        
                        if (element.classList.contains('skill-card')) {
                            const fill = element.querySelector('.skill-fill');
                            if (fill) {
                                const percent = fill.getAttribute('data-percent');
                                fill.style.setProperty('--percent', percent + '%');
                            }
                        }
                    }, index * 100);
                });
                
                setTimeout(() => {
                    isAnimating = false;
                    processQueue();
                }, 300);
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animationQueue.push(entry.target);
                        observer.unobserve(entry.target);
                        processQueue();
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
                const clickHandler = () => this.filter(btn);
                eventManager.add(btn, 'click', clickHandler);
            });
        },

        filter(activeBtn) {
            this.filterBtns.forEach(btn => btn.classList.remove('active'));
            activeBtn.classList.add('active');
            
            const filter = activeBtn.getAttribute('data-filter');
            
            this.projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    
                    if (!prefersReducedMotion()) {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 50);
                    } else {
                        card.classList.add('visible');
                    }
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
                const clickHandler = (e) => {
                    e.stopPropagation();
                    const imgSrc = btn.getAttribute('data-img');
                    this.open(imgSrc);
                };
                
                eventManager.add(btn, 'click', clickHandler);
            });
        },

        open(imgSrc) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.setAttribute('role', 'dialog');
            lightbox.setAttribute('aria-modal', 'true');
            lightbox.setAttribute('aria-label', 'Vue agrandie du projet');
            
            lightbox.innerHTML = `
                <div class="lightbox-wrapper">
                    <button class="lightbox-close" aria-label="Fermer la vue agrandie">&times;</button>
                    <img src="${imgSrc}" alt="Projet en grand" class="lazy-image loaded">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            const previousFocus = document.activeElement;
            
            setTimeout(() => closeBtn.focus(), 100);
            
            const closeHandler = () => this.close(lightbox, previousFocus);
            const overlayClickHandler = (e) => {
                if (e.target === lightbox) this.close(lightbox, previousFocus);
            };
            
            closeBtn.addEventListener('click', closeHandler);
            lightbox.addEventListener('click', overlayClickHandler);
            
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    this.close(lightbox, previousFocus);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        },

        close(lightbox, previousFocus) {
            lightbox.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
                document.body.style.overflow = '';
                if (previousFocus) {
                    previousFocus.focus();
                }
            }, 300);
        }
    };

    // ============================================
    // SMOOTH SCROLL FOR ALL LINKS
    // ============================================
    const SmoothScroll = {
        init() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(anchor => {
                const clickHandler = function(e) {
                    const href = this.getAttribute('href');
                    if (href !== '#' && href.length > 1) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ 
                                behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                                block: 'start'
                            });
                        }
                    }
                };
                
                eventManager.add(anchor, 'click', clickHandler);
            });
        }
    };

    // ============================================
    // PERFORMANCE MONITORING
    // ============================================
    const PerformanceMonitor = {
        init() {
            if ('performance' in window) {
                const loadHandler = () => {
                    setTimeout(() => {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        console.log('⚡ Performance Metrics:');
                        console.log(`  DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd)}ms`);
                        console.log(`  Page Load Complete: ${Math.round(perfData.loadEventEnd)}ms`);
                        
                        const paintEntries = performance.getEntriesByType('paint');
                        paintEntries.forEach(entry => {
                            console.log(`  ${entry.name}: ${Math.round(entry.startTime)}ms`);
                        });
                    }, 0);
                };
                
                eventManager.add(window, 'load', loadHandler);
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
                '║   CHEIKH IDOUMOU - PORTFOLIO V3  ║\n' +
                '║   Backend Developer & DevOps      ║\n' +
                '║   ✅ Toutes corrections appliquées ║\n' +
                '╚════════════════════════════════════╝',
                styles
            );
            
            console.log('%c🚀 Portfolio optimisé chargé!', 
                'color: #22c55e; font-size: 14px; font-weight: bold;'
            );
            console.log('%c✨ Accessibilité WCAG AA', 
                'color: #bd9f67; font-size: 12px;'
            );
            console.log('%c⚡ Performance optimisée', 
                'color: #bd9f67; font-size: 12px;'
            );
        }
    };

    // ============================================
    // UI VERSE CARD MOBILE INTERACTION
    // ============================================
    const UIVerseCard = {
        init() {
            const card = document.querySelector('.ui-verse-card');
            if (!card) return;

            // Détection mobile/tactile
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            if (isTouchDevice) {
                let isActive = false;
                let touchStartTime = 0;

                // Toggle sur tap (pas sur scroll)
                const touchStartHandler = () => {
                    touchStartTime = Date.now();
                };

                const touchEndHandler = (e) => {
                    const touchDuration = Date.now() - touchStartTime;

                    // Si c'est un tap court (pas un scroll)
                    if (touchDuration < 200) {
                        e.preventDefault();
                        isActive = !isActive;

                        if (isActive) {
                            card.classList.add('active');
                        } else {
                            card.classList.remove('active');
                        }
                    }
                };

                eventManager.add(card, 'touchstart', touchStartHandler, { passive: true });
                eventManager.add(card, 'touchend', touchEndHandler, { passive: false });

                // Fallback pour les appareils sans touch
                const clickHandler = (e) => {
                    if (!isTouchDevice) {
                        e.preventDefault();
                        isActive = !isActive;

                        if (isActive) {
                            card.classList.add('active');
                        } else {
                            card.classList.remove('active');
                        }
                    }
                };

                eventManager.add(card, 'click', clickHandler);

                // Fermer si on touche ailleurs
                const documentTouchHandler = (e) => {
                    if (isActive && !card.contains(e.target)) {
                        isActive = false;
                        card.classList.remove('active');
                    }
                };

                eventManager.add(document, 'touchstart', documentTouchHandler, { passive: true });
            }
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
        console.log('🎬 Initialisation du portfolio V3...');

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
        MorphReveal.init();
        ProjectsFilter.init();
        Lightbox.init();
        SmoothScroll.init();
        UIVerseCard.init();
        PerformanceMonitor.init();
        ConsoleArt.init();

        console.log('✅ Tous les modules initialisés');
        console.log('🎨 UX optimisée et accessible');

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            eventManager.cleanup();
        });
    }

    // Start the application
    init();

})();