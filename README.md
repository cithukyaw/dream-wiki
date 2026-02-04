# Dream Wiki (အိပ်မက်ကျမ်း)

A fast, offline‑capable Burmese dream encyclopedia search app built with React, TypeScript, and Vite. It indexes JSON database and provides instant fuzzy search with keyboard navigation. Designed to work great on desktop and mobile and supports installation as a PWA.

ဆရာဖြိုး၏ အိပ်မက်အဘိဓာန်ကို ကိုးကားသည်။

## Features

- Instant client‑side search (Fuse.js) over local JSON data
- Clean UI with shadcn/ui + Tailwind CSS
- Dark/light theme support (via `next-themes`)
- Client‑side routing (React Router)
- Offline support and installable PWA (vite-plugin-pwa)
- IndexedDB caching (Dexie) and smooth UX

## Tech Stack

- React, TypeScript, Vite
- [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide icons](https://lucide.dev/guide/packages/lucide-react)
- React Router, TanStack Query
- [Fuse.js](https://www.fusejs.io/) for fuzzy search
- [Dexie](https://dexie.org/) (IndexedDB)

## Getting Started

Prerequisites:
- Node.js 18+ and npm

Install and run locally:

```sh
git clone <YOUR_GIT_URL>
cd dream-wiki
npm install
npm run dev
```

Build and preview production build:

```sh
npm run build
npm run preview
```

Lint:

```sh
npm run lint
```

## Project Structure

Key paths:

- `src/pages/Index.tsx` – main page and layout
- `src/components/` – UI components (search box, results, etc.)
- `src/hooks/useSearch.ts` – search logic using Fuse.js
- `src/data/` – local JSON datasets that power search (e.g., `က.json`, `ခ.json`, `မ.json`, `ဝ.json`)
- `public/` – static assets; PWA icons/manifest are generated via plugin config

## Working with Data

- Add or update JSON files under `src/data`. Filenames may be Unicode (e.g., Burmese letters). Ensure your editor and OS preserve UTF‑8 filenames and file encodings.
- Each JSON file should follow the same shape as existing ones so the search index remains consistent.

## PWA Notes

- This project uses `vite-plugin-pwa` to enable offline usage and “Install App”.
- After running `npm run build`, the service worker is generated. Make sure to serve the `dist` folder over HTTPS when testing installability.

## Deployment

This is a static site – you can host the `dist` folder on any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3, etc.).

General steps:
1. `npm run build`
2. Deploy the generated `dist/` directory

GitHub Pages tip (Vite base path): set `base` in `vite.config.ts` to `'/<repo-name>/'` if deploying to `https://<user>.github.io/<repo-name>/`.

## Available Scripts (from package.json)

- `dev` – start Vite dev server
- `build` – create production build
- `build:dev` – build with development mode flags
- `preview` – preview the production build locally
- `test` / `test:watch` – run unit tests
- `lint` – run ESLint

## Contributing

Issues and PRs are welcome. Please run `npm run lint` and `npm test` before submitting changes.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
