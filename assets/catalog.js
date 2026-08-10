const grid = document.querySelector('#tool-grid');
const search = document.querySelector('#tool-search');
const filters = document.querySelector('#category-filters');
const count = document.querySelector('#tool-count');

let tools = [];
let filteredMatches = [];
let activeCategory = 'All';
let currentlyRenderedCount = 0;
const BATCH_SIZE = 24;

const initialQuery = new URLSearchParams(window.location.search).get('q');
if (initialQuery) search.value = initialQuery;

const card = (tool) => `
  <a class="tool-card" href="${tool.path}" data-category="${tool.category}">
    <div class="tool-card-top">
      <span class="tool-icon" aria-hidden="true">${NikTool.icons[tool.icon] || NikTool.icons.code}</span>
      <span class="tool-arrow" aria-hidden="true">${NikTool.icons.arrow}</span>
    </div>
    <h3>${tool.name}</h3>
    <p>${tool.description}</p>
    <span class="tool-category">${tool.category}</span>
  </a>`;

// Render next batch of items into DOM for smooth 60fps scrolling at scale
function renderNextBatch() {
  if (currentlyRenderedCount >= filteredMatches.length) return;
  const nextBatch = filteredMatches.slice(currentlyRenderedCount, currentlyRenderedCount + BATCH_SIZE);
  const html = nextBatch.map(card).join('');
  
  if (currentlyRenderedCount === 0) {
    grid.innerHTML = html;
  } else {
    grid.insertAdjacentHTML('beforeend', html);
  }
  currentlyRenderedCount += nextBatch.length;
}

function filterAndReset() {
  const query = search.value.trim().toLowerCase();
  filteredMatches = tools.filter((tool) => {
    const inCategory = activeCategory === 'All' || tool.category === activeCategory;
    if (!inCategory) return false;
    if (!query) return true;
    const searchable = `${tool.name} ${tool.description} ${tool.category} ${(tool.keywords || []).join(' ')}`.toLowerCase();
    return searchable.includes(query);
  });

  count.textContent = `${filteredMatches.length} ${filteredMatches.length === 1 ? 'tool' : 'tools'}`;
  currentlyRenderedCount = 0;

  if (filteredMatches.length === 0) {
    grid.innerHTML = `<div class="empty-state"><strong>No tools found.</strong><br>Try another search or category.</div>`;
  } else {
    renderNextBatch();
  }
}

function renderFilters() {
  const categories = ['All', ...new Set(tools.map((tool) => tool.category))];
  filters.innerHTML = categories.map((category) =>
    `<button class="filter-button${category === 'All' ? ' active' : ''}" type="button" data-category="${category}">${category}</button>`
  ).join('');
}

// Progressive Infinite Scroll Observer for Scalability (1 Lakh Tools ready)
let sentinel = document.createElement('div');
sentinel.id = 'scroll-sentinel';
sentinel.style.height = '1px';
if (grid && grid.parentNode) {
  grid.parentNode.insertBefore(sentinel, grid.nextSibling);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      renderNextBatch();
    }
  }, { rootMargin: '300px' });
  observer.observe(sentinel);
} else {
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      renderNextBatch();
    }
  });
}

fetch('/catalog.json')
  .then((response) => {
    if (!response.ok) throw new Error('Catalog unavailable');
    return response.json();
  })
  .then((data) => {
    tools = data;
    renderFilters();
    filterAndReset();
  })
  .catch(() => {
    grid.innerHTML = '<div class="empty-state">The tool catalog could not be loaded. Please refresh the page.</div>';
  });

let searchTimeout;
search.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(filterAndReset, 50);
});

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
  filterAndReset();
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== search) {
    event.preventDefault();
    search.focus();
  }
});
