document.addEventListener('DOMContentLoaded', () => {
  const THEME_KEY = 'premium-theme';
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const html = document.documentElement;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    html.setAttribute('data-theme', saved);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      themeBtn.textContent = newTheme === 'light' ? '◑' : '☼';
    });
  }

  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((node) => node.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

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
});
