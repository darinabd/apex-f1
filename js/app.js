(function () {
  const data = window.APEX_DATA;
  const app = document.querySelector('#app');
  document.querySelector('#copyright-year').textContent = new Date().getFullYear();
  const esc = value => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function driverCard(driver, position) {
    const saved = ApexFavorites.has(driver.id);
    return `<article class="driver-card" style="--team:${driver.color}">
      <div class="driver-card__top"><span class="position">${String(position).padStart(2, '0')}</span><button class="favorite-button ${saved ? 'saved' : ''}" data-favorite="${driver.id}" aria-label="${saved ? 'Remove from' : 'Add to'} favorites">${saved ? '★' : '☆'}</button></div>
      <div class="driver-portrait"><span>${driver.short}</span><b>${driver.number}</b></div>
      <p>${driver.team}</p><h3>${driver.name}</h3><div class="driver-meta"><span>${driver.country}</span><strong>${driver.points} PTS</strong></div>
    </article>`;
  }

  function dashboard() {
    const r = data.nextRace;
    return `<section class="dashboard">
      <div class="hero">
        <div class="hero-copy"><div class="eyebrow">The ${data.season || 2025} championship · Round ${r.round}</div><h1>FEEL<br>THE <em>APEX.</em></h1><p>Race weekends, title fights and the stories moving Formula 1 forward.</p><a class="button" href="#race">Explore race center <span>↗</span></a></div>
        <div class="hero-visual"><div class="speed-lines"></div><span class="huge-number">01</span><div class="car-shape">APEX</div><p>Built for the<br><strong>limit.</strong></p></div>
        <div class="hero-index"><b>01</b><span></span><small>06</small></div>
      </div>
      <section class="next-race">
        <div class="next-label"><span>Up next</span><b>R${r.round}</b></div>
        <div><p>${r.date}</p><h2>${r.name}</h2><span>${r.location}</span></div>
        <div class="race-facts"><div><small>LAPS</small><b>${r.laps}</b></div><div><small>DISTANCE</small><b>${r.distance}</b></div><div><small>START</small><b>${r.time}</b></div></div>
        <a href="#race" aria-label="Open race center">→</a>
      </section>
      <section class="content-section"><div class="section-title"><span>Championship</span><h2>Front runners</h2><a href="#standings">Full standings →</a></div><div class="driver-grid">${data.drivers.slice(0,3).map((driver, index) => driverCard(driver, index + 1)).join('')}</div></section>
      <section class="content-section stories"><div class="section-title"><span>Inside the paddock</span><h2>Latest stories</h2></div><div class="story-grid">${data.stories.map((s,i) => `<article class="story story--${i+1}"><div class="story-number">0${i+1}</div><div><span>${s.tag}</span><h3>${s.title}</h3><p>${s.text}</p></div></article>`).join('')}</div></section>
    </section>`;
  }

  const heading = (title, accent, text) => `<div class="eyebrow">${data.season || 2025} Formula 1 season</div><div class="page-heading"><h1>${title}<br><em>${accent}</em></h1><p>${text}</p></div>`;
  function calendar() { return `<section class="page-shell">${heading('RACE','CALENDAR','Twenty-four weekends. One world championship.')}<div class="calendar-grid">${data.races.map(r => `<article class="race-card ${r.status}"><span>ROUND ${String(r.round).padStart(2,'0')}</span><b>${r.date}</b><h3>${r.country}</h3><p>${r.city}</p>${r.winner ? `<small>WINNER · ${r.winner}</small>` : `<small>${r.status === 'next' ? 'UP NEXT' : 'UPCOMING'}</small>`}</article>`).join('')}</div></section>`; }
  function standings() { const completed = data.races.filter(r => r.status === 'complete').length; return `<section class="page-shell">${heading('WORLD','STANDINGS','The title race, measured point by point.')}<div class="standings-layout"><div class="table-wrap"><div class="tabs"><b>Drivers</b><span>After round ${completed}</span></div>${data.drivers.map((d,i) => `<div class="standing-row"><span>${i+1}</span><i style="background:${d.color}"></i><b>${d.name}<small>${d.team}</small></b><em>${d.wins} WINS</em><strong>${d.points}</strong></div>`).join('')}</div><div class="constructor-list"><h2>Constructors</h2>${data.teams.map((t,i)=>`<div><span>${i+1}</span><i style="background:${t.color}"></i><b>${t.name}</b><strong>${t.points}</strong></div>`).join('')}</div></div></section>`; }
  function drivers(list = data.drivers, favoriteView = false) { return `<section class="page-shell">${heading(favoriteView ? 'YOUR' : 'THE', favoriteView ? 'FAVORITES' : 'DRIVERS', favoriteView ? 'The drivers you are following, saved on this device.' : 'Twenty two drivers. Eleven teams. One grid.')} ${list.length ? `<div class="driver-grid driver-grid--all">${list.map(d => driverCard(d, data.drivers.indexOf(d)+1)).join('')}</div>` : `<div class="empty-state"><span>☆</span><h2>No favorites yet</h2><p>Tap the star on any driver card to build your grid.</p><a class="button" href="#drivers">Browse drivers</a></div>`}</section>`; }

  const routes = { dashboard, calendar, standings, race: () => renderRace(data.nextRace), drivers, favorites: () => drivers(data.drivers.filter(d => ApexFavorites.has(d.id)), true) };
  function route() {
    const name = location.hash.slice(1) || 'dashboard';
    const active = routes[name] ? name : 'dashboard';
    app.innerHTML = routes[active]();
    document.querySelectorAll('[data-route]').forEach(link => link.classList.toggle('active', link.dataset.route === active));
    document.querySelector('.site-header').classList.remove('nav-open');
    document.querySelector('.menu-button').setAttribute('aria-expanded','false');
    updateCount();
    window.scrollTo(0, 0);
    app.focus({preventScroll:true});
  }
  function updateCount() { document.querySelectorAll('.favorite-count').forEach(el => el.textContent = ApexFavorites.all().length); }
  function updateSource() {
    document.querySelector('#data-status').textContent = data.source || 'Loading data';
    document.querySelector('#season-year').textContent = data.season || '2025';
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-favorite]');
    if (button) { ApexFavorites.toggle(button.dataset.favorite); route(); }
    if (event.target.closest('.menu-button')) {
      const header = document.querySelector('.site-header');
      const open = header.classList.toggle('nav-open');
      document.querySelector('.menu-button').setAttribute('aria-expanded', String(open));
    }
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('favorites:changed', updateCount);
  window.addEventListener('apex:dataready', () => { updateSource(); route(); });
  updateSource();
  route();
  ApexAPI.load();
})();
