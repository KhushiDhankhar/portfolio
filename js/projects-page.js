const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
root.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
toggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  toggle.setAttribute('aria-pressed', String(next === 'light'));
});
