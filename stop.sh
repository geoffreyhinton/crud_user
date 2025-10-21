#!/bin/bash

echo "🛑 Stopping all services..."

# Stop all services
docker-compose down
docker-compose -f docker-compose.dev.yml down

echo "✅ All services stopped!"

# Optional: Remove volumes (uncomment if you want to reset data)
# echo "🗑️  Removing volumes..."
# docker volume rm crud_mysql_data crud_mysql_dev_data 2>/dev/null || true
# echo "✅ Volumes removed!"