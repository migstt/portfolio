---
title: "Laravel Deployment with GitHub Actions"
date: "2025-08-12"
description: "Learn how to automatically deploy your Laravel application to shared hosting using GitHub Actions. This guide covers both tag-based and branch-based deployment methods."
image: "/images/blog/deploy-laravel-to-shared-hosting.jpg"
---

## Prerequisites

- Laravel application hosted on GitHub
- Shared hosting server with SSH access
- Basic knowledge of Git and GitHub

## Step 1: Configure GitHub Secrets

Go to your repository **Settings** → **Secrets and variables** → **Actions** and add these secrets:

| Secret Name | Description |
|-------------|-------------|
| `PROD_SSH_HOST` | Your server's hostname or IP address |
| `PROD_SSH_USER` | SSH username for your server |
| `PROD_SSH_PRIVATE_KEY` | SSH private key content |
| `DEPLOYMENT_DIRECTORY` | Path to your Laravel app on the server |
| `FETCH_CHECKOUT_TAG_SCRIPT_PATH` | Path to your tag checkout script |
| `PHP_BINARY_PATH` | PHP binary path (optional) |

## Step 2: Create Deployment Workflow

Create `.github/workflows/deploy.yml` in your project:

```yaml
name: Deploy Laravel App

on:
  release:
    types: [created]

jobs:
  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        
      - name: Deploy to Server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PROD_SSH_HOST }}
          username: ${{ secrets.PROD_SSH_USER }}
          key: ${{ secrets.PROD_SSH_PRIVATE_KEY }}
          script: |
            cd ${{ secrets.DEPLOYMENT_DIRECTORY }}
            bash ${{ secrets.FETCH_CHECKOUT_TAG_SCRIPT_PATH }}
            composer install --no-dev --optimize-autoloader
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
```

## Step 3: Create Tag Checkout Script

Create this script on your server at the path specified in `FETCH_CHECKOUT_TAG_SCRIPT_PATH`:

```bash
#!/bin/bash

# Start SSH agent and add key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/your-private-key

# Get latest release tag
git fetch --tags
LATEST_TAG=$(git describe --tags $(git rev-list --tags --max-count=1))

# Switch to latest tag
git checkout $LATEST_TAG

echo "Deployed tag: $LATEST_TAG"
```

## Alternative: Branch-Based Deployment

To deploy from a specific branch instead of tags, modify the workflow:

```yaml
on:
  push:
    branches: [main]  # Change to your preferred branch

# Replace the script section with:
script: |
  cd ${{ secrets.DEPLOYMENT_DIRECTORY }}
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/your-private-key
  git pull origin main
  composer install --no-dev --optimize-autoloader
  php artisan migrate --force
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
```

## Using Custom PHP Version

If your server has multiple PHP versions, use the full path:

```yaml
script: |
  # ... other commands ...
  ${{ secrets.PHP_BINARY_PATH }} artisan migrate --force
  ${{ secrets.PHP_BINARY_PATH }} artisan config:cache
```

Otherwise, use the standard `php` command.

## Workflow Breakdown

### Trigger
The workflow runs when you create a new release on GitHub.

### Actions Used
- `actions/checkout@v4`: Downloads your repository code
- `appleboy/ssh-action@v1.0.3`: Connects to your server via SSH

### Deployment Steps
1. Navigate to your app directory
2. Fetch and checkout the latest release
3. Install production dependencies
4. Run database migrations
5. Cache Laravel configurations

## Best Practices

- Always test deployments on a staging server first
- Use `--no-dev` flag to exclude development dependencies  
- Cache configurations for better performance
- Keep sensitive data in GitHub Secrets
- Use specific action versions for reliability

## Troubleshooting

**SSH Connection Issues:**
- Verify your SSH key format and permissions
- Ensure the key is added to your server's authorized_keys

**Permission Errors:**
- Check file/folder permissions on your server
- Ensure your SSH user has write access to the deployment directory

**Composer Issues:**
- Verify Composer is installed on your server
- Check PHP version compatibility

## Summary

This setup provides automated deployment whenever you create a GitHub release. The workflow handles code checkout, dependency installation, database migrations, and Laravel optimizations - making your deployment process reliable and hands-free.
