import { Role } from './role.interface';

export interface Permission {
    id: string;
    resource: string;
    target: string;
    createdAt: string;
    updatedAt: string;
    roles: Role[];
}
