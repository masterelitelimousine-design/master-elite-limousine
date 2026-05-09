const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (window.innerWidth <= 980 && link.classList.contains('dropdown-toggle')) {
        return;
      }

      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
  const toggle = dropdown.querySelector('.dropdown-toggle');

  if (!toggle) return;

  toggle.addEventListener('click', (event) => {
    if (window.innerWidth <= 980) {
      event.preventDefault();

      document.querySelectorAll('.nav-dropdown').forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove('open');
        }
      });

      dropdown.classList.toggle('open');
    }
  });
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(element);
});