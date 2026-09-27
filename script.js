const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');
const yearTargets = document.querySelectorAll('[data-year]');

function closeNavigation({ returnFocus = false } = {}) {
  if (!navToggle || !navigation) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Otevřít navigaci');
  navigation.classList.remove('is-open');
  document.body.classList.remove('nav-open');
  if (returnFocus) navToggle.focus();
}

if (navToggle && navigation) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Otevřít navigaci' : 'Zavřít navigaci');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeNavigation());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeNavigation({ returnFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100 && navigation.classList.contains('is-open')) closeNavigation();
  });
}

const normalizedPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
document.querySelectorAll('.site-nav a[data-path]').forEach((link) => {
  if (link.getAttribute('data-path') === normalizedPath) link.setAttribute('aria-current', 'page');
});

yearTargets.forEach((target) => {
  target.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-todo-key]').forEach((element) => {
  const todo = window.SILNY_TYM_TODOS?.[element.dataset.todoKey];
  if (todo) element.textContent = todo.publicLabel;
});

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      if (status) status.textContent = '';
      form.reportValidity();
      return;
    }

    const name = form.querySelector('[name="name"]')?.value.trim().split(/\s+/)[0];
    if (status) status.textContent = `${name ? `${name}, d` : 'D'}ěkujeme. Formulář je zatím v režimu náhledu a nic neodeslal.`;
    form.reset();
  });
});

const scorecardForm = document.querySelector('[data-scorecard]');
if (scorecardForm) {
  const result = document.querySelector('[data-score-result]');
  const scoreStatus = document.querySelector('[data-score-status]');

  scorecardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!scorecardForm.checkValidity()) {
      scorecardForm.reportValidity();
      if (scoreStatus) scoreStatus.textContent = 'Odpovězte prosím na všech 12 otázek.';
      return;
    }

    const totals = { decisions: 0, conflict: 0, ownership: 0 };
    const counts = { decisions: 0, conflict: 0, ownership: 0 };
    new FormData(scorecardForm).forEach((value, key) => {
      const group = key.split('-')[0];
      if (Object.hasOwn(totals, group)) {
        totals[group] += Number(value);
        counts[group] += 1;
      }
    });

    Object.keys(totals).forEach((group) => {
      const score = Math.round((totals[group] / (counts[group] * 5)) * 100);
      const target = document.querySelector(`[data-result="${group}"]`);
      if (target) target.textContent = `${score} %`;
    });

    if (result) {
      result.classList.add('is-visible');
      result.focus();
    }
    if (scoreStatus) scoreStatus.textContent = '';
  });
}
