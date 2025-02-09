import { Store } from '../../interface/store.interface';
import apiClient from '../../utils/axiosConfig';


// Obtener todos los roles
export async function getAllStores(): Promise<Store[]> {
  const response = await apiClient.get<Store[]>('/stores');
  return response.data;
}