# Note: package-lock.json

The `package-lock.json` file will be generated when you run `npm install` locally.

GitHub Actions uses `npm ci` which requires this file, so make sure to:

1. Run `npm install` locally first
2. Commit the generated `package-lock.json` file
3. Then push to GitHub

This ensures reproducible builds.
