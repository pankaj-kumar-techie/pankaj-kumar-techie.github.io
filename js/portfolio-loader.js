/* ─── DYNAMIC PORTFOLIO LOADER ─── */

function loadPortfolio() {
  const params = new URLSearchParams(window.location.search);
  const portfolioName = params.get('portfolio') || 'real-estate-saas';
  
  const contentContainer = document.getElementById('portfolio-content');
  
  try {
    // Get portfolio data from embedded PORTFOLIO_DATA
    const portfolio = PORTFOLIO_DATA[portfolioName];
    
    if (!portfolio) {
      throw new Error(`Portfolio not found: ${portfolioName}`);
    }
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(portfolio.content);
    
    // Render page
    renderPortfolioPage(portfolio, htmlContent);
    
  } catch (error) {
    console.error('Error loading portfolio:', error);
    contentContainer.innerHTML = `
      <div class="error-msg">
        ⚠ ERROR: Could not load portfolio "${portfolioName}"
        <br><br>
        <a href="missions.html" style="color: var(--primary); text-decoration: underline;">← Back to all projects</a>
      </div>
    `;
  }
}

function renderPortfolioPage(meta, htmlContent) {
  const contentContainer = document.getElementById('portfolio-content');
  const body = document.getElementById('portfolio-body');
  
  // Apply theme
  if (meta.theme) {
    body.className = `theme-${meta.theme}`;
  }
  
  // Build tags HTML
  const tagsHtml = (meta.tags || [])
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');
  
  const chipsHtml = (meta.chips || [])
    .map(chip => `<span class="chip">${chip}</span>`)
    .join('');
  
  // Build mission nav
  let navHtml = '';
  if (meta.prev_mission || meta.next_mission) {
    navHtml = '<div id="nav-proj"><div class="proj-nav">';
    
    if (meta.prev_mission) {
      navHtml += `<a href="portfolio.html?portfolio=${meta.prev_mission}" class="nav-proj prev-btn r">← Previous Mission</a>`;
    }
    
    if (meta.next_mission) {
      navHtml += `<a href="portfolio.html?portfolio=${meta.next_mission}" class="nav-proj next-btn r">Next Mission →</a>`;
    }
    
    navHtml += '</div><div class="back-row"><a href="missions.html" class="back-all">← BACK TO ALL PROJECTS</a></div></div>';
  }
  
  // Render page
  contentContainer.innerHTML = `
    <!-- HERO -->
    <div class="hero-case">
      <div class="case-code">${meta.mission_id} · CASE STUDY</div>
      <h1 class="case-title">${meta.title}</h1>
      <p class="case-tagline">${meta.tagline}</p>
      <div class="case-tags">${tagsHtml}</div>
      <div class="case-chips">${chipsHtml}</div>
    </div>

    <!-- OVERVIEW SECTION -->
    <section id="overview" class="section">
      <div class="s-tag">Overview</div>
      <h2 class="s-head">MISSION BRIEF</h2>
      <p class="overview-text">${meta.tagline}</p>
    </section>

    <!-- CONTENT -->
    <div class="portfolio-md-content">
      ${htmlContent}
    </div>

    <!-- CTA -->
    <section id="case-cta" class="section">
      <h2 class="cta-head">WANT THIS<br>FOR YOUR BIZ?</h2>
      <p class="cta-sub">I can build the same system — customised to your workflow — within 7 days. Let's talk.</p>
      <a href="index.html#contact" class="cta-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        INITIATE PROJECT
      </a>
      <div class="avail"><span class="online-dot"></span> AVAILABLE NOW · RESPONDS IN &lt;4HRS</div>
    </section>

    <!-- NAV -->
    ${navHtml}
  `;
  
  // Update document title and meta tags
  document.title = `${meta.title} — PANKAJ.AI`;
}

// Load portfolio on page load
document.addEventListener('DOMContentLoaded', loadPortfolio);
