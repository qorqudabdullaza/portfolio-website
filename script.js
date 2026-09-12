/* ═══════════════════════════════════════════
   QORQUD PORTFOLIO — Main JavaScript
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════
     1. MOBILE MENU TOGGLE
     ═══════════════════════════════════════════ */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');

      const icon = navToggle.querySelector('i');
      if (icon) {
        const isOpen = navMenu.classList.contains('open');
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close on link click
    navMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  /* ═══════════════════════════════════════════
     2. HEADER SCROLL EFFECT
     ═══════════════════════════════════════════ */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  const handleScroll = () => {
    const y = window.scrollY;

    if (header) {
      if (y > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    if (backToTop) {
      if (y > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ═══════════════════════════════════════════
     3. BACK TO TOP
     ═══════════════════════════════════════════ */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ═══════════════════════════════════════════
     4. SMOOTH SCROLL (Nav Links)
     ═══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  /* ═══════════════════════════════════════════
     5. ACTIVE NAV LINK (on scroll)
     ═══════════════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    const activateLink = () => {
      const scrollY = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', activateLink, { passive: true });
    activateLink();
  }

  /* ═══════════════════════════════════════════
     6. SCROLL REVEAL ANIMATION
     ═══════════════════════════════════════════ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('active'), i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ═══════════════════════════════════════════
     7. TYPING EFFECT
     ═══════════════════════════════════════════ */
  const typedElement = document.getElementById('typed');
  if (typedElement) {
    const phrases = [
      'Front-End Web Developer',
      'HTML • CSS • JavaScript',
      'React Developer',
      'Available for Freelance'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    };

    typeLoop();
  }

  /* ═══════════════════════════════════════════
     8. PARTICLES GENERATOR
     ═══════════════════════════════════════════ */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const particleCount = window.innerWidth < 768 ? 15 : 35;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';

      const size = Math.random() * 3 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 15 + 10;

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = left + '%';
      particle.style.animationDelay = delay + 's';
      particle.style.animationDuration = duration + 's';

      // Random color
      const colors = [
        'rgba(139, 92, 246, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(6, 182, 212, 0.6)'
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 10px ${color}`;

      particlesContainer.appendChild(particle);
    }
  }

  /* ═══════════════════════════════════════════
     9. CURSOR GLOW FOLLOW
     ═══════════════════════════════════════════ */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth >= 1024) {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    };

    animateGlow();
  }

  /* ═══════════════════════════════════════════
     10. MUSIC TOGGLE
     ═══════════════════════════════════════════ */
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');

  if (musicBtn && bgMusic) {
    let isPlaying = false;
    bgMusic.volume = 0.3;

    musicBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        isPlaying = false;
      } else {
        bgMusic.play().then(() => {
          musicBtn.classList.add('playing');
          isPlaying = true;
        }).catch(err => {
          console.log('Music error:', err);
          showToast('Music file not found. Add music.mp3 to the folder.', 'error');
        });
      }
    });
  }

  /* ═══════════════════════════════════════════
     11. CONTACT FORM
     ═══════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      if (!data.name || !data.email || !data.message) {
        showToast('Please fill in all fields!', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showToast('Please enter a valid email address!', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast('Message sent! I will reply within 1 hour.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  /* ═══════════════════════════════════════════
     12. TOAST NOTIFICATION
     ═══════════════════════════════════════════ */
  function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  window.showToast = showToast;

  /* ═══════════════════════════════════════════
     13. CONSOLE
     ═══════════════════════════════════════════ */
  console.log('%c💻 Qorqud Portfolio', 'font-size:20px;font-weight:bold;color:#8b5cf6;');
  console.log('%cLoaded successfully ✨', 'font-size:12px;color:#94a3b8;');

});