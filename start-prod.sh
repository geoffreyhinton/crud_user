#!/bin/bash

# Build and start all services in production mode
echo "🚀 Starting production environment..."

# Build and start all services
docker-compose up --build -d

echo "⏳ Waiting for all services to be ready..."

# Wait for MySQL to be ready
until docker exec crud-mysql mysqladmin ping -h "localhost" --silent; do
    echo "⏳ Waiting for MySQL..."
    sleep 2
done

echo "✅ All services are ready!"
echo ""
echo "🌐 API Server: http://localhost:3000"
echo "🌐 phpMyAdmin: http://localhost:8082"
echo "📊 MySQL: localhost:3306"
echo ""
echo "Database Credentials:"
echo "  Database: crud_api"
echo "  Username: crud_user"
echo "  Password: crud_password"