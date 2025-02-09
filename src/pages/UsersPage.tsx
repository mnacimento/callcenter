import React, { useEffect, useState } from 'react';
import { setUsers, addUser, updateUser } from '../store/slices/user/usersSlice';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { createUser as createUserService, getAllUsers, updateUserService } from '../services/users/usersServices';
import { showSpinner, hideSpinner } from '../store/slices/spinner/spinnerSlice';
import { selectAllRoles, setRoles } from '../store/slices/roles/rolesSlice';
import { getAllRoles as getAllRolesService } from '../services/roles/rolesServices';
import { User, UserInput } from '../interface/user.interface';
import { selectAllStores, setStores } from '../store/slices/stores/storesSlice';
import { getAllStores } from '../services/stores/storesServices';
import Paginator from '../components/Paginator';
import { updatePagination, resetPagination } from "../store/slices/paginator/Paginator";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


export default function UsersPage() {
    const navigate = useNavigate();
    const username = 'Juan Pérez';
    const appName = 'AGENT ORDERING ONLINE';
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.users.list);
    const roles = useAppSelector(selectAllRoles);
    const stores = useAppSelector(selectAllStores);
    const paginator = useSelector((state: RootState) => state.paginator);


    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(showSpinner());
                dispatch(resetPagination());

                const fetchedUsers: User[] = await getAllUsers();
                dispatch(setUsers(fetchedUsers));

                const fetchedRoles = await getAllRolesService();
                dispatch(setRoles(fetchedRoles));

                const fetchedStores = await getAllStores();
                dispatch(setStores(fetchedStores));
            } catch (error) {
                console.error('Error al obtener usuarios o roles:', error);
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

    const handleCreate = async (newUser: UserInput) => {
        try {
            dispatch(showSpinner());
            const createdUser: User = await createUserService(newUser);
            dispatch(addUser(createdUser));
            closeCreateModal();
        } catch (error) {
            console.error('Error al crear usuario:', error);
        } finally {
            dispatch(hideSpinner());
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveEdit = async (updated: User) => {
        try {
            dispatch(showSpinner());
            const updatedUserData: User = await updateUserService(updated);
            dispatch(updateUser(updatedUserData));
            closeEditModal();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        } finally {
            dispatch(hideSpinner());
        }
    };

    return (
        <DashboardLayout appName={appName} username={username} onLogout={handleLogout}>
            {/* Encabezado + Botón de Crear */}
            <div className="flex flex-col md:flex-row md:items-center justify-start gap-2">
                <h1 className="text-2xl font-semibold">Gestión de Usuarios</h1>
            </div>

            <div className='py-4'>
            <button
                    onClick={openCreateModal}
                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto flex items-center justify-center`}
                >
                    Crear Nuevo Usuario
                </button>
            </div>

            {/* Lista de Usuarios */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-green-300">
                        <tr>
                            <th className="px-4 py-2 border-b text-left">ID</th>
                            <th className="px-4 py-2 border-b text-left">Nombre</th>
                            <th className="px-4 py-2 border-b text-left">Apellido</th>
                            <th className="px-4 py-2 border-b text-left">Email</th>
                            <th className="px-4 py-2 border-b text-left">Activo</th>
                            <th className="px-4 py-2 border-b text-left">Rol</th>
                            <th className="px-4 py-2 border-b text-left">Tiendas</th>
                            <th className="px-4 py-2 border-b text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const userRole = roles.find(role => role.id === user.roleId);

                            const userStoreIds = user.stores?.map(store => store?.id) || [];

                            const userStores = stores.filter(store => userStoreIds.includes(store.id));
                            return (
                                <tr key={user.id} className="hover:bg-gray-50 even:bg-green-100 even:hover:bg-green-200 odd:bg-white odd:hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{user.id}</td>
                                    <td className="px-4 py-2 border-b">{user.name}</td>
                                    <td className="px-4 py-2 border-b">{user.lastName}</td>
                                    <td className="px-4 py-2 border-b">{user.email}</td>
                                    <td className="px-4 py-2 border-b">{user.isActive ? 'Sí' : 'No'}</td>
                                    <td className="px-4 py-2 border-b">{userRole ? userRole.name : 'Sin Rol'}</td>
                                    <td className="px-4 py-2 border-b">
                                        {userStores.length > 0
                                            ? userStores.map(store => store.name).join(', ')
                                            : 'Sin Tiendas'}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>


            </div>
            {/* Componente Paginator */}
            <div className="mt-4 flex justify-center">
                <Paginator
                    totalPages={Number(paginator.totalPages)}
                    currentPage={Number(paginator.pageNumber)}
                    onPageChange={handlePageChange}
                />
            </div>
            {isCreateModalOpen && (
                <CreateUserModal onClose={closeCreateModal} onCreate={handleCreate} />
            )}

            {isEditModalOpen && selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onClose={closeEditModal}
                    onSave={handleSaveEdit}
                />
            )}
        </DashboardLayout>
    );
}
