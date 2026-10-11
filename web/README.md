# Moon web

React + TypeScript + Vite, based on the luissaybe project.

The game page uses Apollo Client to query `items { id name }` from
`http://127.0.0.1:5173/graphql` and displays loading, error, and empty states.
Start the API before visiting the game page. Set `VITE_GRAPHQL_URL` in `.env.local`
to override the endpoint, then restart Vite (or rebuild for production).

## Routing

[React Router](https://reactrouter.com/start/declarative/routing) discovers page
components in `src/pages/**/*.tsx` through Vite's file glob. Each page must
default-export a React component. Paths mirror the folder and file names, with
trailing `index` segments omitted:

| Page | Route |
| --- | --- |
| `src/pages/index/index.tsx` | `/` |
| `src/pages/game/index.tsx` | `/game` |
| `src/pages/about.tsx` | `/about` |
| `src/pages/game/settings.tsx` | `/game/settings` |

Adding a page automatically adds its route. Keep shared components outside
`src/pages`; CSS Modules can stay beside their page. Duplicate route paths produce
an explicit error. Unknown URLs show a page-not-found screen with a home link.
Use React Router's `Link` for client-side navigation.

Vite supports direct page URLs and refreshes during development and preview.
When hosting `dist` elsewhere, configure the server to fall back to `index.html`
for application routes.

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
