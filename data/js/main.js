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

// ===== SCROLL TO TOP BUTTON (safe) =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) scrollTopBtn.classList.add('show');
    else scrollTopBtn.classList.remove('show');
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

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

// ===== SMOOTH SCROLL + HIGHLIGHT =====
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
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== THEME DROPDOWN =====
const dropdownToggle = document.getElementById('themeDropdownToggle');
const dropdownMenu = document.getElementById('themeDropdownMenu');
if (dropdownToggle && dropdownMenu) {
  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }
  });
}

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
if (presetList) {
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
      if (typeof regenerateParticles === 'function') regenerateParticles();
      if (dropdownMenu) dropdownMenu.classList.remove('show');
      localStorage.setItem('themePreset', JSON.stringify(preset));
    });
    presetList.appendChild(btn);
  });
  const savedPreset = localStorage.getItem('themePreset');
  if (savedPreset) {
    try {
      const preset = JSON.parse(savedPreset);
      body.classList.remove('theme-dark', 'theme-light', 'accent-purple', 'accent-pink', 'accent-black', 'accent-gray');
      body.classList.add(`theme-${preset.theme}`, `accent-${preset.accent}`);
      document.querySelectorAll('.preset-item').forEach(btn => {
        if (btn.dataset.theme === preset.theme && btn.dataset.accent === preset.accent) btn.classList.add('active');
      });
    } catch(e) {}
  } else {
    document.querySelector('.preset-item[data-theme="dark"][data-accent="purple"]')?.classList.add('active');
  }
}

// ===== SEASONAL EFFECTS =====
const seasonalSelect = document.getElementById('seasonalSelect');
let seasonalContainer = null;
function getCurrentSeason() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day <= 20)) return 'summer';
  if ((month === 3 && day >= 21) || month === 4 || month === 5 || (month === 6 && day <= 20)) return 'autumn';
  if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day <= 22)) return 'winter';
  if ((month === 9 && day >= 23) || month === 10 || month === 11 || (month === 12 && day <= 20)) return 'spring';
  return 'none';
}
function getCurrentHoliday() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  if (month === 12 && (day === 24 || day === 25)) return 'christmas';
  if ((month === 12 && day === 31) || (month === 1 && day === 1)) return 'newyear';
  if ((month === 3 && day >= 22) || (month === 4 && day <= 25)) return 'easter';
  return null;
}
if (seasonalSelect) {
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
      case 'winter': symbol = '❄️'; className = 'snowflake'; break;
      case 'summer': symbol = '☀️'; className = 'sun-ray'; break;
      case 'autumn': symbol = '🍂'; className = 'leaf'; break;
      case 'spring': symbol = '🌸'; className = 'blossom'; break;
      case 'christmas': symbol = '🎄'; className = 'santa-hat'; break;
      case 'newyear': symbol = '🎉'; className = 'confetti'; break;
      case 'easter': symbol = '🥚'; className = 'easter-egg'; break;
      case 'matrix': className = 'matrix-char'; break;
      default: return;
    }
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = className;
      if (type === 'matrix') el.innerHTML = Math.random() < 0.5 ? '0' : '1';
      else el.innerHTML = symbol;
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDuration = Math.random() * 5 + 5 + 's';
      el.style.animationDelay = Math.random() * 5 + 's';
      el.style.fontSize = Math.random() * 1.5 + 0.5 + 'rem';
      el.style.opacity = Math.random() * 0.7 + 0.3;
      seasonalContainer.appendChild(el);
    }
    document.body.appendChild(seasonalContainer);
  }
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
}

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
    if (isDark) { hue = Math.random() * 40 + 260; saturation = 70; lightness = 60; alpha = 0.3; }
    else { hue = Math.random() * 60 + 200; saturation = 50; lightness = 70; alpha = 0.2; }
    particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    particlesContainer.appendChild(particle);
  }
}
function regenerateParticles() {
  if (particlesContainer) particlesContainer.remove();
  createParticles();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => createParticles());
else createParticles();

