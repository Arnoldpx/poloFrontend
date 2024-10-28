import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const [isUserView, setIsUserView] = useState(true); // Estado para controlar la vista
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const toggleView = () => {
    setIsUserView(!isUserView); // Cambiar la vista entre Usuario y Empresa
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetear el error al enviar el formulario

    const endpoint = isUserView
      ? 'http://localhost:4000/api/login'
      : 'http://localhost:4000/api/enterprise/login';

    try {
      // Enviar la solicitud de inicio de sesión
      const response = await axios.post(
        endpoint,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Para permitir el uso de cookies
        }
      );

      const { token, role, message } = response.data;

    // Verificar si el token y el role están presentes
    if (token && role) {
      console.log('Login exitoso:', message, 'Token:', token, 'Rol:', role);

      // Almacenar el token en las cookies (ya lo estás haciendo en el backend)
      document.cookie = `token=${token};path=/;SameSite=Lax`;

      // Redirigir según el rol
      if (role === 'user') {
        window.location.href = '/Dashboard';
      } else if (role === 'enterprise') {
        window.location.href ='/DashboardEmpresa';
      } else {
        setError('Tipo de usuario desconocido.');
      }
    } else {
      // Manejo de errores devueltos por el backend
      setError(message || 'Error en el login');
    }
  } catch (error) {
    // Manejo de errores de conexión
    setError('Error de conexión');
    console.error('Error de conexión:', error);
  }
};
  return (
    <div>
      <header className="header-rounded-images">
        <div className="page-header min-vh-90">
          <img
            className="position-absolute fixed-top ms-auto w-50 h-100 z-index-0 d-none d-sm-none d-md-block border-radius-section border-top-end-radius-0 border-top-start-radius-0 border-bottom-end-radius-0"
            src="/img/inicio2.jpg"
            alt="image"
            loading="lazy"
          />
          <div className="container">
            <div className="row">
              <div className="col-lg-7 d-flex">
                <div className="card card-body blur text-md-start text-center px-sm-5 shadow-lg mt-sm-5 py-sm-5">
                  <h2 className="text-dark mb-4">Registro Economía del Conocimiento</h2>
                  <p className="lead text-dark pe-md-5 me-md-5">
                    Llena el formulario, completa el registro y comenzarás a vivir tu futuro...
                  </p>
                  <div className="buttons">
                    <button
                      type="button"
                      className="btn bg-gradient-primary mt-4"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalForm"
                    >
                      Iniciar Sesión
                    </button>
                    <a href="/registro">
                      <button type="button" className="btn btn-outline-secondary mt-4 ms-2">
                        Registrarse
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModalForm"
          tabIndex="-1"
          aria-labelledby="exampleModalFormLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-danger modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body p-0">
                <div className="card bg-gray-200 shadow border-0 mb-0">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-info border-radius-lg py-3 pe-1 text-center py-4">
                      <h4 className="font-weight-bolder text-white mt-1 mb-0">
                        {isUserView ? 'Iniciar Sesión - Usuario' : 'Iniciar Sesión - Empresa'}
                      </h4>
                      <p className="mb-1 text-sm text-white">
                        Complete los campos con su información
                      </p>
                    </div>
                  </div>
                  <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar errores */}
                    <form role="form text-start" method="POST" onSubmit={handleSubmit}>
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="correo@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="password">Contraseña</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          placeholder="•••••••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                        />
                      </div>
                      <div className="form-check form-switch d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          defaultChecked
                        />
                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">
                          Recordarme
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className={`btn mt-4 mb-0 ${isUserView ? 'bg-gradient-danger' : 'bg-gradient-primary'}`}
                        >
                          Iniciar sesión
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0">
                    <p className="mb-4 text-sm mx-auto">
                      No tienes una cuenta?{' '}
                      <a href="/registro" className="text-primary text-gradient font-weight-bold">
                        ¡Registrarte Ahora!
                      </a>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className={`btn mt-4 mb-0 ${isUserView ? 'btn-danger' : 'btn-primary'}`}
                      onClick={toggleView}
                    >
                      Cambiar a {isUserView ? 'Empresa' : 'Usuario'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
