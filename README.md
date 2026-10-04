# VeraFin

VeraFin is a frontend prototype for helping first-time and retail investors pause and check suspicious financial messages or promotions. It is designed to highlight possible scam warning signs and encourage verification with official sources. It does not provide stock tips or investment advice.

## Features

- Home screen with entry points to check a pasted message or screenshot.
- Message input screen with a sample message and scam safety reminders.
- Screenshot upload screen with image preview and file validation (JPG, PNG, or WEBP, up to 10 MB).
- History screen with search, image/text filters, individual deletion, and clear-all controls.
- Settings screen with appearance, account, security, notification, support, and preference sections.
- Responsive navigation and dark/light/system appearance options.

Sign in or register before using backend features. Text and image submissions send authenticated requests to `POST ${VITE_API_BASE_URL}/api/verification/submit`; the app polls the returned verification ID until processing completes, then displays the backend result. JWTs stay in memory and are cleared on reload. History and profile details are loaded from the backend. Appearance preferences remain in browser `localStorage`.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Compiler

## Getting started

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

The local backend URL is configured in `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Vite exposes `VITE_` variables to browser code, so do not put secrets in this file. Restart the development server after changing environment variables.

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Project structure

```text
src/
├── api/                # Axios client and backend response adapters
├── components/       # Shared navigation, cards, form controls, and settings UI
├── data/             # Sample history, navigation, scam advisories, and risk styles
├── hooks/            # Authenticated submit, polling, history, and appearance state
├── pages/            # Sign in, home, paste, upload, result, history, and settings screens
├── utils/            # Date and history grouping helpers
├── App.tsx           # Screen selection and app-level navigation
├── index.css         # Global styles and theme tokens
└── types.ts          # Shared TypeScript domain types
```

Navigation is currently handled in app state rather than URL-based routing. Message submission uses the configured backend URL; the displayed message analysis and screenshot analysis remain local prototypes.
