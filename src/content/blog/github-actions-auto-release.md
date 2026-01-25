---
title: "Automating GitHub Releases with GitHub Actions"
date: "2025-08-13"
description: "Set up a GitHub Actions workflow to create releases automatically when pushing version tags."
image: "/images/blog/github-actions-auto-release.jpg"
---

This guide shows how to create a GitHub Actions workflow that automatically creates a release whenever you push a version tag.

## Prerequisites

Before starting, make sure you have:

1. **A GitHub Repository** — Your project should already be on GitHub.

2. **A GitHub Personal Access Token (PAT)** — Needed for the workflow to publish releases.
   - Go to **GitHub Settings** → **Developer settings** → **Personal access tokens**.
   - Click **Generate new token** and select the `repo` scope.
   - Store the token as a repository secret (never hardcode it in workflows):
     1. Go to your repository’s **Settings**.
     2. Select **Secrets and variables** → **Actions** → **New repository secret**.
     3. Name it (e.g., `GH_TOKEN`) and paste your token.
     4. Click **Add secret**.

3. **Basic GitHub Actions Knowledge** — If you're new, check the [GitHub Actions docs](https://docs.github.com/actions) first.

## Creating the Workflow

Create a `.github/workflows/create-release.yml` file in your repository:

```yaml
name: Create Release on Tag Push

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: marvinpinto/action-automatic-releases@latest
        with:
          repo_token: ${{ secrets.GH_TOKEN }}
          prerelease: false
```

## How It Works

* **Trigger** — Runs when a tag starting with `v` is pushed (e.g., `v1.0.4`).
* **Action Used** — The `marvinpinto/action-automatic-releases` action handles the release creation process.
* **Key Inputs:**
    * `repo_token` — Your GitHub secret for authentication.
    * `prerelease` — Set to `false` for stable releases.

When you push a tag like `v1.2.0`, GitHub Actions will:
1.  Detect the new tag.
2.  Run the workflow.
3.  Create a release associated with that tag.
