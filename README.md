# Publishing Data Capture

A white-label publishing metadata capture form for music distribution platforms.

## Features

- Pre-fills track metadata from distribution
- Pre-fills songwriter profile from account
- Captures songwriter, IPI, PRO, publisher, and co-writer information
- Real-time split validation (must total 100%)
- Handles PRO registration guidance for unregistered writers
- Mobile-responsive design

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured to deploy automatically to GitHub Pages via GitHub Actions.

### Setup Steps

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/publishing-data-capture.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment", select **GitHub Actions** as the source

3. **Update the base path** (if your repo name differs)
   
   In `vite.config.js`, update the `base` property to match your repository name:
   ```js
   base: '/your-repo-name/',
   ```

4. **Push changes**
   
   The GitHub Action will automatically build and deploy on every push to `main`.

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
# Then upload the `dist` folder to your hosting provider
```

## Customization

### Branding

To customize colors, edit the Tailwind classes in `src/App.jsx`. The primary colors use violet/fuchsia gradients which can be changed to match your brand.

### Pre-filled Data

The `distributionData` object at the top of `src/App.jsx` simulates data passed from your platform. In production, replace this with actual data passed via:
- URL parameters
- Props from a parent component
- API call on mount

### Adding Fields

The form is structured in steps (cases in the `renderStep` function). Add new steps or fields as needed for your use case.

## Integration

To embed in your platform:

```html
<iframe 
  src="https://your-username.github.io/publishing-data-capture/?track_id=123&user_id=456"
  width="100%"
  height="700"
  frameborder="0"
></iframe>
```

Or import as a React component if bundling together.

## License

MIT
