import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Navbar/Navbar';
import FormularioRegistro from '../../components/Formulario/Formulario';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = Cookies.get('token');
      console.log('Token obtenido de las cookies:', token);

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/'); // Redirige a la página de inicio de sesión si no está autenticado
      }
    };
    checkAuthentication();
  }, [navigate]);

  const onLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    navigate('/'); // Redirige a la página de inicio de sesión después de cerrar sesión
  };

  if (!isAuthenticated) {
    return <div>No estás autenticado</div>;
  }

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-lg-2 col-md-3 col-12 h-100" style={{ backgroundColor: '#343a40' }}>
          <Sidebar />
        </div>

        {/* Formulario de Registro siempre visible */}
        <div className="col-lg-10 col-md-9 col-12 h-100 d-flex justify-content-center align-items-center">
          <div className="w-100 p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
            <FormularioRegistro />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
