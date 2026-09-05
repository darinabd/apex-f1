<div align="center">
  <img src="images/apex-logo.svg" alt="APEX F1" width="240">

  <h1>APEX F1</h1>

  <p>A fast, responsive Formula 1 dashboard for race weekends,<br>championship standings and the stories shaping the grid.</p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111" alt="JavaScript">
    <img src="https://img.shields.io/badge/Responsive-ef1b2d?style=flat-square" alt="Responsive">
    <img src="https://img.shields.io/badge/Dependencies-0-111?style=flat-square" alt="Zero dependencies">
  </p>
</div>

---

## About

APEX F1 is an independent Formula 1 fan experience with a bold, editorial-inspired interface. It combines live championship information with an offline fallback, so the dashboard remains usable even when the data service is unavailable.

The project is built entirely with browser-native technologies. There is no framework, build step or production dependency.

## Features

- Live race calendar and championship data from the Jolpica F1 API
- Driver and constructor standings
- Dedicated race center for the next Grand Prix
- Favorite drivers saved locally in the browser
- Offline demonstration data when the API is unavailable
- Responsive layouts for desktop, tablet and mobile
- Keyboard-friendly navigation and reduced-motion support
- Hash-based routing without page reloads

## Pages

| Section | Description |
| --- | --- |
| Dashboard | Next race, championship leaders and paddock stories |
| Calendar | Season schedule with completed and upcoming rounds |
| Standings | Driver and constructor championship tables |
| Race Center | Circuit, distance, laps and weekend schedule |
| Drivers | Full driver grid with team colors and statistics |
| Favorites | Drivers saved on the current device |

## Run locally

Clone the repository and start the included local server:

```bash
git clone https://github.com/darinabd/apex-f1.git
cd apex-f1
npm start
```

Open [http://localhost:4173](http://localhost:4173) in your browser.

To run the JavaScript syntax checks:

```bash
npm run check
```

> Python 3 and Node.js are used only for the local server and syntax checks. The website itself has no package dependencies.

## Project structure

```text
apex-f1/
├── css/
│   └── style.css       # Layout, components and responsive styles
├── images/
│   └── apex-logo.svg   # APEX F1 brand mark
├── js/
│   ├── api.js           # Live F1 data integration
│   ├── app.js           # Rendering, navigation and interactions
│   ├── data.js          # Offline fallback data
│   ├── favorites.js     # Browser storage for favorite drivers
│   └── race.js          # Race center view
├── index.html
└── package.json
```

## Data source

Live season data is provided by the public [Jolpica F1 API](https://jolpi.ca/). APEX F1 is an independent fan project and is not affiliated with Formula 1, the FIA, its teams or drivers.

## Deployment

Because APEX F1 is a static website, it can be hosted on GitHub Pages, Netlify, Vercel or any conventional web server without a build command.

---

<div align="center">
  <strong>Built for the limit.</strong><br>
  <sub>APEX F1 · Independent Formula 1 fan experience</sub>
</div>
