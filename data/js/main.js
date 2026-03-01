// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== TABS =====
document.querySelectorAll('.tab-nav').forEach(tabNav => {
  const btns = tabNav.querySelectorAll('.tab-btn');
  const parentSection = tabNav.closest('section') || tabNav.closest('.card');
  if (!parentSection) return;

  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      const tabId = btn.dataset.tab;
      parentSection.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      parentSection.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = parentSection.querySelector(`#tab-${tabId}`);
      if (content) content.classList.add('active');
    });
  });
});

// ===== TOGGLE DATABASE INFO =====
const toggleBtn = document.getElementById('toggleDatabaseInfo');
const dbInfo = document.getElementById('databaseInfo');
if (toggleBtn && dbInfo) {
  toggleBtn.addEventListener('click', () => {
    const hidden = dbInfo.hidden;
    dbInfo.hidden = !hidden;
    toggleBtn.textContent = hidden ? 'Hide database info' : 'Show database info';
  });
}

// ===== SMOOTH SCROLL + HIGHLIGHT ANIMATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.classList.remove('section-highlight');
      void targetElement.offsetWidth;
      targetElement.classList.add('section-highlight');
      
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== THEME DROPDOWN =====
const dropdownToggle = document.getElementById('themeDropdownToggle');
const dropdownMenu = document.getElementById('themeDropdownMenu');

dropdownToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});

// Theme presets
const presets = [
  { name: 'Dark Purple', theme: 'dark', accent: 'purple' },
  { name: 'Dark Pink', theme: 'dark', accent: 'pink' },
  { name: 'Dark Black', theme: 'dark', accent: 'black' },
  { name: 'Dark Gray', theme: 'dark', accent: 'gray' },
  { name: 'Light Purple', theme: 'light', accent: 'purple' },
  { name: 'Light Pink', theme: 'light', accent: 'pink' },
  { name: 'Light Black', theme: 'light', accent: 'black' },
  { name: 'Light Gray', theme: 'light', accent: 'gray' },
];

const presetList = document.getElementById('presetList');
const body = document.body;

// Generate preset buttons
presets.forEach(preset => {
  const btn = document.createElement('button');
  btn.className = 'preset-item';
  btn.textContent = preset.name;
  btn.dataset.theme = preset.theme;
  btn.dataset.accent = preset.accent;
  
  btn.addEventListener('click', () => {
    body.classList.remove('theme-dark', 'theme-light', 'accent-purple', 'accent-pink', 'accent-black', 'accent-gray');
    body.classList.add(`theme-${preset.theme}`, `accent-${preset.accent}`);
    
    document.querySelectorAll('.preset-item').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    
    regenerateParticles();
    dropdownMenu.classList.remove('show');
    localStorage.setItem('themePreset', JSON.stringify(preset));
  });
  
  presetList.appendChild(btn);
});

// Load saved preset
const savedPreset = localStorage.getItem('themePreset');
if (savedPreset) {
  try {
    const preset = JSON.parse(savedPreset);
    body.classList.remove('theme-dark', 'theme-light', 'accent-purple', 'accent-pink', 'accent-black', 'accent-gray');
    body.classList.add(`theme-${preset.theme}`, `accent-${preset.accent}`);
    document.querySelectorAll('.preset-item').forEach(btn => {
      if (btn.dataset.theme === preset.theme && btn.dataset.accent === preset.accent) {
        btn.classList.add('active');
      }
    });
  } catch (e) {}
} else {
  // Set default active
  document.querySelector('.preset-item[data-theme="dark"][data-accent="purple"]').classList.add('active');
}

// ===== SEASONAL EFFECTS =====
const seasonalSelect = document.getElementById('seasonalSelect');
let seasonalContainer = null;

// Define date ranges for automatic selection (southern hemisphere seasons)
function getCurrentSeason() {
  const today = new Date();
  const month = today.getMonth() + 1; // 1-12
  const day = today.getDate();

  // Summer: Dec 21 - Mar 20
  if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day <= 20)) {
    return 'summer';
  }
  // Autumn: Mar 21 - Jun 20
  if ((month === 3 && day >= 21) || month === 4 || month === 5 || (month === 6 && day <= 20)) {
    return 'autumn';
  }
  // Winter: Jun 21 - Sep 22
  if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day <= 22)) {
    return 'winter';
  }
  // Spring: Sep 23 - Dec 20
  if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day <= 20)) {
    return 'spring';
  }
  return 'none';
}

