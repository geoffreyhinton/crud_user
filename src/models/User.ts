import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AppDataSource } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user';

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  phone?: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  phone?: string;
  role?: 'admin' | 'user';
  isActive?: boolean;
}

export interface UserQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'admin' | 'user';
  isActive?: boolean;
}

export class UserService {
  private get userRepository() {
    return AppDataSource.getRepository(User);
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, userData);
    user.id = uuidv4();
    return await this.userRepository.save(user);
  }

  async getAllUsers(query: UserQueryDto): Promise<{ users: User[]; total: number; page: number; totalPages: number }> {
    const { page = 1, limit = 10, search, role, isActive } = query;
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder.andWhere(
        '(user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    const total = await queryBuilder.getCount();
    const users = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('user.createdAt', 'DESC')
      .getMany();

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return await this.getUserById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected! > 0;
  }

  async softDeleteUser(id: string): Promise<User | null> {
    return await this.updateUser(id, { isActive: false });
  }
}

export const userService = new UserService();