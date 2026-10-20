(() => {
  const pages = [...document.querySelectorAll('.page')];
  const dots = [...document.querySelectorAll('.dot')];
  const step = document.getElementById('stepNumber');
  const previous = document.getElementById('previous');
  const nextArrow = document.getElementById('nextArrow');
  let current = 0;

  function showPage(index) {
    current = (index + pages.length) % pages.length;
    pages.forEach((page, i) => {
      page.hidden = i !== current;
      page.classList.toggle('active', i === current);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('current', i === current);
      if (i === current) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    step.textContent = String(current + 1).padStart(2, '0');
    previous.disabled = current === 0;
    nextArrow.disabled = current === pages.length - 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => showPage(current + 1)));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showPage(i)));
  previous.addEventListener('click', () => showPage(current - 1));
  nextArrow.addEventListener('click', () => showPage(current + 1));
  document.getElementById('restart').addEventListener('click', () => showPage(0));
  document.querySelector('.wordmark').addEventListener('click', event => { event.preventDefault(); showPage(0); });
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && current < pages.length - 1) showPage(current + 1);
    if (event.key === 'ArrowLeft' && current > 0) showPage(current - 1);
  });
})();
