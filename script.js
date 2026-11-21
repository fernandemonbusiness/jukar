/**
 * ===================================================================
 * SCRIPT PRINCIPAL: JUKARTRACK - MAQUINARIA PESADA (ORURO, BOLIVIA)
 * JavaScript puro (Vanilla JS), rápido, accesible y sin dependencias.
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // =================================================================
  // 1. CONFIGURACIÓN CENTRAL DE LA EMPRESA: JUKARTRACK
  // =================================================================
  const COMPANY_CONFIG = {
    name: "JUKARTRACK",
    phoneRaw: "59172318977", // Formato internacional Bolivia sin símbolos
    phoneDisplay: "+591 72318977",
    email: "info@jukartrack.com",
    city: "Oruro, Bolivia",
    address: "Av. Del Valle y Ayacucho, Oruro, Bolivia",
    defaultWhatsappMsg: "Hola JUKARTRACK, deseo solicitar una cotización para maquinaria pesada."
  };

  // =================================================================
  // 2. ACTUALIZACIÓN AUTOMÁTICA DEL AÑO EN FOOTER
  // =================================================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =================================================================
  // 3. HEADER FIJO Y CAMBIO DE ESTILO AL HACER SCROLL
  // =================================================================
  const header = document.getElementById('header');
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // =================================================================
  // 4. MENÚ MÓVIL (HAMBURGUESA) Y NAVEGACIÓN ACCESIBLE
  // =================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const allNavAnchors = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.contains('is-open');
      if (isOpen) {
        navLinks.classList.remove('is-open');
        mobileMenuBtn.classList.remove('is-active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        navLinks.classList.add('is-open');
        mobileMenuBtn.classList.add('is-active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    allNavAnchors.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  }

  // Resaltado de menú según la sección visible (Scroll Spy)
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // =================================================================
  // 5. CONTADORES ANIMADOS DE CONFIANZA (HERO STATS)
  // =================================================================
  const statCards = document.querySelectorAll('.stat-card');
  let animatedStats = false;

  const animateCounters = () => {
    if (animatedStats) return;
    animatedStats = true;

    statCards.forEach(card => {
      const numberContainer = card.querySelector('.stat-number');
      const counterSpan = card.querySelector('.counter');
      if (!numberContainer || !counterSpan) return;

      const target = parseFloat(numberContainer.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeOut * target;

        if (isDecimal) {
          counterSpan.textContent = currentVal.toFixed(1);
        } else {
          counterSpan.textContent = Math.floor(currentVal).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counterSpan.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if ('IntersectionObserver' in window && statCards.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersectIntoView || entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    const statsGrid = document.querySelector('.hero-stats-grid');
    if (statsGrid) {
      statsObserver.observe(statsGrid);
    }
  } else {
    animateCounters();
  }

  // =================================================================
  // 6. ACORDEÓN DE PREGUNTAS FRECUENTES (ACCESIBLE Y CON ANIMACIÓN)
  // =================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          if (otherTrigger && otherPanel) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherItem.classList.remove('active');
            otherPanel.setAttribute('hidden', '');
          }
        }
      });

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
        panel.setAttribute('hidden', '');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
        panel.removeAttribute('hidden');
      }
    });
  });

  // =================================================================
  // 7. FILTRO INTERACTIVO DE GALERÍA
  // =================================================================
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // =================================================================
  // 8. INTERACCIÓN DE BOTONES CTA CON EL FORMULARIO
  // =================================================================
  const serviceSelect = document.getElementById('serviceSelect');
  const machinerySelect = document.getElementById('machineryType');
  const userMessage = document.getElementById('userMessage');

  const courseButtons = document.querySelectorAll('.course-cta-btn');
  courseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course');
      if (serviceSelect) {
        if (courseName === 'Capacitación Corporativa') {
          serviceSelect.value = 'corporativo';
        } else {
          serviceSelect.value = 'capacitacion';
        }
      }

      if (machinerySelect && courseName) {
        for (let i = 0; i < machinerySelect.options.length; i++) {
          if (machinerySelect.options[i].text.includes(courseName) || courseName.includes(machinerySelect.options[i].value)) {
            machinerySelect.selectedIndex = i;
            break;
          }
        }
      }

      if (userMessage && courseName) {
        userMessage.value = `Hola JUKARTRACK, deseo consultar el temario, fechas de inicio y costo para el curso de ${courseName} en Oruro.`;
      }
    });
  });

  const maintenanceButtons = document.querySelectorAll('[data-service="mantenimiento"]');
  maintenanceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (serviceSelect) {
        serviceSelect.value = 'mantenimiento';
      }
    });
  });

  // =================================================================
  // 9. VALIDACIÓN EN EL CLIENTE Y ENVÍO DEL FORMULARIO
  // =================================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (contactForm) {
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
      return /^[\d\s\+\-\(\)]{7,20}$/.test(phone.trim());
    };

    const validateField = (field, condition) => {
      if (condition) {
        field.classList.remove('is-invalid');
        return true;
      } else {
        field.classList.add('is-invalid');
        return false;
      }
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const phoneInput = document.getElementById('userPhone');
      const emailInput = document.getElementById('userEmail');
      const messageInput = document.getElementById('userMessage');
      const privacyCheck = document.getElementById('privacyCheck');
      const privacyGroup = privacyCheck.closest('.checkbox-group');

      let isValid = true;

      if (!validateField(serviceSelect, serviceSelect.value !== '')) {
        isValid = false;
      }

      if (!validateField(nameInput, nameInput.value.trim().length >= 3)) {
        isValid = false;
      }

      if (!validateField(phoneInput, validatePhone(phoneInput.value))) {
        isValid = false;
      }

      if (!validateField(emailInput, validateEmail(emailInput.value.trim()))) {
        isValid = false;
      }

      if (!validateField(messageInput, messageInput.value.trim().length >= 10)) {
        isValid = false;
      }

      if (privacyCheck.checked) {
        privacyGroup.classList.remove('is-invalid');
      } else {
        privacyGroup.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        setTimeout(() => {
          btnText.style.display = 'inline-block';
          btnLoading.style.display = 'none';
          submitBtn.disabled = false;

          contactForm.reset();
          if (formSuccessMessage) {
            formSuccessMessage.style.display = 'flex';
            formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          console.log("Solicitud de cotización enviada correctamente a JUKARTRACK (Oruro, Bolivia).");
        }, 1200);
      } else {
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (typeof firstInvalid.focus === 'function') firstInvalid.focus();
        }
      }
    });

    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
      input.addEventListener('change', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });

    const privacyCheckInput = document.getElementById('privacyCheck');
    if (privacyCheckInput) {
      privacyCheckInput.addEventListener('change', () => {
        const group = privacyCheckInput.closest('.checkbox-group');
        if (privacyCheckInput.checked && group) {
          group.classList.remove('is-invalid');
        }
      });
    }
  }

  // =================================================================
  // 10. ANIMACIONES DE SCROLL SUTILES (INTERSECTION OBSERVER)
  // =================================================================
  const animateItems = document.querySelectorAll('.animate-fade-in');
  if ('IntersectionObserver' in window && animateItems.length > 0) {
    const appearObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    animateItems.forEach(el => appearObserver.observe(el));
  } else {
    animateItems.forEach(el => el.classList.add('is-visible'));
  }

  // =================================================================
  // 11. ENLACES DINÁMICOS DE WHATSAPP CON MENSAJES CONTEXTUALES
  // =================================================================
  const updateWhatsappLinks = () => {
    const rawNumber = COMPANY_CONFIG.phoneRaw;
    const company = encodeURIComponent(COMPANY_CONFIG.name);

    const floatingBtn = document.getElementById('floatingWhatsappBtn');
    if (floatingBtn && rawNumber) {
      const text = encodeURIComponent(`Hola ${COMPANY_CONFIG.name}, me comunico desde la página web. Deseo cotizar servicios en Oruro.`);
      floatingBtn.href = `https://wa.me/${rawNumber}?text=${text}`;
    }

    const headerBtn = document.getElementById('headerWhatsappBtn');
    if (headerBtn && rawNumber) {
      const text = encodeURIComponent(`Hola ${COMPANY_CONFIG.name}, deseo solicitar una cotización rápida.`);
      headerBtn.href = `https://wa.me/${rawNumber}?text=${text}`;
    }
  };
  updateWhatsappLinks();

});
