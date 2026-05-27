# Edina MTB 2026 Training Hub

Static training site for the Edina mountain bike team.

## Project Shape

The app is a plain static site:

- `index.html` for the season overview
- `may-calendar.html` through `october-calendar.html` for month pages
- `styles.css` for shared styling
- `app.js`, `today-nav.js`, and the month `*.js` files for page behavior
- `calendar-utils.js` for shared date logic
- `server.mjs` for local preview

## Local Development

Install dependencies:

```sh
npm install
```

Start the local server:

```sh
npm run dev
```

The site runs at `http://127.0.0.1:4321/`.

## Build

This project does not have a compile step. The build command is only a validation placeholder:

```sh
npm run build
```

## Date Testing

Date-aware UI can be tested with a query parameter:

```text
?testDate=2026-08-12
```

Examples:

- `index.html?testDate=2026-05-27`
- `index.html?testDate=2026-07-10`
- `index.html?testDate=2026-08-12`
- `index.html?testDate=2026-09-20`

This affects:

- the active season arc on the overview page
- the `Today` nav link target
- current day and current week highlighting on calendar pages

## Deployment

Because the site uses relative paths, it is suitable for static hosting setups such as GitHub Pages project hosting.
