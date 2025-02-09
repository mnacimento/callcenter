import { useEffect, useState } from 'react';
import { setRoles, addRole, updateRole } from '../store/slices/roles/rolesSlice';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import CreateRoleModal from '../components/CreateRoleModal';
import EditRoleModal from '../components/EditRoleModal';
import { useAppSelector } from '../store/hooks';
import { createRole as createRoleService, getAllRoles, updateRoleService } from '../services/roles/rolesServices';
import { setUsers } from '../store/slices/user/usersSlice';

import { setPermissions } from '../store/slices/permission/permissionsSlice';

import Spinner from '../components/Spinner';
import { Role, RoleInput } from '../interface/role.interface';
import { User } from '../interface/user.interface';
import { getAllUsers } from '../services/users/usersServices';
import { Permission } from '../interface/permission.interface';
import { getAllPermissions } from '../services/permission/permissionService';
import { showSpinner, hideSpinner } from '../store/slices/spinner/spinnerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../components/Paginator';
import { updatePagination, resetPagination } from "../store/slices/paginator/Paginator";
import { RootState } from '../store/store';


export default function RolesPage() {
    const navigate = useNavigate();
    const username = 'Juan Pérez';
    const appName = 'AGENT ORDERING ONLINE';

    const dispatch = useDispatch();

    const roles = useAppSelector((state) => state.roles.list);
    const users = useAppSelector((state) => state.users.list);
    const permissions = useAppSelector((state) => state.permissions.list);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [isCreating, setIsCreating] = useState(false);
    const paginator = useSelector((state: RootState) => state.paginator);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(showSpinner());
                dispatch(resetPagination());

                const fetchedRoles: Role[] = await getAllRoles();
                dispatch(setRoles(fetchedRoles));

                const fetchedUsers: User[] = await getAllUsers();
                dispatch(setUsers(fetchedUsers));

                const fetchedPermissions: Permission[] = await getAllPermissions();
                dispatch(setPermissions(fetchedPermissions));
            } catch (error) {
                console.error('Error al obtener datos:', error);
            } finally {
                dispatch(hideSpinner());
            }
        };

        fetchData();
    }, [dispatch]);

    const handlePageChange = (newPage: number) => {
        console.log();

    };

    const handleLogout = () => {
        navigate('/');
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreate = async (newRole: RoleInput) => {
        try {
            setIsCreating(true);
            const createdRole: Role = await createRoleService(newRole);
            dispatch(addRole(createdRole));
            closeCreateModal();
        } catch (error) {
            console.error('Error al crear rol:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedRole(null);
    };

    const handleSaveEdit = async (updated: Role) => {
        try {
            const roleInput: RoleInput & { id: string } = {
                id: updated.id,
                name: updated.name,
                description: updated.description,
                isActive: updated.isActive,
                usersIds: updated.users.map((user) => user.id),
                permissionsIds: updated.permissions.map((perm) => perm.id),
            };

            const updatedRole: Role = await updateRoleService(roleInput);
            dispatch(updateRole(updatedRole));
            closeEditModal();
        } catch (error) {
            console.error('Error al actualizar rol:', error);
        }
    };

    return (
        <DashboardLayout appName={appName} username={username} onLogout={handleLogout}>
            {/* Encabezado + Botón */}
            <div className="flex flex-col md:flex-row md:items-center justify-start gap-2">
                <h1 className="text-2xl font-semibold">Gestión de Roles</h1>
            </div>
            <div className='py-4'>
            <button
                    onClick={openCreateModal}
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto flex items-center justify-center ${isCreating ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isCreating}
                >
                    {isCreating && <Spinner />}
                    Crear Nuevo Rol
            </button>
            </div>


            {/* Tabla de Roles o Spinner de Carga */}
            <div className="overflow-x-auto bg-white rounded shadow ">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-red-300">
                        <tr>
                            <th className="px-4 py-2 border-b text-left">ID</th>
                            <th className="px-4 py-2 border-b text-left">Nombre</th>
                            <th className="px-4 py-2 border-b text-left">Descripción</th>
                            <th className="px-4 py-2 border-b text-left">Activo</th>
                            <th className="px-4 py-2 border-b text-left">Usuarios</th>
                            <th className="px-4 py-2 border-b text-left">Permisos</th>
                            <th className="px-4 py-2 border-b text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            
                            <tr key={role.id} className="hover:bg-gray-50 even:bg-red-100 even:hover:bg-red-200 odd:bg-white odd:hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{role.id}</td>
                                <td className="px-4 py-2 border-b">{role.name}</td>
                                <td className="px-4 py-2 border-b">{role.description}</td>
                                <td className="px-4 py-2 border-b">{role.isActive ? 'Sí' : 'No'}</td>
                                <td className="px-4 py-2 border-b">
                                    {role.users && role.users.length > 0
                                        ? role.users.map((user) => user.name).join(', ')
                                        : 'Ninguno'}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    {role.permissions && role.permissions.length > 0
                                        ? role.permissions.map((perm) => `${perm.resource} (${perm.target})`).join(', ')
                                        : 'Ninguno'}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleEdit(role)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                <Paginator
                    totalPages={Number(paginator.totalPages)}
                    currentPage={Number(paginator.pageNumber)}
                    onPageChange={handlePageChange}
                />
            </div>
            {/* Modal de Crear */}
            {isCreateModalOpen && (
                <CreateRoleModal onClose={closeCreateModal} onCreate={handleCreate} />
            )}

            {/* Modal de Editar */}
            {isEditModalOpen && selectedRole && (
                <EditRoleModal
                    role={selectedRole}
                    onClose={closeEditModal}
                    onSave={handleSaveEdit}
                />
            )}
        </DashboardLayout>
    );
}
