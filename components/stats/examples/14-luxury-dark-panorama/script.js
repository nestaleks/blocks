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

  const counters = document.querySelectorAll('.count');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute('data-target'));
      const speed = 200;
      const step = Math.max(1, Math.ceil(target / speed));
      let current = 0;
      const tick = () => {
        current += step;
        counter.innerText = String(Math.min(current, target));
        if (current < target) {
          window.requestAnimationFrame(tick);
        }
      };
      tick();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      if (!countersAnimated && entry.target.id === 'stats-01') {
        countersAnimated = true;
        animateCounters();
      }
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
