// Aevra, questionario
// Aevra registra i processi ricorrenti di un team e li fa eseguire da un agente AI.

const CALENDLY = 'https://calendly.com/davide-aevra/30min';

const ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:-2px"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  restart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>'
};

// circular/rounded minimal flags
const FLAG = {
  it: '<svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice"><rect width="1" height="2" x="0" fill="#1a8a52"/><rect width="1" height="2" x="1" fill="#fff"/><rect width="1" height="2" x="2" fill="#cd2b3e"/></svg>',
  en: '<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice"><clipPath id="ukc"><rect width="60" height="30"/></clipPath><g clip-path="url(#ukc)"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="3.5"/><rect x="25" width="10" height="30" fill="#fff"/><rect y="10" width="60" height="10" fill="#fff"/><rect x="27" width="6" height="30" fill="#C8102E"/><rect y="12" width="60" height="6" fill="#C8102E"/></g></svg>'
};

// localized UI strings
const UI = {
  continua: { it: 'Continua', en: 'Continue' },
  invia:    { it: 'Invia', en: 'Send' },
  salta:    { it: 'Salta', en: 'Skip' },
  altro:    { it: 'Altro…', en: 'Other…' },
  altroPh:  { it: 'Scrivi la tua risposta…', en: 'Type your answer…' },
  prenota:  { it: 'Prenota una call', en: 'Book a call' },
  ricomincia: { it: 'Ricomincia', en: 'Start over' }
};

// {it, en} builder
const b = (it, en) => ({ it, en });

// short labels for the final recap
const LABELS = {
  nome: b('Nome', 'Name'),
  email: b('Email', 'Email'),
  cellulare: b('Telefono', 'Phone'),
  azienda: b('Azienda', 'Company'),
  ruolo: b('Ruolo', 'Role'),
  settore: b('Settore', 'Sector'),
  companySize: b('Azienda', 'Company'),
  teamSize: b('Team', 'Team'),
  numProcessi: b('Processi', 'Processes'),
  ripetitivita: b('Ripetitività', 'Repetitiveness'),
  maturita: b('Maturità', 'Maturity'),
  processo: b('Processi', 'Processes'),
  tipoGestionale: b('Gestionali', 'Software'),
  nomeGestionale: b('Strumento', 'Tool'),
  descrizione: b('Processo', 'Process'),
  blocco: b('Criticità', 'Bottlenecks'),
  frequenza: b('Frequenza', 'Frequency'),
  durata: b('Durata', 'Duration'),
  persone: b('Persone', 'People'),
  dipendenza: b('Dipendenza', 'Dependency'),
  documentazione: b('Documentazione', 'Documentation'),
  errori: b('Errori', 'Errors'),
  strumenti: b('Strumenti', 'Tools'),
  obiettivo: b('Obiettivi', 'Goals')
};

