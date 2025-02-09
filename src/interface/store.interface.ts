import { User } from "./user.interface";

export interface Store {
    id: string;
    name: string;
    addess: string;
    phone: string;
    menu: number;
    xCoord: string;
    yCoord: string;
    user?: User[];
    createdAt: string;
    updatedAt: string;
}

export interface StoreInput {
    name: string;
    addess: string;
    phone: string;
    menu: number;
    xCoord: string;
    yCoord: string;
}