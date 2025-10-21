# Docker Setup Guide

This project includes Docker Compose configurations for both development and production environments with MySQL and phpMyAdmin.

## 🐳 Docker Services

- **MySQL 8.0** - Database server
- **phpMyAdmin** - Web-based MySQL administration
- **Express API** - Your CRUD application (production mode only)

## 🚀 Quick Start

### Development Environment (Recommended)

Start only MySQL and phpMyAdmin, run the API locally:

```bash
# Start database services
npm run docker:dev
# or
./start-dev.sh

# In another terminal, start the API locally
npm run dev
```

**Services:**
- 📊 **MySQL**: `localhost:3306`
- 🌐 **phpMyAdmin**: `http://localhost:8082`
- 🚀 **API**: `http://localhost:3000` (local)

### Production Environment

Start all services in Docker containers:

```bash
# Start all services
npm run docker:prod
# or  
./start-prod.sh
```

**Services:**
- 📊 **MySQL**: `localhost:3306`
- 🌐 **phpMyAdmin**: `http://localhost:8082`
- 🚀 **API**: `http://localhost:3000` (containerized)

## 📋 Database Credentials

```
Database: crud_api
Username: crud_user
Password: crud_password
Root Password: rootpassword
```

## 🛠️ Available Commands

```bash
# Development commands
npm run docker:dev      # Start MySQL + phpMyAdmin only
npm run docker:stop     # Stop all services

# Production commands  
npm run docker:prod     # Start all services
npm run docker:up       # Build and start (docker-compose up)
npm run docker:down     # Stop all services
npm run docker:logs     # View container logs

# Database access
npm run docker:mysql    # Connect to MySQL CLI
```

## 🔧 Manual Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Start production environment
docker-compose up --build -d

# Stop services
docker-compose down
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose logs -f
docker-compose logs -f mysql
docker-compose logs -f api

# Connect to MySQL
docker exec -it crud-mysql mysql -u crud_user -p crud_api

# Connect to container shell
docker exec -it crud-api sh
docker exec -it crud-mysql bash
```

## 📁 File Structure

```
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration  
├── Dockerfile                  # API container image
├── .dockerignore              # Docker build exclusions
├── .env.docker                # Docker environment variables
├── start-dev.sh               # Development startup script
├── start-prod.sh              # Production startup script
├── stop.sh                    # Stop all services script
└── init-db/
    └── 01-init.sql           # Database initialization
```

## 🔍 Accessing Services

### phpMyAdmin
1. Open `http://localhost:8082`
2. Login with:
   - **Server**: `mysql`
   - **Username**: `crud_user` 
   - **Password**: `crud_password`

### API Health Check
```bash
curl http://localhost:3000/api/health
```

### Database Direct Access
```bash
# Using Docker
docker exec -it crud-mysql mysql -u crud_user -p crud_api

# Using local MySQL client
mysql -h localhost -P 3306 -u crud_user -p crud_api
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
lsof -i :3306
lsof -i :8082

# Kill process using port
kill -9 <PID>
```

### Reset Database Data
```bash
# Stop services
npm run docker:stop

# Remove volumes (this will delete all data)
docker volume rm crud_mysql_data crud_mysql_dev_data

# Start fresh
npm run docker:dev
```

### View Container Status
```bash
docker ps                      # Running containers
docker ps -a                  # All containers
docker images                 # Available images
docker system df              # Disk usage
```

### Container Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f mysql
docker-compose logs -f api
docker-compose logs -f phpmyadmin
```

### Rebuild Containers
```bash
# Rebuild API container
docker-compose build api

# Rebuild and start all
docker-compose up --build -d

# Force rebuild (no cache)
docker-compose build --no-cache api
```

## 🔐 Security Notes

### Development
- Default passwords are used for convenience
- Database is exposed on localhost:3306
- phpMyAdmin is accessible without additional authentication

### Production
- Change all default passwords in production
- Use Docker secrets for sensitive data
- Consider using environment-specific compose files
- Implement proper network security
- Use HTTPS for phpMyAdmin

## 📊 Performance Monitoring

### Container Resource Usage
```bash
docker stats                   # Live resource usage
docker system df              # Disk usage
docker system prune           # Clean up unused resources
```

### Database Performance
```bash
# Connect to MySQL and run
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Queries';
```

## 🔄 Environment Variables

### Development (.env.docker)
```env
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=crud_user
DB_PASSWORD=crud_password
DB_DATABASE=crud_api
NODE_ENV=development
```

### Production
Create `.env.production` with secure values:
```env
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=crud_user_prod
DB_PASSWORD=very_secure_password
DB_DATABASE=crud_api_prod
NODE_ENV=production
JWT_SECRET=very_long_secure_jwt_secret
```

## 🚀 Deployment

### Local Production Test
```bash
# Build production image
docker-compose build

# Start production environment
docker-compose up -d

# Test the API
curl http://localhost:3000/api/health
```

### Cloud Deployment
1. Push your code to repository
2. Update environment variables for production
3. Use production Docker Compose file
4. Configure reverse proxy (nginx/traefik) for HTTPS
5. Set up monitoring and logging

---

## ✅ Next Steps

1. **Start Development Environment:**
   ```bash
   npm run docker:dev
   npm run dev
   ```

2. **Access phpMyAdmin:** `http://localhost:8082`

3. **Test API:** `http://localhost:3000/api/health`

4. **Create your first user via API or phpMyAdmin**

Happy Docker-ing! 🐳