const survey = [
  {
    type: 'intro',
    q: b('Ciao! Raccontaci di te :)', 'Hi! Tell us about you :)'),
    sub: b('Due minuti promesso, ne vale la pena!', 'Two minutes, promise. Worth it!'),
    cta: b('Iniziamo', 'Let’s go')
  },

  { id: 'nome', type: 'text', q: b('Nome e cognome', 'Full name'), placeholder: b('Mario Rossi', 'John Smith') },
  { id: 'email', type: 'email', q: b('Email', 'Email'), placeholder: b('mario@azienda.it', 'john@company.com') },
  { id: 'cellulare', type: 'tel', optional: true, q: b('Cellulare', 'Phone'), placeholder: b('+39 333 1234567', '+44 7700 900123') },
  { id: 'azienda', type: 'text', q: b('Azienda', 'Company'), placeholder: b('Nome azienda', 'Company name') },
  { id: 'ruolo', type: 'text', optional: true, q: b('Ruolo', 'Role'), placeholder: b('CEO, HR, Operations, Finance…', 'CEO, HR, Operations, Finance…') },

  {
    id: 'settore', type: 'single', cols: 2,
    q: b('In che settore operate?', 'What sector are you in?'),
    options: [
      b('Manifattura', 'Manufacturing'),
      b('Servizi e consulenza', 'Services & consulting'),
      b('Finanza e assicurazioni', 'Finance & insurance'),
      b('Settore pubblico', 'Public sector'),
      b('Tech e software', 'Tech & software'),
      b('Retail ed eCommerce', 'Retail & eCommerce'),
      b('Sanità', 'Healthcare'),
      b('Logistica', 'Logistics')
    ]
  },
  {
    id: 'companySize', type: 'single', cols: 2,
    q: b('Quante persone lavorano in azienda?', 'How many people work at the company?'),
    options: [b('1–10', '1–10'), b('11–50', '11–50'), b('51–200', '51–200'), b('Oltre 200', 'Over 200')]
  },
  {
    id: 'teamSize', type: 'single', cols: 2,
    q: b('Quanto è grande il team o reparto coinvolto?', 'How large is the team or department involved?'),
    options: [b('1–5 persone', '1–5 people'), b('6–20 persone', '6–20 people'), b('21–50 persone', '21–50 people'), b('Oltre 50', 'Over 50')]
  },
  {
    id: 'numProcessi', type: 'single', cols: 2,
    q: b('Quanti processi ricorrenti gestisce il team?', 'How many recurring processes does the team run?'),
    sub: b('Attività che si ripetono ogni giorno, settimana o mese.', 'Tasks that repeat on a daily, weekly or monthly basis.'),
    options: [b('1–5', '1–5'), b('6–15', '6–15'), b('16–40', '16–40'), b('Oltre 40', 'Over 40')]
  },
  {
    id: 'ripetitivita', type: 'single', cols: 2,
    q: b('Quanto è ripetitivo il lavoro del team?', 'How repetitive is the team’s work?'),
    options: [b('Poco', 'Low'), b('Abbastanza', 'Moderate'), b('Molto', 'High'), b('Quasi tutto', 'Almost all')]
  },
  {
    id: 'maturita', type: 'single', cols: 2,
    q: b('A che punto siete con l’automazione?', 'Where are you with automation?'),
    options: [b('Nessuna', 'None'), b('Qualche strumento', 'A few tools'), b('Automazione parziale', 'Partly automated'), b('Avanzata', 'Advanced')]
  },

  {
    id: 'processo', type: 'multi', cols: 2, optional: true,
    q: b('Quali processi vuoi automatizzare?', 'Which processes do you want to automate?'),
    options: [
      b('Gestione HR e dipendenti', 'HR & people'),
      b('Finance e amministrazione', 'Finance & admin'),
      b('Gestione clienti e vendite', 'Sales & customers'),
      b('Operations e processi interni', 'Operations & internal processes'),
      b('Fornitori e acquisti', 'Suppliers & purchasing'),
      b('Documentazione e compliance', 'Documentation & compliance'),
      b('IT e supporto interno', 'IT & internal support'),
      b('Reporting e data entry', 'Reporting & data entry'),
      b('Approvazioni e autorizzazioni', 'Approvals & authorizations')
    ]
  },
  {
    id: 'tipoGestionale', type: 'multi', cols: 2, optional: true,
    q: b('Su che gestionali avviene?', 'Which software does it run on?'),
    options: [
      b('ERP / gestionale aziendale', 'ERP / business management'),
      b('CRM commerciale', 'Sales CRM'),
      b('Software HR / payroll', 'HR / payroll software'),
      b('Software contabilità / amministrazione', 'Accounting / admin software'),
      b('Software acquisti / procurement', 'Procurement software'),
      b('Software gare / appalti / PA', 'Tenders / public sector software'),
      b('Software documentale / DMS', 'Document management / DMS'),
      b('Ticketing / customer service', 'Ticketing / customer service'),
      b('Gestionale sviluppato internamente', 'Custom in-house software')
    ]
  },
  {
    id: 'nomeGestionale', type: 'text', optional: true,
    q: b('Come si chiama il gestionale?', 'What’s the software called?'),
    placeholder: b('SAP, Zucchetti, TeamSystem, Salesforce, Excel…', 'SAP, Salesforce, NetSuite, Excel…')
  },
  {
    id: 'descrizione', type: 'text', optional: true,
    q: b('Descrivi il processo in una frase.', 'Describe the process in one sentence.'),
    placeholder: b('Es: ricevute inviate, l’admin controlla, il responsabile approva…', 'E.g. receipts sent, admin checks, manager approves…')
  },

  {
    id: 'blocco', type: 'multi', cols: 2, optional: true,
    q: b('Dove si blocca più spesso?', 'Where does it get stuck most?'),
    options: [
      b('Documenti mancanti', 'Missing documents'),
      b('Approvazioni lente', 'Slow approvals'),
      b('Controlli manuali', 'Manual checks'),
      b('Responsabilità poco chiare', 'Unclear ownership'),
      b('Informazioni disperse', 'Scattered information'),
      b('Procedure non aggiornate', 'Outdated procedures')
    ]
  },
  {
    id: 'frequenza', type: 'single', cols: 2,
    q: b('Quanto spesso avviene?', 'How often does it happen?'),
    options: [b('Raramente', 'Rarely'), b('Ogni mese', 'Monthly'), b('Ogni settimana', 'Weekly'), b('Ogni giorno', 'Daily')]
  },
  {
    id: 'durata', type: 'single', cols: 2,
    q: b('Quanto tempo richiede ogni volta?', 'How long does it take each time?'),
    options: [b('Meno di 15 minuti', 'Under 15 min'), b('15–60 minuti', '15–60 min'), b('1–4 ore', '1–4 hours'), b('Più di mezza giornata', 'More than half a day')]
  },
  {
    id: 'persone', type: 'single', cols: 2,
    q: b('Quante persone coinvolge?', 'How many people are involved?'),
    options: [b('1 persona', '1 person'), b('2–3 persone', '2–3 people'), b('4–10 persone', '4–10 people'), b('Più di 10', 'More than 10')]
  },
  {
    id: 'dipendenza', type: 'single', cols: 2,
    q: b('Quanto dipende da una persona specifica?', 'How much does it rely on one person?'),
    options: [b('Poco', 'A little'), b('Abbastanza', 'Somewhat'), b('Molto', 'A lot'), b('Del tutto', 'Entirely')]
  },
  {
    id: 'documentazione', type: 'single', cols: 2,
    q: b('Quanto è documentato oggi?', 'How documented is it today?'),
    options: [b('Ben documentato', 'Well documented'), b('In parte', 'Partly'), b('Poco', 'Barely'), b('Per niente', 'Not at all')]
  },
  {
    id: 'errori', type: 'single', cols: 2,
    q: b('Quanto sono frequenti gli errori?', 'How frequent are errors?'),
    options: [b('Rari', 'Rare'), b('Occasionali', 'Occasional'), b('Frequenti', 'Frequent'), b('Molto frequenti', 'Very frequent')]
  },

  {
    id: 'strumenti', type: 'multi', cols: 2, optional: true,
    q: b('Quali strumenti usa oggi il processo?', 'Which tools does the process use today?'),
    options: [
      b('Email', 'Email'),
      b('Excel', 'Excel'),
      b('WhatsApp / Chat', 'WhatsApp / Chat'),
      b('Gestionale / ERP', 'Business software / ERP'),
      b('Cartelle condivise', 'Shared folders'),
      b('Procedure PDF / Word', 'PDF / Word procedures')
    ]
  },
  {
    id: 'obiettivo', type: 'multi', cols: 2, optional: true,
    q: b('Cosa vorresti ottenere?', 'What would you like to achieve?'),
    options: [
      b('Ridurre errori', 'Reduce errors'),
      b('Ridurre tempi', 'Save time'),
      b('Standardizzare attività', 'Standardize tasks'),
      b('Tracciare approvazioni', 'Track approvals'),
      b('Meno dipendenza da persone chiave', 'Less reliance on key people'),
      b('Automatizzare i controlli', 'Automate checks')
    ]
  },

  { type: 'report' },
  { type: 'outro' }
];

let L = 'it';
const tr = (x) => (x && typeof x === 'object' && ('it' in x || 'en' in x)) ? (x[L] != null ? x[L] : x.it) : x;

const answers = {};
let i = 0;
let furthest = 0;

const stage = document.getElementById('stage');
const fill = document.getElementById('progressFill');
const backBtn = document.getElementById('backBtn');
const fwdBtn = document.getElementById('fwdBtn');
const dotsEl = document.getElementById('dots');

const questionCount = survey.filter(s => s.id).length;
const questionIndices = survey.map((s, idx) => (s.id ? idx : -1)).filter(x => x >= 0);

