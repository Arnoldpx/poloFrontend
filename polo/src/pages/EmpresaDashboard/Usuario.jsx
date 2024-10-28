import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { IconButton, Tooltip } from '@mui/material';
import { Favorite as FavoriteIcon, Check as CheckIcon , } from '@mui/icons-material';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  TextField,
  CircularProgress,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

// Estilos personalizados para la tabla
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  marginTop: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "0px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));



// StyledModalBox con scroll
const StyledModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  maxHeight: "80vh",
  overflowY: "auto",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  padding: theme.spacing(4),
  // Hacer que el desplazamiento sea suave
  scrollBehavior: "smooth",
}));

const ModalHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const ModalContent = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  textAlign: "left",
}));

const CloseButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  float: "right",
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "300px",
  marginRight: theme.spacing(1),
  borderRadius: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({ curso: "", titulo: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.error("El token ha expirado");
          Cookies.remove("token");
          return;
        }
        fetchData();
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:4000/api/getallBD", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else {
        console.error("La respuesta no es un array:", response.data);
        setError("La respuesta del servidor no es válida.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);
      setError("Ocurrió un error al obtener los datos.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (usuario) => {
    setSelectedUser(usuario);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredUsuarios = usuarios.filter(usuario => {
    const cursoMatch = filters.curso === "" || (usuario.curso && usuario.curso.toLowerCase().includes(filters.curso.toLowerCase()));
    const tituloMatch = filters.titulo === "" || (usuario.titulo && usuario.titulo.toLowerCase().includes(filters.titulo.toLowerCase()));
    return cursoMatch && tituloMatch;
  });

  const handleToggleFavorite = (id) => {
    // Lógica para marcar/desmarcar como favorito
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, favorito: !usuario.favorito } : usuario
      )
    );
  };

  const handleToggleContracted = (id) => {
    // Lógica para marcar/desmarcar como contratado
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, contratado: !usuario.contratado } : usuario
      )
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container mt-5">
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Usuarios
      </Typography>

      {/* Barra de Filtros */}
      <FilterContainer>
        <StyledTextField
          label="Filtrar por Curso"
          name="curso"
          variant="outlined"
          value={filters.curso}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          label="Filtrar por Título"
          name="titulo"
          variant="outlined"
          value={filters.titulo}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FilterContainer>

      {/* Tarjeta con la tabla */}
      <StyledCard>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Nombre", "Apellido", "Ubicación", "Profesión", "Teléfono", "CV", "Favorito", "Contratado", "Acciones"].map((header) => (
                      <TableCell key={header} style={{ backgroundColor: '#1976d2', color: 'white' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
  {filteredUsuarios.length > 0 ? (
    filteredUsuarios.map((usuario) => (
      <StyledTableRow key={usuario.id}>
        <TableCell>{usuario.nombre}</TableCell>
        <TableCell>{usuario.apellido}</TableCell>
        <TableCell>{usuario.localidad}</TableCell>
        <TableCell>{usuario.titulo}</TableCell>
        <TableCell>{usuario.telefono}</TableCell>
        <TableCell>
          {usuario.cvUrl ? (
            <a href={usuario.cvUrl} target="_blank" rel="noopener noreferrer">
              Descargar CV
            </a>
          ) : (
            "No disponible"
          )}
        </TableCell>
        <TableCell>
          <Tooltip title={usuario.favorito ? "Desmarcar favorito" : "Marcar favorito"}>
            <IconButton
              color={usuario.favorito ? "secondary" : "default"}
              onClick={() => handleToggleFavorite(usuario.id)}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title={usuario.contratado ? "Desmarcar contratado" : "Marcar contratado"}>
            <IconButton
              color={usuario.contratado ? "primary" : "default"}
              onClick={() => handleToggleContracted(usuario.id)}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Button variant="contained" color="info" onClick={() => handleOpenModal(usuario)}>
            Ver Detalles
          </Button>
        </TableCell>
      </StyledTableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={9} align="center">
        No se encontraron usuarios.
      </TableCell>
    </TableRow>
  )}
</TableBody>
              </Table>
            </StyledTableContainer>
          )}
        </CardContent>
      </StyledCard>

       {/* Modal para detalles del usuario */}
       {selectedUser && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <StyledModalBox>
            <ModalHeader>Detalles del Usuario</ModalHeader>
            <Divider />
            <ModalContent variant="body1">
              <strong>Nombre:</strong> {selectedUser.nombre}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Apellido:</strong> {selectedUser.apellido}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Ubicación:</strong> {selectedUser.localidad}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Género:</strong> {selectedUser.genero}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Fecha de Nacimiento:</strong> {new Date(selectedUser.fecha_de_nacimiento).toLocaleDateString()}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Teléfono:</strong> {selectedUser.telefono}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Email:</strong> {selectedUser.email}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Residencia:</strong> {selectedUser.residencia}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Estudios:</strong> {selectedUser.estudios}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Especialización:</strong> {selectedUser.especializacion}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Título:</strong> {selectedUser.titulo}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Curso:</strong> {selectedUser.curso_polo}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>SQL Server:</strong> {selectedUser.sqlServer}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>MySQL:</strong> {selectedUser.mysql}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>PostgreSQL:</strong> {selectedUser.postgre}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Oracle:</strong> {selectedUser.oracle}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Java:</strong> {selectedUser.java}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>.NET:</strong> {selectedUser.net}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>C:</strong> {selectedUser.c}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>JavaScript:</strong> {selectedUser.javascript}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>CV:</strong> {selectedUser.cvUrl ? (
                <a href={selectedUser.cvUrl} target="_blank" rel="noopener noreferrer">
                  Descargar CV
                </a>
              ) : (
                "No disponible"
              )}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Favorito:</strong> {selectedUser.favorito ? "Sí" : "No"}
            </ModalContent>
            <ModalContent variant="body1">
              <strong>Contratado:</strong> {selectedUser.contratado ? "Sí" : "No"}
            </ModalContent>
            <CloseButton variant="contained" onClick={handleCloseModal}>
              Cerrar
            </CloseButton>
          </StyledModalBox>
        </Modal>
      )}

      {/* Snackbar para manejo de errores */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
      />
    </div>
  );
};

export default Usuarios;
