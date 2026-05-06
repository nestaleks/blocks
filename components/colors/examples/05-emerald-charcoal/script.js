const palette = ["#111827","#1F2937","#059669","#A7F3D0","#ECFDF5"];

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