const root = document.documentElement;
const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- ambient background: pointer parallax + progress warmth ---------- */
const noiseEl = document.querySelector('.noise');
let tmx = 50, tmy = 50, cmx = 50, cmy = 50;
function ambientLoop() {
  cmx += (tmx - cmx) * 0.05;
  cmy += (tmy - cmy) * 0.05;
  root.style.setProperty('--amx', cmx.toFixed(2) + '%');
  root.style.setProperty('--amy', cmy.toFixed(2) + '%');
  if (noiseEl) noiseEl.style.transform = `translate3d(${((cmx - 50) * 0.14).toFixed(2)}px, ${((cmy - 50) * 0.14).toFixed(2)}px, 0)`;
  requestAnimationFrame(ambientLoop);
}
if (!reduced) {
  window.addEventListener('pointermove', (e) => {
    tmx = (e.clientX / window.innerWidth) * 100;
    tmy = (e.clientY / window.innerHeight) * 100;
  });
  ambientLoop();
}
function setProgressVar() {
  root.style.setProperty('--prog', (progressFor(i) / 100).toFixed(3));
}

/* ---------- sound (Web Audio) + haptics ---------- */
const ICON_SOUND = {
  on: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9v6h4l5 4V5L9 9H5z"/><path d="M17 8.5a5 5 0 0 1 0 7"/></svg>',
  off: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9v6h4l5 4V5L9 9H5z"/><path d="M22 9l-5 6M17 9l5 6"/></svg>'
};
const soundBtn = document.getElementById('soundBtn');
let soundOn = (localStorage.getItem('aevra_sound') || '1') === '1';
let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}
function tone(freq, dur, vol, when) {
  if (!soundOn || !audioCtx) return;
  const t = audioCtx.currentTime + (when || 0);
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  // soft, slow attack + gentle release, barely-there
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}
function sfxSelect()  { ensureAudio(); tone(440, 0.11, 0.007); }
function sfxAdvance() { ensureAudio(); tone(550, 0.16, 0.008); tone(825, 0.13, 0.004, 0.02); }
function sfxBack()    { ensureAudio(); tone(330, 0.13, 0.006); }
function sfxSubmit()  { ensureAudio(); [523.25, 659.25, 783.99].forEach((f, k) => tone(f, 0.6, 0.009, k * 0.09)); }
function haptic(ms)   { if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} } }

function renderSoundBtn() {
  soundBtn.innerHTML = soundOn ? ICON_SOUND.on : ICON_SOUND.off;
  soundBtn.classList.toggle('muted', !soundOn);
}
soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  localStorage.setItem('aevra_sound', soundOn ? '1' : '0');
  renderSoundBtn();
  if (soundOn) sfxSelect();
});
renderSoundBtn();

/* ---------- restart (return to the start screen) ---------- */
const restartBtn = document.getElementById('restartBtn');
restartBtn.innerHTML = ICON.restart;
restartBtn.addEventListener('click', () => {
  Object.keys(answers).forEach((k) => delete answers[k]);
  furthest = 0;
  i = 0;
  sfxBack(); haptic(10);
  render();
});

/* ---------- language toggle (top-right, chromeless) ---------- */
const langToggle = document.getElementById('langToggle');
try { const sl = localStorage.getItem('aevra_lang'); if (sl === 'it' || sl === 'en') L = sl; } catch (e) {}
function buildLangToggle() {
  langToggle.innerHTML = '';
  ['it', 'en'].forEach((code) => {
    const btn = el(`<button class="lang-flag ${L === code ? 'on' : ''}" type="button" aria-label="${code}">${FLAG[code]}</button>`);
    btn.addEventListener('click', () => {
      if (L === code) return;
      L = code;
      try { localStorage.setItem('aevra_lang', code); } catch (e) {}
      buildLangToggle();
      sfxSelect(); haptic(6);
      render();
    });
    langToggle.appendChild(btn);
  });
}
buildLangToggle();

function progressFor(index) {
  const answered = survey.slice(0, index).filter(s => s.id).length;
  if (survey[index].type === 'outro') return 100;
  return Math.round((answered / questionCount) * 100);
}

function el(html) {
  const t = document.createElement('div');
  t.innerHTML = html.trim();
  return t.firstElementChild;
}

function render() {
  const item = survey[i];

  // fade out any screens currently on stage (they share the grid cell)
  stage.querySelectorAll('.screen').forEach((p) => {
    if (p.dataset.state === 'leave') { p.remove(); return; }
    p.dataset.state = 'leave';
    p.addEventListener('animationend', () => p.remove(), { once: true });
    setTimeout(() => { if (p.isConnected) p.remove(); }, 650);
  });

  const screen = buildScreen(item);
  screen.dataset.state = 'enter';
  stage.appendChild(screen);

  if (fill) fill.style.width = progressFor(i) + '%';
  setProgressVar();
  document.body.classList.toggle('is-outro', item.type === 'outro');
  document.body.classList.toggle('is-report', item.type === 'report');
  buildDots();
  updateNav();
  focusFirst(screen);
  requestAnimationFrame(() => fitHeadline(screen));
}

// keep every question/headline on a single line: shrink the type until it fits,
// and only fall back to wrapping on extremely narrow viewports.
function fitHeadline(screen) {
  const q = screen && screen.querySelector('.q');
  if (!q) return;
  q.style.whiteSpace = 'nowrap';
  q.style.fontSize = '';                       // restore the CSS clamp as the ceiling
  let size = parseFloat(getComputedStyle(q).fontSize);
  const min = window.innerWidth < 600 ? 19 : 22;
  let guard = 0;
  while (q.scrollWidth > q.clientWidth && size > min && guard++ < 120) {
    size -= 1;
    q.style.fontSize = size + 'px';
  }
  // last resort on tiny screens: allow it to wrap rather than overflow
  q.style.whiteSpace = q.scrollWidth > q.clientWidth ? 'normal' : 'nowrap';
}

let fitRaf = 0;
window.addEventListener('resize', () => {
  cancelAnimationFrame(fitRaf);
  fitRaf = requestAnimationFrame(() => {
    const screen = stage.querySelector('.screen:not([data-state="leave"])');
    if (screen) fitHeadline(screen);
  });
});

