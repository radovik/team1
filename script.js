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

// Forms are deliberately local-only. Disabled submit controls are enabled only after handlers exist.
document.querySelectorAll('[data-demo-form]').forEach((form) => {
  const status = form.querySelector('[data-form-status]');
  const fields = ['name', 'email'].map((name) => form.querySelector(`[name="${name}"]`)).filter(Boolean);

  function clearError(field) {
    field.removeAttribute('aria-invalid');
    const error = form.querySelector(`#${field.id}-error`);
    if (error) { error.textContent = ''; error.hidden = true; }
  }

  fields.forEach((field) => field.addEventListener('input', () => {
    clearError(field);
    if (status) status.textContent = '';
  }));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalid;
    fields.forEach((field) => {
      clearError(field);
      let message = '';
      if (!field.value.trim()) message = field.name === 'name' ? 'Vyplňte prosím jméno.' : 'Vyplňte prosím e-mail.';
      else if (field.name === 'email' && !field.validity.valid) message = 'Zadejte prosím platnou e-mailovou adresu.';
      if (!message) return;
      const error = form.querySelector(`#${field.id}-error`);
      if (error) { error.textContent = message; error.hidden = false; }
      field.setAttribute('aria-invalid', 'true');
      firstInvalid ??= field;
    });
    if (firstInvalid) {
      if (status) status.textContent = 'Zkontrolujte označená pole. Nic se neodeslalo.';
      firstInvalid.focus();
      return;
    }
    if (status) {
      status.textContent = 'Kontrola polí proběhla. Toto je pracovní náhled; nic se neodeslalo.';
      status.focus();
    }
  });
  form.querySelector('button[type="submit"]')?.removeAttribute('disabled');
});

const scorecardForm = document.querySelector('[data-scorecard]');
if (scorecardForm) {
  const result = document.querySelector('[data-score-result]');
  const status = scorecardForm.querySelector('[data-score-status]');
  const progress = document.querySelector('[data-score-progress]');
  const questions = [...scorecardForm.querySelectorAll('[data-question-id]')];
  const answersMount = document.querySelector('[data-reflection-answers]');
  const summary = document.querySelector('[data-reflection-summary]');
  const topic = document.querySelector('#reflection-topic');
  const topicStatus = document.querySelector('[data-reflection-topic]');
  const normalize = (element) => element?.textContent.trim().replace(/\s+/g, ' ') ?? '';
  const selected = (question) => question.querySelector('input:checked');

  function clearQuestionError(question) {
    question.removeAttribute('aria-invalid');
    const error = question.querySelector('.field-error');
    if (error) { error.textContent = ''; error.hidden = true; }
  }

  function updateProgress() {
    const count = questions.filter(selected).length;
    if (progress) progress.textContent = `Zodpovězeno ${count} z ${questions.length} otázek.`;
  }

  scorecardForm.addEventListener('change', (event) => {
    const question = event.target.closest('[data-question-id]');
    if (!question) return;
    clearQuestionError(question);
    updateProgress();
    if (result?.classList.contains('is-visible')) {
      result.classList.remove('is-visible');
      if (status) status.textContent = 'Odpověď změněna. Pro nový souhrn zvolte „Zobrazit moje odpovědi“.';
    } else if (status) status.textContent = '';
  });

  scorecardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    questions.forEach(clearQuestionError);
    const missing = questions.filter((question) => !selected(question));
    if (missing.length) {
      missing.forEach((question) => {
        question.setAttribute('aria-invalid', 'true');
        const error = question.querySelector('.field-error');
        if (error) { error.textContent = 'Vyberte odpověď, případně „Nemohu posoudit“ nebo „Netýká se nás“.'; error.hidden = false; }
      });
      if (status) status.textContent = `Chybí odpověď: ${normalize(missing[0].querySelector('legend'))}`;
      missing[0].querySelector('input')?.focus();
      return;
    }
    if (!result || !answersMount || !summary) return;
    answersMount.replaceChildren();
    if (topic) {
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Zatím nevybírám';
      topic.replaceChildren(empty);
    }
    if (topicStatus) topicStatus.textContent = '';
    scorecardForm.querySelectorAll('[data-score-area]').forEach((area) => {
      const group = document.createElement('section');
      group.className = 'reflection-answer-group';
      const heading = document.createElement('h3');
      heading.textContent = normalize(area.querySelector('h2'));
      const list = document.createElement('ul');
      area.querySelectorAll('[data-question-id]').forEach((question) => {
        const input = selected(question);
        const wording = normalize(question.querySelector('legend'));
        const answer = normalize(input.closest('label').querySelector('span'));
        const entry = document.createElement('li');
        const label = document.createElement('strong');
        label.textContent = wording;
        const value = document.createElement('p');
        value.textContent = answer;
        entry.append(label, value);
        list.append(entry);
        if (topic) {
          const option = document.createElement('option');
          option.value = question.dataset.questionId;
          option.textContent = wording;
          topic.append(option);
        }
      });
      group.append(heading, list);
      answersMount.append(group);
    });
    const hasObservation = questions.some((question) => ['1', '2', '3', '4', '5'].includes(selected(question).value));
    summary.textContent = hasObservation
      ? 'Zde jsou vaše vlastní odpovědi po oblastech. Nejde o souhrnné skóre ani doporučení programu.'
      : 'Odpovědi zatím neposkytují konkrétní pozorování pro reflexi. Není to špatný výsledek; můžete si nejprve všímat situací při práci.';
    result.classList.add('is-visible');
    if (status) status.textContent = 'Souhrn vašich odpovědí je zobrazen. Nic se neodeslalo.';
    result.focus();
  });

  topic?.addEventListener('change', () => {
    if (topicStatus) topicStatus.textContent = topic.value ? `Téma pro další úvahu: ${topic.selectedOptions[0].textContent}` : '';
  });

  scorecardForm.addEventListener('reset', () => {
    questions.forEach(clearQuestionError);
    result?.classList.remove('is-visible');
    answersMount?.replaceChildren();
    if (summary) summary.textContent = '';
    if (topic) {
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Zatím nevybírám';
      topic.replaceChildren(empty);
    }
    if (topicStatus) topicStatus.textContent = '';
    if (status) status.textContent = 'Odpovědi byly vymazány.';
    if (progress) progress.textContent = `Zodpovězeno 0 z ${questions.length} otázek.`;
  });
  updateProgress();
  scorecardForm.querySelector('button[type="submit"]')?.removeAttribute('disabled');
}

