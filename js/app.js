/**
 * BOM DIA — Premium Experience
 * Refatoração Extrema 2026
 */

/* ============================================
   DATA — Curated Content
   ============================================ */
const quotes = [
  { text: "Cada manhã que acordamos é uma segunda chance de sermos tudo que somos capazes.", author: "Dalai Lama", cat: "Sabedoria" },
  { text: "O sucesso é a soma de pequenos esforços, repetidos dia após dia.", author: "Robert Collier", cat: "Consistência" },
  { text: "Acorde com determinação. Vá dormir com satisfação.", author: "George Lorimer", cat: "Disciplina" },
  { text: "A vida é 10% o que acontece com você e 90% como você reage a isso.", author: "Charles Swindoll", cat: "Mentalidade" },
  { text: "Você não precisa ser incrível para começar, mas precisa começar para ser incrível.", author: "Zig Ziglar", cat: "Ação" },
  { text: "Seja você a mudança que deseja ver no mundo.", author: "Mahatma Gandhi", cat: "Propósito" },
  { text: "A disciplina é a ponte entre metas e realizações.", author: "Jim Rohn", cat: "Disciplina" },
  { text: "Grandes coisas nunca vêm de zonas de conforto.", author: "Neil Strauss", cat: "Crescimento" },
  { text: "Não espere pela oportunidade perfeita. Tome a oportunidade e faça-a perfeita.", author: "Roger Staubach", cat: "Ação" },
  { text: "Cuide da sua mente como cuida do seu corpo. Os dois precisam de exercício.", author: "Anônimo", cat: "Equilíbrio" },
  { text: "O momento presente sempre terá sido. Faça algo que valha lembrar.", author: "Anônimo", cat: "Presença" },
  { text: "Foco não é dizer sim para as coisas certas. É dizer não para cem outras.", author: "Steve Jobs", cat: "Foco" },
];

const rituals = [
  { name: "Beber Água", desc: "Hidrate o corpo logo ao acordar", icon: "💧" },
  { name: "Respirar Fundo", desc: "3 respirações profundas e conscientes", icon: "🌬️" },
  { name: "Ver a Luz Natural", desc: "Exponha-se à luz do dia", icon: "☀️" },
  { name: "Movimentar o Corpo", desc: "Qualquer atividade por 5 minutos", icon: "🧘" },
  { name: "Planejar o Dia", desc: "Defina suas 3 prioridades", icon: "📝" },
  { name: "Praticar Gratidão", desc: "Pense em algo bom na sua vida", icon: "🙏" },
];

const dayFocus = [
  { word: "Repouso", desc: "Domingo é sagrado. Descanse sem culpa, carregue as energias e se permita apenas ser.", icon: "🌙" },
  { word: "Intenção", desc: "Segunda-feira abre uma semana inteira de possibilidades. Defina suas intenções com clareza.", icon: "🎯" },
  { word: "Ação", desc: "Terça é hora de colocar os planos em movimento. Cada passo te aproxima do objetivo.", icon: "⚡" },
  { word: "Equilíbrio", desc: "Quarta é a metade da jornada. Reveja seu ritmo e celebre o que já conquistou.", icon: "⚖️" },
  { word: "Impulso", desc: "Quinta, o fim de semana está à vista. Use essa energia para avançar com confiança.", icon: "🚀" },
  { word: "Leveza", desc: "Sexta merece ser vivida com suavidade. Celebre as conquistas da semana.", icon: "🌸" },
  { word: "Presença", desc: "Sábado é todo seu. Esteja inteiramente presente no que te faz bem.", icon: "🌿" },
];

const breathingPattern = { inhale: 4, hold: 4, exhale: 4, holdEmpty: 4 };
const breathingPhases = [
  { name: "Inspire", duration: breathingPattern.inhale, icon: "🌅", scale: 1.5 },
  { name: "Segure", duration: breathingPattern.hold, icon: "🌄", scale: 1.5 },
  { name: "Expire", duration: breathingPattern.exhale, icon: "🌇", scale: 0.7 },
  { name: "Pausa", duration: breathingPattern.holdEmpty, icon: "🌃", scale: 0.7 },
];

