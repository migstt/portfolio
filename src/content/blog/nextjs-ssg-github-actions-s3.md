---
title: "Build & Upload Next.js Static Export to S3 with GitHub Actions"
date: "2025-08-21"
description: "Step-by-step guide to build a Next.js 15 static export and upload the output to an S3 bucket using GitHub Actions."
---

## Prerequisites

You should have:

- **GitHub repository** containing your Next.js project
- **Node.js** installed locally for development
- **AWS account** with permissions to create IAM users and S3 buckets
- **S3 bucket** created for storing your build output


## 1. Create an S3 Bucket

1. Go to **AWS Console → S3 → Create Bucket**
2. Fill in:
    - **Bucket name:** unique, e.g., `my-nextjs-artifacts`
    - **Region:** e.g., `ap-southeast-1`
    - **Block all public access:** enabled (recommended)
    - **Object ownership:** Bucket owner enforced
3. Click **Create bucket**

> Keep the bucket private. GitHub Actions will use credentials to upload files.


## 2. Create an IAM User for GitHub Actions

1. Go to **AWS Console → IAM → Users → Add user**
2. Name: `github-actions-deployer`
3. Access type: **Programmatic access** (creates access key ID & secret access key)
4. Click **Next → Attach policies directly**
5. Create a custom policy or use the following **minimal permissions policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-nextjs-artifacts",
        "arn:aws:s3:::my-nextjs-artifacts/*"
      ]
    }
  ]
}
```

Replace `my-nextjs-artifacts` with your bucket name.

6. Click **Next → Create user**
7. Save the **Access Key ID** and **Secret Access Key** — you will need them for GitHub Secrets.

## 3. Add GitHub Secrets

Go to your repository:

**Settings → Secrets and variables → Actions → New repository secret**

Add:

- `AWS_ACCESS_KEY_ID` → the IAM user access key
- `AWS_SECRET_ACCESS_KEY` → the IAM user secret key
- `AWS_REGION` → the region your S3 bucket is in, e.g., `ap-southeast-1`
- `AWS_S3_BUCKET` → your S3 bucket name, e.g., `my-nextjs-artifacts`

## 4. GitHub Actions Workflow

Create `.github/workflows/build-and-upload.yml`:

```yaml
name: Build & Upload Next.js Static Export

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
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

      - name: Build Next.js static export
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Sync files to S3
        run: |
          aws s3 sync ./out/ s3://${{ secrets.AWS_S3_BUCKET }} --delete
```

### How it works

- **Checkout** → pulls the repo code
- **Setup Node.js** → installs Node.js version 20
- **Install dependencies** → npm ci for exact package versions
- **Build Next.js** → outputs static files in `/out/`
- **Configure AWS** → sets up AWS CLI using GitHub Secrets
- **Sync to S3** → uploads `/out/` to your private S3 bucket, removing old files

## 5. Verify Upload

1. Go to your S3 bucket in AWS Console
2. You should see the newly built files
3. The bucket remains private; only your IAM user (via GitHub Actions) can modify it

## 6. Best Practices

- Keep your S3 bucket private and use least privilege IAM policy
- Rotate AWS keys periodically
- Always test GitHub Actions in a separate branch before deploying production
- Use meaningful commit messages so your GitHub Actions runs are easy to track