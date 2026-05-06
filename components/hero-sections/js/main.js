const THEME_KEY = 'premium-theme';

const toggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem(THEME_KEY) || localStorage.getItem('hero-theme');
if (savedTheme === 'dark') document.body.classList.add('dark-mode');

if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀' : '☾';
  });
}

const revealItems = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
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
