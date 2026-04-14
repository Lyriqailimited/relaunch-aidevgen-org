/**
 * AiDevGen Website - Enhanced JavaScript with Responsive Optimizations
 * 
 * This script handles all interactive elements, animations, and visual effects with
 * special optimizations for touch devices and improved performance on mobile.
 */
(function() {
  "use strict";

  /**
   * Utility Functions
   */
  
  /**
   * Select DOM element by selector
   * @param {string} el - CSS selector
   * @param {boolean} all - Whether to select all matching elements
   * @return {Element|NodeList} - Selected element(s)
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Add event listener to DOM element(s)
   * @param {string} type - Event type
   * @param {string} el - CSS selector
   * @param {function} listener - Event handler
   * @param {boolean} all - Whether to add to all matching elements
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Add scroll event listener to element
   * @param {Element} el - Element to listen on
   * @param {function} listener - Event handler
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Throttle function to limit execution rate
   * @param {function} callback - Function to throttle
   * @param {number} delay - Minimum time between executions (ms)
   * @return {function} - Throttled function
   */
  function throttle(callback, delay) {
    let lastCall = 0;
    return function() {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback.apply(null, arguments);
    };
  }

  /**
   * Check if the device is touch-capable
   * @return {boolean} - Whether the device has touch capabilities
   */
  function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
  }

  /**
   * Apply easing function for smooth animations
   * @param {number} t - Current time (0-1)
   * @return {number} - Eased value
   */
  function easeInOutCubic(t) {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  /**
   * Enhanced Mouse/Touch Reactive Hero Section
   * This implements advanced interactive animations for the hero area
   * with optimizations for both mouse and touch interactions
   */
  function initHeroInteractions() {
    const hero = document.getElementById('hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSubheadline = document.querySelector('.hero-subheadline');
    const serviceIcons = document.querySelectorAll('.hero-service-icon');
    const ctaButton = document.querySelector('.hero-cta .cta-btn');
    
    // Only proceed if we're on a page with the hero section
    if (!hero) return;
    
    // Check if we're on a touch device
    const isTouch = isTouchDevice();
    
    // Optimize animations for device capabilities
    const useReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Animate hero elements entrance
    const animateHeroEntrance = () => {
      // Skip complex animations if user prefers reduced motion
      if (useReducedMotion) {
        if (heroHeadline) heroHeadline.style.opacity = "1";
        if (heroSubheadline) heroSubheadline.style.opacity = "1";
        if (ctaButton) ctaButton.style.opacity = "1";
        serviceIcons.forEach(icon => icon.style.opacity = "1");
        return;
      }
      
      // Initial setup - set elements to invisible
      if (heroHeadline) {
        heroHeadline.style.opacity = "0";
        heroHeadline.style.transform = "translateY(30px) scale(0.95)";
      }
      
      if (heroSubheadline) {
        heroSubheadline.style.opacity = "0";
        heroSubheadline.style.transform = "translateY(20px)";
      }
      
      if (ctaButton) {
        ctaButton.style.opacity = "0";
        ctaButton.style.transform = "translateY(20px)";
      }
      
      // Initialize service icons with staggered appearance
      serviceIcons.forEach((icon, index) => {
        icon.style.opacity = "0";
        icon.style.transform = "translateY(20px)";
      });
      
      // Animate elements in sequence
      setTimeout(() => {
        if (heroHeadline) {
          heroHeadline.style.transition = "opacity 1.2s cubic-bezier(0.215, 0.61, 0.355, 1), transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1)";
          heroHeadline.style.opacity = "1";
          heroHeadline.style.transform = "translateY(0) scale(1)";
        }
        
        setTimeout(() => {
          if (heroSubheadline) {
            heroSubheadline.style.transition = "opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1), transform 1s cubic-bezier(0.215, 0.61, 0.355, 1)";
            heroSubheadline.style.opacity = "1";
            heroSubheadline.style.transform = "translateY(0)";
          }
          
          // Animate service icons with staggered delay
          serviceIcons.forEach((icon, index) => {
            setTimeout(() => {
              icon.style.transition = "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
              icon.style.opacity = "1";
              icon.style.transform = "translateY(0)";
            }, 300 + (index * 150));
          });
          
          setTimeout(() => {
            if (ctaButton) {
              ctaButton.style.transition = "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
              ctaButton.style.opacity = "1";
              ctaButton.style.transform = "translateY(0)";
            }
          }, 800);
        }, 400);
      }, 500);
    };
    
    // Skip the motion-heavy effects on touch devices and small screens
    if (!isTouch && window.innerWidth > 991) {
      // Add enhanced mouse move event listener to the hero section
      hero.addEventListener('mousemove', throttle(function(e) {
        // Get mouse position relative to the hero section
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        // Calculate the center point of the hero section
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate the offset from center (normalized to -1 to 1)
        const offsetX = (x - centerX) / centerX;
        const offsetY = (y - centerY) / centerY;
        
        // Move floating elements based on mouse position with physics-based motion
        floatingElements.forEach((element, index) => {
          // Different elements move at different speeds/directions for a layered effect
          const speedFactor = 0.04 * (index + 1);
          const moveX = -offsetX * 35 * speedFactor;
          const moveY = -offsetY * 35 * speedFactor;
          const rotation = offsetX * offsetY * 5; // Subtle rotation based on mouse movement
          
          // Apply smooth transform to the element with eased animation
          element.style.transition = "transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)";
          element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotation}deg)`;
          
          // Add subtle scale effect
          const scaleAmount = 1 + (Math.abs(offsetX) + Math.abs(offsetY)) * 0.05;
          element.style.transform += ` scale(${scaleAmount})`;
        });
        
        // Enhanced 3D effect for the headline
        if (heroHeadline) {
          const headlineMoveX = offsetX * 15;
          const headlineMoveY = offsetY * 10;
          const headlineRotateX = -offsetY * 5; // Tilt based on Y position
          const headlineRotateY = offsetX * 5;  // Tilt based on X position
          
          heroHeadline.style.transition = "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)";
          heroHeadline.style.transform = `translate3d(${headlineMoveX}px, ${headlineMoveY}px, 0) rotateX(${headlineRotateX}deg) rotateY(${headlineRotateY}deg)`;
          heroHeadline.style.textShadow = `
            ${offsetX * 5}px ${offsetY * 5}px 15px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(255, 209, 0, ${0.2 + (Math.abs(offsetX) + Math.abs(offsetY)) * 0.2})
          `;
        }
        
        // Subtle movement for subheadline
        if (heroSubheadline) {
          const subheadlineMoveX = offsetX * 10;
          const subheadlineMoveY = offsetY * 7;
          
          heroSubheadline.style.transition = "transform 0.9s cubic-bezier(0.215, 0.61, 0.355, 1)";
          heroSubheadline.style.transform = `translate3d(${subheadlineMoveX}px, ${subheadlineMoveY}px, 0)`;
        }
        
        // Create a dynamic light effect where the mouse is
        if (!useReducedMotion) {
          const gradientX = (x / rect.width) * 100;
          const gradientY = (y / rect.height) * 100;
          hero.style.backgroundBlendMode = 'overlay';
          hero.style.background = `
            radial-gradient(
              circle at ${gradientX}% ${gradientY}%, 
              rgba(255, 209, 0, 0.12) 0%, 
              rgba(10, 10, 10, 0.9) 40%
            ),
            linear-gradient(rgba(10, 10, 10, 0.9), rgba(18, 18, 18, 0.9)), 
            url("assets/img/hero-bg.jpg")
          `;
          hero.style.backgroundSize = 'cover';
        }
        
        // Add reactive glow to service icons based on proximity to mouse
        serviceIcons.forEach(icon => {
          const iconRect = icon.getBoundingClientRect();
          const iconCenterX = iconRect.left + iconRect.width/2 - rect.left;
          const iconCenterY = iconRect.top + iconRect.height/2 - rect.top;
          
          // Calculate distance from mouse to icon center
          const deltaX = x - iconCenterX;
          const deltaY = y - iconCenterY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
          
          // Normalize distance to a 0-1 value and invert (closer = higher value)
          const proximity = 1 - Math.min(distance / (maxDistance * 0.5), 1);
          
          // Apply glow effect based on proximity
          if (proximity > 0.2) {
            const glowIntensity = proximity * 0.5;
            icon.style.boxShadow = `0 5px 20px rgba(255, 209, 0, ${glowIntensity})`;
            icon.style.borderColor = `rgba(255, 209, 0, ${proximity * 0.5})`;
            icon.style.transform = `translateY(-${proximity * 8}px) scale(${1 + proximity * 0.05})`;
          } else {
            icon.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            icon.style.borderColor = 'rgba(255, 209, 0, 0.1)';
            icon.style.transform = 'translateY(0) scale(1)';
          }
        });
        
        // Add glow effect to CTA button on proximity
        if (ctaButton) {
          const btnRect = ctaButton.getBoundingClientRect();
          const btnCenterX = btnRect.left + btnRect.width/2 - rect.left;
          const btnCenterY = btnRect.top + btnRect.height/2 - rect.top;
          
          const btnDeltaX = x - btnCenterX;
          const btnDeltaY = y - btnCenterY;
          const btnDistance = Math.sqrt(btnDeltaX * btnDeltaX + btnDeltaY * btnDeltaY);
          const btnMaxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 3;
          
          const btnProximity = 1 - Math.min(btnDistance / btnMaxDistance, 1);
          
          if (btnProximity > 0.2) {
            const glowIntensity = btnProximity * 0.6;
            ctaButton.style.boxShadow = `0 8px 30px rgba(255, 209, 0, ${glowIntensity})`;
            ctaButton.style.transform = `scale(${1 + btnProximity * 0.05})`;
          } else {
            ctaButton.style.boxShadow = '0 8px 25px rgba(255, 209, 0, 0.3)';
            ctaButton.style.transform = 'scale(1)';
          }
        }
      }, 20));
      
      // Reset on mouse leave with smooth transition
      hero.addEventListener('mouseleave', function() {
        floatingElements.forEach(element => {
          element.style.transition = "transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1)";
          element.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
        });
        
        if (heroHeadline) {
          heroHeadline.style.transition = "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), text-shadow 1s ease";
          heroHeadline.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
          heroHeadline.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.7)';
        }
        
        if (heroSubheadline) {
          heroSubheadline.style.transition = "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1)";
          heroSubheadline.style.transform = 'translate3d(0, 0, 0)';
        }
        
        hero.style.transition = "background 1.5s ease";
        hero.style.background = 'linear-gradient(rgba(10, 10, 10, 0.9), rgba(18, 18, 18, 0.9)), url("assets/img/hero-bg.jpg")';
        hero.style.backgroundSize = 'cover';
        
        // Reset service icons
        serviceIcons.forEach(icon => {
          icon.style.transition = "all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)";
          icon.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
          icon.style.borderColor = 'rgba(255, 209, 0, 0.1)';
          icon.style.transform = 'translateY(0) scale(1)';
        });
        
        // Reset CTA button
        if (ctaButton) {
          ctaButton.style.transition = "all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)";
          ctaButton.style.boxShadow = '0 8px 25px rgba(255, 209, 0, 0.3)';
          ctaButton.style.transform = 'scale(1)';
        }
      });
    } else {
      // Add simpler animations for touch devices
      serviceIcons.forEach(icon => {
        icon.classList.add('floating');
        // Vary the animation delay to create a more natural effect
        icon.style.animationDelay = `${Math.random() * 1.5}s`;
      });
      
      if (ctaButton) {
        ctaButton.classList.add('pulse');
      }
    }
    
    // Enhanced parallax scrolling effect (optimized for performance)
    // Only apply to desktop - disable on mobile for better performance
    if (!isTouch && window.innerWidth > 991 && !useReducedMotion) {
      window.addEventListener('scroll', throttle(function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition < window.innerHeight) {
          // Simplified parallax that's less resource-intensive
          // Parallax for headline - moves faster than background
          if (heroHeadline) {
            const headlineYValue = scrollPosition * 0.3;
            const opacity = 1 - (scrollPosition / (window.innerHeight * 0.4));
            heroHeadline.style.transform = `translateY(-${headlineYValue}px)`;
            heroHeadline.style.opacity = Math.max(opacity, 0);
          }
          
          // Parallax for subheadline
          if (heroSubheadline) {
            const subheadlineYValue = scrollPosition * 0.25;
            const opacity = 1 - (scrollPosition / (window.innerHeight * 0.5));
            heroSubheadline.style.transform = `translateY(-${subheadlineYValue}px)`;
            heroSubheadline.style.opacity = Math.max(opacity, 0);
          }
          
          // Fade out service icons and CTA
          const fadeOpacity = 1 - (scrollPosition / (window.innerHeight * 0.6));
          
          serviceIcons.forEach(icon => {
            icon.style.opacity = Math.max(fadeOpacity, 0);
          });
          
          if (ctaButton) {
            ctaButton.style.opacity = Math.max(fadeOpacity, 0);
          }
        }
      }, 50));
    }
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined' && select('#particles-js')) {
      // Adjust particle count based on device capabilities for better performance
      const particleCount = isTouch || window.innerWidth <= 991 ? 30 : 60;
      
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": particleCount,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#FFD100"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.4,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#FFD100",
            "opacity": 0.2,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": true,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": !isTouch, // Disable hover effect on touch devices
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 0.6
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
    
    // Start entrance animation
    animateHeroEntrance();
  }

  /**
   * Navbar links active state on scroll
   */
  function initNavbarActiveState() {
    let navbarlinks = select('#navbar .scrollto', true);
    
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };
    
    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);
  }

  /**
   * Scrolls to an element with header offset
   * @param {string} el - Selector for the target element
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;
    let elementPos = select(el).offsetTop;
    
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  /**
   * Header scroll handling
   */
  function initHeaderScroll() {
    let selectHeader = select('#header');
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled');
        } else {
          selectHeader.classList.remove('header-scrolled');
        }
      };
      window.addEventListener('load', headerScrolled);
      onscroll(document, headerScrolled);
    }
  }
    /**
   * Auto-hide header on non-home pages, show again when hovering near the top
   */
  function initHeaderAutoHide() {
    const header = select('#header');
    if (!header) return;

    const path = window.location.pathname;
    const isHome = (path === '/' || path === '/index.html');

    // Do nothing on the home page
    if (isHome) return;

    let hideTimeout;

    const hideHeader = () => {
      header.classList.add('header-hidden');
    };

    const scheduleHide = () => {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(hideHeader, 3000); // 3 seconds
    };

    const showHeader = () => {
      header.classList.remove('header-hidden');
      scheduleHide(); // hide again after 3s of no hover
    };

    // Start: header visible, then hide after 3 seconds
    scheduleHide();

    // Show header whenever the mouse is near the top of the viewport
    window.addEventListener('mousemove', (event) => {
      if (event.clientY < 80) {
        showHeader();
      }
    });

    // Touch support: tap near top to reveal
    window.addEventListener('touchstart', (event) => {
      if (event.touches && event.touches[0].clientY < 80) {
        showHeader();
      }
    });
  }

  /**
   * Enhanced Back to top button
   */
  function initBackToTop() {
    let backtotop = select('.back-to-top');
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.style.transition = "all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)";
          backtotop.classList.add('active');
          setTimeout(() => {
            backtotop.style.transform = "scale(1)";
          }, 50);
        } else {
          backtotop.style.transform = "scale(0.8)";
          setTimeout(() => {
            backtotop.classList.remove('active');
          }, 300);
        }
      };
      window.addEventListener('load', toggleBacktotop);
      onscroll(document, throttle(toggleBacktotop, 100));
    }
  }

  /**
   * Mobile navigation handling
   */
  function initMobileNav() {
    // Mobile nav toggle
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    // Mobile nav dropdowns activate
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    }, true);

    // Close mobile nav when clicking a nav item
    on('click', '.navbar-mobile .nav-link', function(e) {
      const navbar = select('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
    }, true);
  }

  /**
   * Enhanced smooth scrolling with URL hash management
   */
  function initSmoothScroll() {
    // Handle section link clicks
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault();

        // Close mobile menu if open
        let navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }

        // Update URL hash
        history.pushState(null, null, this.hash);

        // Smooth scroll to section
        const targetElement = select(this.hash);
        const targetPosition = targetElement.offsetTop - select('#header').offsetHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active state
        updateActiveNavLink();
      }
    }, true);

    // Handle Home link clicks
    on('click', 'a[href="/"], a[href="index.html"]', function(e) {
      // Check if we're already on the home page
      const currentPath = window.location.pathname;
      const isHomePage = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/index.html');

      if (isHomePage) {
        // We're on home page - prevent default and scroll to top
        e.preventDefault();

        // Close mobile menu if open
        let navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }

        // Remove hash from URL
        history.pushState(null, null, window.location.pathname);

        // Scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // Update active state
        updateActiveNavLink();
      } else {
        // We're on a different page - close mobile menu but allow navigation to home
        let navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        // Allow default navigation to home page
      }
    }, true);

    // Handle hash links on page load (but don't auto-add #hero)
    window.addEventListener('load', () => {
      if (window.location.hash && window.location.hash !== '#hero') {
        const target = select(window.location.hash);
        if (target) {
          setTimeout(() => {
            const targetPosition = target.offsetTop - select('#header').offsetHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
      updateActiveNavLink();
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
  }

  /**
   * Update active navigation link based on scroll position
   */
  function updateActiveNavLink() {
    const navLinks = select('.nav-link', true);
    if (!navLinks) return;

    // Get current pathname
    const currentPath = window.location.pathname;

    // Check page type by detecting unique class selectors
    const isServicePost = document.querySelector('.service-post') !== null;
    const isBlogPost = document.querySelector('.blog-post') !== null && !isServicePost;

    // Check if we're on a separate page (not home)
    // Services pages: /services/, /web-development/, /mobile-development/, etc.
    // Blog pages: /blog/, /posts/...
    // Contact: /getintouch/

    if (currentPath !== '/' && currentPath !== '/index.html') {
      // We're on a separate page - highlight based on URL or page type
      navLinks.forEach(link => link.classList.remove('active'));

      // Check if this is a service detail page (by detecting .service-post class)
      if (isServicePost) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '/services/') {
            link.classList.add('active');
          }
        });
        return;
      }

      // Check if this is a blog post (by detecting .blog-post class, but NOT .service-post)
      if (isBlogPost) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '/blog/') {
            link.classList.add('active');
          }
        });
        return;
      }

      // Check for Services pages (including sub-pages)
      if (currentPath.includes('/services/') ||
          currentPath.includes('/web-development/') ||
          currentPath.includes('/mobile-development/') ||
          currentPath.includes('/ai-machine-learning/') ||
          currentPath.includes('/blockchain') ||
          currentPath.includes('/automation') ||
          currentPath.includes('/ai-strategy') ||
          currentPath.includes('/custom-ai') ||
          currentPath.includes('/data-analytics') ||
          currentPath.includes('/ai-apps') ||
          currentPath.includes('/database') ||
          currentPath.includes('/customer-service') ||
          currentPath.includes('/data-extraction') ||
          currentPath.includes('/erp-crm') ||
          currentPath.includes('/model-integration')) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '/services/') {
            link.classList.add('active');
          }
        });
      }
      // Check for Blog pages (including posts)
      else if (currentPath.includes('/blog') || currentPath.includes('/post')) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '/blog/') {
            link.classList.add('active');
          }
        });
      }
      // Check for Contact page
      else if (currentPath.includes('/getintouch/')) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '/getintouch/' || link.textContent.trim() === 'Contact') {
            link.classList.add('active');
          }
        });
      }

      return; // Don't do scroll-based highlighting on separate pages
    }

    // We're on the home page - use scroll-based highlighting for hash sections
    const sections = select('section[id]', true);
    if (!sections) return;

    const scrollPosition = window.pageYOffset + select('#header').offsetHeight + 50;

    // If at the very top, activate Home
    if (window.pageYOffset < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '/' || link.getAttribute('href') === 'index.html') {
          link.classList.add('active');
        }
      });
      return;
    }

    // Find current section based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update active class based on current section
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Preloader with smooth fade out
   */
  function initPreloader() {
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        // Add transition for smooth fade out
        setTimeout(() => {
          preloader.style.transition = "opacity 1s ease, visibility 1s ease";
          preloader.style.opacity = "0";
          preloader.style.visibility = "hidden";
          
          setTimeout(() => {
            preloader.remove();
          }, 1000);
        }, 500); // Reduced time for mobile
      });
    }
  }

  /**
   * Clients slider initialization
   */
  function initClientsSlider() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.clients-slider')) {
      new Swiper('.clients-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 40
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 60
          },
          992: {
            slidesPerView: 6,
            spaceBetween: 80
          }
        }
      });
    }
  }

  /**
   * Portfolio filters and animations
   */
  function initPortfolio() {
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      
      if (portfolioContainer && typeof Isotope !== 'undefined') {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows',
          transitionDuration: '0.8s',
          stagger: 50,
          hiddenStyle: {
            opacity: 0,
            transform: 'scale(0.95)'
          },
          visibleStyle: {
            opacity: 1,
            transform: 'scale(1)'
          }
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          // Add animation to filter change
          portfolioContainer.classList.add('filtering');
          setTimeout(() => {
            portfolioIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            portfolioContainer.classList.remove('filtering');
            
            // Refresh AOS animations
            if (typeof AOS !== 'undefined') {
              AOS.refresh();
            }
          }, 300);
        }, true);
      }
    });

    // Initialize portfolio lightbox if GLightbox exists
    if (typeof GLightbox !== 'undefined') {
      const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        closeEffect: 'fade',
        cssEffects: {
          fade: {
            in: 'fadeIn',
            out: 'fadeOut'
          }
        }
      });
    }

    // Initialize portfolio details slider if Swiper exists
    if (typeof Swiper !== 'undefined' && document.querySelector('.portfolio-details-slider')) {
      new Swiper('.portfolio-details-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }

  /**
   * Animation on scroll initialization
   */
  function initAOS() {
    function aos_init() {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 800,
          easing: 'ease-in-out-cubic',
          once: isTouchDevice(), // Set to once:true on mobile for better performance
          mirror: !isTouchDevice(), // Disable mirror effect on mobile
          offset: 50,
          delay: 100,
          anchorPlacement: 'top-bottom',
          disable: window.innerWidth < 768 ? true : false // Disable on very small screens
        });
      }
    }
    window.addEventListener('load', () => {
      aos_init();
    });
  }

  /**
   * Enhanced scroll animations for elements
   */
  function initScrollAnimations() {
    const scrollAnimation = throttle(() => {
      const elements = document.querySelectorAll('.fade-up, .fade-down, .fade-right, .fade-left, .zoom-in, .zoom-out');
      
      elements.forEach(element => {
        // Check if element is in viewport
        const elementPosition = element.getBoundingClientRect();
        
        // Element is in view if its top is less than the viewport height
        // and its bottom is greater than 0
        if (
          elementPosition.top < window.innerHeight * 0.8 && 
          elementPosition.bottom > 0
        ) {
          element.classList.add('in-view');
        }
      });
    }, 100);

    window.addEventListener('scroll', scrollAnimation);
    window.addEventListener('resize', scrollAnimation);
    window.addEventListener('load', scrollAnimation);
  }

  /**
   * Initialize interactive hover effects
   */
  function initHoverEffects() {
    // Skip complex effects on touch devices
    if (isTouchDevice()) return;

    // Add floating animation to hero icons
    const heroIcons = select('.hero-service-icon', true);
    if (heroIcons && heroIcons.length) {
      heroIcons.forEach((icon, index) => {
        // Stagger the animations
        setTimeout(() => {
          icon.classList.add('floating');
          // Vary the animation delay to create a more natural effect
          icon.style.animationDelay = `${index * 0.2}s`;
        }, index * 300);
      });
    }

    // Add pulse animation to CTA buttons
    const ctaButtons = select('.cta-btn', true);
    if (ctaButtons && ctaButtons.length) {
      ctaButtons.forEach(button => {
        button.classList.add('pulse');
      });
    }

    // Add hover lift effect to service boxes
    const serviceBoxes = select('.services .icon-box', true);
    if (serviceBoxes && serviceBoxes.length) {
      serviceBoxes.forEach(box => {
        box.classList.add('hover-lift');
      });
    }

    // Add glow effect to portfolio items
    const portfolioItems = select('.portfolio-wrap', true);
    if (portfolioItems && portfolioItems.length) {
      portfolioItems.forEach(item => {
        item.classList.add('glow-on-hover');
      });
    }
    
    // Add glow underline effect to navigation links
    const navLinks = select('.navbar a', true);
    if (navLinks && navLinks.length) {
      navLinks.forEach(link => {
        if (!link.classList.contains('active')) {
          link.classList.add('glow-underline');
        }
      });
    }
  }

  /**
   * Initialize Technology Stack Section
   * Handles category switching and interactive animations
   */
  function initTechnologyStack() {
    const categoryButtons = select('.tech-category-btn', true);
    const categoryContents = select('.tech-category-content', true);

    if (!categoryButtons || !categoryContents) return;

    // Category switching functionality
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');

        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Hide all content sections
        categoryContents.forEach(content => {
          content.classList.remove('active');
        });

        // Show selected content with smooth transition
        const targetContent = document.getElementById(category);
        if (targetContent) {
          setTimeout(() => {
            targetContent.classList.add('active');

            // Refresh AOS for the newly visible content
            if (typeof AOS !== 'undefined') {
              AOS.refresh();
            }
          }, 100);
        }
      });
    });

    // Add keyboard navigation support
    categoryButtons.forEach((button, index) => {
      button.addEventListener('keydown', function(e) {
        let targetButton = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          targetButton = categoryButtons[index + 1] || categoryButtons[0];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          targetButton = categoryButtons[index - 1] || categoryButtons[categoryButtons.length - 1];
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }

        if (targetButton) {
          targetButton.focus();
        }
      });
    });

    // Add enhanced hover effects to tech cards
    const techCards = select('.tech-card', true);
    if (techCards && techCards.length) {
      techCards.forEach(card => {
        // Add parallax-like effect on hover
        card.addEventListener('mousemove', function(e) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
        });

        card.addEventListener('mouseleave', function() {
          card.style.transform = '';
        });
      });
    }

    // Add animation to floating shapes
    const shapes = select('.tech-shape', true);
    if (shapes && shapes.length) {
      shapes.forEach((shape, index) => {
        // Random initial position offset for variety
        const randomDelay = Math.random() * 5;
        shape.style.animationDelay = `${randomDelay}s`;
      });
    }
  }

  /**
   * Main initialization function
   * Calls all module initializers in the correct order
   */
  function initializeAll() {
    // Core functionality
    initPreloader();
    initHeaderScroll();
    initHeaderAutoHide();
    initNavbarActiveState();
    initMobileNav(); 
    initSmoothScroll();
    initBackToTop();
    
    // Hero section
    initHeroInteractions();
    
    // Components
    initClientsSlider();
    initPortfolio();
    initTechnologyStack();
    initAOS();
    initScrollAnimations();

    // Visual effects
    initHoverEffects();
    
    // Add event listener for window resize to handle responsive changes
    window.addEventListener('resize', throttle(function() {
      // Refresh AOS on resize
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
      
      // Update any size-dependent features
      initScrollAnimations();
    }, 250));

    // Handle device orientation change
    window.addEventListener('orientationchange', function() {
      // Delay to allow browser to complete orientation change
      setTimeout(function() {
        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
        
        // Update scroll-based animations
        initScrollAnimations();
      }, 200);
    });
  }

  // Initialize everything when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initializeAll);

})();