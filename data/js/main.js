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

// ===== SITE SKINS =====
const skinSelect = document.getElementById('skinSelect');
const skinClasses = ['skin-default', 'skin-cyberpunk', 'skin-discord', 'skin-solo-leveling', 'skin-xbox-360', 'skin-windows-xp'];
function applySkin(skin, persist = true) {
  const selected = ['default', 'cyberpunk', 'discord', 'solo-leveling', 'xbox-360', 'windows-xp'].includes(skin) ? skin : 'default';
  document.body.classList.remove(...skinClasses);
  document.body.classList.add(`skin-${selected}`);
  if (skinSelect) skinSelect.value = selected;
  if (persist) localStorage.setItem('siteSkin', selected);
}
applySkin(localStorage.getItem('siteSkin') || 'default', false);
if (skinSelect) skinSelect.addEventListener('change', () => {
  applySkin(skinSelect.value);
});
const paletteDefinitions = {
  default: [
    { key:'a', name:'Amethyst', swatch:'#8b5cf6' }, { key:'b', name:'Rose', swatch:'#ec4899' },
    { key:'c', name:'Graphite', swatch:'#6b7280' }, { key:'d', name:'Lagoon', swatch:'#14b8a6' }
  ],
  cyberpunk: [
    { key:'a', name:'Neon Cyan', swatch:'#00f0ff' }, { key:'b', name:'Hotline Red', swatch:'#ff2d75' },
    { key:'c', name:'Acid Chrome', swatch:'#c7ff3d' }, { key:'d', name:'Afterlife Violet', swatch:'#bd66ff' }
  ],
  discord: [
    { key:'a', name:'Blurple', swatch:'#5865f2' }, { key:'b', name:'Mint', swatch:'#3ba55d' },
    { key:'c', name:'Coral', swatch:'#ed5e91' }, { key:'d', name:'Slate', swatch:'#747f8d' }
  ],
  'solo-leveling': [
    { key:'a', name:'Shadow Monarch', swatch:'#6678ff' }, { key:'b', name:'Ruler’s Light', swatch:'#59c8ff' },
    { key:'c', name:'Blood-red Gate', swatch:'#e34d78' }, { key:'d', name:'Golden Rank', swatch:'#e3b34b' }
  ],
  'xbox-360': [
    { key:'a', name:'Xbox Live Green', swatch:'#8bc53f' }, { key:'b', name:'Blade Blue', swatch:'#3bb5d8' },
    { key:'c', name:'Halo Gold', swatch:'#d8ae42' }, { key:'d', name:'Crimson Ring', swatch:'#cb4250' }
  ],
  'windows-xp': [
    { key:'a', name:'Luna Blue', swatch:'#316ac5' }, { key:'b', name:'Olive Green', swatch:'#6f7c36' },
    { key:'c', name:'Silver', swatch:'#74899e' }, { key:'d', name:'Royale Blue', swatch:'#2459a6' }
  ]
};
const skinDefaults = { default:{mode:'dark',key:'a'}, cyberpunk:{mode:'dark',key:'a'}, discord:{mode:'dark',key:'a'}, 'solo-leveling':{mode:'dark',key:'a'}, 'xbox-360':{mode:'dark',key:'a'}, 'windows-xp':{mode:'light',key:'a'} };
let paletteSelections = {};
try { paletteSelections = JSON.parse(localStorage.getItem('skinPalettes') || '{}'); } catch (_) { paletteSelections = {}; }
if (!localStorage.getItem('skinPalettes')) {
  try {
    const old = JSON.parse(localStorage.getItem('themePreset') || 'null');
    if (old && ['dark','light'].includes(old.theme)) {
      const legacyKeys = {purple:'a',pink:'b',black:'c',gray:'d'};
      skinDefaults.default = {mode:old.theme,key:legacyKeys[old.accent] || 'a'};
    }
  } catch (_) {}
}
const body = document.body;
const darkPresetList = document.getElementById('darkPresetList');
const lightPresetList = document.getElementById('lightPresetList');
const paletteClasses = ['palette-a','palette-b','palette-c','palette-d'];
function selectPalette(skin, mode, key, persist = true) {
  const definitions = paletteDefinitions[skin] || paletteDefinitions.default;
  const chosen = definitions.find(item => item.key === key) || definitions[0];
  body.classList.remove('theme-dark','theme-light',...paletteClasses,'accent-purple','accent-pink','accent-black','accent-gray');
  body.classList.add(`theme-${mode}`,`palette-${chosen.key}`);
  document.querySelectorAll('.preset-item').forEach(button => button.classList.toggle('active', button.dataset.skin === skin && button.dataset.mode === mode && button.dataset.palette === chosen.key));
  if (persist) {
    paletteSelections[skin] = {mode,key:chosen.key};
    localStorage.setItem('skinPalettes', JSON.stringify(paletteSelections));
    localStorage.setItem('themePreset', JSON.stringify({skin,theme:mode,palette:chosen.key}));
  }
  if (persist && typeof regenerateParticles === 'function') regenerateParticles();
}
function renderPaletteOptions() {
  if (!darkPresetList || !lightPresetList) return;
  const skin = skinSelect?.value || 'default';
  const definitions = paletteDefinitions[skin] || paletteDefinitions.default;
  [[darkPresetList,'dark'],[lightPresetList,'light']].forEach(([list,mode]) => {
    list.replaceChildren();
    definitions.forEach(palette => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'preset-item';
      button.dataset.skin = skin; button.dataset.mode = mode; button.dataset.palette = palette.key;
      button.style.setProperty('--palette-swatch', palette.swatch);
      button.innerHTML = `<span class="palette-swatch" aria-hidden="true"></span><span>${palette.name}</span>`;
      button.setAttribute('aria-label', `${mode === 'dark' ? 'Dark' : 'Light'} ${palette.name} palette`);
      button.addEventListener('click', () => { selectPalette(skin, mode, palette.key); if (dropdownMenu) dropdownMenu.classList.remove('show'); });
      list.appendChild(button);
    });
  });
}
renderPaletteOptions();
const initialSkin = skinSelect?.value || 'default';
const initialPalette = paletteSelections[initialSkin] || skinDefaults[initialSkin] || skinDefaults.default;
selectPalette(initialSkin, initialPalette.mode || 'dark', initialPalette.key || 'a', false);
if (skinSelect) skinSelect.addEventListener('change', () => {
  renderPaletteOptions();
  const choice = paletteSelections[skinSelect.value] || skinDefaults[skinSelect.value] || skinDefaults.default;
  selectPalette(skinSelect.value, choice.mode, choice.key, false);
  if (typeof regenerateParticles === 'function') regenerateParticles();
  if (dropdownMenu) dropdownMenu.classList.remove('show');
});
const xpClock = document.getElementById('xpClock');
function updateXPClock() {
  if (!xpClock) return;
  xpClock.textContent = new Intl.DateTimeFormat(undefined, {hour:'numeric', minute:'2-digit'}).format(new Date());
}
updateXPClock();
if (xpClock) setInterval(updateXPClock, 30000);
// ===== SETUP PHOTO CAROUSEL =====
(() => {
  const carousel = document.getElementById('setupCarousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.setup-carousel-slide')];
  const dots = [...carousel.querySelectorAll('.setup-carousel-dots button')];
  const count = document.getElementById('setupSlideCount');
  let current = 0;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; slide.classList.toggle('active', i === current); });
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === current); if (i === current) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
    if (count) count.textContent = `${String(current + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  };
  carousel.querySelector('.setup-carousel-prev')?.addEventListener('click', () => show(current - 1));
  carousel.querySelector('.setup-carousel-next')?.addEventListener('click', () => show(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.go))));
  carousel.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(current - 1); if (e.key === 'ArrowRight') show(current + 1); });
})();
// ===== AUTOMATIC HOLIDAY EFFECTS (NO USER SELECTOR) =====
let seasonalContainer = null;
function getEasterDate(year) {
  // Gregorian computus: Easter Sunday, used for the local calendar year.
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}
function getCurrentHoliday() {
  const now = new Date(), month = now.getMonth(), day = now.getDate();
  if (month === 9 && day === 31) return 'halloween';
  if (month === 11 && (day === 24 || day === 25)) return 'christmas';
  if ((month === 11 && day === 31) || (month === 0 && day === 1)) return 'newyear';
  const easter = getEasterDate(now.getFullYear());
  if (now.toDateString() === easter.toDateString()) return 'easter';
  return null;
}
function createHolidayEffect(type) {
  seasonalContainer?.remove();
  seasonalContainer = null;
  if (!type) return;
  seasonalContainer = document.createElement('div');
  seasonalContainer.className = `seasonal-container holiday-${type}`;
  const effect = { halloween: ['☾','🦇','✦'], christmas: ['❄','✧','🎄'], newyear: ['✦','✧','✺'], easter: ['✿','🥚','✧'] }[type];
  if (!effect) return;
  for (let i = 0; i < 24; i++) {
    const item = document.createElement('span');
    item.className = 'holiday-particle';
    item.textContent = effect[i % effect.length];
    item.style.left = `${Math.random() * 100}%`;
    item.style.animationDuration = `${7 + Math.random() * 9}s`;
    item.style.animationDelay = `${Math.random() * 7}s`;
    item.style.setProperty('--drift', `${Math.round((Math.random() - .5) * 100)}px`);
    seasonalContainer.appendChild(item);
  }
  document.body.appendChild(seasonalContainer);
}
createHolidayEffect(getCurrentHoliday());

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
    const computedStyle = getComputedStyle(body);
    const particleColor = computedStyle.getPropertyValue(i % 2 ? '--primary-light' : '--accent').trim();
    particle.style.backgroundColor = particleColor || (isDark ? '#9d4edd' : '#64dfdf');
    particle.style.opacity = isDark ? '0.34' : '0.18';
    particlesContainer.appendChild(particle);
  }
}
function regenerateParticles() {
  if (particlesContainer) particlesContainer.remove();
  createParticles();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => createParticles());
else createParticles();

// ===== CART MODAL =====
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
    const imagePath = prod.image_name ? `/data/assets/products/${prod.image_name}` : '';
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

// ===== LUNAENGINE CAROUSEL (with Plyr for video slide) =====
const carouselContainer = document.querySelector('#tab-lunaengine .carousel-container');
if (carouselContainer) {
  let slideIndex = 0;
  const slides = document.querySelectorAll('#tab-lunaengine .carousel-slide');
  const dots = document.querySelectorAll('#tab-lunaengine .dot');
  let plyrInstance = null;

  function showSlide(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');

    const activeSlide = slides[slideIndex];
    const videoContainer = activeSlide.querySelector('#player3');
    if (videoContainer && typeof Plyr !== 'undefined') {
      if (plyrInstance) {
        plyrInstance.destroy();
        plyrInstance = null;
      }
      plyrInstance = new Plyr(videoContainer, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'duration',
          'mute',
          'volume',
          'captions',
          'settings',
          'pip',
          'fullscreen'
        ]
      });
      console.log('Plyr HTML5 player initialized for carousel slide');
    } else {
      if (plyrInstance) {
        plyrInstance.destroy();
        plyrInstance = null;
      }
    }
  }

  const prevBtn = document.querySelector('#tab-lunaengine .carousel-prev');
  const nextBtn = document.querySelector('#tab-lunaengine .carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { slideIndex--; showSlide(slideIndex); });
  if (nextBtn) nextBtn.addEventListener('click', () => { slideIndex++; showSlide(slideIndex); });
  dots.forEach((dot, idx) => dot.addEventListener('click', () => { slideIndex = idx; showSlide(slideIndex); }));
  if (slides.length) showSlide(0);
}

// ===== GITHUB INTEGRATION =====
const GITHUB_USER = 'MrJuaumBR';

const profileContainer = document.getElementById('github-profile');
const reposContainer = document.getElementById('github-repos');
const loadingEl = document.getElementById('github-loading');
const perPageSelect = document.getElementById('perPageSelect');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

let allRepos = [];
let currentProjectPage = 1;
let perPage = parseInt(perPageSelect?.value || 10);

function getLanguageColor(lang) {
    const colors = {
        JavaScript: '#f1e05a',
        Python: '#3572A5',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Luau: '#00a2ff',
        Lua: '#000080',
    };
    return colors[lang] || '#cccccc';
}

function renderRepos() {
    if (!allRepos.length) {
        reposContainer.innerHTML = '<p>No public repositories found.</p>';
        return;
    }
    const useLargeCards = perPage <= 10;
    reposContainer.classList.toggle('large-cards', useLargeCards);
    const start = (currentProjectPage - 1) * perPage;
    const end = start + perPage;
    const pageRepos = allRepos.slice(start, end);
    if (pageRepos.length === 0 && currentProjectPage > 1) {
        const totalPages = Math.ceil(allRepos.length / perPage);
        currentProjectPage = totalPages;
        renderRepos();
        return;
    }
    reposContainer.innerHTML = pageRepos.map((repo, index) => {
        const delay = index * 0.05;
        return `
            <div class="repo-card" style="animation-delay: ${delay}s;">
                <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                <p>${repo.description || 'No description'}</p>
                <div class="repo-stats">
                    ${repo.language ? `<span><i class="fas fa-circle" style="color:${getLanguageColor(repo.language)}"></i> ${repo.language}</span>` : ''}
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-fork"></i> ${repo.forks_count}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            </div>
        `;
    }).join('');
    updatePagination();

}

function updatePagination() {
    const totalPages = Math.ceil(allRepos.length / perPage) || 1;
    pageInfo.textContent = `${currentProjectPage} / ${totalPages}`;
    prevBtn.disabled = currentProjectPage === 1;
    nextBtn.disabled = currentProjectPage === totalPages;
}

function goToPage(page) {
    const totalPages = Math.ceil(allRepos.length / perPage) || 1;
    if (page < 1 || page > totalPages) return;
    currentProjectPage = page;
    renderRepos();
}

function setPerPage(value) {
    perPage = parseInt(value);
    currentProjectPage = 1;
    renderRepos();
}

if (profileContainer && reposContainer) {
    Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USER}`),
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
    ])
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(([profile, repos]) => {
        if (loadingEl) loadingEl.style.display = 'none';
        allRepos = repos;
        profileContainer.innerHTML = `
            <img class="github-avatar" src="${profile.avatar_url}" alt="${profile.login}">
            <div class="github-info">
                <h3>${profile.name || profile.login}</h3>
                <p>${profile.bio || ''}</p>
                <p>
                    <i class="fas fa-users"></i> ${profile.followers} followers ·
                    <i class="fas fa-user-plus"></i> ${profile.following} following ·
                    <i class="fas fa-code"></i> ${profile.public_repos} repos
                </p>
                <a href="${profile.html_url}" target="_blank" class="btn-outline" style="margin:0;">View profile →</a>
            </div>
        `;
        const faviconLink = document.querySelector("link[rel='icon']");
        if (faviconLink) faviconLink.href = profile.avatar_url;
        const appleIcon = document.querySelector("link[rel='apple-touch-icon']");
        if (appleIcon) {appleIcon.href = profile.avatar_url;}
        renderRepos();
        perPageSelect.addEventListener('change', (e) => { setPerPage(e.target.value); });
        prevBtn.addEventListener('click', () => { if (currentProjectPage > 1) goToPage(currentProjectPage - 1); });
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(allRepos.length / perPage);
            if (currentProjectPage < totalPages) goToPage(currentProjectPage + 1);
        });
    })
    .catch(err => {
        if (loadingEl) loadingEl.textContent = 'Failed to load projects. Please try again later.';
        console.error('GitHub API error:', err);
    });
}

