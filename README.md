# Code_review_assistant

Automated Code Review Assistant — a Vite + React + TypeScript frontend that lets users upload source files and receive automated analysis (readability, modularity, potential bugs, suggestions) powered by local analysis logic and AI-friendly output structures.

This repository contains a small single-page app located under the `project/` folder. It was scaffolded with Vite + React + TypeScript and enhanced with Tailwind CSS.

## Highlights

- UI built with React + TypeScript
- Vite for fast dev server and builds
- Tailwind CSS for styling
- Uses `@supabase/supabase-js` and `lucide-react` (icons)
- Simple file upload flow that analyzes code and produces a review report

## Quick features

- Upload a source file and detect language
- Run lightweight analysis (see `src/services/codeAnalyzer.ts`) to produce a `ReviewReport`
- Review history and per-file suggestions

## Project structure (top-level)

```
code_review_assistant/
  project/
    index.html
    package.json
    src/
      App.tsx
      main.tsx
      components/
      services/
      utils/
    tsconfig.json
    tailwind.config.js
```

## Prerequisites

- Node.js 18+ (recommended) installed on your machine
- npm (bundled with Node.js)

## Install dependencies (PowerShell)

Open PowerShell and run from the `project` folder:

```powershell
cd 'c:\Users\Admin\OneDrive\Documents\Coding_2025\project-bolt-sb1-wyhaally\code_review_assistant\project'
npm install
```

If you prefer `pnpm` or `yarn`, you can use them, but this README uses npm.

## Development server

Start the Vite dev server:

```powershell
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) in your browser.

## Production build

```powershell
npm run build
npm run preview
```

`npm run build` creates a production build in `dist/`. `npm run preview` serves the built files locally.

## Scripts (from package.json)

- `dev` — start Vite dev server
- `build` — build for production
- `preview` — preview production build
- `lint` — run ESLint
- `typecheck` — TypeScript type check

## Notes on implementation

- UI: `src/App.tsx` implements the upload/analyze flow and coordinates `FileUpload`, `CodePreview`, `ReviewReport`, and `ReviewHistory` components.
- Analysis: `src/services/codeAnalyzer.ts` contains the analysis logic. It currently runs locally and returns a `report` and `suggestions` structure consumed by the UI.
- Utilities: `src/utils/fileUtils.ts` contains language detection helpers.

## Recommended next steps

- Add unit tests for `codeAnalyzer` and `fileUtils`.
- Improve error handling and UX for very large files.
- Add a backend integration for heavy analysis or to centralize results.
- Add CI with GitHub Actions for lint/typecheck and build previews.

## Contributing

If you'd like the files moved to the repo root (instead of `project/`), or you'd like a separate branch/PR for the README, tell me and I can change it.

## License

Add your license here (MIT/Apache/Proprietary...).
