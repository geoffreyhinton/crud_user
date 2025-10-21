import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiError } from './errorHandler';

export const validateRequest = (schema: Joi.Schema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req[property]);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      throw new ApiError(`Validation error: ${errorMessage}`, 400);
    }
    
    next();
  };
};

// User validation schemas
export const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
  age: Joi.number().integer().min(1).max(150).optional(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
  role: Joi.string().valid('admin', 'user').optional()
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).optional(),
  lastName: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().integer().min(1).max(150).optional(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
  role: Joi.string().valid('admin', 'user').optional(),
  isActive: Joi.boolean().optional()
});

export const queryUsersSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  search: Joi.string().max(255).optional(),
  role: Joi.string().valid('admin', 'user').optional(),
  isActive: Joi.boolean().optional()
});

export const uuidSchema = Joi.object({
  id: Joi.string().uuid().required()
});