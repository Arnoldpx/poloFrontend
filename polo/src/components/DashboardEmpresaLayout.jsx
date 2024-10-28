import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Navbar/EmpresaSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EmpresaDashboardLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/'); // Redirige a la página de inicio de sesión si no está autenticado
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>No estás autenticado</div>;
  }

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        {/* Sidebar de la empresa */}
        <div className="col-lg-2 col-md-3 col-12 h-100" style={{ backgroundColor: '#343a40' }}>
          <Sidebar />
        </div>

        {/* Contenido del Dashboard de la empresa */}
        <div className="col-lg-10 col-md-9 col-12 h-100">
          <div className="w-100 p-4">
            <Outlet /> {/* Aquí se renderizan las subrutas */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpresaDashboardLayout;
