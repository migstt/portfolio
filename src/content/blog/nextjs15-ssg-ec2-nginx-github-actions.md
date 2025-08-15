---
title: "Deploying Next.js 15 SSG to EC2 with GitHub Actions"
date: "2025-08-15"
description: "Step-by-step guide to deploy a Next.js 15 static export to an EC2 server with Nginx and GitHub Actions."
---

## Prerequisites

You should have:

- **EC2 instance** running Ubuntu (or similar).
- **Node.js** installed locally for development.
- **Nginx** installed and configured on the EC2 server.
- **Domain name** pointed to your EC2 public IP.
- **GitHub repository** for your project.
- **SSH key pair** to connect to your EC2.
- **Certbot** (optional) for HTTPS.


## 1. Configure Next.js for Static Export

In `next.config.ts`, set the following:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Build as static HTML files
  trailingSlash: true, // Ensure trailing slash for SSG routing
  images: {
    unoptimized: true, // Disable Next.js image optimization for static export
  },
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost"
  ],
};

export default nextConfig;
```

**Why this config?**
- `output: "export"` generates static files (`/out` folder) ready to serve.
- `trailingSlash: true` prevents missing-page errors on nested routes in Nginx.
- `images.unoptimized: true` avoids errors from Next.js image loader when hosting without Vercel.
- `allowedDevOrigins` is optional for local development access control.


## 2. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Next.js Static Export to Server

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build (Next.js static export)
        run: npm run build

      - name: Deploy to EC2 using Rsync
        uses: burnett01/rsync-deployments@7.0.2
        with:
          switches: -avz --delete
          remote_path: /var/www/html/
          remote_host: ${{ secrets.EC2_HOST }}
          remote_user: ${{ secrets.EC2_USER }}
          remote_key: ${{ secrets.EC2_SSH_KEY }}
          path: ./out/
```

### Explanation of the Workflow File

- **name**  
  This is the name shown in GitHub Actions UI.

- **on → push → branches: main**  
  Runs this workflow every time you push changes to the `main` branch.

- **jobs → build-and-deploy**  
  Defines a single job named `build-and-deploy` that runs on `ubuntu-latest`.

- **steps**  
  The sequence of tasks to execute:

  1. **Checkout repo**  
     Pulls your repository code into the workflow runner.

  2. **Setup Node.js**  
     Installs Node.js version 20 in the runner.

  3. **Install dependencies**  
     Runs `npm ci` to install exact dependencies from `package-lock.json`.

  4. **Build (Next.js static export)**  
     Executes `npm run build` to generate static files in the `/out` directory.

  5. **Deploy to EC2 using Rsync**  
     Uses the `burnett01/rsync-deployments` action to copy files from `/out` to `/var/www/html` on your EC2 server over SSH.  
     - `-avz --delete` keeps the server folder in sync and removes old files.  
     - `remote_*` values come from GitHub Secrets to avoid exposing sensitive credentials.


## 3. Add GitHub Repository Secrets

Go to **GitHub Repo → Settings → Secrets and variables → Actions**.  
Add:

- `EC2_HOST` — Your EC2 public IP or domain.
- `EC2_USER` — SSH username (e.g., `ubuntu`).
- `EC2_SSH_KEY` — Private SSH key content.


## 4. Configure Nginx for Static Site

File: `/etc/nginx/sites-available/example`

```nginx
server {
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html;

    access_log /var/log/nginx/example.access.log;
    error_log  /var/log/nginx/example.error.log;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|svg|woff2?|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.html$ {
        expires 5m;
        add_header Cache-Control "no-cache";
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = www.example.com) {
        return 301 https://$host$request_uri;
    }

    if ($host = example.com) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;
    return 404;
}
```

Enable site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/example /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Deploy Workflow

Once set up:
1. Push to `main` branch.
2. GitHub Actions builds your static site.
3. Rsync uploads files to `/var/www/html` on EC2.
4. Nginx serves them instantly.


## Troubleshooting

- **403 Forbidden**: Check Nginx root path and file permissions.
- **Missing pages**: Ensure `trailingSlash: true` in `next.config.ts`.
- **Image not loading**: Confirm `unoptimized: true` in config.
- **GitHub Actions SSH error**: Ensure `EC2_SSH_KEY` matches your EC2 instance’s public key.


## Best Practices

- Keep `/var/www/html` clean with `--delete` flag in rsync.
- Use HTTPS with Certbot.
- Regularly update your EC2 system and Node.js version.