const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

/* ============================================
   STATE — Application State
   ============================================ */
const state = {
  currentQuote: 0,
  quoteTimer: null,
  selectedMood: null,
  completedRituals: new Set(),
  breathingActive: false,
  breathingPhase: 0,
  breathingTimer: null,
  theme: 'auto',
  initialized: false,
};

/* ============================================
   THEME — Dynamic Color System
   ============================================ */
const themes = {
  auto: (hour) => {
    if (hour >= 5 && hour < 7) return { hue: 30, sat: 50%, light: 55%, glow: 0.12 };   // Dawn
    if (hour >= 7 && hour < 12) return { hue: 45, sat: 55%, light: 55%, glow: 0.10 };  // Morning
    if (hour >= 12 && hour < 17) return { hue: 200, sat: 40%, light: 55%, glow: 0.10 }; // Day
    if (hour >= 17 && hour < 20) return { hue: 15, sat: 50%, light: 55%, glow: 0.12 };  // Evening
    return { hue: 260, sat: 45%, light: 55%, glow: 0.10 };                              // Night
  },
  morning: { hue: 45, sat: 55%, light: 55%, glow: 0.10 },
  day: { hue: 200, sat: 40%, light: 55%, glow: 0.10 },
  evening: { hue: 15, sat: 50%, light: 55%, glow: 0.12 },
  night: { hue: 260, sat: 45%, light: 55%, glow: 0.10 },
};

function applyTheme(themeData) {
  const root = document.documentElement;
  root.style.setProperty('--hue', themeData.hue);
  root.style.setProperty('--sat', themeData.sat);
  root.style.setProperty('--light', themeData.light);
  root.style.setProperty('--glow-opacity', themeData.glow);

  // Also update CSS custom properties for accent
  const hsl = `hsl(${themeData.hue}, ${themeData.sat}, ${themeData.light})`;
  const hsla = `hsla(${themeData.hue}, ${themeData.sat}, ${themeData.light}, ${themeData.glow})`;
  root.style.setProperty('--accent', hsl);
  root.style.setProperty('--accent-glow', hsla);
}

function updateTheme(hour = new Date().getHours()) {
  const themeFn = state.theme === 'auto' ? themes.auto : () => themes[state.theme];
  applyTheme(typeof themeFn === 'function' ? themeFn(hour) : themeFn);
}

/* ============================================
   CLOCK — Precision Time Display
   ============================================ */