function focusFirst(screen) {
  // never auto-focus the hidden "Altro…" reveal field
  const input = screen.querySelector('.field:not(.field--other) input, .field:not(.field--other) textarea');
  if (input) setTimeout(() => input.focus(), 360);
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function buildScreen(item) {
  if (item.type === 'intro') return buildIntro(item);
  if (item.type === 'report') return buildReport();
  if (item.type === 'outro') return buildOutro(item);

  const screen = el(`<section class="screen ${item.cols === 2 ? 'wide' : ''}"></section>`);
  screen.appendChild(el(`<h1 class="q">${tr(item.q)}</h1>`));
  if (item.sub) screen.appendChild(el(`<p class="sub">${tr(item.sub)}</p>`));

  if (item.type === 'single' || item.type === 'multi') {
    buildChoice(item, screen);
  } else {
    screen.appendChild(buildField(item));
    screen.appendChild(buildCta(item));
  }
  return screen;
}

// internal sentinel for the "Other…" choice, language-independent
const OTHER = '__other__';

function buildChoice(item, screen) {
  const isMulti = item.type === 'multi';
  const options = item.options.map((o) => ({ value: tr(o), other: false }));
  options.push({ value: tr(UI.altro), other: true });

  const selected = new Set(isMulti ? (answers[item.id] || []) : []);
  let otherOn = isMulti ? (answers[item.id] || []).includes(OTHER) : answers[item.id] === OTHER;

  const wrap = el(`<div class="options ${item.cols === 2 ? 'cols-2' : ''}"></div>`);

  // free-text input revealed by "Other…"
  const otherField = el('<div class="field field--other"></div>');
  const otherInput = el(`<input type="text" placeholder="${tr(UI.altroPh)}" />`);
  if (answers[item.id + '_altro']) otherInput.value = answers[item.id + '_altro'];
  otherInput.addEventListener('input', () => { answers[item.id + '_altro'] = otherInput.value.trim(); refreshCta(); });
  otherField.appendChild(otherInput);

  const cta = buildCta(item);
  if (!isMulti) cta.classList.add('hideable');

  const sync = () => {
    otherField.classList.toggle('show', otherOn);
    cta.classList.toggle('show', isMulti || otherOn);
    if (otherOn) setTimeout(() => otherInput.focus(), 60);
  };

  options.forEach((o, idx) => {
    const key = o.other ? OTHER : o.value;
    const pressed = isMulti ? selected.has(key) : (o.other ? otherOn : answers[item.id] === key);
    const opt = el(`
      <button class="opt ${o.other ? 'opt--other' : ''}" aria-pressed="${pressed}" style="--stagger:${idx * 18}ms">
        <span class="text">${o.value}</span>
      </button>`);

    opt.addEventListener('click', () => {
      if (isMulti) {
        if (selected.has(key)) selected.delete(key); else selected.add(key);
        answers[item.id] = [...selected];
        opt.setAttribute('aria-pressed', selected.has(key));
        if (o.other) { otherOn = selected.has(key); if (!otherOn) delete answers[item.id + '_altro']; sync(); }
        sfxSelect(); haptic(7);
        refreshCta();
      } else if (o.other) {
        otherOn = true;
        answers[item.id] = OTHER;
        wrap.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-pressed', 'false'));
        opt.setAttribute('aria-pressed', 'true');
        sfxSelect(); haptic(7);
        sync();
        refreshCta();
      } else {
        delete answers[item.id + '_altro'];
        answers[item.id] = key;
        next();
      }
    });
    wrap.appendChild(opt);
  });

  screen.appendChild(wrap);
  screen.appendChild(otherField);
  screen.appendChild(cta);
  sync();
}

function buildField(item) {
  const ph = tr(item.placeholder) || '';
  const field = el('<div class="field"></div>');
  const input = el(item.textarea
    ? `<textarea rows="2" placeholder="${ph}"></textarea>`
    : `<input type="${item.type === 'email' ? 'email' : item.type === 'tel' ? 'tel' : 'text'}" placeholder="${ph}" inputmode="${item.type === 'email' ? 'email' : item.type === 'tel' ? 'tel' : 'text'}" />`);
  if (answers[item.id]) input.value = answers[item.id];
  input.addEventListener('input', () => { answers[item.id] = input.value.trim(); refreshCta(); });
  field.appendChild(input);
  return field;
}

function buildCta(item) {
  const cta = el('<div class="cta"></div>');
  const last = survey[i + 1] && survey[i + 1].type === 'outro';
  const btn = el(`<button class="btn" data-cta>${tr(last ? UI.invia : UI.continua)} ${ICON.arrow}</button>`);
  btn.addEventListener('click', () => { if (validate(item)) next(); });
  cta.appendChild(btn);

  if (item.optional) {
    const skip = el(`<button class="skip">${tr(UI.salta)}</button>`);
    skip.addEventListener('click', next);
    cta.appendChild(skip);
  }
  setTimeout(refreshCta, 0);
  return cta;
}


function validate(item) {
  const otherText = (answers[item.id + '_altro'] || '').trim();
  if (item.type === 'multi') {
    const sel = answers[item.id] || [];
    if (item.optional && sel.length === 0) return true;
    if (sel.length === 0) return false;
    return sel.includes(OTHER) ? otherText.length > 0 : true;
  }
  if (item.type === 'single') {
    if (answers[item.id] === OTHER) return otherText.length > 0;
    return !!answers[item.id];
  }
  if (item.optional) return true;
  if (item.type === 'email') return /\S+@\S+\.\S+/.test(answers[item.id] || '');
  if (item.type === 'tel') return (answers[item.id] || '').replace(/\D/g, '').length >= 6;
  return !!(answers[item.id] && answers[item.id].length);
}

function refreshCta() {
  const item = survey[i];
  if (fwdBtn) fwdBtn.disabled = !canAdvance();
  const btn = stage.querySelector('[data-cta]');
  if (!btn) return;
  btn.disabled = !validate(item);
}

function buildIntro(item) {
  const screen = el('<section class="screen center"></section>');
  screen.appendChild(el(`<h1 class="q">${tr(item.q)}</h1>`));
  screen.appendChild(el(`<p class="sub">${tr(item.sub)}</p>`));
  const cta = el('<div class="cta"></div>');
  const btn = el(`<button class="btn">${tr(item.cta)} ${ICON.arrow}</button>`);
  btn.addEventListener('click', next);
  cta.appendChild(btn);
  screen.appendChild(cta);
  return screen;
}

/* ---------- report model ---------- */

// find which option index an answer corresponds to (language-independent)
function optionIndex(id, value) {
  const item = survey.find((s) => s.id === id);
  if (!item || !item.options) return -1;
  return item.options.findIndex((o) => tr(o) === value);
}
function selectedIndices(id) {
  const a = answers[id];
  if (!Array.isArray(a)) return [];
  return a.map((v) => optionIndex(id, v)).filter((x) => x >= 0);
}

// market benchmarks (fully-loaded €/h) per process area, option index of `processo`
const COST_BY_PROCESS = [45, 55, 50, 42, 45, 50, 60, 40, 52]; // HR, Finance, Sales, Ops, Suppliers, Doc, IT, Reporting, Approvals
const SECTOR_MULT = [0.95, 1.05, 1.20, 0.90, 1.15, 0.92, 1.00, 0.92]; // settore index
const OCC_PER_MONTH = [0.5, 1, 4.33, 21.7];   // raro, mensile, settimanale, giornaliero
const HOURS_PER_OCC = [0.2, 0.6, 2.5, 5];     // <15m, 15-60m, 1-4h, >mezza giornata
const PEOPLE = [1, 2.5, 6, 12];               // 1, 2-3, 4-10, >10
const RISK4 = [14, 44, 72, 92];               // 4-level scales -> 0-100 points
const NUM_PROC_MID = [3, 10, 25, 50];         // numProcessi midpoints
const MATURITY_PTS = [15, 40, 65, 90];        // automation maturity capability
const TEAM_MID = [3, 13, 35, 75];             // teamSize headcount midpoints
const COMPANY_MID = [5, 30, 120, 400];        // companySize headcount midpoints
const AUTOMATABLE = 0.75;

function computeReport() {
  const idx = (id) => optionIndex(id, answers[id]);
  const at = (arr, id, d) => (arr[idx(id)] != null ? arr[idx(id)] : d);

  const occ = at(OCC_PER_MONTH, 'frequenza', 4.33);
  const hrs = at(HOURS_PER_OCC, 'durata', 1);
  const ppl = at(PEOPLE, 'persone', 2.5);

  // operational-risk factors (0-100)
  const fDep = at(RISK4, 'dipendenza', 50);
  const fDoc = at(RISK4, 'documentazione', 50);
  const fErr = at(RISK4, 'errori', 50);
  const blocco = selectedIndices('blocco');
  const fBlk = Math.min(95, blocco.length * 16);
  const repIdx = idx('ripetitivita');
  const fRep = RISK4[repIdx] != null ? RISK4[repIdx] : 50;
  const matIdx = idx('maturita');
  const maturity = MATURITY_PTS[matIdx] != null ? MATURITY_PTS[matIdx] : 40;
  const fGap = 100 - maturity; // automation gap as an exposure axis
  const risk = Math.round(0.28 * fDep + 0.22 * fDoc + 0.22 * fErr + 0.16 * fBlk + 0.12 * fGap);

  // fully-loaded hourly cost: process-area benchmark × sector multiplier
  const procIdx = selectedIndices('processo');
  const baseCost = procIdx.length
    ? procIdx.reduce((s, k) => s + (COST_BY_PROCESS[k] || 48), 0) / procIdx.length
    : 48;
  const sectorMult = SECTOR_MULT[idx('settore')] != null ? SECTOR_MULT[idx('settore')] : 1;
  const cost = Math.round(baseCost * sectorMult);

  // single workflow
  const spentMonth = occ * hrs * ppl;
  const recMonth = spentMonth * AUTOMATABLE;
  const recYear = recMonth * 12;
  const valMonth = recMonth * cost;
  const valYear = recYear * cost;

  // portfolio / team extrapolation, conservative, comparable processes add smaller savings
  const PORTFOLIO_FACTOR = [1.8, 2.6, 3.6, 4.8];
  const pf = PORTFOLIO_FACTOR[idx('numProcessi')] != null ? PORTFOLIO_FACTOR[idx('numProcessi')] : 2.6;
  const teamRecYear = recYear * pf;
  const teamValYear = valYear * pf;

  // headcounts + company-wide extrapolation (conservative, capped)
  const teamHead = TEAM_MID[idx('teamSize')] != null ? TEAM_MID[idx('teamSize')] : 13;
  const companyHead = COMPANY_MID[idx('companySize')] != null ? COMPANY_MID[idx('companySize')] : Math.max(teamHead, 30);
  // similar teams across the org reuse the same workflows, with diminishing returns
  const orgScale = Math.max(1, Math.min(6, Math.sqrt(companyHead / teamHead)));
  const companyRecYear = teamRecYear * orgScale;
  const companyValYear = teamValYear * orgScale;

  // automation potential %
  const potential = Math.round(Math.min(92, ((repIdx >= 0 ? repIdx + 1 : 2) / 4) * 55 + (fGap / 100) * 45));

  // 12-month cumulative value (logistic adoption ramp to run-rate)
  const monthly = teamValYear / 12;
  const cum = [];
  let acc = 0;
  for (let m = 1; m <= 12; m++) { acc += monthly * (1 / (1 + Math.exp(-(m - 3.5) / 1.4))); cum.push(acc); }

  return {
    risk, fDep, fDoc, fErr, fBlk, fRep, fGap, maturity,
    cost, spentMonth, recMonth, recYear, valMonth, valYear,
    pf, teamRecYear, teamValYear, potential, cum, blockCount: blocco.length,
    teamHead, companyHead, orgScale, companyRecYear, companyValYear, ppl
  };
}

function riskBand(score) {
  if (score < 30) return { it: 'Basso', en: 'Low' };
  if (score < 55) return { it: 'Medio', en: 'Moderate' };
  if (score < 75) return { it: 'Alto', en: 'High' };
  return { it: 'Critico', en: 'Critical' };
}

const eur = (n) => new Intl.NumberFormat(L === 'en' ? 'en-IE' : 'it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(n));
const numFmt = (n) => new Intl.NumberFormat(L === 'en' ? 'en-IE' : 'it-IT', { maximumFractionDigits: n < 10 ? 1 : 0 }).format(n);

function tagsFor(id) {
  const a = answers[id];
  if (!Array.isArray(a)) return [];
  return a.map((v) => (v === OTHER ? (answers[id + '_altro'] || '') : v)).filter(Boolean);
}

function countUp(elm, to, fmt, dur) {
  if (reduced) { elm.textContent = fmt(to); return; }
  const start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / (dur || 1000));
    const e = 1 - Math.pow(1 - p, 3);
    elm.textContent = fmt(to * e);
    if (p < 1) requestAnimationFrame(step); else elm.textContent = fmt(to);
  };
  requestAnimationFrame(step);
}

