# Bailey Carroll - Professional Site

A professional portfolio site built with Next.js 15 for presenting Bailey Carroll&apos;s platform, software, and infrastructure work. The current app focuses on the professional experience only: `Home`, `About`, `Resume`, and `Projects`.

## Overview

- Public-facing professional site only
- Polished responsive UI with motion and editorial layout treatment
- Dynamic professional content currently sourced from the local PostgreSQL/Prisma data layer
- Self-contained Next.js app with local Prisma data layer and planned in-app admin

## Current Scope

This repository no longer includes:

- writing sections such as articles, books, or poetry
- admin pages or internal content-management UI
- login, setup, or auth flows
- admin/content API routes

The current dynamic data in this repo is limited to professional content used by the public site:

- projects
- skills
- experience

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Prisma
- PostgreSQL

## Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Configure the environment:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
   GOOGLE_ANALYTICS_ID=""
   BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
   BETTER_AUTH_URL="http://localhost:3000"
   ADMIN_EMAIL="you@example.com"
   ADMIN_BOOTSTRAP_PASSWORD="long-random-bootstrap-password"
   AUTH_USER_INIT=false
   ```

4. Prepare the database:
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

5. Bootstrap the admin account (one time only):
   ```bash
   AUTH_USER_INIT=true pnpm auth:bootstrap
   ```

6. Start the app:
   ```bash
   pnpm dev
   ```

7. Complete admin auth setup:
   - Visit `/admin/login` and sign in with your bootstrap password
   - Register your passkey at `/admin/setup-passkey`
   - Remove `ADMIN_BOOTSTRAP_PASSWORD` and set `AUTH_USER_INIT=false` afterward

## Architecture

This repository is a self-contained Next.js application:

- **Public site** — Home, About, Resume, Projects
- **Service layer** — Prisma-backed CRUD in `src/services/database`
- **Planned admin** — Auth, protected routes, and Server Actions in this same app

Public pages read from the service layer today. Admin mutations will call the same services via Server Actions in a later phase.
