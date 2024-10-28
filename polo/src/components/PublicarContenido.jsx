import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Tooltip } from '@mui/material';
import { FaImage, FaRegCalendarAlt, FaFileAlt } from 'react-icons/fa';

const PublicarContenido = ({ onPublicar }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo && descripcion) {
      onPublicar({ titulo, descripcion });
      setTitulo('');
      setDescripcion('');
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: 2, margin: '20px', maxWidth: 1024 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Tooltip title="Agregar contenido multimedia" arrow>
          <Button variant="outlined" component="label" sx={{ mr: 2 }}>
            <FaImage style={{ marginRight: '4px' }} />
            Contenido multimedia
            <input type="file" hidden />
          </Button>
        </Tooltip>
        <Tooltip title="Crear un evento" arrow>
          <Button variant="outlined" href="/feed/?createEvent=true" sx={{ mr: 2 }}>
            <FaRegCalendarAlt style={{ marginRight: '4px' }} />
            Evento
          </Button>
        </Tooltip>
        <Tooltip title="Escribir un artículo" arrow>
          <Button variant="outlined" href="/article/new/">
            <FaFileAlt style={{ marginRight: '4px' }} />
            Escribir artículo
          </Button>
        </Tooltip>
      </Box>

      <Typography variant="h6" component="h2" gutterBottom>
        ¿Qué quieres publicar?
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Título"
          placeholder="Introduce el título de tu publicación"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          sx={{ marginBottom: 2, height: '56px' }} // Mismo tamaño
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Descripción"
          placeholder="Escribe aquí tu descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          sx={{ marginBottom: 2, height: '56px' }} // Mismo tamaño
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Publicar
        </Button>
      </form>

      <Box sx={{ marginTop: 2, border: '2px dashed #ccc', padding: 2, textAlign: 'center' }}>
        <Typography variant="body2">Suelta tus archivos aquí.</Typography>
        <Typography variant="body2">Arrastra tus archivos aquí.</Typography>
      </Box>
    </Paper>
  );
};

export default PublicarContenido;
