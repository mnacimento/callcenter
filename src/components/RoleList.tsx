import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Role } from '../interface/role.interface';


interface RolesListProps {
    roles: Role[];
    onEdit: (role: Role) => void;
}

function RolesList({ roles, onEdit }: RolesListProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Nombre</th>
                        <th className="px-4 py-2 border">Descripción</th>
                        <th className="px-4 py-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{role.id}</td>
                            <td className="px-4 py-2 border">{role.name}</td>
                            <td className="px-4 py-2 border">{role.description}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => onEdit(role)}
                                    className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                                >
                                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RolesList;
