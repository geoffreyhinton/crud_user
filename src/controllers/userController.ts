import { Request, Response } from 'express';
import { userService, CreateUserDto, UpdateUserDto, UserQueryDto } from '../models/User';
import { hashPassword } from '../utils/password';
import { ApiError } from '../middleware/errorHandler';

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;

      // Check if user already exists
      const existingUser = await userService.getUserByEmail(userData.email);
      if (existingUser) {
        throw new ApiError('User with this email already exists', 409);
      }

      // Hash password
      userData.password = await hashPassword(userData.password);

      const user = await userService.createUser(userData);

      // Remove password from response
      const { password, ...userResponse } = user;

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: userResponse
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const query: UserQueryDto = req.query;
      const result = await userService.getAllUsers(query);

      // Remove passwords from response
      const users = result.users.map(({ password, ...user }) => user);

      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: users,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          total: result.total,
          limit: parseInt(String(query.limit)) || 10
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Remove password from response
      const { password, ...userResponse } = user;

      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData: UpdateUserDto = req.body;

      const existingUser = await userService.getUserById(id);
      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Check email uniqueness if email is being updated
      if (userData.email && userData.email !== existingUser.email) {
        const emailExists = await userService.getUserByEmail(userData.email);
        if (emailExists) {
          res.status(409).json({
            success: false,
            message: 'User with this email already exists'
          });
          return;
        }
      }

      const updatedUser = await userService.updateUser(id, userData);

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Remove password from response
      const { password, ...userResponse } = updatedUser;

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async softDeleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.softDeleteUser(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User deactivated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export const userController = new UserController();