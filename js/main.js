// ============================================
// CREATIVE PORTFOLIO - INTERACTIVE FEATURES
// ============================================

(function() {
    'use strict';

    // ============= Custom Cursor =============
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for dot
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        // Slower follow for outline
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .glass-card, .project-item, .hex-wrapper, .about-card-3d');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // ============= Particles Background =============
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ============= Loader =============
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.creative-loader').classList.add('hidden');
        }, 2500);
    });

    // ============= Floating Navigation =============
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navDots.forEach(dot => dot.classList.remove('active'));
                const activeNav = document.querySelector(`.nav-dot[href="#${sectionId}"]`);
                if (activeNav) activeNav.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============= Holographic Card Glow Effect =============
    const holographicCard = document.querySelector('.holographic-card');
    const cardGlow = document.querySelector('.card-glow');

    if (holographicCard && cardGlow) {
        holographicCard.addEventListener('mousemove', (e) => {
            const rect = holographicCard.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            cardGlow.style.setProperty('--x', x + '%');
            cardGlow.style.setProperty('--y', y + '%');
        });
    }

    // ============= Animated Role Typing =============
    const animatedRole = document.querySelector('.animated-role');
    const roles = [
        'Backend Developer',
        'Django Expert',
        'Spring Boot Developer',
        '.NET Specialist',
        'DevOps Engineer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            animatedRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            animatedRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed = 50;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    if (animatedRole) {
        setTimeout(typeRole, 3000);
    }

    // ============= Stat Counter Animation =============
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const isPercentage = element.textContent.includes('%');
        const isPlus = element.textContent.includes('+');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            
            element.textContent = displayValue;
        }, 16);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-value')) {
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
                
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stat-value, .about-card-3d, .hex-wrapper, .glass-card, .project-item, .info-card-modern').forEach(el => {
        observer.observe(el);
    });

    // ============= 3D Tilt Effect for Glass Cards =============
    const glassCards = document.querySelectorAll('.glass-card[data-tilt]');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // ============= Projects Filter =============
    const filterChips = document.querySelectorAll('.filter-chip');
    const projectItems = document.querySelectorAll('.project-item');

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active chip
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const filter = chip.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });

    // ============= Lightbox for Project Images =============
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = btn.getAttribute('href');
            createLightbox(imgSrc);
        });
    });

    function createLightbox(imgSrc) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-wrapper">
                <button class="lightbox-close">&times;</button>
                <img src="${imgSrc}" alt="Project">
            </div>
        `;
        
        // Styles
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
            border: 3px solid var(--gold);
            box-shadow: 0 0 50px rgba(189, 159, 103, 0.5);
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -50px;
            right: 0;
            width: 50px;
            height: 50px;
            background: var(--gold);
            color: var(--darker);
            border: none;
            border-radius: 50%;
            font-size: 30px;
            cursor: pointer;
            transition: all 0.3s;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'rotate(90deg) scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = 'rotate(0) scale(1)';
        });
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        const closeLightbox = () => {
            lightbox.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    // ============= Hexagon Hover Effect =============
    const hexWrappers = document.querySelectorAll('.hex-wrapper');
    
    hexWrappers.forEach(hex => {
        hex.addEventListener('mouseenter', () => {
            // Scale up this hex
            hex.style.transform = 'translateY(-10px) scale(1.1)';
            hex.style.zIndex = '10';
            
            // Scale down neighbors slightly
            hexWrappers.forEach(otherHex => {
                if (otherHex !== hex) {
                    otherHex.style.transform = 'translateY(0) scale(0.95)';
                    otherHex.style.opacity = '0.5';
                }
            });
        });
        
        hex.addEventListener('mouseleave', () => {
            hexWrappers.forEach(otherHex => {
                otherHex.style.transform = 'translateY(0) scale(1)';
                otherHex.style.opacity = '1';
                otherHex.style.zIndex = '1';
            });
        });
    });

    // ============= Parallax Effect =============
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for profile frame
        const profileFrame = document.querySelector('.profile-frame');
        if (profileFrame) {
            profileFrame.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Parallax for hexagons
        hexWrappers.forEach((hex, index) => {
            const speed = 0.05 + (index * 0.01);
            hex.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============= Smooth Scroll =============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============= Scroll to Top Button =============
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 40px;
        right: 40px;
        width: 60px;
        height: 60px;
        background: var(--gold);
        color: var(--darker);
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(189, 159, 103, 0.4);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-10px) scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 10px 30px rgba(189, 159, 103, 0.6)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollTopBtn.style.boxShadow = '0 5px 20px rgba(189, 159, 103, 0.4)';
    });

    // ============= Performance Optimizations =============
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

    // Debounce scroll events
    const debouncedScroll = debounce(updateActiveNav, 100);
    window.addEventListener('scroll', debouncedScroll);

    // ============= Easter Egg - Konami Code =============
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(style);
        }, 5000);
        
        console.log('🎉 Easter Egg Activated! You found the secret!');
    }

    // ============= Console Art =============
    console.log('%c' +
        '  ╔═══════════════════════════════════╗\n' +
        '  ║   CHEIKH IDOUMOU - PORTFOLIO     ║\n' +
        '  ║   Backend Developer & DevOps     ║\n' +
        '  ╚═══════════════════════════════════╝',
        'color: #bd9f67; font-size: 14px; font-weight: bold;'
    );
    
    console.log('%cWelcome to my creative portfolio! 🚀', 
        'color: #bd9f67; font-size: 16px; font-weight: bold;'
    );
    
    console.log('%cTech Stack: HTML5, CSS3, JavaScript (Vanilla)', 
        'color: #94a3b8; font-size: 12px;'
    );
    
    console.log('%cTry the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 
        'color: #22c55e; font-size: 12px; font-style: italic;'
    );

})();