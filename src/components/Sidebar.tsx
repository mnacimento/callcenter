import { HomeIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="h-full w-64 bg-white border-r border-gray-200 shadow-md px-4 py-6">
      <ul className="space-y-2">
      <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              }`
            }
          >
            <HomeIcon className="h-8 w-8 mr-3 text-blue-500" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/roles"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              }`
            }
          >
            <ShieldCheckIcon className="h-8 w-8 mr-3 text-red-500" />

            Gestión de Roles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              `flex items-center px-2 py-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              }`
            }
          >
            <UserGroupIcon className="h-8 w-8 mr-3 text-green-500" />

            Gestión de Usuarios
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
