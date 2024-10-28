import React, { useState } from "react";

const SidebarSettings = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const sidebarType = (e) => {
    const type = e.target.getAttribute("data-class");
    // Aquí puedes implementar la lógica para cambiar el estilo de la barra lateral
    console.log("Cambiar estilo de la barra lateral a:", type);
  };

  const darkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    // Aquí puedes implementar la lógica para activar/desactivar el modo oscuro
    console.log("Modo oscuro:", darkModeEnabled ? "Activado" : "Desactivado");
  };

  return (

    <div className="mt-3">
      <h6 className="mb-0">Estilo Del sitio</h6>
      <p className="text-sm">Personalice el color de la barra lateral</p>

      

      <div className="d-flex">
        <button
          className="btn bg-gradient-dark px-3 mb-2 active"
          data-class="bg-gradient-dark"
          onClick={sidebarType}
        >
          Negro
        </button>
        <button
          className="btn bg-gradient-dark px-3 mb-2 ms-2"
          data-class="bg-transparent"
          onClick={sidebarType}
        >
          Transparente
        </button>
        <button
          className="btn bg-gradient-dark px-3 mb-2 ms-2"
          data-class="bg-white"
          onClick={sidebarType}
        >
          Claro
        </button>
      </div>

      <p className="text-sm d-xl-none d-block mt-2">
        Puede cambiar el tipo de barra lateral solo en la vista de escritorio.
      </p>

      <hr className="horizontal dark my-3" />

      <div className="mt-2 d-flex">
        <h6 className="mb-0">Claro / Oscuro</h6>
        <div className="form-check form-switch ps-0 ms-auto my-auto">
          <input
            className="form-check-input mt-1 ms-auto"
            type="checkbox"
            id="dark-version"
            onClick={darkMode}
          />
        </div>
      </div>

      <hr className="horizontal dark my-sm-4" />

      <a className="btn bg-gradient-primary w-100" href="#">
        Ir al Sitio
      </a>
      <a className="btn bg-gradient-info w-100" href="#">
        Contacto
      </a>
      <a className="btn btn-outline-dark w-100" href="#">
        Otro
      </a>

      <div className="w-100 text-center">
        <h6 className="mt-3">Compartir en Redes Sociales!</h6>
        <a href="#" className="btn btn-dark mb-0 me-2" target="_blank">
          <i className="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
        </a>
        <a href="#" className="btn btn-dark mb-0 me-2" target="_blank">
          <i className="fab fa-facebook-square me-1" aria-hidden="true"></i> Compartir
        </a>
      </div>
    </div>
  );
};

export default SidebarSettings;
