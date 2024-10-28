// src/components/Publicacion.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Button, Link, TextField, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const Publicacion = ({ publicacion }) => {
  const [comentarios, setComentarios] = useState([
    {
      nombre: 'Carlos López',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      comentario: '¡Gran contenido! Estoy aprendiendo mucho del curso de React Avanzado.',
    },
    {
      nombre: 'Ana Torres',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      comentario: 'Gracias por compartir la información sobre Node.js. Muy útil.',
    }
  ]);
  
  const [nuevoComentario, setNuevoComentario] = useState('');

  const manejarComentario = (e) => {
    setNuevoComentario(e.target.value);
  };

  const agregarComentario = () => {
    if (nuevoComentario.trim() !== '') {
      const nuevo = {
        nombre: 'Usuario Actual', // Cambia este valor por el nombre del usuario actual
        avatar: 'https://randomuser.me/api/portraits/men/50.jpg', // Avatar de ejemplo
        comentario: nuevoComentario
      };
      setComentarios([...comentarios, nuevo]);
      setNuevoComentario(''); // Limpiar el campo de comentario
    }
  };

  return (
    <Card style={{ marginBottom: '20px', width: '100%' }}>
      <CardContent style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Avatar
          alt={publicacion.nombre}
          src={publicacion.avatar}
          sx={{ width: 64, height: 64, marginRight: 2 }}
        />
        <div style={{ flexGrow: 1 }}>
          <Link href={publicacion.perfilUrl} target="_blank" underline="hover">
            <Typography 
              variant="h6" 
              color="textPrimary"
              style={{ fontWeight: 'bold', fontSize: '1.2rem' }} // Texto del nombre más grande y destacado
            >
              {publicacion.nombre}
            </Typography>
          </Link>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            style={{ fontSize: '1rem', lineHeight: '1.5', fontWeight: '500' }} // Texto más grande y destacado
            gutterBottom
          >
            {publicacion.descripcion}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {publicacion.tiempoDesde}
          </Typography>
          {publicacion.imagen ? (
            <img
              src={publicacion.imagen}
              alt="Imagen de publicación"
              style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
            />
          ) : (
            <Typography 
             
            >
             
            </Typography>
          )}

          {/* Listado de comentarios */}
          <List style={{ marginTop: '10px' }}>
            {comentarios.map((comentario, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={comentario.nombre} src={comentario.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={comentario.nombre}
                  secondary={
                    <Typography variant="body2" color="textPrimary">
                      {comentario.comentario}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          {/* Barra de nuevo comentario */}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <TextField
              fullWidth
              label="Escribe un comentario..."
              variant="outlined"
              size="small"
              value={nuevoComentario}
              onChange={manejarComentario}
            />
            <Button 
              variant="contained" 
              color="primary" 
              style={{ marginLeft: '10px' }}
              onClick={agregarComentario}
            >
              Comentar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Publicacion;

