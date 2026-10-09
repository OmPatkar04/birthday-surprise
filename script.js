/**
 * ============================================================================
 * A LITTLE BIRTHDAY SURPRISE 💗 — JAVASCRIPT
 * Target: 10 October 2026, 00:00:00 IST (UTC+05:30)
 * Age: 25
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CONFIGURATION & EDITABLE MESSAGES
  // Edit birthday details or love messages directly in this section!
  // ==========================================================================
  const BIRTHDAY_CONFIG = {
    // Exact unlock instant: 12:00 AM IST on October 10, 2026 (UTC+05:30)
    targetIsoString: '2026-10-10T00:00:00+05:30',
    targetTimestamp: new Date('2026-10-10T00:00:00+05:30').getTime(),
    
    // Birthday Girl's Age
    age: 25,

    // Gift Box Reasons List
    reasons: [
      {
        tag: 'REASON 1 — A LITTLE REASON ❤️',
        text: '"Because even an ordinary day feels special when I get to talk to you."'
      },
      {
        tag: 'REASON 2 — A LITTLE WISH ✨',
        text: '"I hope this new year of your life gives you a hundred reasons to smile."'
      },
      {
        tag: 'REASON 3 — ONE LAST THING 🥹',
        text: '"And if I get to be one of those reasons, that\'s a bonus for me. Hehe ❤️"'
      }
    ]
  };

  // ==========================================================================
  // 2. STATE MANAGEMENT & DOM ELEMENTS
  // ==========================================================================
  let countdownInterval = null;
  let isDevUnlocked = false;
  let currentReasonIndex = 0;
  let confettiFired = false;

  // DOM Elements - Screens
  const screens = {
    countdown: document.getElementById('screen-countdown'),
    ageReveal: document.getElementById('screen-age-reveal'),
    wish: document.getElementById('screen-wish'),
    letter: document.getElementById('screen-letter'),
    gift: document.getElementById('screen-gift'),
    final: document.getElementById('screen-final')
  };

  // DOM Elements - Countdown
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownMsgEl = document.getElementById('countdownMessage');
  const devUnlockBtn = document.getElementById('devUnlockBtn');

  // DOM Elements - Navigation Buttons
  const btnToWish = document.getElementById('btnToWish');
  const btnToLetter = document.getElementById('btnToLetter');
  const btnOpenEnvelope = document.getElementById('btnOpenEnvelope');
  const interactiveEnvelope = document.getElementById('interactiveEnvelope');
  const envelopeContainer = document.getElementById('envelopeContainer');
  const letterSheet = document.getElementById('letterSheet');
  const btnToGift = document.getElementById('btnToGift');

  // DOM Elements - Gift Box
  const interactiveGiftBox = document.getElementById('interactiveGiftBox');
  const btnOpenGift = document.getElementById('btnOpenGift');
  const giftBoxStage = document.getElementById('giftBoxStage');
  const giftControls = document.getElementById('giftControls');
  const btnNextReason = document.getElementById('btnNextReason');
  const btnToFinal = document.getElementById('btnToFinal');
  const reasonCard1 = document.getElementById('reasonCard1');
  const reasonCard2 = document.getElementById('reasonCard2');
  const reasonCard3 = document.getElementById('reasonCard3');

  // DOM Elements - Final
  const btnReplay = document.getElementById('btnReplay');
  const srStatus = document.getElementById('srStatus');

  // ==========================================================================
  // 3. SCREEN NAVIGATION HELPER
  // ==========================================================================
  function showScreen(screenKey) {
    Object.keys(screens).forEach((key) => {
      if (screens[key]) {
        screens[key].classList.remove('active');
      }
    });

    const targetScreen = screens[screenKey];
    if (targetScreen) {
      targetScreen.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Announce for accessibility
      if (srStatus) {
        srStatus.textContent = `Switched to ${screenKey} view.`;
      }
    }
  }

  // ==========================================================================
  // 4. COUNTDOWN ENGINE
  // ==========================================================================
  function updateCountdown() {
    const now = Date.now();
    const distance = BIRTHDAY_CONFIG.targetTimestamp - now;

    // Check if birthday has arrived (or dev override active)
    if (distance <= 0 || isDevUnlocked) {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      triggerBirthdayUnlock();
      return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  function startCountdown() {
    // Initial check
    const now = Date.now();
    const urlParams = new URLSearchParams(window.location.search);
    const previewParam = urlParams.get('preview');

    if (previewParam === 'birthday' || urlParams.get('dev') === '1') {
      isDevUnlocked = true;
    }

    if (now >= BIRTHDAY_CONFIG.targetTimestamp || isDevUnlocked) {
      triggerBirthdayUnlock();
    } else {
      showScreen('countdown');
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  }

  // ==========================================================================
  // 5. BIRTHDAY UNLOCK & AGE REVEAL
  // ==========================================================================
  function triggerBirthdayUnlock() {
    showScreen('ageReveal');
    if (!confettiFired) {
      confettiFired = true;
      burstConfetti();
    }
  }

  // ==========================================================================
  // 6. INTERACTIVE LOVE LETTER
  // ==========================================================================
  function openLetter() {
    if (interactiveEnvelope && !interactiveEnvelope.classList.contains('open')) {
      interactiveEnvelope.classList.add('open');
      
      setTimeout(() => {
        if (letterSheet) {
          letterSheet.style.display = 'block';
          letterSheet.setAttribute('aria-hidden', 'false');
        }
        if (envelopeContainer) {
          envelopeContainer.style.display = 'none';
        }
        window.scrollTo({ top: letterSheet.offsetTop - 40, behavior: 'smooth' });
        burstHearts(window.innerWidth / 2, window.innerHeight / 2);
      }, 700);
    }
  }

  // ==========================================================================
  // 7. INTERACTIVE GIFT BOX & REASONS REVEAL
  // ==========================================================================
  function openGiftBox() {
    if (interactiveGiftBox && !interactiveGiftBox.classList.contains('opened')) {
      interactiveGiftBox.classList.add('opened');
      
      setTimeout(() => {
        if (giftBoxStage) giftBoxStage.style.display = 'none';
        if (giftControls) giftControls.style.display = 'flex';
        
        currentReasonIndex = 0;
        showReasonCard(0);
        burstHearts(window.innerWidth / 2, window.innerHeight / 2);
      }, 600);
    }
  }

  function showReasonCard(index) {
    if (index === 0) {
      if (reasonCard1) reasonCard1.classList.remove('hidden-reason');
      if (btnNextReason) {
        btnNextReason.innerHTML = '<span>Read Next Little Note (1/3)</span> <span class="btn-icon">✨</span>';
      }
    } else if (index === 1) {
      if (reasonCard2) {
        reasonCard2.classList.remove('hidden-reason');
        reasonCard2.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (btnNextReason) {
        btnNextReason.innerHTML = '<span>Read Final Note (2/3)</span> <span class="btn-icon">💌</span>';
      }
    } else if (index === 2) {
      if (reasonCard3) {
        reasonCard3.classList.remove('hidden-reason');
        reasonCard3.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      // Reveal the button to Screen 6
      if (btnNextReason) btnNextReason.style.display = 'none';
      if (btnToFinal) btnToFinal.style.display = 'inline-flex';
      burstConfetti();
    }
  }

  function nextReason() {
    currentReasonIndex++;
    if (currentReasonIndex < 3) {
      showReasonCard(currentReasonIndex);
    }
  }

  // ==========================================================================
  // 8. CANVAS PARTICLES & CONFETTI (LIGHTWEIGHT & SMOOTH)
  // ==========================================================================
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  // Floating background hearts and sparkles
  function createAmbientParticle() {
    const isHeart = Math.random() > 0.4;
    return {
      x: Math.random() * width,
      y: height + 20,
      size: isHeart ? Math.random() * 14 + 10 : Math.random() * 5 + 3,
      speedY: Math.random() * 0.9 + 0.4,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.45 + 0.2,
      isHeart: isHeart,
      color: isHeart
        ? ['#ff8fa3', '#ffa8ba', '#f783ac', '#e5dbff'][Math.floor(Math.random() * 4)]
        : '#ffd43b',
      wobble: Math.random() * Math.PI * 2
    };
  }

  function initAmbientParticles() {
    if (!canvas) return;
    particles = [];
    const count = window.innerWidth < 600 ? 16 : 28;
    for (let i = 0; i < count; i++) {
      const p = createAmbientParticle();
      p.y = Math.random() * height; // Distribute on start
      particles.push(p);
    }
  }

  // Burst confetti for milestone reveals
  let activeConfetti = [];
  function burstConfetti() {
    const colors = ['#ff6b95', '#f783ac', '#ffa8ba', '#ffd43b', '#7048e8', '#ffffff'];
    const count = 50;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const velocity = Math.random() * 7 + 4;
      activeConfetti.push({
        x: width / 2,
        y: height * 0.4,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        life: 1
      });
    }
  }

  function burstHearts(originX, originY) {
    const colors = ['#ff6b95', '#ff8fa3', '#f783ac'];
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 5 + 2;
      activeConfetti.push({
        x: originX || width / 2,
        y: originY || height / 2,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 1.5,
        size: Math.random() * 12 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotSpeed: 0,
        isHeart: true,
        opacity: 1,
        life: 1
      });
    }
  }

  function drawHeartShape(context, x, y, size, color, opacity) {
    context.save();
    context.globalAlpha = opacity;
    context.fillStyle = color;
    context.translate(x, y);
    context.beginPath();
    const topCurveHeight = size * 0.3;
    context.moveTo(0, topCurveHeight);
    // top left curve
    context.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    // bottom left curve
    context.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.15);
    // bottom right curve
    context.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    // top right curve
    context.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    context.closePath();
    context.fill();
    context.restore();
  }

  function animateCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Update & draw ambient particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y -= p.speedY;
      p.wobble += 0.03;
      p.x += Math.sin(p.wobble) * 0.5 + p.speedX;

      if (p.y < -30) {
        particles[i] = createAmbientParticle();
      }

      if (p.isHeart) {
        drawHeartShape(ctx, p.x, p.y, p.size, p.color, p.opacity);
      } else {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Update & draw active confetti
    for (let i = activeConfetti.length - 1; i >= 0; i--) {
      const c = activeConfetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.16; // gravity
      c.vx *= 0.98;
      c.rotation += c.rotSpeed;
      c.life -= 0.012;
      c.opacity = Math.max(0, c.life);

      if (c.life <= 0) {
        activeConfetti.splice(i, 1);
        continue;
      }

      if (c.isHeart) {
        drawHeartShape(ctx, c.x, c.y, c.size, c.color, c.opacity);
      } else {
        ctx.save();
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        ctx.restore();
      }
    }

    requestAnimationFrame(animateCanvas);
  }

  // ==========================================================================
  // 9. EVENT LISTENERS & INITIALIZATION
  // ==========================================================================
  function setupEventListeners() {
    // Dev Preview Button
    if (devUnlockBtn) {
      devUnlockBtn.addEventListener('click', () => {
        isDevUnlocked = true;
        triggerBirthdayUnlock();
      });
    }

    // Screen 2 -> Screen 3 (Age Reveal to Wish)
    if (btnToWish) {
      btnToWish.addEventListener('click', () => {
        showScreen('wish');
      });
    }

    // Screen 3 -> Screen 4 (Wish to Letter)
    if (btnToLetter) {
      btnToLetter.addEventListener('click', () => {
        showScreen('letter');
      });
    }

    // Envelope Interactivity
    if (interactiveEnvelope) {
      interactiveEnvelope.addEventListener('click', openLetter);
      interactiveEnvelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLetter();
        }
      });
    }
    if (btnOpenEnvelope) {
      btnOpenEnvelope.addEventListener('click', openLetter);
    }

    // Screen 4 -> Screen 5 (Letter to Gift)
    if (btnToGift) {
      btnToGift.addEventListener('click', () => {
        showScreen('gift');
      });
    }

    // Gift Box Interactivity
    if (interactiveGiftBox) {
      interactiveGiftBox.addEventListener('click', openGiftBox);
      interactiveGiftBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGiftBox();
        }
      });
    }
    if (btnOpenGift) {
      btnOpenGift.addEventListener('click', openGiftBox);
    }

    // Reasons Sequencer
    if (btnNextReason) {
      btnNextReason.addEventListener('click', nextReason);
    }

    // Screen 5 -> Screen 6 (Gift to Final)
    if (btnToFinal) {
      btnToFinal.addEventListener('click', () => {
        showScreen('final');
        burstConfetti();
      });
    }

    // Replay Journey (Screen 6 -> Screen 2)
    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        // Reset states
        currentReasonIndex = 0;
        if (reasonCard1) reasonCard1.classList.remove('hidden-reason');
        if (reasonCard2) reasonCard2.classList.add('hidden-reason');
        if (reasonCard3) reasonCard3.classList.add('hidden-reason');
        if (btnNextReason) {
          btnNextReason.style.display = 'inline-flex';
          btnNextReason.innerHTML = '<span>Read Next Little Note (1/3)</span> <span class="btn-icon">✨</span>';
        }
        if (btnToFinal) btnToFinal.style.display = 'none';

        // Go back to age reveal
        showScreen('ageReveal');
        burstConfetti();
      });
    }

    // Window resize for canvas
    window.addEventListener('resize', () => {
      resizeCanvas();
    });
  }

  // ==========================================================================
  // 10. DOM CONTENT LOADED ENTRY POINT
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    initAmbientParticles();
    animateCanvas();
    setupEventListeners();
    startCountdown();
  });

})();
