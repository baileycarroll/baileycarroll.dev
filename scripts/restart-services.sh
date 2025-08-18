#!/bin/bash

echo "🔄 Restarting development services..."

# Kill existing processes
echo "📋 Stopping existing processes..."
pkill -f "next dev" || true
pkill -f "prisma studio" || true

# Wait a moment for processes to stop
sleep 2

# Disconnect any remaining database connections
echo "🔌 Disconnecting database connections..."
pnpm tsx scripts/disconnect-db.ts

# Wait for connections to close
sleep 3

# Regenerate Prisma client
echo "🔧 Regenerating Prisma client..."
pnpm prisma generate

# Start services in background
echo "🚀 Starting development server..."
pnpm dev &
DEV_PID=$!

echo "🚀 Starting Prisma Studio..."
pnpm prisma studio &
STUDIO_PID=$!

echo "✅ Services restarted!"
echo "   - Development server PID: $DEV_PID"
echo "   - Prisma Studio PID: $STUDIO_PID"
echo ""
echo "📊 Check your database management site to see if connections are reduced."
echo "   You should see fewer than 7 connections now."
