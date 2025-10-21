import { Router } from 'express';
import { userController } from '../controllers/userController';
import { validateRequest, createUserSchema, updateUserSchema, queryUsersSchema, uuidSchema } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Create a new user
router.post('/', 
  validateRequest(createUserSchema, 'body'),
  asyncHandler(userController.createUser.bind(userController))
);

// Get all users with optional filtering and pagination
router.get('/', 
  validateRequest(queryUsersSchema, 'query'),
  asyncHandler(userController.getAllUsers.bind(userController))
);

// Get a specific user by ID
router.get('/:id', 
  validateRequest(uuidSchema, 'params'),
  asyncHandler(userController.getUserById.bind(userController))
);

// Update a user
router.put('/:id', 
  validateRequest(uuidSchema, 'params'),
  validateRequest(updateUserSchema, 'body'),
  asyncHandler(userController.updateUser.bind(userController))
);

// Delete a user (hard delete)
router.delete('/:id', 
  validateRequest(uuidSchema, 'params'),
  asyncHandler(userController.deleteUser.bind(userController))
);

// Soft delete a user (deactivate)
router.patch('/:id/deactivate', 
  validateRequest(uuidSchema, 'params'),
  asyncHandler(userController.softDeleteUser.bind(userController))
);

export default router;