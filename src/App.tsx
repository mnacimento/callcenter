import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Spinner from './components/Spinner';
import Dashboard from './pages/Dashboard';
import RolesPage from './pages/Roles';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/usuarios" element={<UsersPage />} />
      </Routes>
      <Spinner/>
    </BrowserRouter>
  );
}

export default App;
