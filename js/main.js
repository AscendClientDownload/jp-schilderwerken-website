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

const SERVICES = [
  {
    photo: 'Foto: binnenschilderwerk (volgt)',
    photoSrc: 'assets/images/werk-binnen-deuren.jpg',
    title: 'Binnenschilderwerk',
    text: 'Van een enkele kamer tot de hele woning: ik zorg voor een strakke, duurzame afwerking van wanden, plafonds, kozijnen en deuren. Het oppervlak wordt eerst grondig voorbereid, zodat de verf goed hecht en het resultaat jarenlang mooi blijft.',
    icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>',
    bullets: ['Wanden, plafonds, kozijnen en deuren', 'Grondige voorbereiding vooraf', 'Strakke, nette oplevering'],
  },
  {
    photo: 'Foto: buitenschilderwerk (volgt)',
    photoSrc: 'assets/images/werk-buiten-voordeur.jpg',
    title: 'Buitenschilderwerk',
    text: 'Buitenschilderwerk beschermt uw kozijnen, deuren en ander houtwerk tegen weer en wind, en geeft meteen een frisse uitstraling. Met een goede voorbereiding zorg ik voor een verflaag die lang meegaat.',
    icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    bullets: ['Kozijnen, deuren en houtwerk', 'Bescherming tegen weer en wind', 'Duurzame, langhoudende verflaag'],
  },
  {
    photo: 'Foto: houtrotreparatie (volgt)',
    photoSrc: 'assets/images/werk-houtrot.jpg',
    title: 'Houtrotreparaties',
    text: 'Houtrot in kozijnen of ramen breidt zich uit als het niet op tijd wordt aangepakt. Ik herstel of vervang het aangetaste hout vakkundig, zodat uw kozijnen en ramen er weer jaren tegen kunnen en klaar zijn voor een nieuwe verflaag.',
    icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M6 21V9l6-5 6 5v12"/><path d="M10 21v-6h4v6"/></svg>',
    bullets: ['Herstel of vervanging van aangetast hout', 'Kozijnen en ramen weer jaren mee', 'Klaar voor een nieuwe verflaag'],
  },
  {
    photo: 'Foto: lak-/latexspuitwerk (volgt)',
    photoSrc: 'assets/images/werk-spuitwerk-kast.jpg',
    title: 'Lak- en latexspuitwerk',
    text: 'Met professioneel spuitwerk krijgt u een egale, strakke afwerking die met kwast of roller lastiger te bereiken is. Geschikt voor deuren, kozijnen en meubels, met een nette voorbereiding zodat het eindresultaat overal even glad is.',
    icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18"/></svg>',
    bullets: ['Egale, strakke afwerking', 'Geschikt voor deuren, kozijnen en meubels', 'Professioneel spuitwerk'],
  },
  {
    photo: 'Foto: behangwerk (volgt)',
    photoSrc: 'assets/images/werk-behang-mural.jpg',
    title: 'Behangwerkzaamheden',
    text: 'Een goed behangresultaat begint bij de voorbereiding: de ondergrond wordt netjes gladgemaakt voordat er één baan wordt gehangen. Van vlies- tot vinylbehang, ik werk secuur zodat naden en aansluitingen mooi wegvallen.',
    icon: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M3 8h18M8 3v18"/></svg>',
    bullets: ['Vlies- en vinylbehang', 'Nette voorbereiding van de ondergrond', 'Naden en aansluitingen mooi weggewerkt'],
  },
];

function initServiceCarousel() {
  const viewport = document.getElementById('carousel-viewport');
  if (!viewport) return;

  const panels = [
    document.getElementById('carousel-panel-a'),
    document.getElementById('carousel-panel-b'),
  ];
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsWrap = document.getElementById('carousel-dots');

  const SLIDE_MS = 400;
  let currentIndex = 0;
  let activePanel = 0;
  let animating = false;

  function fillPanel(panel, service) {
    const photoEl = panel.querySelector('.service-carousel-photo');
    if (service.photoSrc) {
      photoEl.style.backgroundImage = "url('" + service.photoSrc + "')";
      photoEl.classList.add('has-photo');
      photoEl.textContent = '';
    } else {
      photoEl.style.backgroundImage = '';
      photoEl.classList.remove('has-photo');
      photoEl.textContent = service.photo;
    }
    panel.querySelector('.service-carousel-icon').innerHTML = service.icon;
    panel.querySelector('h3').textContent = service.title;
    panel.querySelector('p').textContent = service.text;
    panel.querySelector('.service-carousel-bullets').innerHTML = service.bullets.map(function (b) {
      return '<li>' + b + '</li>';
    }).join('');
  }

  function renderDots() {
    dotsWrap.innerHTML = SERVICES.map(function (_, i) {
      return '<button class="carousel-dot' + (i === currentIndex ? ' active' : '') + '" data-dot-index="' + i + '" aria-label="Ga naar dienst ' + (i + 1) + '"></button>';
    }).join('');
    dotsWrap.querySelectorAll('.carousel-dot').forEach(function (dot) {
      dot.addEventListener('click', function () {
        const target = Number(dot.dataset.dotIndex);
        if (target !== currentIndex) goTo(target);
      });
    });
  }

  function init() {
    panels.forEach(function (p, i) {
      p.style.transition = 'none';
      p.style.transform = 'translateX(0)';
      p.style.opacity = i === 0 ? '1' : '0';
      p.style.zIndex = i === 0 ? '2' : '1';
    });
    fillPanel(panels[0], SERVICES[0]);
    renderDots();
  }

  function goTo(targetIndex) {
    if (animating || targetIndex === currentIndex) return;
    animating = true;

    const dir = targetIndex > currentIndex ? 1 : -1;
    const outPanel = panels[activePanel];
    const inPanel = panels[1 - activePanel];

    fillPanel(inPanel, SERVICES[targetIndex]);

    inPanel.style.transition = 'none';
    inPanel.style.transform = 'translateX(' + (dir * 100) + '%)';
    inPanel.style.opacity = '1';
    inPanel.style.zIndex = '2';
    outPanel.style.zIndex = '1';

    void inPanel.offsetHeight;

    requestAnimationFrame(function () {
      inPanel.style.transition = 'transform ' + SLIDE_MS + 'ms ease';
      outPanel.style.transition = 'transform ' + SLIDE_MS + 'ms ease';
      inPanel.style.transform = 'translateX(0)';
      outPanel.style.transform = 'translateX(' + (dir * -100) + '%)';
    });

    setTimeout(function () {
      outPanel.style.opacity = '0';
      activePanel = 1 - activePanel;
      currentIndex = targetIndex;
      animating = false;
      renderDots();
    }, SLIDE_MS + 20);
  }

  function step(delta) {
    goTo((currentIndex + delta + SERVICES.length) % SERVICES.length);
  }

  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });

  init();
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

document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  initCookieConsent();
  initNavToggle();
  initServiceCarousel();
  initHeroSlideshow();
});
