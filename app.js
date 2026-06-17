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
  buildDots();
  updateNav();
  focusFirst(screen);
}

function focusFirst(screen) {
  // never auto-focus the hidden "Altro…" reveal field
  const input = screen.querySelector('.field:not(.field--other) input, .field:not(.field--other) textarea');
  if (input) setTimeout(() => input.focus(), 360);
}

function buildScreen(item) {
  if (item.type === 'intro') return buildIntro(item);
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
  const MAX = 14; // px of travel — kept well inside the overscan margin
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
  if (item.type === 'intro') return true;
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