function tick() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

  const timeEl = document.getElementById('clockTime');
  const secEl = document.getElementById('clockSec');
  const secBar = document.getElementById('secondsBar');

  if (timeEl) {
    timeEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  if (secEl) {
    secEl.textContent = String(s).padStart(2, '0');
  }
  if (secBar) {
    secBar.style.width = `${(s / 60) * 100}%`;
  }

  const ds = diasSemana[now.getDay()];
  const dateEl = document.getElementById('dateLine');
  if (dateEl) {
    dateEl.textContent = `${ds}, ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;
  }

  const greetingEl = document.getElementById('greeting');
  if (greetingEl) {
    let greeting;
    if (h >= 5 && h < 12) greeting = 'Bom Dia';
    else if (h >= 12 && h < 18) greeting = 'Boa Tarde';
    else greeting = 'Boa Noite';
    greetingEl.textContent = greeting;
  }

  updateTheme(h);
}

/* ============================================
   QUOTES — Smooth Transitions
   ============================================ */
function showQuote(idx, animate = true) {
  const tEl = document.getElementById('quoteText');
  const aEl = document.getElementById('quoteAuthor');
  const cEl = document.getElementById('quoteCat');
  const pf = document.getElementById('quoteProgress');

  if (!tEl || !aEl || !cEl) return;

  const doAnimate = animate && state.quoteTimer !== null;

  if (doAnimate) {
    // Fade out
    tEl.style.opacity = '0';
    tEl.style.transform = 'translateY(16px) scale(0.98)';
    tEl.style.filter = 'blur(8px)';
    aEl.style.opacity = '0';
    cEl.style.opacity = '0';

    setTimeout(() => {
      // Update content
      tEl.textContent = `"${quotes[idx].text}"`;
      aEl.textContent = `— ${quotes[idx].author}`;
      cEl.textContent = quotes[idx].cat;
      const counterEl = document.getElementById('quoteCounter');
      if (counterEl) counterEl.textContent = `${idx + 1} / ${quotes.length}`;

      // Fade in
      tEl.style.transition = 'opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), filter 0.6s';
      tEl.style.opacity = '1';
      tEl.style.transform = 'translateY(0) scale(1)';
      tEl.style.filter = 'blur(0)';
      aEl.style.opacity = '1';
      cEl.style.opacity = '1';
    }, 400);
  } else {
    tEl.textContent = `"${quotes[idx].text}"`;
    aEl.textContent = `— ${quotes[idx].author}`;
    cEl.textContent = quotes[idx].cat;
    const counterEl = document.getElementById('quoteCounter');
    if (counterEl) counterEl.textContent = `${idx + 1} / ${quotes.length}`;
  }

  // Progress bar animation
  if (pf) {
    pf.style.transition = 'none';
    pf.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pf.style.transition = 'width 8s linear';
        pf.style.width = '100%';
      });
    });
  }
}

function nextQuote() {
  state.currentQuote = (state.currentQuote + 1) % quotes.length;
  showQuote(state.currentQuote);
  resetQuoteTimer();
}

function prevQuote() {
  state.currentQuote = (state.currentQuote - 1 + quotes.length) % quotes.length;
  showQuote(state.currentQuote);
  resetQuoteTimer();
}

function resetQuoteTimer() {
  if (state.quoteTimer) clearInterval(state.quoteTimer);
  state.quoteTimer = setInterval(() => nextQuote(), 8000);
}

/* ============================================
   RITUALS — Persistent Checklists
   ============================================ */
function loadRituals() {
  const today = new Date().toDateString();
  const saved = localStorage.getItem('bomdia-rituals-' + today);
  if (saved) {
    state.completedRituals = new Set(JSON.parse(saved));
  }
}

function saveRituals() {
  const today = new Date().toDateString();
  localStorage.setItem('bomdia-rituals-' + today, JSON.stringify([...state.completedRituals]));
}

function toggleRitual(index) {
  const wasCompleted = state.completedRituals.has(index);

  if (!wasCompleted) {
    state.completedRituals.add(index);
    triggerConfetti();
    playSound('check');
  } else {
    state.completedRituals.delete(index);
  }

  saveRituals();
  renderRituals();
}

function renderRituals() {
  const grid = document.getElementById('ritualsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  rituals.forEach((r, i) => {
    const el = document.createElement('div');
    const isDone = state.completedRituals.has(i);
    el.className = `ritual${isDone ? ' ritual--done' : ''}`;
    el.tabIndex = 0;
    el.setAttribute('role', 'checkbox');
    el.setAttribute('aria-checked', isDone);
    el.innerHTML = `
      <div class="ritual-icon">${r.icon}</div>
      <div class="ritual-check">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7L6 10L11 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="ritual-body">
        <span class="ritual-name">${r.name}</span>
        <span class="ritual-desc">${r.desc}</span>
      </div>
      <span class="ritual-num">${String(i + 1).padStart(2, '0')}</span>
    `;
    el.onclick = () => toggleRitual(i);
    el.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleRitual(i);
      }
    };
    grid.appendChild(el);
  });

  const n = state.completedRituals.size;
  const t = rituals.length;
  const rpText = document.getElementById('ritualProgressText');
  const rpFill = document.getElementById('ritualProgressFill');
  if (rpText) rpText.textContent = n === t ? 'Completo!' : `${n} de ${t}`;
  if (rpFill) rpFill.style.width = `${(n / t) * 100}%`;
}

/* ============================================
   BREATHING — Guided Exercise
   ============================================ */
function startBreathing() {
  if (state.breathingActive) return;
  state.breathingActive = true;

  const phaseEl = document.getElementById('breathPhase');
  const circleEl = document.getElementById('breathCircle');
  const counterEl = document.getElementById('breathCounter');

  let phaseIndex = 0;
  let remaining = breathingPhases[0].duration;

  function updatePhase() {
    const phase = breathingPhases[phaseIndex];

    if (phaseEl) phaseEl.textContent = `${phase.icon} ${phase.name}`;
    if (counterEl) counterEl.textContent = remaining;

    if (circleEl) {
      circleEl.style.transform = `scale(${phase.scale})`;
    }

    remaining--;
    if (remaining < 0) {
      phaseIndex = (phaseIndex + 1) % breathingPhases.length;
      remaining = breathingPhases[phaseIndex].duration;
    }
  }

  updatePhase();
  state.breathingTimer = setInterval(updatePhase, 1000);

  document.getElementById('breathStart')?.classList.add('hidden');
  document.getElementById('breathStop')?.classList.remove('hidden');
}

function stopBreathing() {
  state.breathingActive = false;
  if (state.breathingTimer) clearInterval(state.breathingTimer);

  const phaseEl = document.getElementById('breathPhase');
  const circleEl = document.getElementById('breathCircle');
  const counterEl = document.getElementById('breathCounter');

  if (phaseEl) phaseEl.textContent = 'Respiração';
  if (counterEl) counterEl.textContent = '';
  if (circleEl) circleEl.style.transform = 'scale(1)';

  document.getElementById('breathStart')?.classList.remove('hidden');
  document.getElementById('breathStop')?.classList.add('hidden');
}

/* ============================================
   FOCUS — Daily Word
   ============================================ */
function renderFocus() {
  const idx = new Date().getDay();
  const f = dayFocus[idx];

  const dayTag = document.getElementById('focusDayTag');
  const wordEl = document.getElementById('focusWord');
  const descEl = document.getElementById('focusDesc');
  const iconEl = document.getElementById('focusIcon');

  if (dayTag) dayTag.textContent = diasSemana[idx];
  if (wordEl) wordEl.textContent = f.word;
  if (descEl) descEl.textContent = f.desc;
  if (iconEl) iconEl.textContent = f.icon;
}

/* ============================================
   MOOD — Emotional Check-in
   ============================================ */
const moodMessages = {
  happy: "Que maravilha! Que essa energia se espalhe por todo o seu dia! ✨",
  calm: "Perfeito. A calma é sua superpotência hoje. 🌿",
  tired: "Tudo bem. Comece devagar, você encontra seu ritmo. ☕",
  motivated: "Excelente! Canalize essa motivação em ações concretas. 🚀",
  anxious: "Respire fundo. Você está fazendo o melhor que pode. 🌊",
};

function selectMood(mood) {
  state.selectedMood = mood;
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.mood === mood);
  });

  const msgEl = document.getElementById('moodMessage');
  if (msgEl && moodMessages[mood]) {
    msgEl.textContent = moodMessages[mood];
    msgEl.classList.add('visible');
  }

  localStorage.setItem('bomdia-mood-' + new Date().toDateString(), mood);
}

function loadMood() {
  const saved = localStorage.getItem('bomdia-mood-' + new Date().toDateString());
  if (saved && moodMessages[saved]) {
    state.selectedMood = saved;
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.mood === saved);
    });
    const msgEl = document.getElementById('moodMessage');
    if (msgEl) {
      msgEl.textContent = moodMessages[saved];
      msgEl.classList.add('visible');
    }
  }
}

/* ============================================
   PARTICLES — Enhanced Canvas Animation
   ============================================ */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouseX = 0, mouseY = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.radius = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.baseAlpha = this.alpha;
    }

    update() {
      // Mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        this.vx -= (dx / dist) * force * 0.02;
        this.vy -= (dy / dist) * force * 0.02;
      }

      this.x += this.vx;
      this.y += this.vy;

      // Damping
      this.vx *= 0.99;
      this.vy *= 0.99;

      // Wrap around
      if (this.x < -50) this.x = canvas.width + 50;
      if (this.x > canvas.width + 50) this.x = -50;
      if (this.y < -50) this.y = canvas.height + 50;
      if (this.y > canvas.height + 50) this.y = -50;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 20000);
    for (let i = 0; i < Math.min(count, 80); i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  resize();
  init();
  animate();

  // Mouse tracking
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  return () => cancelAnimationFrame(animationId);
}

/* ============================================
   CONFETTI — Premium Celebration
   ============================================ */
function triggerConfetti() {
  const canvas = document.getElementById('confetti');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#c4a35a', '#7b9eb8', '#c4826b', '#8a7db5', '#ffffff', '#d4956b'];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      vx: (Math.random() - 0.5) * 5,
      vy: Math.random() * 4 + 4,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.1 + 0.05,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;
      p.wobble += p.wobbleSpeed;

      const wobbleX = Math.sin(p.wobble) * 2;

      ctx.save();
      ctx.translate(p.x + wobbleX, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 1 - (frame / 180);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frame++;
    if (frame < 180) {
      requestAnimationFrame(animate);
    } else {
      canvas.style.display = 'none';
    }
  }

  canvas.style.display = 'block';
  animate();
}

/* ============================================
   SOUND — Subtle Audio Feedback
   ============================================ */
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playSound(type) {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (type === 'check') {
    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.1); // G5
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.15);
  }
}

/* ============================================
   SCROLL REVEAL — Intersection Observer
   ============================================ */
function initReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================
   SMOOTH SCROLL — Native Enhancement
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================
   DOT NAV — Active Section Indicator
   ============================================ */
function initDotNav() {
  const sections = ['hero', 'quotes', 'breathing', 'rituals', 'focus'];
  const dots = document.querySelectorAll('.dot-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === entry.target.id);
          });
        }
      });
    },
    { threshold: [0.3, 0.6, 0.9] }
  );

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/* ============================================
   KEYBOARD — Accessibility Shortcuts
   ============================================ */
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
        nextQuote();
        break;
      case 'ArrowLeft':
        prevQuote();
        break;
      case ' ':
        e.preventDefault();
        if (state.breathingActive) stopBreathing();
        else startBreathing();
        break;
    }
  });
}

/* ============================================
   INIT — Application Bootstrap
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Load persisted data
  loadRituals();
  loadMood();

  // Initialize clock
  tick();
  setInterval(tick, 1000);

  // Initialize quotes
  showQuote(state.currentQuote, false);
  resetQuoteTimer();

  // Render content
  renderRituals();
  renderFocus();

  // Initialize interactions
  initReveal();
  initSmoothScroll();
  initDotNav();
  initParticles();
  initKeyboard();

  // Event listeners
  document.getElementById('nextBtn')?.addEventListener('click', nextQuote);
  document.getElementById('prevBtn')?.addEventListener('click', prevQuote);
  document.getElementById('breathStart')?.addEventListener('click', startBreathing);
  document.getElementById('breathStop')?.addEventListener('click', stopBreathing);

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => selectMood(btn.dataset.mood));
  });

  // Initial theme
  updateTheme();

  // Mark as initialized
  state.initialized = true;
});
