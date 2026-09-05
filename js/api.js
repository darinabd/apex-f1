(function () {
  const BASE = 'https://api.jolpi.ca/ergast/f1/current';
  const COLORS = { mercedes:'#27f4d2', ferrari:'#e8002d', mclaren:'#ff8700', red_bull:'#3671c6', rb:'#6692ff', alpine:'#ff87bc', haas:'#b6babd', audi:'#f50537', sauber:'#52e252', williams:'#64c4ff', aston_martin:'#229971', cadillac:'#9b9b9b' };
  const request = async path => { const response = await fetch(`${BASE}${path}`); if (!response.ok) throw new Error(`F1 API returned ${response.status}`); return response.json(); };
  const dateLabel = value => new Intl.DateTimeFormat('en-GB', {day:'2-digit', month:'short'}).format(new Date(`${value}T12:00:00Z`)).toUpperCase();

  function racesFrom(payload) {
    const now = new Date();
    return payload.MRData.RaceTable.Races.map(race => {
      const when = new Date(`${race.date}T${race.time || '12:00:00Z'}`);
      return { round:Number(race.round), country:race.raceName.replace(/ Grand Prix$/i, ''), city:race.Circuit.Location.locality, date:dateLabel(race.date), rawDate:race.date, status:when < now ? 'complete' : 'upcoming', circuit:race.Circuit.circuitName, time:race.time ? race.time.slice(0,5) + ' UTC' : 'TBC' };
    });
  }

  function driversFrom(payload) {
    const list = payload.MRData.StandingsTable.StandingsLists[0];
    return list ? list.DriverStandings.map(item => {
      const team = item.Constructors[item.Constructors.length - 1];
      return { id:item.Driver.driverId, number:item.Driver.permanentNumber || item.position, name:`${item.Driver.givenName} ${item.Driver.familyName}`, short:item.Driver.code || item.Driver.familyName.slice(0,3).toUpperCase(), team:team?.name || 'Formula 1', country:item.Driver.nationality, points:Number(item.points), wins:Number(item.wins), color:COLORS[team?.constructorId] || '#777' };
    }) : [];
  }

  function teamsFrom(payload) {
    const list = payload.MRData.StandingsTable.StandingsLists[0];
    return list ? list.ConstructorStandings.map(item => ({ name:item.Constructor.name, points:Number(item.points), color:COLORS[item.Constructor.constructorId] || '#777' })) : [];
  }

  async function load() {
    try {
      const [schedule, driverTable, teamTable] = await Promise.all([request('.json?limit=100'), request('/driverstandings.json'), request('/constructorstandings.json')]);
      const races = racesFrom(schedule), drivers = driversFrom(driverTable), teams = teamsFrom(teamTable);
      const next = races.find(race => race.status === 'upcoming') || races[races.length - 1];
      if (races.length) APEX_DATA.races = races.map(race => ({...race, status:race === next ? 'next' : race.status}));
      if (drivers.length) APEX_DATA.drivers = drivers;
      if (teams.length) APEX_DATA.teams = teams;
      if (next) APEX_DATA.nextRace = { round:next.round, name:`${next.country} Grand Prix`, location:next.city, date:next.date, circuit:next.circuit, trackLabel:next.city, laps:'—', distance:'—', time:next.time };
      APEX_DATA.season = schedule.MRData.RaceTable.season || new Date().getFullYear();
      APEX_DATA.source = 'Live API';
    } catch (error) {
      console.warn('Apex F1: using offline mock data.', error);
      APEX_DATA.source = 'Offline data';
      APEX_DATA.season = 2025;
    }
    window.dispatchEvent(new CustomEvent('apex:dataready'));
  }
  window.ApexAPI = { load };
})();
