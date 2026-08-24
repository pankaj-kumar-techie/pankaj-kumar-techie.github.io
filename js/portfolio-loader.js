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
    renderPortfolioPage(portfolio, htmlContent, portfolioName);
    
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

function renderPortfolioPage(meta, htmlContent, slug) {
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

  // Find a client review that references this exact mission, if any
  let testimonialHtml = '';
  if (typeof PANKAJ_DB !== 'undefined' && PANKAJ_DB.reviews) {
    const review = PANKAJ_DB.reviews.find(r => r.mission === slug);
    if (review) {
      testimonialHtml = `
        <section id="case-testimonial" class="section">
          <div class="testimonial-card">
            <div class="testimonial-stars">${review.stars}</div>
            <p class="testimonial-text">"${review.text}"</p>
            <div class="testimonial-meta"><span class="testimonial-who">${review.who}</span><span class="testimonial-badge">${review.badge}</span></div>
          </div>
        </section>
      `;
    }
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
      <a href="index.html#contact" class="cta-btn cta-btn-mini">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        NEED SOMETHING LIKE THIS?
      </a>
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

    <!-- TESTIMONIAL -->
    ${testimonialHtml}

    <!-- CTA -->
    <section id="case-cta" class="section">
      <h2 class="cta-head">WANT THIS<br>FOR YOUR BIZ?</h2>
      <p class="cta-sub">${meta.cta}</p>
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
  const pageTitle = `${meta.title} — PANKAJ.AI`;
  const pageUrl = `https://pankaj-kumar-techie.github.io/portfolio.html?portfolio=${slug}`;
  document.title = pageTitle;
  setMeta('meta-description', 'content', meta.tagline);
  setMeta('meta-canonical', 'href', pageUrl);
  setMeta('meta-og-url', 'content', pageUrl);
  setMeta('meta-og-title', 'content', pageTitle);
  setMeta('meta-og-description', 'content', meta.tagline);
  setMeta('meta-twitter-title', 'content', pageTitle);
  setMeta('meta-twitter-description', 'content', meta.tagline);
}

function setMeta(id, attr, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, value);
}

// Load portfolio on page load
document.addEventListener('DOMContentLoaded', loadPortfolio);
