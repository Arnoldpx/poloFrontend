// src/components/ListadoPublicaciones.jsx
import React from 'react';
import Publicacion from './Publicacion';
import { Box } from '@mui/material';

const ListadoPublicaciones = ({ publicaciones }) => {
  return (
    <Box>
      {publicaciones.map((publicacion, index) => (
        <Publicacion key={index} publicacion={publicacion} />
      ))}
    </Box>
  );
};

export default ListadoPublicaciones;