// --- SVG charts (no libraries) ---
function radarSVG(axes) {
  const cx = 120, cy = 120, R = 84, n = axes.length;
  const pt = (val, i) => {
    const a = (-90 + i * (360 / n)) * Math.PI / 180;
    const r = R * val / 100;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const rings = [25, 50, 75, 100].map((k) => {
    const p = axes.map((_, i) => pt(k, i).map((v) => v.toFixed(1)).join(',')).join(' ');
    return `<polygon class="radar__ring" points="${p}"/>`;
  }).join('');
  const spokes = axes.map((_, i) => { const [x, y] = pt(100, i); return `<line class="radar__spoke" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('');
  const poly = axes.map((ax, i) => pt(ax.v, i).map((v) => v.toFixed(1)).join(',')).join(' ');
  const dots = axes.map((ax, i) => { const [x, y] = pt(ax.v, i); return `<circle class="radar__dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" data-l="${esc(ax.label)}" data-v="${Math.round(ax.v)}"/>`; }).join('');
  const labels = axes.map((ax, i) => {
    const [x, y] = pt(118, i);
    const anchor = x < cx - 6 ? 'end' : x > cx + 6 ? 'start' : 'middle';
    return `<text class="radar__lbl" x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}" text-anchor="${anchor}">${esc(ax.short)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 240 240" class="radar__svg">${rings}${spokes}<polygon class="radar__area" points="${poly}"/>${dots}${labels}</svg>`;
}

function areaSVG(cum) {
  const n = cum.length, max = cum[n - 1] || 1;
  const X = (i) => (i / (n - 1)) * 100;
  const Y = (v) => 92 - (v / max) * 84;
  const line = cum.map((v, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(2)},${Y(v).toFixed(2)}`).join(' ');
  const area = `M0,100 ` + cum.map((v, i) => `L${X(i).toFixed(2)},${Y(v).toFixed(2)}`).join(' ') + ` L100,100 Z`;
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="proj__svg">
    <path class="proj__area" d="${area}"/>
    <path class="proj__line" d="${line}" vector-effect="non-scaling-stroke"/>
  </svg>`;
}

function buildReport() {
  const R = computeReport();
  const band = riskBand(R.risk);
  const en = L === 'en';
  const company = (answers.azienda || '').trim();
  const dateStr = new Date().toLocaleDateString(en ? 'en-GB' : 'it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
  const autoPct = Math.round(AUTOMATABLE * 100);

  // concise, data-driven findings, ranked by severity
  const pool = [
    { s: R.fDep, it: R.fDep >= 70 ? 'Dipendenza critica da una sola persona.' : 'Forte dipendenza da persone chiave.', en: R.fDep >= 70 ? 'Critical dependency on one person.' : 'Strong key-person dependency.' },
    { s: R.fDoc, it: R.fDoc >= 70 ? 'Processo non documentato.' : 'Documentazione solo parziale.', en: R.fDoc >= 70 ? 'Process is undocumented.' : 'Documentation is only partial.' },
    { s: R.fErr, it: R.fErr >= 70 ? 'Errori frequenti sui passaggi manuali.' : 'Errori ricorrenti da controllo manuale.', en: R.fErr >= 70 ? 'Frequent errors on manual steps.' : 'Recurring errors from manual checks.' },
    { s: R.fBlk, it: R.blockCount + ' colli di bottiglia rilevati nel flusso.', en: R.blockCount + ' bottlenecks identified in the flow.' },
    { s: R.fRep, it: 'Lavoro altamente ripetitivo, adatto a un agente.', en: 'Highly repetitive work, well suited to an agent.' },
    { s: R.fGap, it: 'Ampio margine di automazione ancora inutilizzato.', en: 'Large automation gap still untapped.' }
  ].filter((f) => f.s >= 45).sort((a, b) => b.s - a.s).slice(0, 3);
  const timeFind = { it: numFmt(R.spentMonth) + ' ore/mese assorbite oggi dal processo.', en: numFmt(R.spentMonth) + ' hours/month absorbed by the process today.' };
  const scaleFind = R.orgScale > 1.25
    ? { it: 'Replicabile su ~' + numFmt(R.companyHead) + ' persone in azienda.', en: 'Replicable across ~' + numFmt(R.companyHead) + ' people company-wide.' }
    : null;
  const findings = [timeFind].concat(pool).concat(scaleFind ? [scaleFind] : []).slice(0, 4);

  const axes = [
    { v: R.fDep, short: en ? 'Depend' : 'Dipend', label: en ? 'Key-person dependency' : 'Dipendenza da persona' },
    { v: R.fDoc, short: en ? 'Docs' : 'Doc', label: en ? 'Documentation gap' : 'Documentazione assente' },
    { v: R.fErr, short: en ? 'Errors' : 'Errori', label: en ? 'Error frequency' : 'Frequenza errori' },
    { v: R.fBlk, short: en ? 'Blocks' : 'Blocchi', label: en ? 'Bottlenecks' : 'Colli di bottiglia' },
    { v: R.fGap, short: 'Gap', label: en ? 'Automation gap' : 'Gap di automazione' }
  ];

  const T = en ? {
    head: 'Operational assessment', verdict: 'Company-wide recoverable value / year',
    lede: 'recoverable by automating recurring work across the organization, without changing your tools.',
    kRisk: 'Operational risk', kHours: 'Hours / year', kWf: 'Value / workflow', kPot: 'Automation potential',
    exposure: 'Exposure', econ: 'Economics', scaleLbl: 'Scale',
    wf: 'This workflow / yr', team: 'Across the team / yr', company: 'Across the company / yr', firstYear: 'First year (ramp-up)',
    scaleHead: 'From one workflow to the whole organization.',
    scaleBody: 'A single recurring process absorbs ' + numFmt(R.spentMonth) + ' h/month for ' + numFmt(R.ppl) + ' people. The same playbook compounds across the ' + numFmt(R.teamHead) + '-person team and the ~' + numFmt(R.companyHead) + ' people in the company, with conservative diminishing returns (×' + R.orgScale.toFixed(1) + ').',
    planlbl: 'The plan', planHead: 'How we step in, without changing how you work.',
    method: 'Modelled on market benchmarks. ' + autoPct + '% automatable, loaded cost about ' + eur(R.cost) + '/h. Team ≈ ' + numFmt(R.teamHead) + ', company ≈ ' + numFmt(R.companyHead) + ' people; company figure scaled ×' + R.orgScale.toFixed(1) + '.',
    ctaLine: eur(R.companyValYear) + ' a year, recoverable. Let’s map the first workflow.', cta: 'Book a call'
  } : {
    head: 'Analisi operativa', verdict: 'Valore recuperabile in azienda / anno',
    lede: 'recuperabili automatizzando il lavoro ricorrente in tutta l’azienda, senza cambiare i vostri strumenti.',
    kRisk: 'Rischio operativo', kHours: 'Ore / anno', kWf: 'Valore / workflow', kPot: 'Potenziale automazione',
    exposure: 'Esposizione', econ: 'Economia', scaleLbl: 'Scala',
    wf: 'Questo workflow / anno', team: 'Sul team / anno', company: 'Sull’azienda / anno', firstYear: 'Primo anno (avvio)',
    scaleHead: 'Da un workflow all’intera organizzazione.',
    scaleBody: 'Un solo processo ricorrente assorbe ' + numFmt(R.spentMonth) + ' h/mese per ' + numFmt(R.ppl) + ' persone. Lo stesso schema si moltiplica sul team di ' + numFmt(R.teamHead) + ' persone e sulle ~' + numFmt(R.companyHead) + ' dell’azienda, con rendimenti decrescenti prudenti (×' + R.orgScale.toFixed(1) + ').',
    planlbl: 'Il piano', planHead: 'Come interveniamo, senza cambiare come lavorate.',
    method: 'Stime su benchmark di mercato. ' + autoPct + '% automatizzabile, costo aziendale circa ' + eur(R.cost) + '/h. Team ≈ ' + numFmt(R.teamHead) + ', azienda ≈ ' + numFmt(R.companyHead) + ' persone; valore aziendale scalato ×' + R.orgScale.toFixed(1) + '.',
    ctaLine: eur(R.companyValYear) + ' l’anno, recuperabili. Mappiamo il primo workflow.', cta: 'Prenota una call'
  };

  const plan = en ? [
    'We capture the process once, inside the tools you already use.',
    'An agent runs it every time, with checks on the critical steps.',
    'We extend it to your other recurring processes.'
  ] : [
    'Catturiamo il processo una volta, dentro gli strumenti che già usate.',
    'Un agente lo esegue ogni volta, con controlli sui passaggi critici.',
    'Lo estendiamo agli altri processi ricorrenti.'
  ];

  const screen = el('<section class="screen report"></section>');
  screen.innerHTML = `
    <header class="rep__head"><span>${T.head}</span><span>${esc(company || '')}${company ? ' · ' : ''}${dateStr}</span></header>

    <div class="rep__hero">
      <span class="rep__eyebrow">${T.verdict}</span>
      <div class="rep__heronum" data-count="${Math.round(R.companyValYear)}" data-fmt="eur">0</div>
      <p class="rep__lede">${T.lede}</p>
    </div>

    <div class="kpis">
      <div class="kpi"><span class="kpi__n" data-count="${R.risk}" data-fmt="int">0</span><span class="kpi__l">${T.kRisk}</span><span class="kpi__t">${tr(band)}</span></div>
      <div class="kpi"><span class="kpi__n" data-count="${Math.round(R.companyRecYear)}" data-fmt="num">0</span><span class="kpi__l">${T.kHours}</span></div>
      <div class="kpi"><span class="kpi__n" data-count="${Math.round(R.valYear)}" data-fmt="eur">0</span><span class="kpi__l">${T.kWf}</span></div>
      <div class="kpi"><span class="kpi__n" data-count="${R.potential}" data-fmt="pct">0</span><span class="kpi__l">${T.kPot}</span></div>
    </div>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.exposure}</span>
      <div class="sec__split">
        <div class="radar">${radarSVG(axes)}<div class="chart-tip" data-tip></div></div>
        <ul class="findings">${findings.map((f) => `<li>${esc(tr(f))}</li>`).join('')}</ul>
      </div>
    </section>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.econ}</span>
      <div class="sec__split">
        <div class="proj__chart">${areaSVG(R.cum)}<span class="proj__cursor" data-cursor></span><span class="proj__dot" data-dot></span><div class="chart-tip" data-tip></div></div>
        <div class="econ">
          <div class="econ__row"><span class="econ__n" data-count="${Math.round(R.valYear)}" data-fmt="eur">0</span><span class="econ__l">${T.wf}</span></div>
          <div class="econ__row"><span class="econ__n" data-count="${Math.round(R.teamValYear)}" data-fmt="eur">0</span><span class="econ__l">${T.team}</span></div>
          <div class="econ__row"><span class="econ__n" data-count="${Math.round(R.companyValYear)}" data-fmt="eur">0</span><span class="econ__l">${T.company}</span></div>
          <div class="econ__row econ__row--soft"><span class="econ__n" data-count="${Math.round(R.cum[R.cum.length - 1])}" data-fmt="eur">0</span><span class="econ__l">${T.firstYear}</span></div>
        </div>
      </div>
    </section>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.scaleLbl}</span>
      <h2 class="plan__head">${T.scaleHead}</h2>
      <div class="scale">
        <div class="scale__step"><span class="scale__n" data-count="${Math.round(R.ppl)}" data-fmt="int">0</span><span class="scale__l">${T.wf}</span><span class="scale__v">${eur(R.valYear)}</span></div>
        <div class="scale__arrow">${ICON.arrow}</div>
        <div class="scale__step"><span class="scale__n" data-count="${R.teamHead}" data-fmt="int">0</span><span class="scale__l">${T.team}</span><span class="scale__v">${eur(R.teamValYear)}</span></div>
        <div class="scale__arrow">${ICON.arrow}</div>
        <div class="scale__step"><span class="scale__n" data-count="${R.companyHead}" data-fmt="int">0</span><span class="scale__l">${T.company}</span><span class="scale__v">${eur(R.companyValYear)}</span></div>
      </div>
      <p class="rep__lede">${esc(T.scaleBody)}</p>
    </section>

    <section class="rep__sec rep__sec--plan">
      <span class="rep__seclbl">${T.planlbl}</span>
      <h2 class="plan__head">${T.planHead}</h2>
      <ol class="plan">${plan.map((p) => `<li>${esc(p)}</li>`).join('')}</ol>
    </section>

    <p class="rep__method">${esc(T.method)}</p>

    <div class="rep__cta">
      <p class="rep__ctaline">${esc(T.ctaLine)}</p>
      <button class="btn btn--lg" data-cta type="button">${T.cta} ${ICON.arrow}</button>
    </div>`;

  screen.querySelector('[data-cta]').addEventListener('click', next);

  requestAnimationFrame(() => {
    screen.querySelectorAll('[data-count]').forEach((elm) => {
      const to = parseFloat(elm.dataset.count);
      const f = elm.dataset.fmt === 'eur' ? eur : elm.dataset.fmt === 'num' ? numFmt : elm.dataset.fmt === 'pct' ? ((x) => Math.round(x) + '%') : ((x) => Math.round(x));
      countUp(elm, to, f, 1200);
    });
    attachRadarTip(screen);
    attachProjTip(screen, R.cum);
  });

  return screen;
}

function attachRadarTip(screen) {
  const wrap = screen.querySelector('.radar');
  const tip = wrap && wrap.querySelector('[data-tip]');
  if (!wrap || !tip) return;
  wrap.querySelectorAll('.radar__dot').forEach((dot) => {
    const show = () => {
      const wr = wrap.getBoundingClientRect();
      const dr = dot.getBoundingClientRect();
      tip.textContent = `${dot.dataset.l} · ${dot.dataset.v}`;
      tip.style.left = (dr.left - wr.left + dr.width / 2) + 'px';
      tip.style.top = (dr.top - wr.top - 6) + 'px';
      tip.classList.add('on');
      dot.classList.add('on');
    };
    const hide = () => { tip.classList.remove('on'); dot.classList.remove('on'); };
    dot.addEventListener('mouseenter', show);
    dot.addEventListener('mouseleave', hide);
  });
}

function attachProjTip(screen, cum) {
  const chart = screen.querySelector('.proj__chart');
  if (!chart) return;
  const cursor = chart.querySelector('[data-cursor]');
  const dot = chart.querySelector('[data-dot]');
  const tip = chart.querySelector('[data-tip]');
  const n = cum.length, max = cum[n - 1] || 1;
  const move = (e) => {
    const r = chart.getBoundingClientRect();
    let p = (e.clientX - r.left) / r.width;
    p = Math.max(0, Math.min(1, p));
    const i = Math.round(p * (n - 1));
    const xPct = (i / (n - 1)) * 100;
    const yPct = 92 - (cum[i] / max) * 84;
    cursor.style.left = xPct + '%';
    dot.style.left = xPct + '%';
    dot.style.top = yPct + '%';
    tip.textContent = `${L === 'en' ? 'Month' : 'Mese'} ${i + 1} · ${eur(cum[i])}`;
    tip.style.left = xPct + '%';
    tip.style.top = (yPct - 8) + '%';
    chart.classList.add('on');
  };
  chart.addEventListener('pointermove', move);
  chart.addEventListener('pointerleave', () => chart.classList.remove('on'));
}

function buildOutro() {
  try { localStorage.setItem('aevra_survey', JSON.stringify(answers)); } catch (e) {}
  console.log('Aevra, risposte:', answers);

  const first = (answers.nome || '').trim().split(/\s+/)[0];
  const hello = L === 'en'
    ? (first ? `Thanks for your time, ${first}` : 'Thanks for your time!')
    : (first ? `Grazie per il tuo tempo, ${first}` : 'Grazie per il tuo tempo!');
  const title = L === 'en' ? 'Hope to hear<br>from you soon.' : 'Speriamo di<br>sentirti presto.';
  const osub = L === 'en'
    ? 'If you’d like, let’s chat and show you how to automate your processes.'
    : 'Se ti va, possiamo farci due chiacchiere e mostrarti come automatizzare i tuoi processi.';

  const screen = el('<section class="screen outro"></section>');
  screen.innerHTML = `
    <div class="outro__content">
      <div class="outro__kicker">${hello}</div>
      <h1 class="outro__title">${title}</h1>
      <p class="outro__sub">${osub}</p>
      <a class="btn btn--lg" href="${CALENDLY}" target="_blank" rel="noopener">
        ${tr(UI.prenota)} ${ICON.arrow}
      </a>
    </div>
    <div class="outro__media">
      <div class="outro__parallax">
        <div class="outro__reveal">
          <div class="outro__kb"><img src="cover.png" alt="" /></div>
        </div>
      </div>
      <div class="grain" aria-hidden="true"></div>
    </div>`;

  attachParallax(screen);
  return screen;
}

function attachParallax(screen) {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const media = screen.querySelector('.outro__media');
  const layer = screen.querySelector('.outro__parallax');
  if (!media || !layer) return;

  // base overscan so the translated layer NEVER exposes the background behind it
  const S = 1.08;
  const MAX = 14; // px of travel, kept well inside the overscan margin
  layer.style.transform = `translate3d(0,0,0) scale(${S})`;

  const move = (e) => {
    const r = media.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    layer.style.transform = `translate3d(${(-x * MAX).toFixed(2)}px, ${(-y * MAX).toFixed(2)}px, 0) scale(${S})`;
  };
  const reset = () => { layer.style.transform = `translate3d(0,0,0) scale(${S})`; };

  // listen on the whole screen so depth tracks the cursor everywhere
  screen.addEventListener('pointermove', move);
  screen.addEventListener('pointerleave', reset);
}

function go(target, dir) {
  if (target < 0 || target > survey.length - 1) return;
  dir = dir || (target > i ? 'fwd' : 'back');
  i = target;
  if (i > furthest) furthest = i;
  if (survey[i].type === 'outro') { sfxSubmit(); haptic([10, 40, 18]); }
  else if (dir === 'back') { sfxBack(); haptic(8); }
  else { sfxAdvance(); haptic(12); }
  render(dir);
}

function next() { go(i + 1, 'fwd'); }
function back() { go(i - 1, 'back'); }

function canAdvance() {
  const item = survey[i];
  if (item.type === 'outro' || i >= survey.length - 1) return false;
  if (i < furthest) return true;            // already been further, free to move
  if (item.type === 'intro' || item.type === 'report') return true;
  return item.optional || validate(item);   // new ground, must be answerable
}

function forward() { if (canAdvance()) next(); }

function updateNav() {
  backBtn.disabled = i === 0;
  fwdBtn.disabled = !canAdvance();
}

function buildDots() {
  dotsEl.innerHTML = '';
  questionIndices.forEach((idx) => {
    const dot = el('<button class="dot" type="button" aria-label="Vai allo step"></button>');
    if (idx === i) dot.classList.add('active');
    else if (idx <= furthest) dot.classList.add('reachable');
    else dot.classList.add('locked');
    dot.addEventListener('click', () => { if (idx <= furthest) go(idx); });
    dotsEl.appendChild(dot);
  });
}

backBtn.addEventListener('click', back);
fwdBtn.addEventListener('click', forward);

document.addEventListener('keydown', (e) => {
  const item = survey[i];
  const tag = (document.activeElement.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea';

  if (e.key === 'Enter') {
    if (item.type === 'outro') return;
    if (item.type === 'intro') { next(); return; }
    if (item.textarea && e.shiftKey) return;
    e.preventDefault();
    if (item.optional || validate(item)) next();
    return;
  }

  if (!typing && item.type === 'single') {
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= item.options.length) stage.querySelectorAll('.opt')[n - 1].click();
  }

  if (e.key === 'Escape') { e.preventDefault(); back(); }
});

render();
