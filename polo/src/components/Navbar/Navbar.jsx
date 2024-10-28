import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Snackbar,
} from '@mui/material';
import {
  AccountCircle,
  ReceiptLong,
  Lock,
  Notifications,
  Settings,
  Delete,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Sidebar() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Para almacenar la imagen del usuario
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState('Nombre del Usuario'); // Nombre del usuario

  // Simulación de la obtención del nombre del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Aquí puedes llamar a tu API para obtener el nombre del usuario
        const response = await axios.get('/api/profile'); // Asegúrate de que esta ruta esté configurada en tu backend
        setUserName(response.data.name); // Suponiendo que el nombre viene en el campo 'name'
        setImage(response.data.avatar || '/path-to-default-retrato.jpg'); // Si hay una imagen de avatar disponible
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  const navigateToSection = (section) => {
    navigate(`/Dashboard/${section}`);
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('avatar', file); // Campo que espera el backend

    try {
      const response = await axios.post('/api/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Asumiendo que el backend devuelve la URL de la imagen subida
      setImage(response.data.avatar); // Guarda la ruta de la imagen
      setSuccess(true); // Muestra mensaje de éxito
    } catch (error) {
      setError('Error al subir la imagen: ' + (error.response?.data?.message || error.message));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <aside
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#2c2c3f',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div style={{ textAlign: 'center' }} {...getRootProps()}>
        <input {...getInputProps()} />
        <Avatar
          alt="Usuario"
          src={image}
          sx={{ width: 70, height: 70, margin: '0 auto', border: '2px solid #fff', backgroundColor: '#1976d2' }}
        />
        <Typography variant="h6" style={{ color: 'white', marginTop: '10px' }}>
          {userName}
        </Typography>
      </div>

      <Divider light style={{ margin: '20px 0' }} />

      <List>
        <ListItem button onClick={() => navigateToSection("perfil")}>
          <ListItemIcon>
            <AccountCircle sx={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Perfil Formulario" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
        <ListItem button onClick={() => navigateToSection("info")}>
          <ListItemIcon>
            <ReceiptLong sx={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Información Básica" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
        <ListItem button onClick={() => navigateToSection("calendario")}>
          <ListItemIcon>
            <Lock sx={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Calendario" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
        <ListItem button onClick={() => navigateToSection("notifications")}>
          <ListItemIcon>
            <Notifications sx={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Notificaciones" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
        <ListItem button onClick={() => navigateToSection("sessions")}>
          <ListItemIcon>
            <Settings sx={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Archivos" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
        <ListItem button onClick={() => navigateToSection("delete-account")}>
          <ListItemIcon>
            <Delete sx={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Configuración" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
      </List>

      {error && <Typography color="error">{error}</Typography>}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Imagen subida con éxito"
      />
    </aside>
  );
}
