# Bailey Carroll - Professional Site

A professional portfolio site built with Next.js 15 for presenting Bailey Carroll&apos;s platform, software, and infrastructure work. The current app focuses on the professional experience only: `Home`, `About`, `Resume`, and `Projects`.

## Overview

- Public-facing professional site only
- Polished responsive UI with motion and editorial layout treatment
- Dynamic professional content currently sourced from the local PostgreSQL/Prisma data layer
- Prepared for a later migration to an external Admin App API

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
   ```

4. Prepare the database:
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

5. Start the app:
   ```bash
   pnpm dev
   ```

## Near-Term Architecture

This repository is in the middle of a staged split into three products:

- professional site: this repository
- personal site: separate repository/app
- admin/developer portal: separate repository/app

For now, the professional site still reads its project, skill, and experience data from the local Prisma-backed database layer. The next planned step is to replace that local data path with an external API client for the future Admin App.
