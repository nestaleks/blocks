const palette = ["#102A43","#243B53","#486581","#D9E2EC","#F0F4F8"];

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (_) {}
}

document.querySelectorAll('[data-color]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const value = btn.getAttribute('data-color');
    await copyText(value);
    const label = btn.querySelector('.swatch-code');
    const original = label.textContent;
    label.textContent = 'Copied';
    setTimeout(() => { label.textContent = original; }, 700);
  });
});

const copyPaletteBtn = document.getElementById('copyPalette');
if (copyPaletteBtn) {
  copyPaletteBtn.addEventListener('click', async () => {
    await copyText(palette.join(', '));
    const t = copyPaletteBtn.textContent;
    copyPaletteBtn.textContent = 'Copied';
    setTimeout(() => { copyPaletteBtn.textContent = t; }, 700);
  });
}
