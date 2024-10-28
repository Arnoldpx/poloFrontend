// DatoBasicData.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const DatoBasicData = ({ id }) => {
  const [basicData, setBasicData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`http://localhost:4000/api/getBasicDataById/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBasicData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error.response || error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!basicData) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Datos Básicos</h1>
      <p>Nombre: {basicData.nombre}</p>
      <p>Apellido: {basicData.apellido}</p>
      {/* Muestra el resto de los campos aquí */}
    </div>
  );
};

export default DatoBasicData;
