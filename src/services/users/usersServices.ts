import { User, UserInput, UserUpdateInput } from '../../interface/user.interface';
import apiClient from '../../utils/axiosConfig';

// Obtener todos los usuarios
export async function getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
}

export async function createUser(newUser: UserInput): Promise<User> {
    const response = await apiClient.post<User>('/users', newUser);
    return response.data;
}

// Actualizar un usuario existente
export async function updateUserService(id: string, updatedUser: UserUpdateInput): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, updatedUser);
    return response.data;
}