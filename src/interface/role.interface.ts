import { User } from './user.interface';
import { Permission } from './permission.interface';

export interface Role {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    users: User[];
    permissions: Permission[];
}

export interface RoleInput {
    name: string;
    description: string;
    isActive: boolean;
    usersIds: string[];
    permissionsIds: string[];
}

export interface RoleUpdateInput {
    name: string;
    description: string;
    isActive: boolean;
    usersIds: string[];
    permissionsIds: string[];
}