const diagnostic = document.querySelector('[data-diagnostic]');
const topicSummary = document.querySelector('[data-topic-summary]');
if (diagnostic) {
  diagnostic.addEventListener('click', (event) => {
    const card = event.target.closest('.symptom-card');
    if (!card || !diagnostic.contains(card)) return;
    card.setAttribute('aria-pressed', String(card.getAttribute('aria-pressed') !== 'true'));
    if (!topicSummary) return;
    const cards = [...diagnostic.querySelectorAll('[aria-pressed="true"]')];
    topicSummary.replaceChildren();
    const heading = document.createElement('p');
    heading.textContent = cards.length ? 'Témata, která chcete probrat. Výběr nic nehodnotí a neodesílá se.' : 'Zatím není vybrané žádné téma. Nic se neodesílá.';
    topicSummary.append(heading);
    if (cards.length) {
      const list = document.createElement('ul');
      cards.forEach((card) => {
        const item = document.createElement('li');
        item.textContent = card.querySelector('.symptom-copy')?.textContent ?? '';
        list.append(item);
      });
      topicSummary.append(list);
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
    const optional = element.closest('[data-optional-copy]');
    if (optional) optional.hidden = !item.value.trim();
    if (item.mode === 'attribute' && item.attribute) {
      if (['placeholder', 'aria-label', 'title'].includes(item.attribute)) element.setAttribute(item.attribute, item.value);
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
  if (!image?.selector || !image.src || !/^\/(?:img\/uploads|assets)\//.test(image.src)) return;
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
  const fallback = [...target.childNodes].map((node) => node.cloneNode(true));
  element.className = 'profile-photo';
  element.alt = image.alt ?? '';
  element.width = image.width || 320;
  element.height = image.height || 320;
  element.loading = target.classList.contains('joint-visual') ? 'eager' : 'lazy';
  element.addEventListener('load', () => {
    target.replaceChildren(element);
    target.classList.add('has-photo');
    target.removeAttribute('role');
    target.removeAttribute('aria-label');
    target.dataset.imageState = 'loaded';
  }, { once: true });
  element.addEventListener('error', () => {
    target.replaceChildren(...fallback);
    target.classList.remove('has-photo');
    target.setAttribute('role', 'img');
    target.dataset.imageState = 'fallback';
    target.setAttribute('aria-label', `${element.alt || 'Fotografie'} — fotografie není dostupná`);
  }, { once: true });
  target.replaceChildren(element);
  target.classList.add('has-photo');
  element.src = image.src;
}

function applyContentLink(root, link) {
  if (!link?.selector) return;
  const target = root.querySelector(link.selector);
  if (!target) return;
  // Verified professional links are opt-in and HTTPS only; no executable CMS URLs.
  target.hidden = true;
  target.removeAttribute('href');
  if (!link.href) return;
  try {
    const url = new URL(link.href);
    if (url.protocol !== 'https:' || url.username || url.password) return;
    target.href = url.href;
    target.textContent = link.text || 'Profesní profil';
    target.rel = 'noopener noreferrer';
    target.hidden = false;
  } catch { /* Keep the fallback hidden for an invalid link. */ }
}

function createNote(note) {
  const element = document.createElement('aside');
  element.className = 'notice-todo';
  element.dataset.noteId = note.id;
  element.setAttribute('aria-label', 'Poznámka k dokončení');
  return element;
}

function renderFaq(root, faq) {
  if (!faq?.selector || !Array.isArray(faq.items)) return;
  const container = root.querySelector(faq.selector);
  if (!container) {
    console.warn(`CMS selektor FAQ nenalezen: ${faq.selector}`);
    return;
  }

  const fallbackNotes = new Map([...container.querySelectorAll('[data-note-id]')].map((note) => [note.dataset.noteId, note]));
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
    const entry = document.createElement('div');
    entry.className = 'faq-entry';
    entry.append(details);
    if (item.note_id) entry.append(fallbackNotes.get(item.note_id)?.cloneNode(true) || createNote({ id: item.note_id }));
    return entry;
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
    if (!content || !Array.isArray(content.sections)) throw new Error('Neplatný formát obsahu');

    if (content.meta?.title) document.title = content.meta.title;
    if (content.meta?.description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', content.meta.description);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', content.meta?.title || document.title);
    if (content.meta?.description) document.querySelector('meta[property="og:description"]')?.setAttribute('content', content.meta.description);

    (content.sections ?? []).forEach((section) => {
      (section.items ?? []).forEach((item) => applyContentItem(root, item));
    });
    (content.images ?? []).forEach((image) => applyContentImage(root, image));
    (content.links ?? []).forEach((link) => applyContentLink(root, link));
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

async function loadEditorialNotes() {
  // Shared JSON is the sole editable authority; registry/fallback never overrides CMS values.
  try {
    const response = await fetch('/content/editorial-notes.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = await response.json();
    if (!Array.isArray(content.notes)) throw new Error('Neplatný formát poznámek');
    const labels = { needs_input: 'K doplnění', ready_for_review: 'Ke kontrole', resolved: 'Vyřešeno' };
    const notes = new Map(content.notes.map((note) => [note.id, note]));
    document.querySelectorAll('[data-note-id]').forEach((element) => {
      const note = notes.get(element.dataset.noteId);
      if (!note) return;
      element.hidden = note.status === 'resolved';
      const title = document.createElement('strong');
      title.dataset.noteTitle = '';
      title.textContent = note.title;
      const status = document.createElement('span');
      status.className = 'note-status';
      status.dataset.noteStatus = '';
      status.textContent = labels[note.status] || labels.needs_input;
      const instruction = document.createElement('p');
      instruction.dataset.noteInstruction = '';
      instruction.textContent = note.instruction;
      element.replaceChildren(title, status, instruction);
    });
    document.body.dataset.notesState = 'loaded';
  } catch {
    document.body.dataset.notesState = 'fallback';
    // Static instructions remain visible when shared JSON cannot be loaded.
    console.warn('Poznámky se nepodařilo načíst; používám HTML zálohu.');
  }
}

initScrollReveals();
loadPageContent().then(loadEditorialNotes).then(initScrollReveals);
