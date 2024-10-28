import React from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const UploadCV = () => {
  const [file, setFile] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null); // Para almacenar la información del usuario

  // Cargar información del usuario al montar el componente
  React.useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Aquí deberías hacer una llamada a tu API para obtener la información del usuario
      // A continuación se asume que tienes un endpoint para obtener la información del usuario
      axios.get("http://localhost:4000/api/user", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data.user); // Ajusta esto según la respuesta de tu API
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setSnackbarMessage("Archivo cargado correctamente.");
      setOpenSnackbar(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/msword': [],
    },
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    setLoading(true);

    try {
      const token = Cookies.get("token"); // Obtener el token de las cookies
      const response = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Incluir el token en el encabezado
        },
      });

      setSnackbarMessage(response.data.message || "CV subido correctamente.");
    } catch (error) {
      setSnackbarMessage("Error al subir el CV.");
      console.error("Error uploading CV:", error);
    } finally {
      setLoading(false);
      setFile(null);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', mt: 4, p: 3, border: '1px solid #1976d2', borderRadius: 2, boxShadow: 3, bgcolor: '#f9f9f9' }}>
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 56, height: 56, mr: 2 }} />
          <Typography variant="h6">{user.name}</Typography>
        </Box>
      )}
      <div {...getRootProps({ className: 'dropzone' })} style={{ padding: '40px', border: '2px dashed #1976d2', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Arrastra y suelta tu CV aquí, o haz clic para seleccionar un archivo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Solo se aceptan archivos PDF, DOCX y DOC
        </Typography>
        {file && (
          <Typography variant="body1" color="green" sx={{ mt: 2 }}>
            Archivo seleccionado: {file.name}
          </Typography>
        )}
      </div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleUpload} 
        disabled={!file || loading} 
        sx={{ mt: 3, width: '100%' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Subir CV"}
      </Button>
      
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes("Error") ? "error" : "success"} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadCV;
