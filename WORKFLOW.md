# Mira El Paso Development Workflow

This document outlines the development workflow for the Mira El Paso project.

## Branching Strategy

We use a three-branch workflow:

- `dev` - Development branch for active development
- `staging` - Staging branch for testing before production
- `main` - Production branch for the live site

## Environments

Each branch corresponds to a specific environment:

- `dev` branch → [dev.miraelpaso.com](https://dev.miraelpaso.com)
- `staging` branch → [staging.miraelpaso.com](https://staging.miraelpaso.com)
- `main` branch → [miraelpaso.com](https://miraelpaso.com)

## Development Workflow

### 1. Starting New Work

Always start new work on the `dev` branch:

```bash
# Make sure you're on dev and it's up to date
git checkout dev
git pull origin dev

# Create a feature branch (optional but recommended)
git checkout -b feature/your-feature-name

# Make your changes and commit them
git add .
git commit -m "Description of your changes"

# Push your changes to dev
git checkout dev
git merge feature/your-feature-name  # If you used a feature branch
git push origin dev
```

### 2. Moving to Staging

When your changes on `dev` are ready for testing:

```bash
# Switch to staging
git checkout staging

# Get latest changes from staging
git pull origin staging

# Merge dev into staging
git merge dev

# Push to staging
git push origin staging
```

### 3. Moving to Production

When staging has been tested and is ready for production:

```bash
# Switch to main
git checkout main

# Get latest changes from main
git pull origin main

# Merge staging into main
git merge staging

# Push to production
git push origin main
```

## Deployment

Deployments are handled automatically by Vercel:

- Pushing to `dev` triggers a deployment to the development environment
- Pushing to `staging` triggers a deployment to the staging environment
- Pushing to `main` triggers a deployment to the production environment

## Best Practices

1. Never commit directly to `main`
2. Always test changes in `staging` before deploying to production
3. Use descriptive commit messages
4. Consider using pull requests for code reviews
5. Keep the `dev` branch stable enough for team development
