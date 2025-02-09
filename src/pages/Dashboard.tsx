import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import background from '../assets/home.jpg';

export default function Dashboard() {
  const username = 'Juan Pérez';
  const appName = 'AGENT ORDERING ONLINE';
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
      {/* <h1 className="text-2xl font-semibold">Bienvenido al Dashboard</h1>
      <p className="mt-4 text-gray-700">
        Aquí irá el contenido principal de tu dashboard.
      </p> */}
    <div
      className="
        w-screen
        h-screen
        bg-cover
        bg-center
        flex
        items-center
        justify-center
      "
      style={{
        backgroundImage: `url(${background})`,
      }}
    ></div>
    </DashboardLayout>
  );
}
