// src/interfaces/user.interface.ts

import { Role } from "./role.interface";
import { Store } from "./store.interface";

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    roleId: string;
    role?: Role;
    stores?: Store[];
    createdAt: string;
    updatedAt: string;
}

export interface UserInput {
    name: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    roleId: string;
    storesIds?: string[];
}

export interface UserUpdateInput {
    name: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    roleId: string;
    storesIds?: string[];
}