// Holiday detection
function getCurrentHoliday() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // Christmas: Dec 24-25
  if (month === 12 && (day === 24 || day === 25)) {
    return 'christmas';
  }
  // New Year: Dec 31 - Jan 1
  if ((month === 12 && day === 31) || (month === 1 && day === 1)) {
    return 'newyear';
  }
  // Easter: approximate (March 22 - April 25)
  if ((month === 3 && day >= 22) || (month === 4 && day <= 25)) {
    return 'easter';
  }
  return null;
}

// Set initial select value based on date
let initialSeason = getCurrentHoliday() || getCurrentSeason();
seasonalSelect.value = initialSeason;

function createSeasonalEffect(type) {
  if (seasonalContainer) seasonalContainer.remove();
  if (type === 'none') return;

  seasonalContainer = document.createElement('div');
  seasonalContainer.className = 'seasonal-container';

  const count = 40;
  let symbol, className;

  switch (type) {
    case 'winter':
      symbol = '❄️';
      className = 'snowflake';
      break;
    case 'summer':
      symbol = '☀️';
      className = 'sun-ray';
      break;
    case 'autumn':
      symbol = '🍂';
      className = 'leaf';
      break;
    case 'spring':
      symbol = '🌸';
      className = 'blossom';
      break;
    case 'christmas':
      symbol = '🎄';
      className = 'santa-hat'; // can also mix with snowflakes
      break;
    case 'newyear':
      symbol = '🎉';
      className = 'confetti';
      break;
    case 'easter':
      symbol = '🥚';
      className = 'easter-egg';
      break;
    case 'matrix':
      // For matrix, we'll create a stream of random 0/1 characters
      className = 'matrix-char';
      break;
    default:
      return;
  }

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = className;
    if (type === 'matrix') {
      // Random binary digit
      el.innerHTML = Math.random() < 0.5 ? '0' : '1';
    } else {
      el.innerHTML = symbol;
    }
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = Math.random() * 5 + 5 + 's';
    el.style.animationDelay = Math.random() * 5 + 's';
    el.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
    el.style.opacity = Math.random() * 0.7 + 0.3;
    seasonalContainer.appendChild(el);
  }

  document.body.appendChild(seasonalContainer);
}

// Load saved seasonal preference or use date
const savedSeason = localStorage.getItem('seasonalEffect');
if (savedSeason) {
  seasonalSelect.value = savedSeason;
  createSeasonalEffect(savedSeason);
} else {
  createSeasonalEffect(initialSeason);
}

seasonalSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  createSeasonalEffect(value);
  localStorage.setItem('seasonalEffect', value);
});

// ===== PARTICLES =====
let particlesContainer;

function createParticles() {
  if (particlesContainer) particlesContainer.remove();
  
  particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  const numberOfParticles = 50;
  const isDark = body.classList.contains('theme-dark');
  
  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.left = Math.random() * 100 + '%';
    
    const duration = Math.random() * 10 + 5;
    particle.style.animation = `float ${duration}s infinite linear`;
    
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    let hue, saturation, lightness, alpha;
    if (isDark) {
      hue = Math.random() * 40 + 260;
      saturation = 70;
      lightness = 60;
      alpha = 0.3;
    } else {
      hue = Math.random() * 60 + 200;
      saturation = 50;
      lightness = 70;
      alpha = 0.2;
    }
    particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    
    particlesContainer.appendChild(particle);
  }
}

function regenerateParticles() {
  if (particlesContainer) {
    particlesContainer.remove();
  }
  createParticles();
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
});

// ===== LUNAENGINE CAROUSEL =====
let slideIndex = 0;
const slides = document.querySelectorAll('#tab-lunaengine .carousel-slide');
const dots = document.querySelectorAll('#tab-lunaengine .dot');

function showSlide(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

// Attach event listeners only if carousel exists
const carouselContainer = document.querySelector('#tab-lunaengine .carousel-container');
if (carouselContainer) {
  document.querySelector('#tab-lunaengine .carousel-prev').addEventListener('click', prevSlide);
  document.querySelector('#tab-lunaengine .carousel-next').addEventListener('click', nextSlide);
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => currentSlide(idx));
  });
  // Initialize first slide
  showSlide(0);
}