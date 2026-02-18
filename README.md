# Publishing Data Capture - Prototype

A white-label publishing metadata capture form for music distribution platforms.

**Live demo:** https://djfnd.github.io/user-led-publishing-data-capture/

## What It Does

- Pre-fills track metadata (title, ISRC, release, performers)
- Pre-fills songwriter profile from account (name, IPI, PRO, publisher)
- Captures ownership splits with real-time validation (must total 100%)
- Supports up to 4 co-writers with name, IPI, split, and publisher for each
- Flags samples/interpolations for clearance tracking
- Detects split mismatches (e.g. "sole writer" with less than 100%)

## Local Development

```bash
npm install
npm run dev
```

## Deployment

Deploys automatically to GitHub Pages via GitHub Actions on push to `main`.

## Customisation

### Pre-filled Data

The `distributionData` object at the top of `src/App.jsx` simulates data passed from the platform. In production, replace with actual data via URL parameters, props, or API call.

### Branding

The prototype uses violet/fuchsia gradients. Update Tailwind classes in `src/App.jsx` to match your brand.

## Note

This is a prototype to demonstrate the UX flow. The logic and data model are stack-agnostic and can be implemented in whatever framework the platform uses.
