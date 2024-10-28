import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate

import './App.css';

// Importa tus páginas y componentes
import Home from './pages/Home/Home';
import SignUp from './pages/SingUp/SignUp';
import DashboardLayout from './components/DashboardLayout'; // Nuevo layout para el Dashboard
import Perfil from './pages/Dashboard/Perfil';
import InformacionBasica from './pages/Dashboard/InformacionBasica';
import Calendar from './pages/Dashboard/CambiarContrasena';
import Notificaciones from './pages/Dashboard/Notificaciones';
import UploadCV from './pages/Dashboard/SesionesActivas';
import EmpresaDashboardLayout from './components/DashboardEmpresaLayout';
import InformacionBasicaEmpresa from './pages/EmpresaDashboard/InformacionBasica';
import PerfilEmpresa from './pages/EmpresaDashboard/PerfilEmpresa';
import Usuarios from './pages/EmpresaDashboard/Usuario';
import MessagesEmpresa from './pages/EmpresaDashboard/Notificaciones';

const theme = createTheme({
  // Configura tu tema aquí, como colores y tipografías
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <main>
          <Routes>
            {/* Ruta para la página de inicio */}
            <Route path="/" element={<Home />} />

            {/* Ruta para la página de registro */}
            <Route path="/Registro" element={<SignUp />} />

            {/* Rutas protegidas del Dashboard */}
            <Route path="/Dashboard/*" element={<DashboardLayout />}>
              {/* Redirige automáticamente a /Dashboard/perfil si no hay subruta */}
              <Route index element={<Navigate to="perfil" />} />
              
              {/* Subrutas del Dashboard */}
              <Route path="perfil" element={<Perfil />} />
              <Route path="info" element={<InformacionBasica />} />
              <Route path="calendario" element={<Calendar />} />
              <Route path="notifications" element={<Notificaciones />} />
              <Route path="sessions" element={<UploadCV />} />
            </Route>

            {/* Rutas para empresa */}
            <Route path="/DashboardEmpresa/*" element={<EmpresaDashboardLayout />}>
              <Route index element={<Navigate to="usuarios" />} /> {/* Redirige a perfil por defecto */}
              <Route path="perfil" element={<PerfilEmpresa />} />
              <Route path="info" element={<InformacionBasicaEmpresa />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="notificaciones" element={<MessagesEmpresa />} />
              {/* Otras rutas de empresa */}
            </Route>
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
