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
  persone: b('Volume', 'Volume'),
  retribuzione: b('Retribuzione', 'Salary'),
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
    options: [b('1–10', '1–10'), b('11–50', '11–50'), b('51–200', '51–200'), b('201–1000', '201–1000'), b('Oltre 1000', 'Over 1000')]
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
    id: 'persone', type: 'single', cols: 2,
    q: b('Quante persone svolgono questo processo regolarmente?', 'How many people run this process regularly?'),
    sub: b('Conta tutti quelli che lo eseguono, non solo il tuo team.', 'Count everyone who performs it, not just your team.'),
    options: [b('1–5', '1–5'), b('6–25', '6–25'), b('26–100', '26–100'), b('101–500', '101–500'), b('Oltre 500', 'Over 500')]
  },
  {
    id: 'frequenza', type: 'single', cols: 2,
    q: b('Quanto spesso lo esegue ciascuna persona?', 'How often does each person run it?'),
    options: [b('Raramente', 'Rarely'), b('Ogni mese', 'Monthly'), b('Ogni settimana', 'Weekly'), b('Ogni giorno', 'Daily')]
  },
  {
    id: 'durata', type: 'single', cols: 2,
    q: b('Quanto tempo richiede ogni volta?', 'How long does it take each time?'),
    options: [b('Meno di 15 minuti', 'Under 15 min'), b('15–60 minuti', '15–60 min'), b('1–4 ore', '1–4 hours'), b('Più di mezza giornata', 'More than half a day')]
  },
  {
    id: 'retribuzione', type: 'single', cols: 2, optional: true,
    q: b('Qual è la retribuzione media annua di chi lo svolge?', 'What’s the average annual salary of those who run it?'),
    sub: b('Serve a stimare il costo reale del tempo. Puoi saltare.', 'Used to price the real cost of the time. Feel free to skip.'),
    options: [b('Meno di €25k', 'Under €25k'), b('€25–40k', '€25–40k'), b('€40–60k', '€40–60k'), b('€60–90k', '€60–90k'), b('Oltre €90k', 'Over €90k')]
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

// ---- model inputs (bottom-up, the way the impact case in the deck is built) ----
const VOLUME_MID = [3, 14, 55, 250, 800];     // people who run the process regularly
const RUNS_PER_YEAR = [6, 12, 48, 240];       // rarely / monthly / weekly (48 wk) / daily (5×48), per person
const HOURS_PER_RUN = [0.2, 0.6, 2.5, 5];     // <15m / 15-60m / 1-4h / >half day
const SALARY_BAND = [22000, 32000, 50000, 72000, 110000];         // annual gross €, by band
const SECTOR_ANNUAL = [38000, 48000, 62000, 40000, 58000, 42000, 52000, 40000]; // default gross by sector
const SECTOR_MULT = [0.98, 1.04, 1.12, 0.92, 1.10, 0.95, 1.02, 0.95];           // labor-cost adj by sector
const ERR_FRAC = [0.03, 0.07, 0.13, 0.18];    // rework cost as a share of baseline, by error frequency
const RISK4 = [14, 44, 72, 92];               // 4-level scales -> 0-100 exposure points
const NUM_PROC_MID = [3, 10, 25, 50];         // numProcessi midpoints
const MATURITY_PTS = [15, 40, 65, 90];        // automation maturity capability
const TEAM_MID = [3, 13, 35, 75];             // teamSize headcount midpoints
const COMPANY_MID = [5, 30, 120, 500, 2000];  // companySize headcount midpoints
const WORK_HOURS_YR = 1720;                   // productive hours per FTE / year
const OVERHEAD = 1.30;                         // salary -> fully-loaded cost multiplier
const PRICE_RATE = 0.18;                       // value-based annual price, share of recoverable value
const MIN_ACV = 25000;                         // Aevra minimum annual contract value

// per process-area automatability nudge (index = `processo` option)
// HR, Finance, Sales, Operations, Suppliers, Docs/compliance, IT, Reporting/data-entry, Approvals
const PROC_AUTO_ADJ = [0.02, 0.03, -0.03, 0.01, 0.02, 0.03, 0.00, 0.05, 0.04];
// software types that rarely expose clean APIs (index = `tipoGestionale` option) — Aevra's wedge
// ERP, CRM, HR/payroll, accounting, procurement, tenders/PA, DMS, ticketing, custom in-house
const SOFTWARE_LEGACY = [1, 0, 0, 1, 1, 1, 1, 0, 1];

function computeReport() {
  const idx = (id) => optionIndex(id, answers[id]);
  const at = (arr, id, d) => (arr[idx(id)] != null ? arr[idx(id)] : d);

  const settoreIdx = idx('settore');
  const sectorMult = SECTOR_MULT[settoreIdx] != null ? SECTOR_MULT[settoreIdx] : 1;

  // headcounts
  const teamHead = TEAM_MID[idx('teamSize')] != null ? TEAM_MID[idx('teamSize')] : 13;
  const companyHead = COMPANY_MID[idx('companySize')] != null ? COMPANY_MID[idx('companySize')] : Math.max(teamHead, 30);

  // volume drivers — the base of the bottom-up estimate
  let users = VOLUME_MID[idx('persone')] != null ? VOLUME_MID[idx('persone')] : 14;
  users = Math.min(users, Math.max(1, companyHead));      // a workflow can't be run by more than the company
  const runs = at(RUNS_PER_YEAR, 'frequenza', 46);        // runs per person / year
  const hoursRun = at(HOURS_PER_RUN, 'durata', 1);        // hours per run

  // fully-loaded hourly cost of the people doing it: salary band (or sector default) × overhead
  const salIdx = idx('retribuzione');
  const annual = SALARY_BAND[salIdx] != null ? SALARY_BAND[salIdx]
    : (SECTOR_ANNUAL[settoreIdx] != null ? SECTOR_ANNUAL[settoreIdx] : 46000);
  const cost = (annual * OVERHEAD / WORK_HOURS_YR) * sectorMult;

  // process areas selected for automation -> per-area automatability nudge
  const procIdx = selectedIndices('processo');
  const procAutoAdj = procIdx.length
    ? procIdx.reduce((s, k) => s + (PROC_AUTO_ADJ[k] || 0), 0) / procIdx.length : 0;

  // software landscape -> how much runs on legacy / no-API systems (Aevra's edge)
  const swIdx = selectedIndices('tipoGestionale');
  const noApiShare = swIdx.length ? swIdx.filter((k) => SOFTWARE_LEGACY[k]).length / swIdx.length : 0;
  const swFitAdj = noApiShare * 0.03;

  // tool fragmentation -> more glue work, more handoffs, more errors
  const toolCount = selectedIndices('strumenti').length;
  const fragmentation = Math.min(1, toolCount / 5);

  // automation feasibility (how much of the manual time an agent removes at runtime)
  const repIdx = idx('ripetitivita');
  const repShare = repIdx >= 0 ? repIdx / 3 : 0.5;
  const matIdx = idx('maturita');
  const maturity = MATURITY_PTS[matIdx] != null ? MATURITY_PTS[matIdx] : 40;
  const autoRate = Math.min(0.95, Math.max(0.74,
    0.80 + repShare * 0.12 + (maturity / 100) * 0.03 + procAutoAdj + swFitAdj));

  // baseline manual effort for THIS workflow, across its whole user base
  const baselineHours = users * runs * hoursRun;
  const baselineCost = baselineHours * cost;

  // value bridge: labor time + error/rework reduction + throughput / risk relief
  const laborHours = baselineHours * autoRate;
  const laborValue = laborHours * cost;
  const errFracBase = ERR_FRAC[idx('errori')] != null ? ERR_FRAC[idx('errori')] : 0.07;
  const errFrac = Math.min(0.24, errFracBase + fragmentation * 0.05);   // fragmented tools add rework
  const errorValue = baselineCost * errFrac;
  const blocco = selectedIndices('blocco');
  const fDep = at(RISK4, 'dipendenza', 50);
  const speedFrac = Math.min(0.15, blocco.length * 0.02 + (fDep / 100) * 0.05 + fragmentation * 0.03);
  const speedValue = baselineCost * speedFrac;
  let workflowValue = laborValue + errorValue + speedValue;
  workflowValue = Math.min(workflowValue, baselineCost * 0.97);
  const residualCost = Math.max(0, baselineCost - workflowValue);
  const fteFreed = laborHours / WORK_HOURS_YR;

  // operational-risk factors (0-100) for the exposure radar
  const fDoc = at(RISK4, 'documentazione', 50);
  const fErr = at(RISK4, 'errori', 50);
  const fBlk = Math.min(95, blocco.length * 16);
  const fRep = RISK4[repIdx] != null ? RISK4[repIdx] : 50;
  const fGap = 100 - maturity;
  const risk = Math.round(0.28 * fDep + 0.22 * fDoc + 0.22 * fErr + 0.16 * fBlk + 0.12 * fGap);
  const potential = Math.round(autoRate * 100);

  // portfolio extrapolation -> company-wide operations layer (diminishing returns + representativeness discount)
  const nProc = NUM_PROC_MID[idx('numProcessi')] != null ? NUM_PROC_MID[idx('numProcessi')] : 10;
  const decay = 0.82;
  const rawFactor = (1 - Math.pow(decay, nProc)) / (1 - decay);
  const portfolioFactor = 1 + (rawFactor - 1) * 0.7;
  const companyValue = workflowValue * portfolioFactor;
  const companyHours = laborHours * portfolioFactor;
  const companyFte = companyHours / WORK_HOURS_YR;

  // team tier sits between the single workflow and the whole company, by headcount share
  const teamShare = Math.max(0.15, Math.min(0.9, teamHead / Math.max(teamHead, companyHead)));
  const teamValue = workflowValue + (companyValue - workflowValue) * teamShare;

  // which value lever the customer cares about most (from `obiettivo`)
  const goals = selectedIndices('obiettivo');
  const goalLever = goals.includes(0) || goals.includes(5) ? 'error'
    : goals.includes(4) ? 'risk'
      : goals.includes(2) || goals.includes(3) ? 'speed'
        : 'labor';

  // investment, ROI, payback (value-based pricing with an ACV floor)
  const investment = Math.max(MIN_ACV, companyValue * PRICE_RATE);
  const netValue = companyValue - investment;
  const roi = companyValue / investment;
  const paybackMonths = 12 * investment / companyValue;

  // scenario band
  const conservative = companyValue * 0.72;
  const ambitious = companyValue * 1.22;

  // 36-month cumulative value (logistic adoption ramp to company run-rate)
  const monthlyRun = companyValue / 12;
  const cum = [];
  let acc = 0;
  for (let m = 1; m <= 36; m++) { acc += monthlyRun * (1 / (1 + Math.exp(-(m - 4) / 1.8))); cum.push(acc); }
  const threeYear = acc;

  return {
    users, runs, hoursRun, cost, annual, autoRate, sectorMult,
    baselineHours, baselineCost, laborHours, laborValue, errorValue, speedValue,
    workflowValue, residualCost, fteFreed,
    risk, fDep, fDoc, fErr, fBlk, fRep, fGap, maturity, potential, blockCount: blocco.length,
    teamHead, companyHead, nProc, portfolioFactor, companyValue, companyHours, companyFte,
    investment, netValue, roi, paybackMonths, conservative, ambitious, cum, threeYear,
    procAutoAdj, noApiShare, fragmentation, toolCount, teamValue, teamShare, goalLever
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

// minutes-or-hours label for time per run
function durLabel(h, en) { return h * 60 < 60 ? Math.round(h * 60) + ' min' : numFmt(h) + (en ? ' h' : ' h'); }

function buildReport() {
  const R = computeReport();
  const band = riskBand(R.risk);
  const en = L === 'en';
  const company = (answers.azienda || '').trim();
  const dateStr = new Date().toLocaleDateString(en ? 'en-GB' : 'it-IT', { day: '2-digit', month: 'short', year: 'numeric' });

  // ---- value bridge composition (where the money comes from) ----
  const comp = [
    { k: 'labor', v: R.laborValue, lbl: en ? 'Labor time recovered' : 'Tempo di lavoro recuperato' },
    { k: 'error', v: R.errorValue, lbl: en ? 'Errors & rework avoided' : 'Errori e rilavorazioni evitati' },
    { k: 'speed', v: R.speedValue, lbl: en ? 'Throughput & risk relief' : 'Throughput e rischio ridotti' }
  ];
  const compTotal = comp.reduce((s, c) => s + c.v, 0) || 1;
  const barSegs = comp.map((c) => `<div class="bar__seg bar__seg--${c.k}" style="flex:${(c.v / compTotal).toFixed(4)}"></div>`).join('');
  const legend = comp.map((c) => `<li class="leg"><span class="leg__sw leg__sw--${c.k}"></span><span class="leg__l">${c.lbl}</span><span class="leg__v">${eur(c.v)}</span><span class="leg__p">${Math.round(c.v / compTotal * 100)}%</span></li>`).join('');

  // ---- data-driven findings, tuned to what the customer told us ----
  const swName = (answers.nomeGestionale || '').trim();
  const hasGoals = Array.isArray(answers.obiettivo) && answers.obiettivo.length > 0;
  const goalFind = {
    labor: { it: 'Obiettivo: liberare tempo — ' + numFmt(R.fteFreed) + ' FTE su questo solo processo.', en: 'Goal: free up time — ' + numFmt(R.fteFreed) + ' FTE on this process alone.' },
    error: { it: 'Obiettivo: ridurre errori — ' + eur(R.errorValue) + '/anno di rilavorazioni evitate.', en: 'Goal: cut errors — ' + eur(R.errorValue) + '/yr of rework avoided.' },
    risk: { it: 'Obiettivo: meno dipendenza — esecuzione resa indipendente dalle persone chiave.', en: 'Goal: less key-person risk — execution made independent of key people.' },
    speed: { it: 'Obiettivo: standardizzare e tracciare — ogni esecuzione identica e auditabile.', en: 'Goal: standardize & track — every run identical and auditable.' }
  }[R.goalLever];

  const swFind = (selectedIndices('tipoGestionale').length || swName) ? {
    it: (swName ? swName : 'Gestionale') + (R.noApiShare >= 0.5 ? ', senza API pulite: ' : ': ') + 'Aevra automatizza dall’interfaccia, com’è.',
    en: (swName ? swName : 'Business software') + (R.noApiShare >= 0.5 ? ', no clean APIs: ' : ': ') + 'Aevra automates from the UI, as-is.'
  } : null;
  const fragFind = R.toolCount >= 3 ? {
    it: R.toolCount + ' strumenti diversi nel flusso: passaggi manuali e dati che rimbalzano.',
    en: R.toolCount + ' separate tools in the flow: manual handoffs and data bouncing around.'
  } : null;

  const riskPool = [
    { s: R.fDep, it: R.fDep >= 70 ? 'Dipendenza critica da una sola persona.' : 'Forte dipendenza da persone chiave.', en: R.fDep >= 70 ? 'Critical dependency on a single person.' : 'Strong key-person dependency.' },
    { s: R.fDoc, it: R.fDoc >= 70 ? 'Processo non documentato.' : 'Documentazione solo parziale.', en: R.fDoc >= 70 ? 'Process is undocumented.' : 'Documentation is only partial.' },
    { s: R.fErr, it: 'Errori ricorrenti sui passaggi manuali.', en: 'Recurring errors on manual steps.' },
    { s: R.fBlk, it: R.blockCount + ' colli di bottiglia nel flusso.', en: R.blockCount + ' bottlenecks in the flow.' }
  ].filter((f) => f.s >= 45).sort((a, b) => b.s - a.s).slice(0, 2);

  const findings = [hasGoals ? goalFind : null,
    { it: numFmt(R.baselineHours) + ' ore/anno svolte a mano da ' + numFmt(R.users) + ' persone.', en: numFmt(R.baselineHours) + ' hours/year done by hand across ' + numFmt(R.users) + ' people.' },
    { it: '≈ ' + numFmt(R.fteFreed) + ' FTE liberati su questo solo processo.', en: '≈ ' + numFmt(R.fteFreed) + ' FTE freed on this process alone.' },
    swFind, fragFind
  ].concat(riskPool).concat([
    { it: 'Estendibile ai ~' + numFmt(R.nProc) + ' processi ricorrenti dell’azienda.', en: 'Extendable to the ~' + numFmt(R.nProc) + ' recurring processes company-wide.' }
  ]).filter(Boolean).slice(0, 5);

  // process description, echoed back as the captured workflow
  const descr = (answers.descrizione || '').trim();

  const axes = [
    { v: R.fDep, short: en ? 'Depend' : 'Dipend', label: en ? 'Key-person dependency' : 'Dipendenza da persona' },
    { v: R.fDoc, short: en ? 'Docs' : 'Doc', label: en ? 'Documentation gap' : 'Documentazione assente' },
    { v: R.fErr, short: en ? 'Errors' : 'Errori', label: en ? 'Error frequency' : 'Frequenza errori' },
    { v: R.fBlk, short: en ? 'Blocks' : 'Blocchi', label: en ? 'Bottlenecks' : 'Colli di bottiglia' },
    { v: R.fGap, short: 'Gap', label: en ? 'Automation gap' : 'Gap di automazione' }
  ];

  // ---- transparent assumptions ----
  const assumptions = [
    { l: en ? 'People running it' : 'Persone che lo svolgono', v: numFmt(R.users) },
    { l: en ? 'Runs / person / yr' : 'Esecuzioni / persona / anno', v: numFmt(R.runs) },
    { l: en ? 'Time / run' : 'Tempo / esecuzione', v: durLabel(R.hoursRun, en) },
    { l: en ? 'Loaded labor cost' : 'Costo aziendale del lavoro', v: eur(R.cost) + '/h' },
    { l: en ? 'Automation rate' : 'Tasso di automazione', v: R.potential + '%' },
    { l: en ? 'Recurring processes' : 'Processi ricorrenti', v: numFmt(R.nProc) },
    { l: en ? 'Portfolio factor' : 'Fattore portfolio', v: '×' + R.portfolioFactor.toFixed(1) },
    { l: en ? 'Productive hrs / FTE' : 'Ore produttive / FTE', v: numFmt(WORK_HOURS_YR) }
  ];

  const T = en ? {
    head: 'Operational & value assessment', verdict: 'Recoverable value / year · company-wide',
    lede: 'recoverable by automating recurring work across the organization — without changing your tools, migrating data, or waiting for APIs.',
    kNet: 'Net value / yr', kNetTag: 'after platform cost', kHours: 'Hours recovered / yr', kRoi: 'Return on investment',
    kRoiTag: R.paybackMonths.toFixed(1) + '-month payback', kPot: 'Automation potential', fteUnit: ' FTE',
    bridgeLbl: 'Value bridge', bridgeHead: 'Where the recovered value comes from.',
    bridgeBody: 'For one workflow run by ' + numFmt(R.users) + ' people: ' + eur(R.baselineCost) + ' of manual cost a year, of which ' + eur(R.workflowValue) + ' is recoverable.',
    exposure: 'Operational exposure', riskLbl: 'Risk ' + tr(band).toLowerCase(),
    econ: 'Economics', wf: 'This workflow / yr', company: 'Across the company / yr', threeYr: '3-year cumulative',
    rangeLbl: 'Range', cons: 'Conservative', amb: 'Ambitious',
    scaleLbl: 'Scale path', scaleHead: 'From one workflow to the operations layer.',
    scaleBody: 'Land one painful workflow, prove execution, then expand across the ~' + numFmt(R.nProc) + ' recurring processes the team already runs. Pricing grows with live workflows and volume (×' + R.portfolioFactor.toFixed(1) + ' portfolio effect, conservative).',
    s1: 'people on workflow 1', sTeam: 'people on the team', s2: 'recurring processes', s3: 'years compounding',
    capturedLbl: 'Captured workflow',
    assumeLbl: 'Assumptions', assumeHead: 'Every number is bottom-up and editable with you.',
    planlbl: 'The plan', planHead: 'How we step in, without changing how you work.',
    method: 'Bottom-up model: people × runs/year × time/run × fully-loaded labor cost (salary ×' + OVERHEAD.toFixed(2) + ' / ' + numFmt(WORK_HOURS_YR) + ' h). Automation removes ' + R.potential + '% of runtime; error and throughput effects added on top. Company figure applies a conservative ×' + R.portfolioFactor.toFixed(1) + ' portfolio factor with diminishing returns. Investment priced at ' + Math.round(PRICE_RATE * 100) + '% of recovered value (min ' + eur(MIN_ACV) + ' ACV).',
    ctaLine: eur(R.netValue) + ' net a year, ' + R.roi.toFixed(1) + '× return. Let’s map the first workflow.', cta: 'Book a call'
  } : {
    head: 'Analisi operativa e di valore', verdict: 'Valore recuperabile / anno · in azienda',
    lede: 'recuperabili automatizzando il lavoro ricorrente in tutta l’azienda — senza cambiare strumenti, migrare dati o aspettare le API.',
    kNet: 'Valore netto / anno', kNetTag: 'al netto della piattaforma', kHours: 'Ore recuperate / anno', kRoi: 'Ritorno sull’investimento',
    kRoiTag: 'rientro in ' + R.paybackMonths.toFixed(1) + ' mesi', kPot: 'Potenziale automazione', fteUnit: ' FTE',
    bridgeLbl: 'Ponte del valore', bridgeHead: 'Da dove arriva il valore recuperato.',
    bridgeBody: 'Per un workflow svolto da ' + numFmt(R.users) + ' persone: ' + eur(R.baselineCost) + ' di costo manuale all’anno, di cui ' + eur(R.workflowValue) + ' recuperabili.',
    exposure: 'Esposizione operativa', riskLbl: 'Rischio ' + tr(band).toLowerCase(),
    econ: 'Economia', wf: 'Questo workflow / anno', company: 'In tutta l’azienda / anno', threeYr: 'Cumulato a 3 anni',
    rangeLbl: 'Intervallo', cons: 'Prudente', amb: 'Ambizioso',
    scaleLbl: 'Percorso di scala', scaleHead: 'Da un workflow al layer operativo.',
    scaleBody: 'Si parte da un workflow critico, si dimostra l’esecuzione, poi si estende ai ~' + numFmt(R.nProc) + ' processi ricorrenti che il team già gestisce. Il prezzo cresce con i workflow attivi e i volumi (effetto portfolio ×' + R.portfolioFactor.toFixed(1) + ', prudente).',
    s1: 'persone sul workflow 1', sTeam: 'persone nel team', s2: 'processi ricorrenti', s3: 'anni di accumulo',
    capturedLbl: 'Workflow rilevato',
    assumeLbl: 'Ipotesi', assumeHead: 'Ogni numero è bottom-up e si rivede insieme a voi.',
    planlbl: 'Il piano', planHead: 'Come interveniamo, senza cambiare come lavorate.',
    method: 'Modello bottom-up: persone × esecuzioni/anno × tempo/esecuzione × costo del lavoro fully-loaded (stipendio ×' + OVERHEAD.toFixed(2) + ' / ' + numFmt(WORK_HOURS_YR) + ' h). L’automazione rimuove il ' + R.potential + '% del tempo; effetti su errori e throughput aggiunti sopra. Il dato aziendale applica un fattore portfolio prudente ×' + R.portfolioFactor.toFixed(1) + ' con rendimenti decrescenti. Investimento al ' + Math.round(PRICE_RATE * 100) + '% del valore recuperato (min ' + eur(MIN_ACV) + ' ACV).',
    ctaLine: eur(R.netValue) + ' netti l’anno, ritorno ' + R.roi.toFixed(1) + '×. Mappiamo il primo workflow.', cta: 'Prenota una call'
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
      <div class="rep__heronum" data-count="${Math.round(R.companyValue)}" data-fmt="eur">0</div>
      <p class="rep__lede">${T.lede}</p>
    </div>

    <div class="kpis">
      <div class="kpi"><span class="kpi__n" data-count="${Math.round(R.netValue)}" data-fmt="eur">0</span><span class="kpi__l">${T.kNet}</span><span class="kpi__t">${T.kNetTag}</span></div>
      <div class="kpi"><span class="kpi__n" data-count="${Math.round(R.companyHours)}" data-fmt="num">0</span><span class="kpi__l">${T.kHours}</span><span class="kpi__t">${numFmt(R.companyFte)}${T.fteUnit}</span></div>
      <div class="kpi"><span class="kpi__n" data-count="${R.roi}" data-fmt="x">0</span><span class="kpi__l">${T.kRoi}</span><span class="kpi__t">${T.kRoiTag}</span></div>
      <div class="kpi"><span class="kpi__n" data-count="${R.potential}" data-fmt="pct">0</span><span class="kpi__l">${T.kPot}</span></div>
    </div>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.bridgeLbl}</span>
      <h2 class="plan__head">${T.bridgeHead}</h2>
      <div class="sec__split sec__split--bridge">
        <div class="bridge">
          <div class="bar">${barSegs}</div>
          <ul class="legend">${legend}</ul>
        </div>
        <ul class="findings">${findings.map((f) => `<li>${esc(tr(f))}</li>`).join('')}</ul>
      </div>
      <p class="rep__lede">${esc(T.bridgeBody)}</p>
      ${descr ? `<blockquote class="rep__quote"><span class="rep__quotelbl">${T.capturedLbl}</span>“${esc(descr)}”</blockquote>` : ''}
    </section>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.exposure} · ${T.riskLbl}</span>
      <div class="sec__split">
        <div class="radar">${radarSVG(axes)}<div class="chart-tip" data-tip></div></div>
        <div class="gauge">
          <div class="gauge__track"><div class="gauge__fill" style="width:${R.risk}%"></div></div>
          <div class="gauge__row"><span class="gauge__n" data-count="${R.risk}" data-fmt="int">0</span><span class="gauge__l">${en ? 'Operational risk score (0–100)' : 'Indice di rischio operativo (0–100)'}</span></div>
        </div>
      </div>
    </section>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.econ}</span>
      <div class="sec__split">
        <div class="proj__chart">${areaSVG(R.cum)}<span class="proj__cursor" data-cursor></span><span class="proj__dot" data-dot></span><div class="chart-tip" data-tip></div></div>
        <div class="econ">
          <div class="econ__row"><span class="econ__n" data-count="${Math.round(R.workflowValue)}" data-fmt="eur">0</span><span class="econ__l">${T.wf}</span></div>
          <div class="econ__row"><span class="econ__n" data-count="${Math.round(R.companyValue)}" data-fmt="eur">0</span><span class="econ__l">${T.company}</span></div>
          <div class="econ__row econ__row--soft"><span class="econ__n" data-count="${Math.round(R.threeYear)}" data-fmt="eur">0</span><span class="econ__l">${T.threeYr}</span></div>
          <div class="econ__range"><span class="econ__rl">${T.rangeLbl}</span><span class="econ__rv">${T.cons} ${eur(R.conservative)} — ${T.amb} ${eur(R.ambitious)}</span></div>
        </div>
      </div>
    </section>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.scaleLbl}</span>
      <h2 class="plan__head">${T.scaleHead}</h2>
      <div class="scale">
        <div class="scale__step"><span class="scale__n" data-count="${Math.round(R.users)}" data-fmt="int">0</span><span class="scale__l">${T.s1}</span><span class="scale__v">${eur(R.workflowValue)}</span></div>
        <div class="scale__arrow">${ICON.arrow}</div>
        <div class="scale__step"><span class="scale__n" data-count="${R.teamHead}" data-fmt="int">0</span><span class="scale__l">${T.sTeam}</span><span class="scale__v">${eur(R.teamValue)}</span></div>
        <div class="scale__arrow">${ICON.arrow}</div>
        <div class="scale__step"><span class="scale__n" data-count="${R.nProc}" data-fmt="int">0</span><span class="scale__l">${T.s2}</span><span class="scale__v">${eur(R.companyValue)}</span></div>
        <div class="scale__arrow">${ICON.arrow}</div>
        <div class="scale__step"><span class="scale__n" data-count="3" data-fmt="int">0</span><span class="scale__l">${T.s3}</span><span class="scale__v">${eur(R.threeYear)}</span></div>
      </div>
      <p class="rep__lede">${esc(T.scaleBody)}</p>
    </section>

    <section class="rep__sec">
      <span class="rep__seclbl">${T.assumeLbl}</span>
      <h2 class="plan__head">${T.assumeHead}</h2>
      <div class="assume">${assumptions.map((a) => `<div class="assume__row"><span class="assume__l">${a.l}</span><span class="assume__v">${esc(a.v)}</span></div>`).join('')}</div>
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
      const fmt = elm.dataset.fmt;
      const f = fmt === 'eur' ? eur : fmt === 'num' ? numFmt : fmt === 'pct' ? ((x) => Math.round(x) + '%')
        : fmt === 'x' ? ((x) => x.toFixed(1) + '×') : ((x) => Math.round(x));
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
