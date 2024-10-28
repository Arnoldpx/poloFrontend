import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [isUserView, setIsUserView] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeat_password: '',
    username: '', // Solo para usuarios
    name: '',     // Solo para empresas
    cuil: '',     // Solo para empresas
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserClick = () => setIsUserView(true);
  const handleCompanyClick = () => setIsUserView(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeat_password) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const url = isUserView
      ? 'http://localhost:4000/api/register' // URL del endpoint para registrar usuarios
      : 'http://localhost:4000/api/enterprise/register'; // URL del endpoint para registrar empresas

    const payload = isUserView
      ? { 
          email: formData.email, 
          password: formData.password, 
          username: formData.username, // Solo para usuarios
          role: 'user',               // Rol fijo para usuarios
        }
      : { 
          email: formData.email, 
          password: formData.password, 
          name: formData.name, 
          cuil: formData.cuil, 
          role: 'enterprise',          // Rol fijo para empresas
        };
        console.log(payload)
    try {
      const response = await axios.post(url, payload);
      setSuccess('Registro exitoso!');
      setError('');
    } catch (err) {
      setError('Error en el registro');
      setSuccess('');
    }
  };

  return (
    <div className="sign-up-cover bg-gray-200">
      <div
        className="page-header align-items-start min-height-300 m-3 border-radius-xl bg-gray-200"
        style={{
          backgroundImage: 'url(/img/banner2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        loading="lazy"
      >
        <span className="mask bg-gradient-dark opacity-4"></span>
      </div>
      <div className="container">
        <div className="row mt-lg-n12 mt-md-n12 mt-n11 justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card mt-8">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1 text-center py-4">
                  <h4 className="font-weight-bolder text-white mt-1">
                    {isUserView ? 'Registro de Usuario' : 'Registro de Empresa'}
                  </h4>
                  <p className="mb-1 text-white text-sm">
                    Complete los campos con sus datos.
                  </p>
                </div>
              </div>
              <div className="card-body pb-3">
                <div className="text-center mb-4">
                  <button
                    onClick={handleUserClick}
                    className={`btn ${isUserView ? 'bg-gradient-danger' : 'btn-outline-primary'} me-2`}
                  >
                    Registrar Usuario
                  </button>
                  <button
                    onClick={handleCompanyClick}
                    className={`btn ${!isUserView ? 'bg-gradient-primary' : 'btn-outline-primary'}`}
                  >
                    Registrar Empresa
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-group input-group-outline mb-3">
                    <label className="form-label" htmlFor="email"></label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <label className="form-label" htmlFor="password"></label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Contraseña"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <label className="form-label" htmlFor="repeat_password"></label>
                    <input
                      type="password"
                      name="repeat_password"
                      id="repeat_password"
                      className="form-control"
                      value={formData.repeat_password}
                      onChange={handleChange}
                      placeholder="Repetir Contraseña"
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  {isUserView && (
                    <>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label" htmlFor="username"></label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="form-control"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Nombre de Usuario"
                          required
                        />
                      </div>
                    </>
                  )}

                  {!isUserView && (
                    <>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label" htmlFor="companyName"></label>
                        <input
                          type="text"
                          name="name"
                          id="companyName"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Nombre de la Empresa"
                          required
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label" htmlFor="cuil"></label>
                        <input
                          type="text"
                          name="cuil"
                          id="cuil"
                          className="form-control"
                          value={formData.cuil}
                          onChange={handleChange}
                          placeholder="Número de CUIL"
                          required
                        />
                      </div>
                    </>
                  )}

                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <div className="text-center">
                    <button type="submit" className="btn bg-gradient-primary w-100 mt-4 mb-0">
                      Registrarme
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center pt-0 px-sm-4 px-1">
                <p className="mb-4 mx-auto">
                  ¿Ya estás registrado?{' '}
                  <a href="/" className="text-primary text-gradient font-weight-bold">
                    Iniciar Sesión
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;

