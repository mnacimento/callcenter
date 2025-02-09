import { Permission } from '../../interface/permission.interface';
import apiClient from '../../utils/axiosConfig';

// Obtener todos los permisos
export async function getAllPermissions(): Promise<Permission[]> {
    const response = await apiClient.get<Permission[]>('/permissions');
    return response.data;
}
