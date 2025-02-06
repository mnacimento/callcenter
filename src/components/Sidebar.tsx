import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="h-full w-64 bg-white border-r border-gray-200 shadow-md px-4 py-6">
      <ul className="space-y-2">
        <li>
          <Link
            to="/dashboard" 
            className="block px-2 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="block px-2 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Perfil
          </Link>
        </li>
        <li>
          <Link
            to="/reports"
            className="block px-2 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Reportes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
