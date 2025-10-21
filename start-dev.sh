#!/bin/bash

# Build and start all services
echo "🚀 Starting development environment..."

# Start only database and phpMyAdmin for development
docker-compose -f docker-compose.dev.yml up -d

echo "📊 MySQL and phpMyAdmin are starting up..."
echo "⏳ Waiting for MySQL to be ready..."

# Wait for MySQL to be ready
until docker exec crud-mysql-dev mysqladmin ping -h "localhost" --silent; do
    echo "⏳ Waiting for MySQL..."
    sleep 2
done

echo "✅ MySQL is ready!"
echo "🌐 phpMyAdmin: http://localhost:8082"
echo "📊 MySQL: localhost:3306"
echo ""
echo "Database Credentials:"
echo "  Database: crud_api"
echo "  Username: crud_user" 
echo "  Password: crud_password"
echo ""
echo "🔧 Now run 'npm run dev' to start the API server"