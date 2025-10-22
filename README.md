# ExpressJS TypeScript CRUD API

A comprehensive RESTful API built with Express.js, TypeScript, and MySQL for user management with full CRUD operations.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete users
- **TypeScript**: Full type safety and IntelliSense support
- **Database Integration**: MySQL with TypeORM for seamless data management
- **Input Validation**: Joi schemas for request validation
- **Error Handling**: Comprehensive error middleware with custom API errors
- **Security**: Helmet for security headers, bcrypt for password hashing
- **Logging**: Request logging middleware
- **Soft Deletes**: User deactivation without data loss
- **Pagination**: Built-in pagination support for user listings
- **Search**: User search functionality
- **Role Management**: Admin and user role support

## 📁 Project Structure

```
src/
├── controllers/        # Request handlers and business logic
├── database/          # Database connection configuration
├── middleware/        # Custom middleware (validation, error handling, logging)
├── models/           # TypeORM entities and service classes
├── routes/           # API route definitions
├── services/         # Business logic and data access layer
└── utils/            # Utility functions (password hashing, etc.)
```

## 🛠️ Technologies Used

- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MySQL** - Relational database
- **TypeORM** - Object-Relational Mapping
- **Joi** - Data validation
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🚀 Quick Start

### Option 1: Docker (Recommended) 🐳

The easiest way to get started is using Docker Compose:

```bash
# Start MySQL and phpMyAdmin services
npm run docker:dev

# In another terminal, start the API locally  
npm run dev
```

**Services available:**
- 🚀 **API**: `http://localhost:3000`
- 🌐 **phpMyAdmin**: `http://localhost:8082`  
- 📊 **MySQL**: `localhost:3306`

> See [DOCKER.md](./DOCKER.md) for comprehensive Docker setup guide.

### Option 2: Local Setup

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd express-typescript-crud-api
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=crud_api
NODE_ENV=development
PORT=3000
```

#### 4. Database Setup

**Important:** You need to create the database with a user that has CREATE DATABASE privileges.

**Option A: Using MySQL Root User (Recommended)**
```bash
# Connect as root
mysql -u root -p

# Create database and user
CREATE DATABASE crud_api;
CREATE USER 'crud_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON crud_api.* TO 'crud_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

**Option B: Using phpMyAdmin or MySQL Workbench**
- Create a new database named `crud_api`
- Use your admin/root credentials

Then update your `.env` file with the correct database credentials.

📋 **See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed setup instructions and troubleshooting.**

### 5. Run the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 🏥 Health Check
```
GET /api/health
```

#### 👥 Users

| Method | Endpoint | Description | Body/Query Parameters |
|--------|----------|-------------|----------------------|
| `POST` | `/api/users` | Create a new user | `firstName`, `lastName`, `email`, `password`, `age?`, `phone?`, `role?` |
| `GET` | `/api/users` | Get all users with pagination | `page?`, `limit?`, `search?`, `role?`, `isActive?` |
| `GET` | `/api/users/:id` | Get user by ID | - |
| `PUT` | `/api/users/:id` | Update user | `firstName?`, `lastName?`, `email?`, `age?`, `phone?`, `role?`, `isActive?` |
| `DELETE` | `/api/users/:id` | Delete user (hard delete) | - |
| `PATCH` | `/api/users/:id/deactivate` | Soft delete user | - |

### Request/Response Examples

#### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "age": 30,
  "phone": "+1234567890",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "phone": "+1234567890",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Users with Pagination
```bash
GET /api/users?page=1&limit=10&search=john&role=user&isActive=true
```

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "age": 30,
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "totalPages": 1,
    "total": 1,
    "limit": 10
  }
}
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## 🗂️ Database Schema

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | VARCHAR(36) | PRIMARY KEY, UUID |
| firstName | VARCHAR(100) | NOT NULL |
| lastName | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| age | INT | NULLABLE |
| phone | VARCHAR(20) | NULLABLE |
| role | ENUM('admin', 'user') | DEFAULT 'user' |
| isActive | BOOLEAN | DEFAULT true |
| createdAt | TIMESTAMP | AUTO |
| updatedAt | TIMESTAMP | AUTO |

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: TypeORM parameterized queries
- **Security Headers**: Helmet middleware
- **CORS Configuration**: Configurable cross-origin requests
- **Error Handling**: No sensitive information exposure

## 🚀 Deployment

### Using Docker

#### Option 1: Docker Compose (Recommended)

The project includes complete Docker Compose setup with MySQL and phpMyAdmin:

```bash
# Development environment (database + phpMyAdmin only)
npm run docker:dev
npm run dev  # API runs locally

# Production environment (all services in containers)
npm run docker:prod
```

> See [DOCKER.md](./DOCKER.md) for comprehensive Docker documentation.

#### Option 2: Standalone Docker Container

For standalone deployment (requires external database):

1. **Build the image:**
```bash
npm run build
docker build -t express-crud-api .
```

2. **Run with environment variables:**
```bash
docker run -p 3000:3000 \
  -e DB_HOST=your_database_host \
  -e DB_USERNAME=your_db_user \
  -e DB_PASSWORD=your_db_password \
  -e DB_DATABASE=crud_api \
  -e NODE_ENV=production \
  express-crud-api
```

3. **Or use with host network (for local MySQL):**
```bash
# If you have MySQL running locally on host
docker run --network=host \
  -e DB_HOST=localhost \
  -e DB_USERNAME=crud_user \
  -e DB_PASSWORD=crud_password \
  -e DB_DATABASE=crud_api \
  express-crud-api
```

### Environment Variables for Production

```env
NODE_ENV=production
DB_HOST=your_production_host
DB_USERNAME=your_production_user
DB_PASSWORD=your_production_password
JWT_SECRET=your_secure_jwt_secret
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **Port Already in Use**
   - Change the PORT in `.env`
   - Kill the process using the port: `lsof -ti:3000 | xargs kill -9`

3. **TypeScript Compilation Errors**
   - Run `npm run build` to see detailed errors
   - Ensure all dependencies are installed

