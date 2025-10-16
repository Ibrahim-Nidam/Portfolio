# Portfolio

A modern, automated developer portfolio built with TypeScript, Tailwind CSS, and GitHub Pages. Displays your GitHub repositories with intelligent language filtering, real-time stats, and automatic daily updates.

## Features

- **Automated Repository Fetching**: Syncs with your GitHub account daily via GitHub Actions
- **Multi-Language Filtering**: Filter repositories by programming language with visual badges
- **Zero Backend Required**: Fully static, deployed on GitHub Pages
- **Dark Mode Support**: Seamless theme switching between light and dark modes
- **Multi-Language Support**: Portfolio interface available in multiple languages
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Interactive Particles**: Engaging background animation system
- **Real-Time Stats**: Display stars, forks, and update timestamps for each repo

## Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Automation**: GitHub Actions
- **Build Tool**: TypeScript Compiler (tsc)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- A GitHub personal access token (for automation)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ibrahim-Nidam/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Build TypeScript
npm run build
```

### Local Development

```bash
# Compile TypeScript (watches for changes)
npm run build:ts

# Open index.html in your browser with a local server
# Example: using VS Code Live Server extension
```

## GitHub Actions Setup

This portfolio automatically updates your repositories list daily. To enable this:

1. **Create a GitHub Personal Access Token**:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select `repo` scope
   - Copy the token

2. **Add the token to your repository**:
   - Go to your repository **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `MY_TOKEN`
   - Value: (paste your token)
   - Click **Add secret**

3. **The workflow runs automatically**:
   - Every day at midnight UTC
   - Fetches your latest repositories
   - Updates `dist/repos.js`
   - Commits changes back to your repository

4. **Manual trigger**:
   - Go to **Actions** tab
   - Select "Update GitHub Repos Data"
   - Click "Run workflow"

## Project Structure

```
.
├── scripts/              # TypeScript source files
│   ├── github.ts        # GitHub repository integration
│   ├── main.ts          # Main portfolio logic
│   ├── theme.ts         # Theme switching
│   ├── language.ts      # i18n support
│   ├── particles.ts     # Background animation
│   └── generate-repos.js # GitHub Actions script (Node.js)
├── dist/                # Compiled output (generated)
│   ├── *.js            # Compiled TypeScript
│   └── repos.js        # Generated repository data
├── css/                 # Stylesheets
├── translations/        # i18n JSON files
├── index.html          # Main HTML file
├── tsconfig.json       # TypeScript configuration
└── .github/workflows/  # GitHub Actions workflows
    └── update-repos.yml
```

## How It Works

1. **Local Development**:
   - Write TypeScript in `scripts/`
   - Run `npm run build` to compile to `dist/`
   - Test locally before pushing

2. **First Time Setup**:
   - Run `node scripts/generate-repos.js` with your token
   - This populates `dist/repos.js` with your repos

3. **Automated Updates**:
   - GitHub Actions runs on schedule (daily at midnight UTC)
   - Fetches repos from GitHub API using your token
   - Generates `dist/repos.js`
   - Commits and pushes changes
   - GitHub Pages automatically deploys

4. **No Rate Limiting Issues**:
   - GitHub token allows 5,000 API requests/hour (vs 60 unauthenticated)
   - Token is never exposed (stored as repository secret)
   - Safe for public repositories

## Customization

### Change Update Schedule

Edit `.github/workflows/update-repos.yml`:

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Change this cron expression
```

Common cron patterns:
- `'0 0 * * *'` - Daily at midnight UTC
- `'0 */6 * * *'` - Every 6 hours
- `'0 2 * * 0'` - Every Sunday at 2 AM UTC

### Modify Display

Edit `scripts/github.ts`:
- Change `getLanguageIcon()` to customize language badges
- Edit `displayRepositories()` to modify card layout
- Adjust filtering logic in `filterByLanguage()`

### Add More Languages

1. Create translation file in `translations/` (e.g., `es.json`)
2. Update `scripts/language.ts` to include the new language
3. Rebuild with `npm run build`

## Deployment

This portfolio is configured for GitHub Pages:

1. Push to your repository
2. Go to **Settings** → **Pages**
3. Select "Deploy from a branch"
4. Choose `main` branch and `/root` folder
5. Your portfolio is live at `https://your-username.github.io/Portfolio`

## Security

- GitHub token is stored securely as a repository secret
- Token is never exposed in source code or logs
- Only has `repo` scope permissions
- Cannot be used outside of GitHub Actions workflows

## Troubleshooting

### Workflow fails with "Cannot find module"
- Ensure `scripts/generate-repos.js` is committed to the repository
- Check that the workflow file path is correct

### No repositories showing
- Verify your GitHub token has proper permissions
- Run `node scripts/generate-repos.js` manually to test
- Check that `dist/repos.js` is not in `.gitignore`

### Rate limit issues
- Use a personal access token (increases limit to 5,000/hour)
- Adjust batch size in `scripts/generate-repos.js`

## License

MIT

## Contributing

Feel free to fork and customize this portfolio for your own use!

---

**Author**: Ibrahim Nidam
**Last Updated**: 2025