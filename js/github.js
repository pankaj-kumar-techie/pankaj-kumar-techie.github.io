/* ─── PANKAJ.AI GITHUB INTELLIGENCE ─── */
const GH_USER = 'pankaj-kumar-techie';

async function fetchGitHubData() {
  const avatarEl = document.getElementById('gh-avatar');
  const nameEl = document.getElementById('gh-name');
  const userEl = document.getElementById('gh-username');
  const bioEl = document.getElementById('gh-bio');
  const reposEl = document.getElementById('gh-repos');
  const followersEl = document.getElementById('gh-followers');
  const starsEl = document.getElementById('gh-stars');
  const feedEl = document.getElementById('gh-feed');
  if (bioEl) bioEl.innerHTML = '<div class="gh-bio-text">DECODING_NEURAL_STREAMS... [0x7F]</div>';

  try {
    // Artificial delay for 'alive' feel
    await new Promise(r => setTimeout(r, 600));
    
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${GH_USER}`);
    if (!userRes.ok) throw new Error('Neural link failed');
    const userData = await userRes.json();

    // 2. Fetch Repos for stars and languages
    const reposRes = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`);
    const reposData = await reposRes.json();
    
    const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    
    // Calculate Top Languages
    const langMap = {};
    reposData.forEach(repo => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });
    const topLangs = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(l => l[0]);

    // Update Profile UI
    if (avatarEl) avatarEl.src = userData.avatar_url;
    if (nameEl) nameEl.textContent = userData.name || GH_USER;
    if (userEl) userEl.textContent = `@${userData.login}`;
    
    // Enhanced Bio with Metadata
    if (bioEl) {
      const location = userData.location ? `📍 ${userData.location}` : '🌐 CYBERSPACE';
      const company = userData.company ? ` | 🏢 ${userData.company}` : '';
      bioEl.innerHTML = `
        <div class="gh-bio-text">${userData.bio || 'AI Agent Architect'}</div>
        <div class="gh-meta-grid">
          <span>${location}${company}</span>
          <div class="gh-lang-pills">
            ${topLangs.map(l => `<span class="gh-lp">${l}</span>`).join('')}
          </div>
        </div>
      `;
    }
    
    // Update Metrics
    if (reposEl) animateValue(reposEl, userData.public_repos);
    if (followersEl) animateValue(followersEl, userData.followers);
    if (starsEl) animateValue(starsEl, totalStars);

    // 3. Fetch Recent Events (Feed)
    const eventsRes = await fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=15`);
    const eventsData = await eventsRes.json();
    
    renderFeed(eventsData, feedEl);

  } catch (error) {
    console.error('GH API Error:', error);
    if (bioEl) bioEl.textContent = 'Neural link offline. Rate limit or connection issue.';
  }
}

function renderFeed(events, container) {
  if (!container) return;
  if (!events || events.length === 0) {
    container.innerHTML = '<div class="gh-feed-placeholder">No recent public activity found.</div>';
    return;
  }

  container.innerHTML = events.map(ev => {
    let icon = '◆';
    let action = 'Activity';
    const repoName = ev.repo.name.split('/')[1];

    switch (ev.type) {
      case 'PushEvent':
        icon = '⚡';
        action = `Pushed ${ev.payload.commits ? ev.payload.commits.length : 1} commit(s)`;
        break;
      case 'CreateEvent':
        icon = '✨';
        action = `Created ${ev.payload.ref_type}`;
        break;
      case 'WatchEvent':
        icon = '⭐';
        action = 'Starred repository';
        break;
      case 'IssuesEvent':
        icon = '🔧';
        action = `${ev.payload.action} issue`;
        break;
      case 'PullRequestEvent':
        icon = '🔀';
        action = `${ev.payload.action} pull request`;
        break;
    }

    const time = new Date(ev.created_at).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return `
      <div class="gh-event">
        <div class="gh-ev-icon">${icon}</div>
        <div class="gh-ev-content">
          <div class="gh-ev-title">${action}</div>
          <div class="gh-ev-repo">${repoName}</div>
          <div class="gh-ev-time">${time}</div>
        </div>
      </div>
    `;
  }).join('');
}

function animateValue(el, target) {
  let start = 0;
  const duration = 1000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}

// Observe section to trigger fetch
const ghObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchGitHubData();
      ghObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  const ghSection = document.getElementById('github');
  if (ghSection) ghObserver.observe(ghSection);
});
