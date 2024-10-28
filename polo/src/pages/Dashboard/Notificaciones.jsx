import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListadoPublicaciones from '../../components/ListadoPublicaciones';
import { Container, Typography } from '@mui/material';

const Notificaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  // Datos de ejemplo
  const datosEjemplo = [
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
    {
      nombre: 'Polo Tecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web',
      tiempoDesde: 'hace 1 semana',
      perfilUrl: '#',
      imagen: '/public/img/images.png'
    },
    {
      nombre: 'Polo Tecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web',
      tiempoDesde: 'hace 3 días',
      perfilUrl: '#',
      imagen: '/public/img/imagen2.png'
    },
    {
      nombre: 'Polo Tecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web',
      tiempoDesde: 'hace 2 semanas',
      perfilUrl: '#',
      imagen: 'https://via.placeholder.com/600x400?text=Curso+de+CSS+Moderno+con+SASS'
    },
    {
      nombre: 'Polo Tecnologico',
      avatar: '/public/img/Logo_Polo.png',
      descripcion: 'Instructor de Desarrollo Web, Curso básico de desarrollo web',
      tiempoDesde: 'hace 1 mes',
      perfilUrl: '#', // Asegúrate de agregar una imagen o URL si es necesario
      imagen: 'https://via.placeholder.com/600x400?text=Curso+de+Desarrollo+Web'
    },
  ];

  useEffect(() => {
    const fetchNotificaciones = async () => {
      // Usar los datos de ejemplo directamente
      setPublicaciones(datosEjemplo);
    };
  
    fetchNotificaciones();
  }, []);
 
  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Notificaciones
      </Typography>

      <ListadoPublicaciones publicaciones={publicaciones} />
    </Container>
  );
};

export default Notificaciones;
