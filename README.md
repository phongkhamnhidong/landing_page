# Phòng Khám Nhi Đồng — Landing Page

Landing page for a children's clinic in Vietnam. Content is managed by the clinic staff via Sanity Studio — no coding required to publish posts, update doctor profiles, or add videos.

## Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | Next.js 16 (TypeScript, Tailwind CSS, App Router) |
| CMS | Sanity.io (cloud-hosted, private dataset) |
| Hosting | Vercel |
| Code | GitHub |

## Project Structure

```
landing_page/
├── app/              # Next.js pages and layouts
│   └── studio/       # Embedded Sanity Studio at /studio
├── sanity/           # Sanity schema definitions
├── public/           # Static assets
├── sanity.config.ts  # Sanity configuration
└── next.config.ts    # Next.js configuration
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=fo3utyuv
NEXT_PUBLIC_SANITY_DATASET=test
```

## Deployment

- Push to `main` branch → Vercel auto-deploys
- Content updates in Sanity Studio → Vercel rebuilds automatically
