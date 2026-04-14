/* ============================================================
   AIDEVGEN Premium Animations Layer
   Uses motion.dev (window.Motion) for scroll-triggered reveals
   ============================================================ */

(function() {
  'use strict';

  // Respect reduced motion
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Wait for Motion library to be available
  function waitForMotion(callback, maxAttempts) {
    var attempts = 0;
    var max = maxAttempts || 50;
    var check = setInterval(function() {
      attempts++;
      if (window.Motion) {
        clearInterval(check);
        callback(window.Motion);
      } else if (attempts >= max) {
        clearInterval(check);
        // Fallback: just show everything
        showAllElements();
      }
    }, 100);
  }

  function showAllElements() {
    var els = document.querySelectorAll('.enhance-reveal, .enhance-reveal-left, .enhance-reveal-right, .enhance-reveal-scale');
    for (var i = 0; i < els.length; i++) {
      els[i].style.opacity = '1';
      els[i].style.transform = 'none';
    }
  }

  // Add reveal classes to elements (before Motion loads)
  function tagElements() {
    try {
      // Section titles
      var sectionTitles = document.querySelectorAll('.section-title');
      for (var i = 0; i < sectionTitles.length; i++) {
        sectionTitles[i].classList.add('enhance-reveal');
      }

      // Icon boxes
      var iconBoxes = document.querySelectorAll('.icon-box');
      for (var i = 0; i < iconBoxes.length; i++) {
        iconBoxes[i].classList.add('enhance-reveal');
      }

      // Service cards
      var serviceCards = document.querySelectorAll('.service-card');
      for (var i = 0; i < serviceCards.length; i++) {
        serviceCards[i].classList.add('enhance-reveal');
      }

      // Portfolio items
      var portfolioItems = document.querySelectorAll('.portfolio-item');
      for (var i = 0; i < portfolioItems.length; i++) {
        portfolioItems[i].classList.add('enhance-reveal');
      }

      // Recognition cards
      var recognitionCards = document.querySelectorAll('.recognition-card');
      for (var i = 0; i < recognitionCards.length; i++) {
        recognitionCards[i].classList.add('enhance-reveal-scale');
      }

      // Footer columns
      var footerCols = document.querySelectorAll('#footer .col-lg-3');
      for (var i = 0; i < footerCols.length; i++) {
        footerCols[i].classList.add('enhance-reveal');
      }

      // About section image
      var aboutImg = document.querySelector('.about .img-hover-zoom');
      if (aboutImg) aboutImg.classList.add('enhance-reveal-right');

      // About content
      var aboutContent = document.querySelector('.about .content');
      if (aboutContent) aboutContent.classList.add('enhance-reveal-left');

      // Features image
      var featImg = document.querySelector('.features .image');
      if (featImg) featImg.classList.add('enhance-reveal-left');

      // Post header
      var postHeader = document.querySelector('.post-header');
      if (postHeader) postHeader.classList.add('enhance-reveal');

      // Post content
      var postContent = document.querySelector('.post-content');
      if (postContent) postContent.classList.add('enhance-reveal');

      // Service detail hero
      var serviceHero = document.querySelector('.service-detail-hero');
      if (serviceHero) serviceHero.classList.add('enhance-reveal-scale');

      // CTA section content
      var ctaTitle = document.querySelector('.cta-title');
      if (ctaTitle) ctaTitle.classList.add('enhance-reveal');

      // Recognition banner
      var recBanner = document.querySelector('.recognition-banner');
      if (recBanner) recBanner.classList.add('enhance-reveal-scale');

      // Blog section
      var blogSection = document.querySelector('#blog .section-title');
      if (blogSection) blogSection.classList.add('enhance-reveal');

      // Hero content (don't hide, animate differently)
      // Hero gets special treatment below

    } catch(e) {
      // Silently fail, show everything
      showAllElements();
    }
  }

  function initAnimations(Motion) {
    var animate = Motion.animate;
    var inView = Motion.inView;
    var scroll = Motion.scroll;
    var stagger = Motion.stagger;

    // Helper: safely animate with inView
    function revealOnScroll(selector, animProps, options) {
      try {
        var elements = document.querySelectorAll(selector);
        if (!elements.length) return;

        for (var i = 0; i < elements.length; i++) {
          (function(el) {
            inView(el, function() {
              animate(el, animProps, Object.assign({
                duration: 0.7,
                easing: [0.4, 0, 0.2, 1]
              }, options || {}));
            }, { amount: 0.15 });
          })(elements[i]);
        }
      } catch(e) {
        // Silently fail
      }
    }

    // Helper: stagger children
    function staggerChildren(parentSelector, childSelector, animProps, options) {
      try {
        var parents = document.querySelectorAll(parentSelector);
        if (!parents.length) return;

        for (var p = 0; p < parents.length; p++) {
          (function(parent) {
            var children = parent.querySelectorAll(childSelector);
            if (!children.length) return;

            inView(parent, function() {
              animate(children, animProps, Object.assign({
                duration: 0.6,
                easing: [0.4, 0, 0.2, 1],
                delay: stagger(0.1)
              }, options || {}));
            }, { amount: 0.1 });
          })(parents[p]);
        }
      } catch(e) {}
    }

    // ---- HERO ANIMATIONS ----
    try {
      var heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        // Headline
        var headline = heroContent.querySelector('.hero-headline');
        if (headline) {
          animate(headline, {
            opacity: [0, 1],
            y: [30, 0]
          }, { duration: 0.8, easing: [0.4, 0, 0.2, 1], delay: 0.2 });
        }

        // Subheadline
        var subheadline = heroContent.querySelector('.hero-subheadline');
        if (subheadline) {
          animate(subheadline, {
            opacity: [0, 1],
            y: [20, 0]
          }, { duration: 0.7, easing: [0.4, 0, 0.2, 1], delay: 0.5 });
        }

        // Service icons stagger
        var serviceIcons = heroContent.querySelectorAll('.hero-service-icon');
        if (serviceIcons.length) {
          animate(serviceIcons, {
            opacity: [0, 1],
            y: [30, 0],
            scale: [0.9, 1]
          }, {
            duration: 0.6,
            easing: [0.4, 0, 0.2, 1],
            delay: stagger(0.12, { start: 0.7 })
          });
        }

        // CTA button
        var heroCta = heroContent.querySelector('.hero-cta');
        if (heroCta) {
          animate(heroCta, {
            opacity: [0, 1],
            y: [20, 0]
          }, { duration: 0.6, easing: [0.4, 0, 0.2, 1], delay: 1.2 });
        }
      }
    } catch(e) {}

    // ---- SECTION TITLES ----
    revealOnScroll('.enhance-reveal', {
      opacity: [0, 1],
      y: [30, 0]
    }, { duration: 0.7 });

    revealOnScroll('.enhance-reveal-left', {
      opacity: [0, 1],
      x: [-30, 0]
    }, { duration: 0.7 });

    revealOnScroll('.enhance-reveal-right', {
      opacity: [0, 1],
      x: [30, 0]
    }, { duration: 0.7 });

    revealOnScroll('.enhance-reveal-scale', {
      opacity: [0, 1],
      scale: [0.92, 1]
    }, { duration: 0.7 });

    // ---- STAGGER: Services icon boxes ----
    staggerChildren('#services .row', '.icon-box', {
      opacity: [0, 1],
      y: [30, 0]
    }, { delay: stagger(0.1) });

    // ---- STAGGER: Service cards on services page ----
    staggerChildren('.services-showcase .container', '.service-card', {
      opacity: [0, 1],
      y: [40, 0]
    }, { delay: stagger(0.15) });

    // ---- STAGGER: Portfolio items ----
    staggerChildren('.portfolio-container', '.portfolio-item', {
      opacity: [0, 1],
      y: [30, 0],
      scale: [0.95, 1]
    }, { delay: stagger(0.08) });

    // ---- STAGGER: Blog articles ----
    staggerChildren('#blog .row', '.icon-box', {
      opacity: [0, 1],
      y: [30, 0]
    }, { delay: stagger(0.12) });

    // ---- STAGGER: Footer columns ----
    staggerChildren('#footer .row', '.col-lg-3', {
      opacity: [0, 1],
      y: [20, 0]
    }, { delay: stagger(0.1) });

    // ---- STAGGER: Recognition logos ----
    staggerChildren('.recognition-logos', '.recognition-logo-wrapper', {
      opacity: [0, 1],
      scale: [0.85, 1]
    }, { delay: stagger(0.12) });

    // ---- STAGGER: Tech category buttons ----
    staggerChildren('.tech-categories', '.tech-category-btn', {
      opacity: [0, 1],
      y: [15, 0]
    }, { delay: stagger(0.08) });

    // ---- STAGGER: Features icon boxes ----
    staggerChildren('.features .col-lg-6:last-child', '.icon-box', {
      opacity: [0, 1],
      x: [20, 0]
    }, { delay: stagger(0.1) });

    // ---- STAGGER: Post content sections ----
    try {
      var postContent = document.querySelector('.post-content');
      if (postContent) {
        var postH2s = postContent.querySelectorAll('h2');
        for (var i = 0; i < postH2s.length; i++) {
          (function(h2) {
            inView(h2, function() {
              animate(h2, {
                opacity: [0, 1],
                x: [-20, 0]
              }, { duration: 0.6, easing: [0.4, 0, 0.2, 1] });
            }, { amount: 0.3 });
          })(postH2s[i]);
        }

        var postUls = postContent.querySelectorAll('ul');
        for (var i = 0; i < postUls.length; i++) {
          (function(ul) {
            var lis = ul.querySelectorAll('li');
            if (!lis.length) return;
            inView(ul, function() {
              animate(lis, {
                opacity: [0, 1],
                x: [-15, 0]
              }, {
                duration: 0.5,
                easing: [0.4, 0, 0.2, 1],
                delay: stagger(0.06)
              });
            }, { amount: 0.2 });
          })(postUls[i]);
        }
      }
    } catch(e) {}

    // ---- HEADER GLASSMORPHISM ENHANCEMENT on scroll ----
    try {
      var header = document.getElementById('header');
      if (header) {
        var scrollHandler = function() {
          if (window.scrollY > 80) {
            header.style.background = 'rgba(8, 8, 8, 0.95)';
            header.style.borderBottomColor = 'rgba(253, 183, 20, 0.12)';
            header.style.boxShadow = '0 4px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(253, 183, 20, 0.05)';
          } else {
            header.style.background = 'rgba(10, 10, 10, 0.7)';
            header.style.borderBottomColor = 'rgba(253, 183, 20, 0.08)';
            header.style.boxShadow = '0 1px 30px rgba(0, 0, 0, 0.3)';
          }
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });
        scrollHandler(); // Initial call
      }
    } catch(e) {}

    // ---- BUTTON HOVER spring animations ----
    try {
      var buttons = document.querySelectorAll('.cta-btn, .get-started-btn, .service-card__cta');
      for (var i = 0; i < buttons.length; i++) {
        (function(btn) {
          btn.addEventListener('mouseenter', function() {
            animate(btn, { scale: 1.05 }, {
              type: 'spring',
              stiffness: 400,
              damping: 15
            });
          });
          btn.addEventListener('mouseleave', function() {
            animate(btn, { scale: 1 }, {
              type: 'spring',
              stiffness: 400,
              damping: 20
            });
          });
        })(buttons[i]);
      }
    } catch(e) {}

    // ---- CARD HOVER spring animations ----
    try {
      var cards = document.querySelectorAll('.icon-box, .service-card__content, .recognition-card, .portfolio-wrap');
      for (var i = 0; i < cards.length; i++) {
        (function(card) {
          card.addEventListener('mouseenter', function() {
            animate(card, { y: -8 }, {
              type: 'spring',
              stiffness: 300,
              damping: 20
            });
          });
          card.addEventListener('mouseleave', function() {
            animate(card, { y: 0 }, {
              type: 'spring',
              stiffness: 300,
              damping: 25
            });
          });
        })(cards[i]);
      }
    } catch(e) {}

    // ---- IMAGE HOVER scale ----
    try {
      var images = document.querySelectorAll('.service-card__image img, .about .img-hover-zoom img, .portfolio-wrap img');
      for (var i = 0; i < images.length; i++) {
        (function(img) {
          var parent = img.closest('.service-card, .img-hover-zoom, .portfolio-wrap');
          if (!parent) return;
          parent.addEventListener('mouseenter', function() {
            animate(img, { scale: 1.06 }, {
              duration: 0.6,
              easing: [0.4, 0, 0.2, 1]
            });
          });
          parent.addEventListener('mouseleave', function() {
            animate(img, { scale: 1 }, {
              duration: 0.6,
              easing: [0.4, 0, 0.2, 1]
            });
          });
        })(images[i]);
      }
    } catch(e) {}

    // ---- HERO PARALLAX (subtle) ----
    try {
      var heroSection = document.getElementById('hero');
      var particlesJs = document.getElementById('particles-js');
      if (heroSection && particlesJs) {
        scroll(function(info) {
          var progress = info.y.progress;
          particlesJs.style.transform = 'translateY(' + (progress * 80) + 'px)';
          particlesJs.style.opacity = String(1 - progress * 0.5);
        }, {
          target: heroSection,
          offset: ['start start', 'end start']
        });
      }
    } catch(e) {}

    // ---- SERVICE DETAIL HERO PARALLAX ----
    try {
      var detailHero = document.querySelector('.service-detail-hero');
      var detailHeroImg = document.querySelector('.service-detail-hero__image');
      if (detailHero && detailHeroImg) {
        scroll(function(info) {
          var progress = info.y.progress;
          detailHeroImg.style.transform = 'scale(' + (1 + progress * 0.05) + ')';
        }, {
          target: detailHero,
          offset: ['start end', 'end start']
        });
      }
    } catch(e) {}

    // ---- CTA SECTION ENTRANCE ----
    try {
      var ctaSection = document.getElementById('cta');
      if (ctaSection) {
        inView(ctaSection, function() {
          var title = ctaSection.querySelector('.cta-title');
          var desc = ctaSection.querySelector('.cta-description');
          var btn = ctaSection.querySelector('.cta-btn');
          var qr = ctaSection.querySelector('.cta-qr-wrapper');

          if (title) animate(title, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.1 });
          if (desc) animate(desc, { opacity: [0, 1], y: [15, 0] }, { duration: 0.6, delay: 0.25 });
          if (btn) animate(btn, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.5, delay: 0.4 });
          if (qr) animate(qr, { opacity: [0, 1], x: [30, 0] }, { duration: 0.6, delay: 0.3 });
        }, { amount: 0.2 });
      }
    } catch(e) {}
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      tagElements();
      waitForMotion(initAnimations);
    });
  } else {
    tagElements();
    waitForMotion(initAnimations);
  }
})();
