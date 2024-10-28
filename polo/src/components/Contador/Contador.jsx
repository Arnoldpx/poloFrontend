import React from 'react';

const CountStats = () => {
  return (
    <section className="pt-3 pb-4" id="count-stats">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 z-index-2 border-radius-xl mx-auto py-3">
            <div className="row">
              <div className="col-md-4 position-relative">
                <div className="p-3 text-center">
                  <h1 className="text-gradient text-primary">
                    <span id="state1" data-count-to="4692">0</span>+
                  </h1>
                  <h5 className="mt-3">Registro RR.HH</h5>
                  <p className="text-sm font-weight-normal">
                    Registro de Recursos Humanos de Economía del Conocimiento.
                  </p>
                </div>
                <hr className="vertical dark" />
              </div>
              <div className="col-md-4 position-relative">
                <div className="p-3 text-center">
                  <h1 className="text-gradient text-primary">
                    <span id="state2" data-count-to="13">0</span>+
                  </h1>
                  <h5 className="mt-3">Empresas</h5>
                  <p className="text-sm font-weight-normal">
                    Trabajamos activamente con Empresas que confían en nuestro trabajo.
                  </p>
                </div>
                <hr className="vertical dark" />
              </div>
              <div className="col-md-4">
                <div className="p-3 text-center">
                  <h1 className="text-gradient text-primary">
                    <span id="state3" data-count-to="500">0</span>+
                  </h1>
                  <h5 className="mt-3">Puestos de Trabajo</h5>
                  <p className="text-sm font-weight-normal">
                    Gracias a nuestra comunidad pudimos generar nuevos puestos de trabajo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        
      <div className="py-2">
    <div className="container">
      <div className="row">
        <div className="col-8 mx-auto text-center">
          <h6 className="opacity-5">¡Estamos construyendo el Futuro y estas empresas nos ayudan a hacerlo!</h6>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-2 col-md-4 col-6 mb-4">
          <img className="w-100 opacity-9" src="/img/materiad-logo.png" alt="logo" />
        </div>
        <div className="col-lg-2 col-md-4 col-6 mb-4">
          <img className="w-100 opacity-9" src="/img/epidata-logo.png" alt="logo" />
        </div>
        <div className="col-lg-2 col-md-4 col-6 mb-4">
          <img className="w-100 opacity-9" src="/img/banco-rioja.svg" alt="logo" />
        </div>
        <div className="col-lg-2 col-md-4 col-6 mb-4">
          <img className="w-100 opacity-9" src="/img/incluit.svg" alt="logo" />
        </div>
        <div className="col-lg-2 col-md-4 col-6 mb-4">
          <img className="w-100 opacity-9" src="/img/logo-tsoft.png" alt="logo" />
        </div>
        <div className="col-lg-2 col-md-4 col-6 mb-4">
          <img className="w-100 opacity-9" src="/img/practia-logo.svg" alt="logo" />
        </div>
      </div>
    </div>
  </div>

    </section>
    
  );
};

export default CountStats;
