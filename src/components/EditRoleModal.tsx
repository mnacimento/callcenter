import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllUsers } from '../store/slices/user/usersSlice';
import { selectAllPermissions } from '../store/slices/permission/permissionsSlice';
import { Role, RoleUpdateInput } from '../interface/role.interface';
import { showSpinner, hideSpinner } from '../store/slices/spinner/spinnerSlice';
import { getAllRoles, updateRoleService } from '../services/roles/rolesServices';
import { setRoles } from '../store/slices/roles/rolesSlice';

interface EditRoleModalProps {
    role: Role;
    onClose: () => void;
    onSave: (updated: Role) => void;
}

export default function EditRoleModal({ role, onClose }: EditRoleModalProps) {
    const users = useAppSelector(selectAllUsers);
    const permissions = useAppSelector(selectAllPermissions);
    const dispatch = useAppDispatch();

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es requerido'),
        description: Yup.string(),
        isActive: Yup.boolean(),
        usersIds: Yup.array().of(Yup.string()),
        permissionsIds: Yup.array().of(Yup.string()),
    });

    const formik = useFormik({
        initialValues: {
            name: role.name,
            description: role.description,
            isActive: role.isActive,
            usersIds: role.users ? role.users.map((user) => user.id) : [],
            permissionsIds: role.permissions ? role.permissions.map((perm) => perm.id) : [],
        },
        validationSchema,
        onSubmit: async (values) => {
            dispatch(showSpinner());
            try {
                const roleUpdateData: RoleUpdateInput = {
                    name: values.name,
                    description: values.description || '',
                    isActive: values.isActive,
                    usersIds: values.usersIds,
                    permissionsIds: values.permissionsIds,
                };
                await updateRoleService(role.id, roleUpdateData);
                const fetchedRoles: Role[] = await getAllRoles();
                dispatch(setRoles(fetchedRoles));
                onClose();
            } catch (error) {
                console.error('Error al guardar cambios:', error);
            } finally {
                dispatch(hideSpinner());
            }
        },
    });

    const handleUserChange = (userId: string) => {
        if (formik.values.usersIds.includes(userId)) {
            formik.setFieldValue(
                'usersIds',
                formik.values.usersIds.filter((id) => id !== userId)
            );
        } else {
            formik.setFieldValue('usersIds', [...formik.values.usersIds, userId]);
        }
    };

    const handlePermissionChange = (permId: string) => {
        if (formik.values.permissionsIds.includes(permId)) {
            formik.setFieldValue(
                'permissionsIds',
                formik.values.permissionsIds.filter((id) => id !== permId)
            );
        } else {
            formik.setFieldValue('permissionsIds', [...formik.values.permissionsIds, permId]);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white w-full max-w-lg rounded shadow p-6 relative overflow-y-auto max-h-full">
                <h2 className="text-xl font-bold mb-4">Editar Rol</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            name="name"
                            type="text"
                            className={`w-full border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2`}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    {/* isActive */}
                    <div className="flex items-center gap-2">
                        <input
                            name="isActive"
                            type="checkbox"
                            checked={formik.values.isActive}
                            onChange={formik.handleChange}
                        />
                        <label>¿Activo?</label>
                    </div>

                    {/* Selección múltiple de Usuarios */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Usuarios
                        </label>
                        <div className="max-h-40 overflow-y-auto border border-gray-300 rounded px-2 py-1">
                            {users.map((user) => (
                                <div key={user.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`user-${user.id}`}
                                        name="usersIds"
                                        value={user.id}
                                        checked={formik.values.usersIds.includes(user.id)}
                                        onChange={() => handleUserChange(user.id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`user-${user.id}`}>
                                        {user.name} {user.lastName} ({user.email})
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formik.touched.usersIds && formik.errors.usersIds && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.usersIds}</p>
                        )}
                    </div>

                    {/* Selección múltiple de Permisos */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Permisos
                        </label>
                        <div className="max-h-40 overflow-y-auto border border-gray-300 rounded px-2 py-1">
                            {permissions.map((perm) => (
                                <div key={perm.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`perm-${perm.id}`}
                                        name="permissionsIds"
                                        value={perm.id}
                                        checked={formik.values.permissionsIds.includes(perm.id)}
                                        onChange={() => handlePermissionChange(perm.id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`perm-${perm.id}`}>
                                        {perm.resource} ({perm.target})
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formik.touched.permissionsIds && formik.errors.permissionsIds && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.permissionsIds}</p>
                        )}
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded flex items-center"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
