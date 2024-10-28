// src/components/Footer.js
import React from 'react';

const Footer = () => (
  <footer className="footer py-4 position-relative" style={{ backgroundColor: '#424242', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
  <div className="container-fluid footer-columns">
    <div className="row align-items-center">
      <div className="col-lg-6 text-start mt-4">
        <h6 className="footer-title text-white" style={{ fontSize: '1.3rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Ubicación</h6>
        <p className="text-white" style={{ fontSize: '1.1rem' }}>Calle Falsa 123, Ciudad, País</p>
      </div>
      <div className="col-lg-6 text-end mt-4">
        <h6 className="footer-title text-white" style={{ fontSize: '1.3rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Seguinos</h6>
        <div className="d-flex justify-content-end align-items-center mt-2">
          <a href="https://www.facebook.com/profile.php?id=100083851852563" className="btn btn-icon-only btn-link text-white me-3" data-toggle="tooltip" data-placement="bottom" style={{ fontSize: '1.5rem' }}>
            <i className="fab fa-facebook"></i>
          </a>
          <span className="text-white me-4" style={{ fontSize: '1.2rem' }}>Facebook</span>

          <a href="https://twitter.com/PoloTecLR" className="btn btn-icon-only btn-link text-white me-3" data-toggle="tooltip" data-placement="bottom" style={{ fontSize: '1.5rem' }}>
            <i className="fab fa-twitter"></i>
          </a>
          <span className="text-white me-4" style={{ fontSize: '1.2rem' }}>Twitter</span>

          <a href="https://www.instagram.com/polotecnologicolr/" className="btn btn-icon-only btn-link text-white" data-toggle="tooltip" data-placement="bottom" style={{ fontSize: '1.5rem' }}>
            <i className="fab fa-instagram"></i>
          </a>
          <span className="text-white" style={{ fontSize: '1.2rem' }}>Instagram</span>
        </div>
      </div>
    </div>

    <div className="row mt-4">
      <div className="col-md-3 text-center">
        <img src="//polotec.ar/campus/imagenes/provincia_q_late.png" alt="Logo 1" className="w-50" style={{ filter: 'brightness(0) invert(1)', marginBottom: '10px' }} />
      </div>
      <div className="col-md-3 text-center">
        <img src="//polotec.ar/campus/imagenes/ciencia_y_tec.png" alt="Logo 2" className="w-50" style={{ filter: 'brightness(0) invert(1)', marginBottom: '10px' }} />
      </div>
      <div className="col-md-3 text-center">
        <img src="//polotec.ar/campus/imagenes/ministerio.png" alt="Logo 3" className="w-50" style={{ filter: 'brightness(0) invert(1)', marginBottom: '10px' }} />
      </div>
      <div className="col-md-3 text-center">
        <img src="https://polotec.ar/campus/imagenes/rioja.png" alt="Logo 4" className="w-50" style={{ filter: 'brightness(0) invert(1)', marginBottom: '10px' }} />
      </div>
    </div>
  </div>

  <div className="row mt-4">
    <div className="col-12 text-center">
      <p className="mb-0 text-white" style={{ fontSize: '1rem' }}>
        - Desarrollado por: Dirección General de Economía del Conocimiento - {new Date().getFullYear()} -
      </p>
    </div>
  </div>
</footer>

  
  
  
);

export default Footer;
