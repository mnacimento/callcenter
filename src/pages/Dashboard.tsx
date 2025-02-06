import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard() {
  const username = 'Juan Pérez';
  const appName = 'Callcenter App';
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <DashboardLayout
      appName={appName}
      username={username}
      onLogout={handleLogout}
    >
      <h1 className="text-2xl font-semibold">Bienvenido al Dashboard</h1>
      <p className="mt-4 text-gray-700">
        Aquí irá el contenido principal de tu dashboard.
      </p>
    </DashboardLayout>
  );
}
