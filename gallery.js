const THEME_KEY = 'premium-theme';

const html = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const categoryNav = document.getElementById('categoryNav');
const examplesGrid = document.getElementById('examplesGrid');
const contentTitle = document.getElementById('contentTitle');
const contentMeta = document.getElementById('contentMeta');

function initTheme() {
  const legacy =
    localStorage.getItem('premium-block-theme') ||
    localStorage.getItem('premium-blocks-theme') ||
    localStorage.getItem('hero-theme');
  const current = localStorage.getItem(THEME_KEY) || legacy || 'light';
  const normalized = current === 'dark' ? 'dark' : 'light';
  html.setAttribute('data-theme', normalized);
  if (legacy && !localStorage.getItem(THEME_KEY)) {
    localStorage.setItem(THEME_KEY, normalized);
  }
  if (themeToggle) {
    themeToggle.textContent = normalized === 'dark' ? '◑' : '◐';
  }
}

function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  if (themeToggle) {
    themeToggle.textContent = next === 'dark' ? '◑' : '◐';
  }
}

function previewPath(examplePath) {
  return examplePath.replace(/index\.html$/i, 'preview.html');
}

function renderExamples(category) {
  contentTitle.textContent = category.title;
  contentMeta.textContent = `${category.examples.length} examples`;
  examplesGrid.innerHTML = '';

  category.examples.forEach((example) => {
    const tile = document.createElement('a');
    tile.className = 'example-tile';
    tile.href = example.path;
    tile.target = '_blank';
    tile.rel = 'noopener noreferrer';

    const preview = document.createElement('div');
    preview.className = 'example-preview';

    const frame = document.createElement('iframe');
    frame.src = previewPath(example.path);
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer';
    frame.title = example.title;

    preview.appendChild(frame);

    const meta = document.createElement('div');
    meta.className = 'example-meta';
    meta.innerHTML = `<p class="example-title">${example.title}</p><p class="example-sub">${category.title}</p>`;

    tile.appendChild(preview);
    tile.appendChild(meta);
    examplesGrid.appendChild(tile);
  });
}

function setActiveCategory(manifest, key) {
  const current = manifest.find((item) => item.key === key) || manifest[0];
  if (!current) return;
  renderExamples(current);

  document.querySelectorAll('.category-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.key === current.key);
  });
}

function renderSidebar(manifest) {
  categoryNav.innerHTML = '';
  manifest.forEach((category) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'category-item';
    btn.dataset.key = category.key;
    btn.textContent = category.title;
    btn.addEventListener('click', () => {
      history.replaceState(null, '', `#${category.key}`);
      setActiveCategory(manifest, category.key);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    categoryNav.appendChild(btn);
  });
}

function initCatalog() {
  const manifest = Array.isArray(window.COMPONENTS_MANIFEST) ? window.COMPONENTS_MANIFEST : [];
  if (!manifest.length) return;

  renderSidebar(manifest);
  const hashKey = window.location.hash.replace('#', '');
  setActiveCategory(manifest, hashKey);
}

initTheme();
initCatalog();

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
