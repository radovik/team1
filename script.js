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

const diagnostic = document.querySelector('[data-diagnostic]');
const diagnosticCount = document.querySelector('[data-diagnostic-count]');
if (diagnostic) {
  diagnostic.addEventListener('click', (event) => {
    const card = event.target.closest('.symptom-card');
    if (!card || !diagnostic.contains(card)) return;
    const selected = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', String(!selected));
    if (diagnosticCount) {
      const count = diagnostic.querySelectorAll('[aria-pressed="true"]').length;
      const total = diagnostic.querySelectorAll('.symptom-card').length;
      diagnosticCount.textContent = `${count}/${total}`;
    }
  });
}

// Enhance visible HTML only; unsupported observers and reduced motion never hide cards.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
function initScrollReveals() {
  if (!('IntersectionObserver' in window) || motionPreference.matches) return;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
  }

  document.querySelectorAll('.card, .step, .profile-card, .trust-item, .symptom-card, .faq-list details').forEach((card) => {
    if (card.classList.contains('reveal-pending')) return;
    card.classList.add('reveal-pending');
    if (card.getBoundingClientRect().top < window.innerHeight) {
      card.classList.add('is-visible');
    } else {
      revealObserver.observe(card);
    }
  });
}

motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    revealObserver?.disconnect();
    document.querySelectorAll('.reveal-pending').forEach((card) => {
      card.classList.remove('reveal-pending', 'is-visible');
    });
  } else {
    initScrollReveals();
  }
});

function appendInlineContent(element, value) {
  const tokens = String(value ?? '').split(/(\*\*[^*]+\*\*|\*[^*]+\*|\n)/g);
  element.replaceChildren();

  tokens.forEach((token) => {
    if (!token) return;
    if (token === '\n') {
      element.append(document.createElement('br'));
      return;
    }
    if (token.startsWith('**') && token.endsWith('**')) {
      const strong = document.createElement('strong');
      strong.textContent = token.slice(2, -2);
      element.append(strong);
      return;
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      const emphasis = document.createElement('em');
      emphasis.textContent = token.slice(1, -1);
      element.append(emphasis);
      return;
    }
    element.append(document.createTextNode(token));
  });
}

function applyContentItem(root, item) {
  if (!item?.selector || typeof item.value !== 'string') return;

  const elements = root.querySelectorAll(item.selector);
  if (!elements.length) {
    console.warn(`CMS selektor nenalezen: ${item.selector}`);
    return;
  }

  elements.forEach((element) => {
    if (item.mode === 'attribute' && item.attribute) {
      element.setAttribute(item.attribute, item.value);
      return;
    }
    if (item.mode === 'inline') {
      appendInlineContent(element, item.value);
      return;
    }
    if (item.mode === 'statement') {
      const [lead, ...rest] = item.value.split('\n');
      element.replaceChildren(document.createTextNode(lead));
      if (rest.length) {
        const accent = document.createElement('span');
        accent.textContent = rest.join(' ');
        element.append(accent);
      }
      return;
    }
    if (item.mode === 'numbered') {
      const copy = element.querySelector('.symptom-copy');
      const prefix = element.querySelector('.symptom-number');
      if (copy && prefix) {
        copy.textContent = item.value;
        prefix.textContent = item.prefix ?? '';
        return;
      }
      element.replaceChildren();
      const number = document.createElement('span');
      number.textContent = item.prefix ?? '';
      element.append(number);
      element.append(document.createTextNode(item.value));
      return;
    }
    element.textContent = item.value;
  });
}

function applyContentImage(root, image) {
  if (!image?.selector || !image.src) return;
  const target = root.querySelector(image.selector);
  if (!target) {
    console.warn(`CMS selektor obrázku nenalezen: ${image.selector}`);
    return;
  }

  if (target instanceof HTMLImageElement) {
    target.src = image.src;
    target.alt = image.alt ?? '';
    return;
  }

  const element = document.createElement('img');
  element.className = 'profile-photo';
  element.src = image.src;
  element.alt = image.alt ?? '';
  element.loading = 'lazy';
  target.replaceChildren(element);
  target.classList.add('has-photo');
}

function renderFaq(root, faq) {
  if (!faq?.selector || !Array.isArray(faq.items)) return;
  const container = root.querySelector(faq.selector);
  if (!container) {
    console.warn(`CMS selektor FAQ nenalezen: ${faq.selector}`);
    return;
  }

  const entries = faq.items.map((item) => {
    const details = document.createElement('details');
    details.open = Boolean(item.open);
    const summary = document.createElement('summary');
    summary.textContent = item.question ?? '';
    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    const paragraph = document.createElement('p');
    paragraph.textContent = item.answer ?? '';
    answer.append(paragraph);
    details.append(summary, answer);
    return details;
  });

  container.replaceChildren(...entries);
}

function renderTables(root, tables) {
  if (!Array.isArray(tables)) return;

  tables.forEach((tableData) => {
    if (!tableData?.selector || !Array.isArray(tableData.headers) || !Array.isArray(tableData.rows)) return;
    const table = root.querySelector(tableData.selector);
    if (!(table instanceof HTMLTableElement)) {
      console.warn(`CMS selektor tabulky nenalezen: ${tableData.selector}`);
      return;
    }

    const headerRow = document.createElement('tr');
    tableData.headers.forEach((value) => {
      const header = document.createElement('th');
      header.textContent = value;
      headerRow.append(header);
    });
    const head = document.createElement('thead');
    head.append(headerRow);

    const body = document.createElement('tbody');
    tableData.rows.forEach((row) => {
      const tableRow = document.createElement('tr');
      const label = document.createElement('th');
      label.scope = 'row';
      label.textContent = row.label ?? '';
      tableRow.append(label);
      (row.cells ?? []).forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        tableRow.append(cell);
      });
      body.append(tableRow);
    });

    table.replaceChildren(head, body);
  });
}

async function loadPageContent() {
  const root = document.querySelector('[data-content-file]');
  if (!root) return;

  root.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(root.dataset.contentFile, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = await response.json();

    if (content.meta?.title) document.title = content.meta.title;
    if (content.meta?.description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);
    }

    (content.sections ?? []).forEach((section) => {
      (section.items ?? []).forEach((item) => applyContentItem(root, item));
    });
    (content.images ?? []).forEach((image) => applyContentImage(root, image));
    renderFaq(root, content.faq);
    renderTables(root, content.tables);
    root.dataset.contentState = 'loaded';
  } catch (error) {
    root.dataset.contentState = 'fallback';
    console.warn(`Obsah z ${root.dataset.contentFile} se nepodařilo načíst; používám HTML zálohu.`, error);
  } finally {
    root.removeAttribute('aria-busy');
  }
}

initScrollReveals();
loadPageContent().then(initScrollReveals);
