import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserInput } from '../interface/user.interface';
import { showSpinner, hideSpinner } from '../store/slices/spinner/spinnerSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllRoles } from '../store/slices/roles/rolesSlice';
import { selectAllStores } from '../store/slices/stores/storesSlice';


interface CreateUserModalProps {
    onClose: () => void;
    onCreate: (data: UserInput) => void;
}

export default function CreateUserModal({ onClose, onCreate }: CreateUserModalProps) {
    const dispatch = useAppDispatch();
    const roles = useAppSelector(selectAllRoles);
    const stores = useAppSelector(selectAllStores);

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es requerido'),
        lastName: Yup.string().required('El apellido es requerido'),
        email: Yup.string().email('Email inválido').required('El email es requerido'),
        isActive: Yup.boolean(),
        password: Yup.string().required('La contraseña es requerida'),
        roleId: Yup.string().required('El rol es requerido'),
        storeIds: Yup.array().of(Yup.string()),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            isActive: true,
            password: '',
            roleId: '',
            storeIds: [] as string[],
        },
        validationSchema,
        onSubmit: async (values) => {
            dispatch(showSpinner());
            try {
                const userInput: UserInput = {
                    name: values.name,
                    lastName: values.lastName,
                    email: values.email,
                    isActive: values.isActive,
                    password: values.password,
                    roleId: values.roleId,
                    storesIds: values.storeIds,
                };
                await onCreate(userInput);
                onClose();
            } catch (error) {
                console.error('Error al crear usuario:', error);
            } finally {
                dispatch(hideSpinner());
            }
        },
    });

    const handleStoreChange = (storeId: string) => {
        if (formik.values.storeIds.includes(storeId)) {
            formik.setFieldValue(
                'storeIds',
                formik.values.storeIds.filter((id) => id !== storeId)
            );
        } else {
            formik.setFieldValue('storeIds', [...formik.values.storeIds, storeId]);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white w-full max-w-lg rounded shadow p-6 relative overflow-y-auto max-h-full">
                <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>

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

                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <input
                            name="lastName"
                            type="text"
                            className={`w-full border ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2`}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.lastName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            className={`w-full border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2`}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                        )}
                    </div>
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className={`w-full border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2`}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Rol */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rol
                        </label>
                        <select
                            name="roleId"
                            className={`w-full border ${formik.touched.roleId && formik.errors.roleId ? 'border-red-500' : 'border-gray-300'
                                } rounded px-3 py-2`}
                            value={formik.values.roleId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option key={0} value="0">Seleccione un rol</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.roleId && formik.errors.roleId && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.roleId}</p>
                        )}
                    </div>

                    {/* Tiendas */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tiendas (Opcional)
                        </label>
                        <div className="max-h-40 overflow-y-auto border border-gray-300 rounded px-2 py-1">
                            {stores.map((store) => (
                                <div key={store.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`store-${store.id}`}
                                        name="storeIds"
                                        value={store.id}
                                        checked={formik.values.storeIds.includes(store.id)}
                                        onChange={() => handleStoreChange(store.id)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`store-${store.id}`}>
                                        {store.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formik.touched.storeIds && formik.errors.storeIds && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.storeIds}</p>
                        )}
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
