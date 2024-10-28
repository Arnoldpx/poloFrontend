import React from 'react';

const Settings = () => {
  const handleSidebarType = (e) => {
    const classes = e.getAttribute('data-class');
    document.querySelector('.sidenav').className = `sidenav ${classes}`;
  };

  const handleDarkMode = (e) => {
    document.body.classList.toggle('dark-mode', e.checked);
  };

  return (
    <main>
      <div className="container">
        {/* Card Change Password */}
        <div className="card mt-4" id="password">
          <div className="card-header">
            <h5>Cambiar la contraseña</h5>
          </div>
          <div className="card-body pt-0">
            <div className="input-group input-group-outline">
              <label className="form-label">Contraseña actual</label>
              <input type="password" className="form-control" />
            </div>
            <div className="input-group input-group-outline my-4">
              <label className="form-label">Nueva contraseña</label>
              <input type="password" className="form-control" />
            </div>
            <div className="input-group input-group-outline">
              <label className="form-label">Confirme su nueva contraseña</label>
              <input type="password" className="form-control" />
            </div>
            <h5 className="mt-5">Al cambiar su contraseña debe tener en cuenta que:</h5>
            <p className="text-muted mb-2">
              Tenga en cuanta algunos consejos para mejorar su seguridad.
            </p>
            <ul className="text-muted ps-4 mb-0 float-start">
              <li>
                <span className="text-sm">Un minimo de 8 caracteres</span>
              </li>
              <li>
                <span className="text-sm">Recomendamos usar caracteres Alfanumerico</span>
              </li>
              <li>
                <span className="text-sm">Cambiela con frecuencia</span>
              </li>
            </ul>
            <button className="btn bg-gradient-dark btn-sm float-end mt-6 mb-0">Actualiza Contraseña</button>
          </div>
        </div>

        {/* Card Notifications */}
        <div className="card mt-4" id="notifications">
          <div className="card-header">
            <h5>Notificaciones</h5>
            <p className="text-sm">Elija cuando recibir notificaciones, y mantengase al tanto de sus actividades.</p>
          </div>
          <div className="card-body pt-0">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th className="ps-1" colspan="4">
                      <p className="mb-0">Activity</p>
                    </th>
                    <th className="text-center">
                      <p className="mb-0">E-mail</p>
                    </th>
                    <th className="text-center">
                      <p className="mb-0">Alertas al iniciar</p>
                    </th>
                    <th className="text-center">
                      <p className="mb-0">SMS</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-1" colspan="4">
                      <div className="my-auto">
                        <span className="text-dark d-block text-sm">Actividad en una Busqueda</span>
                        <span className="text-xs font-weight-normal">Cuando alguien necesite contactarse conmigo</span>
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                        <input className="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault11" />
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault12" />
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault13" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-1" colspan="4">
                      <div className="my-auto">
                        <p className="text-sm mb-0">Inicio de Sesion desde un nuevo dispositivo</p>
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                        <input className="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault20" />
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                        <input className="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault21" />
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-switch mb-0 d-flex align-items-center justify-content-center">
                        <input className="form-check-input" checked type="checkbox" id="flexSwitchCheckDefault22" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card Sessions */}
        <div className="card mt-4" id="sessions">
          <div className="card-header pb-3">
            <h5>Sesiones activas</h5>
            <p className="text-sm">Esta es una lista de los dispositivos en los que se ha mantenido conexión, te recomendamos cambiar la contraseña si encuentras alguno desconocido</p>
          </div>
          <div className="card-body pt-0">
            <div className="d-flex align-items-center">
              <div className="text-center w-5">
                <i className="fas fa-desktop text-lg opacity-6"></i>
              </div>
              <div className="my-auto ms-3">
                <div className="h-100">
                  <p className="text-sm mb-1">Argentina, La Rioja 68.133.163.201</p>
                  <p className="mb-0 text-xs">Sesión Actual</p>
                </div>
              </div>
              <span className="badge badge-success badge-sm my-auto ms-auto me-3">Activa</span>
              <p className="text-secondary text-sm my-auto me-3">ARG</p>
              <a href="javascript:;" className="text-primary text-sm icon-move-right my-auto">Ver más
                <i className="fas fa-arrow-right text-xs ms-1" aria-hidden="true"></i>
              </a>
            </div>
            <hr className="horizontal dark" />

            <div className="d-flex align-items-center mt-3">
              <div className="text-center w-5">
                <i className="fas fa-mobile text-lg opacity-6"></i>
              </div>
              <p className="my-auto ms-3">Safari on iPhone</p>
              <p className="text-secondary text-sm ms-auto my-auto me-3">ARG</p>
              <a href="javascript:;" className="text-primary text-sm icon-move-right my-auto">Ver más
                <i className="fas fa-arrow-right text-xs ms-1" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Card Delete Account */}
        <div className="card mt-4" id="delete">
          <div className="card-body">
            <div className="d-flex align-items-center mb-sm-0 mb-4">
              <div className="w-50">
                <h5>Borrar tu Cuenta</h5>
                <p className="text-sm mb-0">Por favor elimina tu cuenta solo si estas seguro! Te puedes tomar un tiempo y desactivarla si es necesario.</p>
              </div>
              <div className="w-50 text-end">
                <button className="btn btn-outline-secondary mb-3 mb-md-0 ms-auto" type="button">Desactivar</button>
                <button className="btn bg-gradient-danger mb-0 ms-2" type="button">Eliminar Cuenta</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed-plugin">
        <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
          <i className="material-icons py-2">settings</i>
        </a>
        <div className="card shadow-lg">
          <div className="card-header pb-0 pt-3">
            <div className="float-start">
              <h5 className="mt-3 mb-0">Sección de Estilos</h5>
              <p>Personalice la experiencia de usuario.</p>
            </div>
            <div className="float-end mt-4">
              <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                <i className="material-icons">clear</i>
              </button>
            </div>
          </div>
          <hr className="horizontal dark my-1" />
          <div className="card-body pt-sm-3 pt-0">
            <div className="mt-3">
              <h6 className="mb-0">Estilo Del sitio</h6>
              <p className="text-sm">Personalice el color de la barra lateral</p>
            </div>
            <div className="d-flex">
              <button className="btn bg-gradient-dark px-3 mb-2 active" data-class="bg-gradient-dark" onClick={(e) => handleSidebarType(e.target)}>Negro</button>
              <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-transparent" onClick={(e) => handleSidebarType(e.target)}>Transparente</button>
              <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-white" onClick={(e) => handleSidebarType(e.target)}>Claro</button>
            </div>
            <p className="text-sm d-xl-none d-block mt-2">Puedes cambiar el tipo de barra lateral solo en vista de escritorio.</p>
            <hr className="horizontal dark my-3" />
            <div className="mt-2 d-flex">
              <h6 className="mb-0">Claro / Oscuro</h6>
              <div className="form-check form-switch ps-0 ms-auto my-auto">
                <input className="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version" onChange={(e) => handleDarkMode(e.target)} />
              </div>
            </div>
            <hr className="horizontal dark my-sm-4" />
            <a className="btn bg-gradient-primary w-100" href="#">Ir al Sitio</a>
            <a className="btn bg-gradient-info w-100" href="#">Contacto</a>
            <a className="btn btn-outline-dark w-100" href="#">Otro</a>
            <div className="w-100 text-center">
              <h6 className="mt-3">¡Comparte en Redes Sociales!</h6>
              <a href="#" className="btn btn-dark mb-0 me-2" target="_blank">
                <i className="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
              </a>
              <a href="#" className="btn btn-dark mb-0 me-2" target="_blank">
                <i className="fab fa-facebook-square me-1" aria-hidden="true"></i> Compartir
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
