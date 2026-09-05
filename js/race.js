window.renderRace = function (race) {
  return `
    <section class="page-shell race-page">
      <div class="eyebrow">Round ${race.round} · Next race</div>
      <div class="page-heading"><h1>RACE<br><em>CENTER</em></h1><p>Every number you need before the lights go out.</p></div>
      <div class="race-hero">
        <div><p class="kicker">${race.date}</p><h2>${race.name}</h2><p>${race.location} · ${race.time}</p></div>
        <div class="track-art" aria-label="Abstract circuit illustration"><span>${race.trackLabel || race.location}</span></div>
      </div>
      <div class="stat-grid">
        <article><span>Circuit</span><strong>${race.circuit}</strong></article>
        <article><span>Race distance</span><strong>${race.distance}</strong></article>
        <article><span>Laps</span><strong>${race.laps}</strong></article>
        <article><span>Data source</span><strong>${window.APEX_DATA.source || 'Mock data'}</strong></article>
      </div>
      <section class="schedule"><div class="section-title"><span>Weekend</span><h2>Schedule</h2></div>
        <div class="schedule-row"><b>FRIDAY</b><span>Practice sessions</span><strong>TBC</strong></div>
        <div class="schedule-row"><b>SATURDAY</b><span>Qualifying</span><strong>TBC</strong></div>
        <div class="schedule-row active"><b>RACE DAY</b><span>Grand Prix</span><strong>${race.time}</strong></div>
      </section>
    </section>`;
};
