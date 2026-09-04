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

    // If the border toggle is ON, wrap the newly added repo cards
    if (borderToggle && borderToggle.checked) {
        wrapCards('.repo-card');
    }
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
        // If border is on, wrap repos after initial render
        if (borderToggle && borderToggle.checked) {
            wrapCards('.repo-card');
        }
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
                        <a href="${game.link}" target="_blank" class="btn-outline game-view-btn">Play Now <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
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

    // Two copies – animation moves by 50% of total width (one set)
    const doubled = [...window.artists, ...window.artists];
    container.innerHTML = doubled.map(renderArtistCard).join('');
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

// ================================================================
// ===== ANIMATED BORDER TOGGLE – WRAPPER APPROACH =====
// ================================================================
const borderToggle = document.getElementById('borderToggle');
let wrapperInstances = [];

function wrapCards(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        if (el.parentElement && el.parentElement.classList.contains('border-wrapper')) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'border-wrapper';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        wrapperInstances.push(wrapper);
    });
}

function unwrapCards() {
    wrapperInstances.forEach(wrapper => {
        if (wrapper.parentNode) {
            const child = wrapper.firstElementChild;
            wrapper.parentNode.insertBefore(child, wrapper);
            wrapper.remove();
        }
    });
    wrapperInstances = [];
}

if (borderToggle) {
    const savedBorder = localStorage.getItem('animatedBorder');
    if (savedBorder === 'false') {
        borderToggle.checked = false;
        document.body.classList.remove('animated-border');
    } else {
        borderToggle.checked = true;
        document.body.classList.add('animated-border');
        wrapCards('.card, .skill-card, .game-card, .repo-card');
    }

    borderToggle.addEventListener('change', () => {
        if (borderToggle.checked) {
            document.body.classList.add('animated-border');
            localStorage.setItem('animatedBorder', 'true');
            wrapCards('.card, .skill-card, .game-card, .repo-card');
        } else {
            document.body.classList.remove('animated-border');
            localStorage.setItem('animatedBorder', 'false');
            unwrapCards();
        }
    });
}

// ================================================================
// ===== INFINITE ARTIST CAROUSEL (JS smooth loop) =====
// ================================================================
let artistCarousel = document.getElementById('artistsCarousel');
let artistWrapper = document.querySelector('.artists-carousel-wrapper');

if (artistCarousel && artistWrapper && window.artists && window.artists.length > 0) {
    // We'll use requestAnimationFrame for smooth animation
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame
    let animationId = null;
    let isPaused = false;

    // Clone the content to make it seamless
    const originalContent = artistCarousel.innerHTML;
    // We already have doubled content from renderArtists, but we need to ensure it's long enough.
    // We'll render again with triple to be safe.
    const renderArtistCard = (artist) => `
        <a href="${artist.youtube}" target="_blank" class="artist-card" title="${artist.name}">
            <img src="/data/assets/misc/${artist.image}" alt="${artist.name}" loading="lazy" onerror="this.src='https://placehold.co/64x64?text=${encodeURIComponent(artist.name.charAt(0))}'">
            <span class="artist-name">${artist.name}</span>
            <span class="artist-badge"><i class="fab fa-youtube"></i> YouTube</span>
        </a>
    `;

    // Triple the content to ensure seamless loop
    const tripleArtists = [...window.artists, ...window.artists, ...window.artists];
    artistCarousel.innerHTML = tripleArtists.map(renderArtistCard).join('');

    // Measure the width of the first set (original artists)
    // We need to calculate the width of one full set.
    // We'll compute after a frame to get actual widths.
    let fullSetWidth = 0;
    const artistCards = artistCarousel.querySelectorAll('.artist-card');
    // The number of cards in one set
    const setSize = window.artists.length;
    // We'll measure the width of the first 'setSize' cards
    // Wait for layout
    setTimeout(() => {
        let totalWidth = 0;
        for (let i = 0; i < setSize && i < artistCards.length; i++) {
            totalWidth += artistCards[i].offsetWidth + 24; // gap is 1.5rem = 24px
        }
        fullSetWidth = totalWidth;
        // Set initial position to 0
        artistCarousel.style.transform = `translateX(0px)`;
    }, 50);

    function animateCarousel() {
        if (isPaused) {
            animationId = requestAnimationFrame(animateCarousel);
            return;
        }
        scrollPos -= speed;
        // When we've scrolled past one full set, reset to the equivalent position
        // but we have triple content, so we can reset without jumping.
        // We'll check if we've moved past the first set width.
        if (fullSetWidth > 0 && Math.abs(scrollPos) >= fullSetWidth) {
            // We can reset the position by adding the width (translate back)
            // But we need to avoid a jump, so we shift the whole container.
            // Since we have triple content, we can just move the transform.
            // The trick: when we reach the end of the first set, we jump back to the start of the second set.
            // But because we have triple, we can simply scroll continuously.
            // We'll set scrollPos modulo fullSetWidth.
            scrollPos = scrollPos % fullSetWidth;
            // To avoid a jump, we'll just continue, but we need to maintain the illusion.
            // Actually the easiest: use CSS animation with infinite, but that has reset issues.
            // Instead, we'll use requestAnimationFrame and reset the transform without any visual jump by
            // moving the entire container and then adding the offset.
            // Since we have three copies, we can shift the container by fullSetWidth when reaching the end of the first copy.
            // But we are already in a loop: we can just let scrollPos go negative and when it reaches -fullSetWidth, we set it back to 0
            // and also translate the container by adding the width of one set.
            // However, that would cause a jump. Better: use transform: translateX(scrollPos) and when scrollPos <= -fullSetWidth,
            // we add fullSetWidth to scrollPos and also shift the container by adding fullSetWidth to the transform?
            // Let's implement a common technique: we have three copies. We start at 0. When we reach -fullSetWidth, we 
            // reset to -fullSetWidth (i.e., we are at the start of the second copy) by adding fullSetWidth to scrollPos
            // and applying transform without transition, then continue.
            // We'll do that.
            // We'll set a flag to prevent transition.
            artistCarousel.style.transition = 'none';
            scrollPos = 0;
            artistCarousel.style.transform = `translateX(0px)`;
            // Force reflow
            void artistCarousel.offsetHeight;
            artistCarousel.style.transition = '';
        }
        artistCarousel.style.transform = `translateX(${scrollPos}px)`;
        animationId = requestAnimationFrame(animateCarousel);
    }

    // Pause on hover
    artistWrapper.addEventListener('mouseenter', () => { isPaused = true; });
    artistWrapper.addEventListener('mouseleave', () => { isPaused = false; });

    // Start animation
    animateCarousel();
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