// ===== CART MODAL (with absolute image paths) =====
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartModalClose = document.getElementById('cartModalClose');
const cartModalBody = document.getElementById('cartModalBody');
const seeOffersBtn = document.getElementById('seeOffersBtn');

let allProducts = [];
function loadProductsFromPromos() {
  if (window.promos && Array.isArray(window.promos)) {
    allProducts = window.promos.filter(p => p.name && p.name.trim() !== "" && p.link);
  } else {
    allProducts = [];
  }
  updateCartBadge();
}
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = allProducts.length;
}

let currentPage = 1;
const itemsPerPage = 9;

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;' }[m]));
}

function renderCartModal(page = 1) {
  if (!cartModalBody) return;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageProducts = allProducts.slice(start, end);
  
  let html = `<div class="products-grid">`;
  pageProducts.forEach(prod => {
    // Absolute path: /data/assets/
    const imagePath = prod.image_name ? `/data/assets/${prod.image_name}` : '';
    html += `
      <div class="product-card-modal">
        ${imagePath ? `<img src="${imagePath}" alt="${escapeHtml(prod.name)}" onerror="this.src='https://placehold.co/200x120?text=No+Image'">` : `<div style="height:120px; background:#2d2d2d; border-radius:12px; display:flex; align-items:center; justify-content:center;">📦</div>`}
        <h4>${escapeHtml(prod.name)}</h4>
        <a href="${prod.link}" target="_blank" class="buy-btn">Buy →</a>
      </div>
    `;
  });
  html += `</div>`;
  
  if (totalPages > 1) {
    html += `<div class="pagination">`;
    html += `<button class="page-prev" ${page === 1 ? 'disabled' : ''}>◀ Prev</button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-num ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="page-next" ${page === totalPages ? 'disabled' : ''}>Next ▶</button>`;
    html += `</div>`;
  }
  
  html += `<div class="modal-info"><p>These products are sold by third parties</p><p>By buying these products you will help me :)</p></div>`;
  
  cartModalBody.innerHTML = html;
  
  document.querySelector('.page-prev')?.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderCartModal(currentPage); } });
  document.querySelector('.page-next')?.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderCartModal(currentPage); } });
  document.querySelectorAll('.page-num').forEach(btn => {
    btn.addEventListener('click', (e) => { currentPage = parseInt(e.target.dataset.page); renderCartModal(currentPage); });
  });
}

function openCartModal() {
  currentPage = 1;
  renderCartModal(1);
  if (cartModal) cartModal.classList.add('show');
}

if (cartIcon) cartIcon.addEventListener('click', openCartModal);
if (seeOffersBtn) seeOffersBtn.addEventListener('click', openCartModal);
if (cartModalClose) cartModalClose.addEventListener('click', () => { if (cartModal) cartModal.classList.remove('show'); });
if (cartModal) cartModal.addEventListener('click', (e) => { if (e.target === cartModal) cartModal.classList.remove('show'); });

window.addEventListener('scroll', () => {
  const cartIconEl = document.getElementById('cartIcon');
  if (cartIconEl) {
    if (window.scrollY > 300) cartIconEl.classList.add('shift-up');
    else cartIconEl.classList.remove('shift-up');
  }
});

loadProductsFromPromos();

// ===== LUNAENGINE CAROUSEL =====
const carouselContainer = document.querySelector('#tab-lunaengine .carousel-container');
if (carouselContainer) {
  let slideIndex = 0;
  const slides = document.querySelectorAll('#tab-lunaengine .carousel-slide');
  const dots = document.querySelectorAll('#tab-lunaengine .dot');
  function showSlide(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
  }
  const prevBtn = document.querySelector('#tab-lunaengine .carousel-prev');
  const nextBtn = document.querySelector('#tab-lunaengine .carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { slideIndex--; showSlide(slideIndex); });
  if (nextBtn) nextBtn.addEventListener('click', () => { slideIndex++; showSlide(slideIndex); });
  dots.forEach((dot, idx) => dot.addEventListener('click', () => { slideIndex = idx; showSlide(slideIndex); }));
  if (slides.length) showSlide(0);
}