# Database Setup Instructions

## Option 1: Using Root User (Recommended for Development)

1. **Connect to MySQL as root:**
```bash
mysql -u root -p
```

2. **Create the database:**
```sql
CREATE DATABASE crud_api;
```

3. **Create a dedicated user for the application:**
```sql
CREATE USER 'crud_user'@'localhost' IDENTIFIED BY 'your_secure_password';
```

4. **Grant necessary privileges:**
```sql
GRANT ALL PRIVILEGES ON crud_api.* TO 'crud_user'@'localhost';
FLUSH PRIVILEGES;
```

5. **Verify the setup:**
```sql
SHOW DATABASES;
SELECT User, Host FROM mysql.user WHERE User = 'crud_user';
```

6. **Exit MySQL:**
```sql
EXIT;
```

## Option 2: Using Existing express_user

If you want to continue using `express_user`, you need to grant it database creation privileges:

1. **Connect as root:**
```bash
mysql -u root -p
```

2. **Grant database creation privileges to express_user:**
```sql
GRANT CREATE ON *.* TO 'express_user'@'%';
FLUSH PRIVILEGES;
```

3. **Create the database:**
```sql
CREATE DATABASE crud_api;
GRANT ALL PRIVILEGES ON crud_api.* TO 'express_user'@'%';
FLUSH PRIVILEGES;
```

## Option 3: Manual Database Creation (Easiest)

Since you already have access to phpMyAdmin or MySQL interface:

1. **Use the root user or admin account to create the database manually**
2. **In phpMyAdmin or MySQL Workbench:**
   - Create new database named: `crud_api`
   - Set charset to: `utf8mb4`
   - Set collation to: `utf8mb4_unicode_ci`

## Update Environment Configuration

After setting up the database, update your `.env` file:

```env
# If using new user
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=crud_user
DB_PASSWORD=your_secure_password
DB_DATABASE=crud_api

# If continuing with express_user
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=express_user
DB_PASSWORD=express_password
DB_DATABASE=crud_api
```

## Test Database Connection

You can test the connection using this command:

```bash
mysql -u crud_user -p crud_api
```

Or if using express_user:
```bash
mysql -u express_user -p crud_api
```

## Troubleshooting

### Error: Access denied for user
- Make sure you're using a user with sufficient privileges
- Verify the username and password are correct
- Check if the user has CREATE database privileges

### Error: Unknown database
- Ensure the database name matches exactly (case-sensitive on some systems)
- Verify the database was created successfully

### Connection refused
- Make sure MySQL service is running
- Check if the port (default 3306) is correct
- Verify the host address

## Alternative: Using Docker MySQL

If you prefer, you can also run MySQL in Docker:

```bash
# Run MySQL in Docker
docker run --name mysql-crud \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=crud_api \
  -e MYSQL_USER=crud_user \
  -e MYSQL_PASSWORD=userpassword \
  -p 3306:3306 \
  -d mysql:8.0

# Update .env file accordingly
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=crud_user
DB_PASSWORD=userpassword
DB_DATABASE=crud_api
```