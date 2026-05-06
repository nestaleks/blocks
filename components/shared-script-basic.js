const THEME_KEY = 'premium-theme';

const themeBtn = document.querySelector('[data-theme-toggle]');
const root = document.documentElement;
const savedTheme = localStorage.getItem(THEME_KEY) || localStorage.getItem('premium-block-theme');
if (savedTheme) root.dataset.theme = savedTheme;

themeBtn?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
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

document.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
  if (!anchor.hasAttribute('rel')) {
    anchor.setAttribute('rel', 'noopener noreferrer');
  }
});

document.querySelectorAll('img').forEach((img, index) => {
  if (!img.hasAttribute('loading')) {
    img.loading = index === 0 ? 'eager' : 'lazy';
  }
  if (!img.hasAttribute('decoding')) {
    img.decoding = 'async';
  }
});
