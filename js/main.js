function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    status.textContent = 'Bezig met versturen...';
    status.className = '';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        status.textContent = 'Bedankt! Uw bericht is verstuurd, we nemen zo snel mogelijk contact op.';
        status.className = 'success';
        form.reset();
      } else {
        status.textContent = 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.';
        status.className = 'error';
      }
    } catch (err) {
      status.textContent = 'Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.';
      status.className = 'error';
    }
  });
}

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

function loadGoogleAnalytics() {
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');
  const stored = localStorage.getItem('cookie-consent');

  if (stored === 'accepted') {
    loadGoogleAnalytics();
  } else if (stored !== 'declined') {
    banner.classList.remove('hidden');
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.add('hidden');
    loadGoogleAnalytics();
  });

  declineBtn.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'declined');
    banner.classList.add('hidden');
  });
}

function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

function initHeroSlideshow() {
  const slideshow = document.getElementById('hero-slideshow');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.hero-slide'));
  const dotsWrap = document.getElementById('hero-slideshow-dots');
  const INTERVAL_MS = 2200;
  let current = slides.findIndex(function (s) { return s.classList.contains('active'); });
  if (current < 0) current = 0;
  let timer = null;

  function renderDots() {
    dotsWrap.innerHTML = slides.map(function (_, i) {
      return '<button class="carousel-dot' + (i === current ? ' active' : '') + '" data-dot-index="' + i + '" aria-label="Ga naar foto ' + (i + 1) + '"></button>';
    }).join('');
    dotsWrap.querySelectorAll('.carousel-dot').forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(Number(dot.dataset.dotIndex));
        restart();
      });
    });
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    renderDots();
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, INTERVAL_MS);
  }

  renderDots();
  restart();

  slideshow.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
  slideshow.addEventListener('mouseleave', restart);
}

function initVideoModal() {
  const modal = document.getElementById('video-modal');
  if (!modal) return;

  const player = document.getElementById('video-modal-player');
  const backdrop = document.getElementById('video-modal-backdrop');
  const closeBtn = document.getElementById('video-modal-close');

  function open(src) {
    player.src = src;
    player.muted = true;
    modal.classList.remove('hidden');
    player.play();
  }

  function close() {
    modal.classList.add('hidden');
    player.pause();
    player.removeAttribute('src');
    player.load();
  }

  document.querySelectorAll('[data-video-src]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      open(trigger.dataset.videoSrc);
    });
  });

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  initCookieConsent();
  initNavToggle();
  initHeroSlideshow();
  initVideoModal();
});
