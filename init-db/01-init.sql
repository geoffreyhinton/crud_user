-- Initialize the database with proper charset and collation
ALTER DATABASE crud_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant additional privileges if needed
GRANT ALL PRIVILEGES ON crud_api.* TO 'crud_user'@'%';
FLUSH PRIVILEGES;

-- Create indexes for better performance (optional)
-- These will be created automatically by TypeORM, but you can pre-create them here if needed