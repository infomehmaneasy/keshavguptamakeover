# Keshav Gupta Makeover

A responsive editorial website prototype for Keshav Gupta's makeup artistry.

## Run locally

```sh
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

- The home hero video is `public/makeupvideo.mp4`; the poster image and artist portrait are managed in `src/config/media.ts`.
- Artist phone and WhatsApp details are in `src/config/artist.ts`.
- Service and gallery images remain editable in `src/config/services.ts` and `src/config/portfolio.ts`. Replace reference images with approved artist work before launch.
- Booking runs in clearly labelled demo mode. Connect the booking service in `src/services/booking.ts` before accepting web enquiries.
