// ============================================================
// MAIN.JS - Toda la interactividad del portfolio
// Cada sección está comentada para que puedas entender qué hace
// ============================================================


// ============================================================
// 1. NAVBAR - Se oscurece al hacer scroll
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Si scrolleamos más de 50px, agrega la clase 'scrolled'
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================================
// 2. MENÚ MÓVIL - Toggle del menú en pantallas pequeñas
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cierra el menú al hacer clic en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// ============================================================
// 3. ANIMACIONES AL HACER SCROLL - IntersectionObserver
//
// IntersectionObserver "observa" elementos y ejecuta una función
// cuando entran o salen del viewport (pantalla visible).
// Es más eficiente que escuchar el evento 'scroll'.
// ============================================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      // Si el elemento es visible en pantalla...
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view'); // ...agrega la clase
        revealObserver.unobserve(entry.target); // deja de observarlo (solo anima 1 vez)
      }
    });
  },
  {
    threshold: 0.1,    // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -60px 0px' // Margen negativo: se activa un poco antes del borde
  }
);

// Observa todos los elementos con clase .reveal
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ============================================================
// 4. BARRAS DE HABILIDADES - Se animan al entrar en pantalla
// ============================================================
// Observamos las tarjetas de habilidades específicamente
// para activar las barras de progreso
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.skill-category-card').forEach(card => {
  skillObserver.observe(card);
});


// ============================================================
// 5. FORMULARIO DE CONTACTO
//
// NOTA: Este formulario por ahora solo muestra un mensaje visual.
// Para que funcione de verdad necesitas un servicio como:
// - Formspree (formspree.io) - gratis y fácil
// - EmailJS (emailjs.com) - también gratis
// ============================================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Aquí podrías agregar la integración con Formspree u otro servicio
    // Por ahora, solo muestra el mensaje de éxito:
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Simula un delay de envío (quita esto cuando integres el servicio real)
    setTimeout(() => {
      formSuccess.style.display = 'block';
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar mensaje <i class="ti ti-send"></i>';

      // Oculta el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1000);
  });
}


// ============================================================
// 6. SCROLL ACTIVO EN EL NAV
// Resalta el link del nav según la sección visible
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Quita la clase activa de todos los links
        navLinksList.forEach(link => link.classList.remove('active'));

        // Agrega la clase activa al link correspondiente
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => activeObserver.observe(section));


// ============================================================
// 7. AÑO ACTUAL EN EL FOOTER
// Para que no tengas que actualizar manualmente cada año
// ============================================================
const yearElements = document.querySelectorAll('.footer-year');
yearElements.forEach(el => {
  el.textContent = new Date().getFullYear();
});


// ============================================================
// CONSOLA - Mensaje de bienvenida para devs curiosos
// ============================================================
console.log('%c 👋 Hola dev! ', 'background:#7c6cff; color:white; padding:4px 8px; border-radius:4px;');
console.log('%c Portafolio de Sebastian Castañeda - Hecho con HTML, CSS y JS puro', 'color:#8888a0');
console.log('%c https://github.com/bastianc92', 'color:#7c6cff');