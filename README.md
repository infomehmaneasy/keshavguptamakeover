# Keshav Gupta Makeover

A responsive editorial website prototype for Keshav Gupta's makeup artistry.

## Run locally

Use the Node.js version pinned in `.nvmrc` before installing dependencies:

```sh
nvm use
npm install
npm run dev
```

## Project checks

```sh
npm run typecheck
npm run lint
npm run build
```

## Launch configuration

- The home hero uses `public/6.m4v`, a browser-compatible copy of the supplied `public/6.MOV`; its poster and the artist portrait are managed in `src/config/media.ts`.
- Artist phone and WhatsApp details are in `src/config/artist.ts`.
- Service images and the artist-provided gallery media are managed in `src/config/services.ts` and `src/config/portfolio.ts`.
- Booking runs in clearly labelled demo mode. Connect the booking service in `src/services/booking.ts` before accepting web enquiries.
