import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Navbar/Navbar';
import FormularioRegistro from '../../components/Formulario/Formulario';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Asegúrate de que api esté correctamente configurado

const Dashboardata = () => {
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/getallBD', { 
            headers: { Authorization: `Bearer ${Cookies.get('token')}` } 
          });
          setUsers(response.data);
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
          setIsAuthenticated(false); // En caso de error, asegúrate de desautenticar al usuario
          navigate('/'); // Redirige al inicio de sesión si hay un error
        }
      };
      fetchUsers();
    }
  }, [isAuthenticated, navigate]);

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
      <Sidebar/>
    </div>

    {/* Formulario */}
    <div className="col-lg-10 col-md-9 col-12 h-100 d-flex justify-content-center align-items-center">
      <div className="w-100 p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
        <Formulario />
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboardata;
