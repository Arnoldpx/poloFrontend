import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const FormularioEmpresa = () => {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    direccion: "",
    sector: "",
    numeroCUIT: "",
    telefono: "",
    emailContacto: "",
    fechaFundacion: ""
  });

  const [empresaId, setEmpresaId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Obtener la empresa autenticada
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.error('El token ha expirado');
          Cookies.remove('token');
          return;
        }
        setEmpresaId(decodedToken.id);
        fetchEmpresaData(decodedToken.id); // Carga los datos de la empresa al iniciar
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  // Cargar los datos de la empresa
  const fetchEmpresaData = async (empresaId) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`http://localhost:4000/api/empresa/${empresaId}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFormData(response.data); // Carga los datos en el formulario
    } catch (error) {
      console.error("Error fetching company data:", error);
      setErrorMessage("Error al cargar los datos de la empresa.");
    }
  };

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empresaId) {
      console.error('ID de empresa no disponible');
      setErrorMessage("Error: ID de empresa no disponible.");
      return;
    }

    const dataToSend = { ...formData, empresaId };

    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('Token no encontrado');
        setErrorMessage("Error: Token no encontrado.");
        return;
      }

      await axios.put(`http://localhost:4000/api/empresa/${empresaId}`, dataToSend, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccessMessage("Datos de la empresa actualizados exitosamente.");
      setErrorMessage("");
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setSuccessMessage("");
      setErrorMessage("Error al enviar los datos. Inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la Empresa:</label>
        <input
          type="text"
          name="nombreEmpresa"
          value={formData.nombreEmpresa}
          onChange={handleChange}
          placeholder="Nombre de la Empresa"
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />
      </div>
      <div>
        <label>Sector:</label>
        <input
          type="text"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          placeholder="Sector"
        />
      </div>
      <div>
        <label>CUIT:</label>
        <input
          type="text"
          name="numeroCUIT"
          value={formData.numeroCUIT}
          onChange={handleChange}
          placeholder="Número de CUIT"
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
      </div>
      <div>
        <label>Email de Contacto:</label>
        <input
          type="email"
          name="emailContacto"
          value={formData.emailContacto}
          onChange={handleChange}
          placeholder="Email de Contacto"
        />
      </div>
      <div>
        <label>Fecha de Fundación:</label>
        <input
          type="date"
          name="fechaFundacion"
          value={formData.fechaFundacion}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Actualizar Empresa</button>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default FormularioEmpresa;
