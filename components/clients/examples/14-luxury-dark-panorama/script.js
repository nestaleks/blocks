const themeBtn = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;
const savedTheme = localStorage.getItem('premium-block-theme');
if (savedTheme) root.dataset.theme = savedTheme;

themeBtn?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('premium-block-theme', next);
});

const revealItems = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealItems.forEach((item) => io.observe(item));

document.querySelectorAll('[data-menu]').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.block')?.classList.toggle('menu-open');
  });
});