// ===== RENDER GAMES =====
function renderGames() {
    const container = document.getElementById('gamesContainer');
    if (!container) return;
    if (!window.games || window.games.length === 0) {
        container.innerHTML = '<p>No games added yet.</p>';
        return;
    }

    const platformIcons = {
        'PC': 'fa-solid fa-desktop',
        'PlayStation': 'fa-brands fa-playstation',
        'Xbox': 'fa-brands fa-xbox',
        'Nintendo': 'fa-brands fa-nintendo-switch',
        'Mobile': 'fa-solid fa-mobile-screen-button',
        'VR': 'fa-vr',
        'Mac': 'fa-mac',
        'Linux': 'fa-linux',
    };

    const colorThemes = ['blue', 'orange', 'green', 'pink', 'purple', 'yellow'];
    const genreIcons = {
        'Action RPG': 'fa-solid fa-sword',
        'Racing': 'fa-solid fa-car',
        'Sandbox': 'fa-solid fa-cubes',
        'Action Adventure': 'fa-solid fa-hat-wizard',
        'Fighting': 'fa-solid fa-hand-fist',
        'Open World': 'fa-solid fa-earth-americas',
        'Arcade Racing': 'fa-solid fa-flag-checkered',
        'Survival': 'fa-solid fa-heart-pulse',
        'Simulation': 'fa-solid fa-microchip',
        'Survival Horror': 'fa-solid fa-skull',
        'Puzzle': 'fa-puzzle',
        'RPG': 'fa-rpg',
        'Action': 'fa-action',
    };

    container.innerHTML = window.games.map((game, index) => {
        const themeColor = colorThemes[index % colorThemes.length];
        const genreIcon = genreIcons[game.genre] || 'fa-solid fa-gamepad';
        const platformsHtml = (game.platforms || []).map(plat => {
            const iconClass = platformIcons[plat] || 'fa-solid fa-gamepad';
            return `<i class="${iconClass}" title="${plat}"></i>`;
        }).join('');

        return `
            <div class="game-card game-card--${themeColor}">
                <div class="game-cover">
                    <img src="/data/assets/games/${game.image}" alt="${game.name}" loading="lazy" onerror="this.src='https://placehold.co/400x400?text=${encodeURIComponent(game.name)}'">
                </div>
                
                <div class="game-overlay"></div>
                
                <div class="game-genre">
                    <i class="${genreIcon}"></i> ${game.genre || 'Game'}
                </div>
                
                <button type="button" class="game-details-toggle" aria-expanded="false" aria-label="Toggle details for ${game.name}"><i class="fas fa-circle-info" aria-hidden="true"></i></button>
                <div class="game-main-info">
                    <div class="game-main-info-inner">
                        <div class="game-platforms">${platformsHtml}</div>
                        <h4>${game.name}</h4>
                        <div class="game-subtitle">${game.developer || '?'}</div>
                    </div>
                </div>
                
                <div class="game-detail-panel">
                    <div class="game-detail-inner">
                        <div class="game-title">${game.name}</div>
                        <div class="game-description">${game.description || 'No description available.'}</div>
                        <div class="game-meta">
                            <span><i class="fa-regular fa-building"></i> ${game.developer || '?'}</span>
                            <span><i class="fa-regular fa-tag"></i> ${game.publisher || '?'}</span>
                            <span><i class="fa-regular fa-calendar"></i> ${game.releaseDate || 'TBD'}</span>
                        </div>
                        <a href="${game.link}" target="_blank" rel="noopener noreferrer" class="btn-outline game-view-btn">Play Now <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    if (!container.dataset.detailsBound) {
        container.addEventListener('click', event => {
            const toggle = event.target.closest('.game-details-toggle');
            if (!toggle || !container.contains(toggle)) return;
            const card = toggle.closest('.game-card');
            const opening = !card.classList.contains('is-open');
            container.querySelectorAll('.game-card.is-open').forEach(openCard => {
                openCard.classList.remove('is-open');
                const openToggle = openCard.querySelector('.game-details-toggle');
                if (openToggle) openToggle.setAttribute('aria-expanded', 'false');
            });
            if (opening) {
                card.classList.remove('is-dismissed');
                card.classList.add('is-open');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                card.classList.add('is-dismissed');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        container.addEventListener('pointerout', event => {
            const card = event.target.closest('.game-card.is-dismissed');
            if (card && !card.contains(event.relatedTarget)) card.classList.remove('is-dismissed');
        });
        container.addEventListener('keydown', event => {
            if (event.key !== 'Escape') return;
            const card = event.target.closest('.game-card.is-open');
            if (!card) return;
            card.classList.remove('is-open');
            card.classList.add('is-dismissed');
            const toggle = card.querySelector('.game-details-toggle');
            if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
        });
        container.dataset.detailsBound = 'true';
    }
}

function renderArtists() {
    const container = document.getElementById('artistsCarousel');
    if (!container) return;
    if (!window.artists || window.artists.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No artists added yet.</p>';
        return;
    }

    const renderArtistCard = (artist) => `
        <a href="${artist.youtube}" target="_blank" class="artist-card" title="${artist.name}">
            <img src="/data/assets/misc/${artist.image}" alt="${artist.name}" loading="lazy" onerror="this.src='https://placehold.co/64x64?text=${encodeURIComponent(artist.name.charAt(0))}'">
            <span class="artist-name">${artist.name}</span>
            <span class="artist-badge"><i class="fab fa-youtube"></i> YouTube</span>
        </a>
    `;

    const firstSet = window.artists.map(renderArtistCard).join('');
    const secondSet = window.artists.map(renderArtistCard).join('');
    container.innerHTML = `<div class="artist-carousel-group">${firstSet}</div><div class="artist-carousel-group" aria-hidden="true">${secondSet}</div>`;
    container.querySelectorAll('.artist-carousel-group[aria-hidden="true"] a').forEach(link => { link.tabIndex = -1; });
    const syncArtistCycle = () => {
        const firstGroup = container.querySelector('.artist-carousel-group');
        if (!firstGroup) return;
        const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
        const distance = firstGroup.getBoundingClientRect().width + gap;
        container.style.setProperty('--artists-cycle', `-${distance}px`);
    };
    requestAnimationFrame(syncArtistCycle);
    if (!container.dataset.cycleBound) {
        window.addEventListener('resize', syncArtistCycle, {passive:true});
        container.dataset.cycleBound = 'true';
    }
}


// ===== INTERESTS TOGGLE (games only) =====
const interestsToggle = document.getElementById('interestsToggle');
const interestsContent = document.getElementById('interestsContent');

if (interestsToggle && interestsContent) {
    interestsContent.classList.remove('open');
    interestsToggle.classList.remove('active');

    interestsToggle.addEventListener('click', () => {
        const isOpen = interestsContent.classList.toggle('open');
        interestsToggle.classList.toggle('active');
        
        const icon = interestsToggle.querySelector('.toggle-icon');
        if (icon) {
            icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });
}

// ===== GAMES SHOW MORE / SHOW LESS =====
const gamesGridWrapper = document.querySelector('.games-grid-wrapper');
const gamesShowMoreBtn = document.getElementById('gamesShowMoreBtn');

if (gamesGridWrapper && gamesShowMoreBtn) {
    // Initially preview (first 4 only)
    gamesGridWrapper.classList.add('preview');
    gamesShowMoreBtn.textContent = 'Show more games';
    gamesShowMoreBtn.classList.remove('expanded');

    gamesShowMoreBtn.addEventListener('click', () => {
        const isPreview = gamesGridWrapper.classList.toggle('preview');
        if (isPreview) {
            gamesShowMoreBtn.textContent = 'Show more games';
            gamesShowMoreBtn.classList.remove('expanded');
        } else {
            gamesShowMoreBtn.textContent = 'Show less';
            gamesShowMoreBtn.classList.add('expanded');
        }
    });
}

// ===== UNIVERSAL PLYR FOR YOUTUBE PLAYERS (player1, player2) =====
if (typeof Plyr !== 'undefined') {
    const youtubePlayers = document.querySelectorAll('#player1, #player2');
    youtubePlayers.forEach((element, index) => {
        const player = new Plyr(element, {
            controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'captions',
                'settings',
                'pip',
                'fullscreen'
            ],
            youtube: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
            }
        });
        console.log(`Plyr YouTube player ${index + 1} initialized`);
    });
} else {
    console.warn('Plyr library not loaded. Video players will not work.');
}

// ===== ANIMATED BORDER TOGGLE (CSS ONLY; NO DOM WRAPPERS) =====
const borderToggle = document.getElementById('borderToggle');
if (borderToggle) {
  borderToggle.checked = localStorage.getItem('animatedBorder') !== 'false';
  document.body.classList.toggle('animated-border', borderToggle.checked);
  borderToggle.addEventListener('change', () => {
    document.body.classList.toggle('animated-border', borderToggle.checked);
    localStorage.setItem('animatedBorder', String(borderToggle.checked));
  });
}
// ================================================================
// ===== INITIALISE =====
// ================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderGames();
        renderArtists();
    });
} else {
    renderGames();
    renderArtists();
}