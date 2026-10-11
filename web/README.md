# Moon web

React + TypeScript + Vite, based on the luissaybe project.

## Development

With Node.js 24, run `npm ci`, then `npm run dev`.
The landing page is available at http://localhost:5173.

Run `npm run lint` to lint and `npm run build` to type-check and build
into `dist`. Run `npm run preview` to preview the production build.

## Production with Docker

From this directory, run `docker compose up --build` and open
http://localhost:5173. The image builds the app with `npm run build`, then
serves the static `dist` files with Nginx. The generated HTML references
one bundled JavaScript asset and one CSS asset through `<script>` and
`<link>` tags.

Run `docker compose up --build` again after changing the source to rebuild
and serve the updated app.

## Styles

Use Vite's built-in CSS Modules for component styles:

```tsx
import styles from './index.module.css'

<main className={styles.landing}>hello</main>
```

The configuration in `vite.config.ts` generates scoped class names using
the source file path and class name, preventing collisions between files.
Use `.module.css` for scoped styles; plain `.css` imports are global and
are reserved for shared defaults such as `src/index.css`.
No extra CSS processor package or public directory is needed.
