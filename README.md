## Overview

This is my personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI. It is statically exported and deployed on an Amazon EC2 instance. The site integrates with the GitHub REST API to fetch and list repositories in the projects section, and the Strava API to show my last 30 activities.


![Portfolio Screenshot](public/images/screenshot.png)

## Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- GitHub REST API (project data)
- Strava API (recent activities)
- Amazon EC2 (hosting)
- GitHub Actions (CI/CD)

## Deployment

- Built and exported statically with Next.js.
- Deployment automated with GitHub Actions.
- Output files synced to the EC2 instance using `rsync`.

## Live Site

Visit [migueltrinidad.com](https://migueltrinidad.com/) to see the live website.
