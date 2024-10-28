import React from 'react';
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Business, Lock, Notifications, Settings, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function EmpresaSidebar() {
  const navigate = useNavigate();

  const navigateToSection = (section) => {
    navigate(`/DashboardEmpresa/${section}`);
  };

  return (
    <aside
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#1e1e2d',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar alt="Empresa" src="/path-to-avatar.jpg" sx={{ width: 56, height: 56, margin: '0 auto' }} />
        <h5 style={{ color: 'white', marginTop: '10px' }}>Nombre de la Empresa</h5>
      </div>

      <Divider style={{ margin: '20px 0' }} />

      <List>
        <ListItem button={true} onClick={() => navigateToSection("perfil")}>
          <ListItemIcon>
            <AccountCircle style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Perfil" style={{ color: 'white' }} />
        </ListItem>

        <ListItem button={true} onClick={() => navigateToSection("info")}>
          <ListItemIcon>
            <Business style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Información Básica" style={{ color: 'white' }} />
        </ListItem>

        <ListItem button={true} onClick={() => navigateToSection("usuarios")}>
          <ListItemIcon>
            <Lock style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Usuarios" style={{ color: 'white' }} />
        </ListItem>

        <ListItem button={true} onClick={() => navigateToSection("notificaciones")}>
          <ListItemIcon>
            <Notifications style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Notificaciones" style={{ color: 'white' }} />
        </ListItem>


        <ListItem button={true} onClick={() => navigateToSection("delete-account")}>
          <ListItemIcon>
            <Delete style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Configuracion" style={{ color: 'white' }} />
        </ListItem>
      </List>
    </aside>
  );
}
