// src/pages/Dashboard/Notificaciones.jsx
import React, { useState } from 'react';
import PublicarContenido from '../../components/PublicarContenido';
import ListadoPublicaciones from '../../components/ListadoPublicaciones';
import { Container, Typography, Box } from '@mui/material';

const Notificaciones = () => {
  const [publicaciones, setPublicaciones] = useState([
    {
      nombre: 'Mauricio Duarte Duarte',
      avatar: 'https://media.licdn.com/dms/image/D4E03AQFX-f-6gbaOtQ/profile-displayphoto-shrink_100_100/0/1718251565462?e=1733961600&v=beta&t=eVnvyRFzaK90PKXK6WeVlRxXwhVZuaA2QZ8FEvtaVic',
      descripcion: 'CEO CX Latam Opinat | Customer Experience Strategist | Transformación Empresarial | Estrategia y Liderazgo',
      tiempoDesde: 'hace 5 días',
      perfilUrl: 'https://www.linkedin.com/in/mauricio-duarte-duarte-?miniProfileUrn=urn%3Ali%3Afsd_profile%3AACoAAAERWp4Bx9JZD-XIqKzTD4C-v26kYLNAaSw',
      imagen: 'https://via.placeholder.com/600x400?text=Transformacion+Empresarial'
    },
    {
      nombre: 'Juan Pérez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      descripcion: 'Desarrollador Web en XYZ Company',
      tiempoDesde: 'hace 2 días',
      perfilUrl: '#',
      imagen: 'https://via.placeholder.com/600x400?text=Desarrollo+Web+XYZ'
    },
    // Nuevas publicaciones de Polo
    {
      nombre: 'PoloTecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web',
      tiempoDesde: 'hace 1 semana',
      perfilUrl: '#',
      imagen: '/public/img/images.png'
    },
    {
      nombre: 'PoloTecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web',
      tiempoDesde: 'hace 3 días',
      perfilUrl: '#',
      imagen: '/public/img/imagen2.png'
    },
    {
      nombre: 'PoloTecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web',
      tiempoDesde: 'hace 2 semanas',
      perfilUrl: '#',
      imagen: 'https://via.placeholder.com/600x400?text=Curso+de+CSS+Moderno+con+SASS'
    },
    {
      nombre: 'PoloTecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web, Curso basico de desarrollo web',
      tiempoDesde: 'hace 1 mes',
      
    },
  ]);

  const agregarPublicacion = (nuevaPublicacion) => {
    setPublicaciones([...publicaciones, nuevaPublicacion]);
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Notificaciones
      </Typography>
      
      {/* Usar Box para estructurar */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box width="100%" justifyContent={'center'} paddingLeft={7}>
          {/* Centrar PublicarContenido */}
        
            <PublicarContenido onPublicar={agregarPublicacion} />
         
        </Box>
        <Box width="100%">
          <ListadoPublicaciones publicaciones={publicaciones} />
        </Box>
      </Box>
    </Container>
  );
};

export default Notificaciones;
