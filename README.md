# VeraFin

VeraFin is a frontend prototype for helping first-time and retail investors pause and check suspicious financial messages or promotions. It is designed to highlight possible scam warning signs and encourage verification with official sources. It does not provide stock tips or investment advice.

## Features

- Home screen with entry points to check a pasted message or screenshot.
- Message input screen with a sample message and scam safety reminders.
- Screenshot upload screen with image preview and file validation (JPG, PNG, or WEBP, up to 10 MB).
- History screen with search, image/text filters, individual deletion, and clear-all controls.
- Settings screen with appearance, account, security, notification, support, and preference sections.
- Responsive navigation and dark/light/system appearance options.

The current project is a frontend prototype. Message and image analysis are not connected to a backend; the analyze actions show a placeholder message. Recent checks and safety advisories use sample content. History and appearance preferences are stored in browser `localStorage` on the current device.

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
├── components/       # Shared navigation, cards, form controls, and settings UI
├── data/             # Sample history, navigation, scam advisories, and risk styles
├── hooks/            # Persisted browser state and appearance preferences
├── pages/            # Home, paste, upload, history, settings, and coming-soon screens
├── utils/            # Date and history grouping helpers
├── App.tsx           # Screen selection and app-level navigation
├── index.css         # Global styles and theme tokens
└── types.ts          # Shared TypeScript domain types
```

Navigation is currently handled in app state rather than URL-based routing. To connect message or image analysis, implement the backend integration in the corresponding paste/upload flow and replace the current placeholder action.
