import { Role, RoleInput, RoleUpdateInput } from '../../interface/role.interface';
import apiClient from '../../utils/axiosConfig';


// Obtener todos los roles
export async function getAllRoles(): Promise<Role[]> {
  const response = await apiClient.get<Role[]>('/roles');
  return response.data;
}

// Crear un nuevo rol
export async function createRole(newRole: RoleInput): Promise<Role> {
  const response = await apiClient.post<Role>('/roles', newRole);
  return response.data;
}

// Actualizar un rol existente
export async function updateRoleService(id: string, roleData: RoleUpdateInput): Promise<Role> {
  const response = await apiClient.patch<Role>(`/roles/${id}`, roleData);
  return response.data;
}
