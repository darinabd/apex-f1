# APEX F1

A responsive Formula 1 dashboard with a race calendar, driver and constructor standings, a race center, and locally saved favorite drivers.

## Features

- Live season data from the public Jolpica F1 API, with offline demo data as a fallback
- Responsive desktop and mobile layouts
- Hash-based navigation with no framework or build step
- Favorite drivers stored in the browser

## Run locally

Python 3 and Node.js are used only for the local server and syntax check; the site itself has no package dependencies.

```bash
npm run check
npm start
```

Then open <http://localhost:4173>.

## Technology

Vanilla HTML, CSS, and JavaScript. This is a static site, not a Next.js application, so it does not need a Next.js configuration or a build step.

## Data

The live data comes from the [Jolpica F1 API](https://jolpi.ca/). If the API cannot be reached, the interface remains usable with bundled 2025 demonstration data.
