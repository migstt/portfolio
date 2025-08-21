## Overview

My personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI. It is statically exported and deployed on an Amazon EC2 instance with nginx as the web server and Let's Encrypt for SSL/TLS certificates. The site integrates with the GitHub REST API to fetch and list repositories in the projects section, and the Strava API to show my last 30 activities.

![Portfolio Screenshot](public/images/screenshot.png)

## Technologies

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn UI** - Component library
- **GitHub REST API** - pulls project/repository data
- **Strava API** - pulls recent activities

## Infrastructure & Deployment

- **Amazon EC2** - hosting server
- **nginx** - web server for serving static files and handling HTTPS
- **Namecheap** - domain registrar and DNS management
- **Cloudflare** - CDN, DDoS protection, and additional security layer
- **Let's Encrypt** - free SSL/TLS certificates via Certbot
- **Amazon S3** - stores build artifacts
- **AWS Systems Manager (SSM)** - triggers EC2 to sync from S3
- **GitHub Actions** - CI/CD pipeline for build and deployment

## Server Configuration

- **Web Server**: nginx configured to serve static files from `/var/www/html`
- **HTTPS**: Let's Encrypt certificates managed by Certbot with automatic renewal
- **Domain**: custom domain with automatic HTTP to HTTPS redirects

## Deployment Flow

1. On every push to the `main` branch (or manual trigger), GitHub Actions:

    - Builds the Next.js project with static export (`npm run build`)
    - Uploads the `out/` directory to an S3 bucket
    - Uses **AWS Systems Manager (SSM)** to trigger a script (`/home/ubuntu/scripts/s3-sync.sh`) on the EC2 instance that pulls the latest build from S3

2. The EC2 instance syncs from S3 to `/var/www/html`, where nginx serves the updated site
    
3. A scheduled job runs daily at **8:00 AM Philippines time (0:00 UTC)** to refresh the deployment

## Security Implementation

- **No SSH access from GitHub Actions**: Port 22 is restricted to authorized my PC's IP address only
- **Secure deployment via S3 + SSM**: GitHub Actions uploads build artifacts to S3, then securely triggers EC2 to pull from S3 using AWS Systems Manager
- **IAM least privilege**: GitHub Actions uses minimal AWS credentials (S3 + SSM permissions only)
- **HTTPS encryption**: Let's Encrypt certificates with automatic renewal
- **nginx configuration**: Optimized caching, security headers, and automatic HTTP to HTTPS redirects
- **Environment variables**: Sensitive data (Strava API, GitHub tokens) stored in GitHub Repository Secrets

## Workflow Configuration

See `.github/workflows/deploy.yml` for the complete CI/CD pipeline configuration.

## Live Site

Visit [migueltrinidad.com](https://migueltrinidad.com/) to see the live website.