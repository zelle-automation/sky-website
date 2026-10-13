# Sky Holidays website

The public website for skyholidays.pk (Next.js 16, React 19). It has no database of its own:
every page reads from the Sky Holidays API, and the hero, seasonal offer, homepage sections and
contact details come from the dashboard's settings.

## Run it

```bash
cp .env.example .env     # API_URL = where the API runs
npm install
npm run dev              # http://localhost:3000
```

Start the API first (see the `api` package). Production: `npm run build && npm start`.

Browser calls to `/api/*` and `/uploads/*` are forwarded to `API_URL` (see `next.config.ts`),
so enquiry and newsletter forms work without CORS. Light and dark themes follow the device by default.

| Route | Page |
| --- | --- |
| `/` | Home: hero search, offer, destinations, hotels / excursions / packages, deals, services, stories |
| `/destinations`, `/destinations/[slug]` | Destinations coverflow and detail |
| `/hotels`, `/excursions`, `/packages` and their `[slug]` pages | Catalogue with enquiry forms |
| `/umrah`, `/visa`, `/contact`, `/about` | Service pages |
| `/art/[name]` | Generated placeholder artwork used until real photos are uploaded |
