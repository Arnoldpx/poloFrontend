import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const FormularioRegistro = () => {
  // Estado para los datos del formulario


   const [formData, setFormData] = useState({

    nombre: "",
    apellido: "",
    localidad: "La Rioja",
    estudios: "",
    especializacion: "",
    genero: "",
    titulo: "",
    curso_polo: "",
    fecha_de_nacimiento: "",
    telefono: "",
    residencia: "argentina",
    reside_en_exterior: "",

    sqlServer: '',
    mysql: '',
    postgre: '',
    oracle: '',
    extraDb: '',

    java: '',
    net: '',
    c: '',
    cTag: '',
    javascript: '',
    python: '',
    visualbasic: '',
    htmlCss: '',
    php: '',
    extraProgramacion: '',
    
    linux: '',
    windowsServer: '',
    ios: '',
    android: '',

    sistemas_geo: '',
    github: '',
    computacion_nube: '',
    metodologias_agiles: '',
    pmi: '',
    ciencia_de_datos: '',
    data_wh: '',
    extra_it: '',

    experiencia_dev: '',
    experiencia_it: '',
    debilidades: '',
    extra_sistemas: '',
    ingles: '',
    extra_idiomas: '',
    trabajo_actual: '',
    disponibilidad: '',
    remuneracion_actual: '',
    remuneracion_pretendida: ''
  });

  // Estado para almacenar el userId del token decodificado
  const [userId, setUserId] = useState(null);

  // Estados para controlar el mensaje de éxito o error
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fechaSeleccionada = formData.fecha_de_nacimiento ? new Date(formData.fecha_de_nacimiento) : null;
    const opciones = { day: '2-digit', month: 'numeric', year: 'numeric' };
    const fechaFormateada = fechaSeleccionada ? fechaSeleccionada.toLocaleDateString('es-ES', opciones) : '';


  useEffect(() => {
    // Obtener el token JWT de las cookies
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos
        if (decodedToken.exp < currentTime) {
          console.error('El token ha expirado');
          Cookies.remove('token'); // Eliminar el token si ha expirado
          return;
        }
        setUserId(decodedToken.id); // Asegúrate de que 'id' sea el campo correcto del token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('ID de usuario no disponible');
      setErrorMessage("Error: ID de usuario no disponible.");
      return;
    }

    // Añadir el ID del usuario a los datos del formulario
    const dataToSend = { ...formData, userId };

    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('Token no encontrado');
        setErrorMessage("Error: Token no encontrado.");
        return;
      }

      await axios.post('http://localhost:4000/api/createBasicData', dataToSend, {
        withCredentials: true, // Asegúrate de que axios envíe cookies
        headers: {
          'Authorization': `Bearer ${token}`, // Añade el token al header
          'Content-Type': 'application/json',
        },
      });

      // Mostrar mensaje de éxito
      setSuccessMessage("Datos enviados exitosamente.");
      setErrorMessage(""); // Limpiar cualquier mensaje de error

      // Limpiar el formulario si deseas
      setFormData({
        nombre: "",
        apellido: "",
        localidad: "La Rioja",
        estudios: "",
        especializacion: "",
        genero: "",
        titulo: "",
        curso_polo: "",
        fecha_de_nacimiento: "",
        telefono: "",
        email: "",
        residencia: "argentina",
        reside_en_exterior: "",
        java: '',
        net: '',
        c: '',
        cTag: '',
        javascript: '',
        python: '',
        visualbasic: '',
        htmlCss: '',
        php: '',
        extraProgramacion: '',
        sqlServer: '',
        mysql: '',
        postgre: '',
        oracle: '',
        extraDb: '',
        linux: '',
        windowsServer: '',
        ios: '',
        android: '',
        sistemas_geo: '',
        github: '',
        computacion_nube: '',
        metodologias_agiles: '',
        pmi: '',
        ciencia_de_datos: '',
        data_wh: '',
        extra_it: '',
        experiencia_dev: '',
        experiencia_it: '',
        debilidades: '',
        extra_sistemas: '',
        ingles: '',
        extra_idiomas: '',
        trabajo_actual: '',
        disponibilidad: '',
        remuneracion_actual: '',
        remuneracion_pretendida: ''
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setSuccessMessage(""); // Limpiar cualquier mensaje de éxito
      if (error.response && error.response.status === 403) {
        setErrorMessage("Error 403: Acceso prohibido.");
      } else {
        setErrorMessage("Error al enviar los datos. Inténtalo de nuevo.");
      }
    }
  };


  return (
  <form className="formulario" method="POST" onSubmit={handleSubmit}>
    <div className="container-fluid my-3 py-3">
      <div className="row mb-5">
        {/* Card Profile */}
        <div className="card card-body" id="profile">
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-auto col-4">
              <div className="avatar avatar-xl position-relative">
                <img src="img/PoloTecLogo.png" alt="bruce" className="w-100 rounded-circle shadow-sm" />
              </div>
            </div>
            <div className="col-sm-auto col-8 my-auto">
              <div className="h-100">
                <h5 className="mb-1 font-weight-bolder">
                  Registro de la Economia del Conocimiento La Rioja
                </h5>
                <p className="mb-0 font-weight-normal text-sm">
                  Gobierno de La Rioja
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Card Basic Info */}
        <div className="card mt-4 shadow-sm border border-light" id="basic-info">
        <div className="card-header">
          <h5>Información Básica</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Nombre y Apellido */}
            <div className="col-6">
              <div className="input-group input-group-static">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Su Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group input-group-static">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  placeholder="Su Apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            {/* Localidad */}
            <div className="col-sm-3 col-4">
              <label className="form-label mt-5 ms-0">Localidad</label>
              <select
                className="form-control"
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
              >
                <option value="" disabled>Seleccione su Localidad</option>
                {/* Lista de localidades */}
                {["La Rioja", "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego, Antártida e Islas del Atlántico Sur", "Tucumán", "Extranjero"].map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Educación Formal, Especialización, Género */}
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-5 col-5">
                  <label className="form-label mt-5 ms-0">Educación Formal</label>
                  <select
                    className="form-control"
                    name="estudios"
                    value={formData.estudios}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione su Nivel de Estudios</option>
                    {["Secundario Completo", "Pregrado", "Grado", "Posgrado", "No tiene una educación formal"].map((estudio) => (
                      <option key={estudio} value={estudio}>{estudio}</option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-4 col-3 ">
                  <label className="form-label mt-5 ms-0">Área de Interés</label>
                  <select
                    className="form-control"
                    name="especializacion"
                    value={formData.especializacion}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione su Área</option>
                    {["Soporte Técnico", "Desarrollador Front-end", "Desarrollador Back-end", "Desarrollador Full-Stack", "Gestión de Bases de Datos", "Análisis de Datos", "Marketing", "Comunicación / Prensa", "Politólogos", "Abogacía / Legales", "Contaduría", "Antropología", "Administración y Gestión Organizacional", "Lengua extranjera", "QA / Automatización", "otra"].map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-3 col-4">
                  <label className="form-label mt-5">Su Género</label>
                  <select
                    className="form-control"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Seleccione su Género</option>
                    {["Masculino", "Femenino", "LGTB+", "No especifica"].map((genero) => (
                      <option key={genero} value={genero}>{genero}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Título y Curso Polo */}
          <div className="row mt-5">
            <div className="col-6">
              <div className="input-group input-group-static">
                <label>Ingrese el nombre de sus títulos de grado finalizados</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  placeholder="Ej: Ingeniero en sistemas"
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group input-group-static">
                <label>¿Realizó algún curso en el Polo Tecnológico La Rioja?</label>
                <input
                  type="text"
                  className="form-control"
                  name="curso_polo"
                  placeholder="Especifique curso"
                  value={formData.curso_polo}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Fecha de Nacimiento y Teléfono */}
          <div className="row mt-5">
            <div className="col-6">
              <div className="input-group input-group-static">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_de_nacimiento"
                  value={formData.fecha_de_nacimiento}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group input-group-static">
                <label>Número de contacto</label>
                <input
                  type="number"
                  className="form-control"
                  name="telefono"
                  placeholder="+54 380 4000000"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6 mt-5">
              <div className="input-group input-group-static">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="xxxx@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Residencia */}
          <div className="row">
            <div className="col-md-6 align-self-center">
              <label className="form-label mt-5 ms-0">Lugar de residencia</label>
              <select
                className="form-control"
                name="residencia"
                value={formData.residencia}
                onChange={handleChange}
              >
                <option value="argentina">Argentina</option>
                <option value="exterior">Exterior de Argentina</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label mt-5">En caso de residir en el Exterior, especifique el país.</label>
              <input
                type="text"
                className="form-control"
                name="recide_en_exterior"
                placeholder="Chile, Brasil, etc."
                value={formData.reside_en_exterior}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
     </div>


     {/* Card Base de datos */}

     <div className="card p-4 mt-4">
  <legend><h5>Experiencia en utilización de Motores de Bases de Datos:</h5></legend>
  
  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">SQL Server</label>
      <select
        className="form-control"
        name="sqlServer"
        value={formData.sqlServer}
        onChange={handleChange}
      >
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="Nulo">No tiene conocimientos en el área.</option>
        <option value="Básico (necesito tutoría)">Utilicé el programa, pero necesito una tutoría.</option>
        <option value="Básico (comandos propios)">Puedo realizar algunos comandos básicos por cuenta propia.</option>
        <option value="Intermedio">Tengo más de 2 años de experiencia y lo conozco en profundidad.</option>
        <option value="Avanzado (con certificaciones)">Tengo más de 5 años de experiencia y certificaciones.</option>
      </select>
    </div>

    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">MySQL</label>
      <select
        className="form-control"
        name="mysql"
        value={formData.mysql}
        onChange={handleChange}
      >
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="Nulo">No tiene conocimientos en el área.</option>
        <option value="Básico (necesito tutoría)">Utilicé el programa, pero necesito una tutoría.</option>
        <option value="Básico (comandos propios)">Puedo realizar algunos comandos básicos por cuenta propia.</option>
        <option value="Intermedio">Tengo más de 2 años de experiencia y lo conozco en profundidad.</option>
        <option value="Avanzado (con certificaciones)">Tengo más de 5 años de experiencia y certificaciones.</option>
      </select>
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">PostgreSQL</label>
      <select
        className="form-control"
        name="postgre"
        value={formData.postgre}
        onChange={handleChange}
      >
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="Nulo">No tiene conocimientos en el área.</option>
        <option value="Básico (necesito tutoría)">Utilicé el programa, pero necesito una tutoría.</option>
        <option value="Básico (comandos propios)">Puedo realizar algunos comandos básicos por cuenta propia.</option>
        <option value="Intermedio">Tengo más de 2 años de experiencia y lo conozco en profundidad.</option>
        <option value="Avanzado (con certificaciones)">Tengo más de 5 años de experiencia y certificaciones.</option>
      </select>
    </div>

    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Oracle</label>
      <select
        className="form-control"
        name="oracle"
        value={formData.oracle}
        onChange={handleChange}
      >
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="Nulo">No tiene conocimientos en el área.</option>
        <option value="Básico (necesito tutoría)">Utilicé el programa, pero necesito una tutoría.</option>
        <option value="Básico (comandos propios)">Puedo realizar algunos comandos básicos por cuenta propia.</option>
        <option value="Intermedio">Tengo más de 2 años de experiencia y lo conozco en profundidad.</option>
        <option value="Avanzado (con certificaciones)">Tengo más de 5 años de experiencia y certificaciones.</option>
      </select>
    </div>
  </div>
</div>
     
        {/*card informacion de programacion */}
        <div className="card shadow-sm border border-light" id="basic-info">
  <div className="card-header">
    <h5>Información sobre uso en lenguajes de programación.</h5>
  </div>
  <div className="container-fluid my-3 py-3">
    <div className="row">
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">Java</label>
        <select
          className="form-control"
          name="java"
          value={formData.java}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">PHP</label>
        <select
          className="form-control"
          name="php"
          value={formData.php}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>

      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">.NET</label>
        <select
          className="form-control"
          name="net"
          value={formData.net}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">C / C++</label>
        <select
          className="form-control"
          name="c"
          value={formData.c}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
    </div>

    <div className="row">
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">C#</label>
        <select
          className="form-control"
          name="cTag"
          value={formData.cTag}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">Javascript</label>
        <select
          className="form-control"
          name="javascript"
          value={formData.javascript}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">Python</label>
        <select
          className="form-control"
          name="python"
          value={formData.python}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
    </div>
    

    <div className="row">
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">Visual Basic</label>
        <select
          className="form-control"
          name="visualbasic"
          value={formData.visualbasic}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
      <div className="col-sm-4 col-6">
        <label className="form-label mt-4 ms-0">HTML / CSS</label>
        <select
          className="form-control"
          name="htmlCss"
          value={formData.htmlCss}
          onChange={handleChange}
        >
          <option value="" disabled>Seleccione su nivel.</option>
          <option value="No tiene conocimientos en el área.">Nulo</option>
          <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
          <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
          <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
          <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
        </select>
      </div>
    </div>
  </div>
</div>
               {/*card Sistemas Operativos y Plataformas */}
       
       <div className="card mt-4  shadow-sm border border-light p-4" id="basic-info">
            <div className="card-header">
              <h5>Experiencia en utilización de Sistemas Operativos y Plataformas:</h5>
            </div>
         <div className="row mb-5">
          <div className="col-sm-6 col-6">
            <label className="form-label mt-4 ms-0">Linux</label>
            <select
              className="form-control"
              name="linux"
              value={formData.linux}
              onChange={handleChange}
            >
             <option value="" disabled>Seleccione su nivel.</option>
              <option value="Nulo">Nulo</option>
              <option value="Básico">Básico: Conocimientos limitados.</option>
              <option value="Intermedio">Intermedio: Experiencia moderada.</option>
              <option value="Avanzado">Avanzado: Gran dominio de la tecnología.</option>
              <option value="Experto">Experto: Amplia experiencia y certificaciones.</option>
            </select>
          </div>
          <div className="col-sm-6 col-6">
            <label className="form-label mt-4 ms-0">Windows Server</label>
            <select
              className="form-control"
              name="windowsServer"
              value={formData.windowsServer}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccione su nivel.</option>
              <option value="Nulo">Nulo</option>
              <option value="Básico">Básico: Conocimientos limitados.</option>
              <option value="Intermedio">Intermedio: Experiencia moderada.</option>
              <option value="Avanzado">Avanzado: Gran dominio de la tecnología.</option>
              <option value="Experto">Experto: Amplia experiencia y certificaciones.</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-6">
            <label className="form-label mt-4 ms-0">IOS</label>
            <select
              className="form-control"
              name="ios"
              value={formData.ios}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccione su nivel.</option>
              <option value="Nulo">Nulo</option>
              <option value="Básico">Básico: Conocimientos limitados.</option>
              <option value="Intermedio">Intermedio: Experiencia moderada.</option>
              <option value="Avanzado">Avanzado: Gran dominio de la tecnología.</option>
              <option value="Experto">Experto: Amplia experiencia y certificaciones.</option>
            </select>
          </div>
          <div className="col-sm-6 col-6">
            <label className="form-label mt-4 ms-0">Android</label>
            <select
              className="form-control"
              name="android"
              value={formData.android}
              onChange={handleChange}
            >
             <option value="" disabled>Seleccione su nivel.</option>
              <option value="Nulo">Nulo</option>
              <option value="Básico">Básico: Conocimientos limitados.</option>
              <option value="Intermedio">Intermedio: Experiencia moderada.</option>
              <option value="Avanzado">Avanzado: Gran dominio de la tecnología.</option>
              <option value="Experto">Experto: Amplia experiencia y certificaciones.</option>
            </select>
          </div>
        </div>
      </div>  

      <div className="card mt-4 shadow-sm border border-light p-4" id="basic-info">
  <div className="card-header ">
    <h5>Experiencia en el uso de otras herramientas o metodologías:</h5>
  </div> 

  <div className="row ">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Sistemas de Información Geográfico</label>
      <select className="form-control" name="sistemas_geo" value={formData.sistemas_geo} onChange={handleChange}>
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="No tiene conocimientos en el área.">Nulo</option>
        <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
        <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
        <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
        <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
      </select>
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Repositorios de la nube (ej. Github)</label>
      <select className="form-control" name="github" value={formData.github} onChange={handleChange}>
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="No tiene conocimientos en el área.">Nulo</option>
        <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
        <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
        <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
        <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
      </select>
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Computación en la nube (ej. Azure, AWS o Google Cloud)</label>
      <select className="form-control" name="computacion_nube" value={formData.computacion_nube} onChange={handleChange}>
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="No tiene conocimientos en el área.">Nulo</option>
        <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
        <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
        <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
        <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
      </select>
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Metodologías ágiles (scrum/xp)</label>
      <select className="form-control" name="metodologias_agiles" value={formData.metodologias_agiles} onChange={handleChange}>
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="No tiene conocimientos en el área.">Nulo</option>
        <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
        <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
        <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
        <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
      </select>
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Project Management Institute (PMI)</label>
      <select className="form-control" name="pmi" value={formData.pmi} onChange={handleChange}>
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="No tiene conocimientos en el área.">Nulo</option>
        <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
        <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
        <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
        <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
      </select>
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Tecnologías de Ciencia de Datos</label>
      <select className="form-control" name="ciencia_de_datos" value={formData.ciencia_de_datos} onChange={handleChange}>
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="No tiene conocimientos en el área.">Nulo</option>
        <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
        <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
        <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
        <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
      </select>
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Almacén y Análisis de Datos (Data warehouse)</label>
      <select className="form-control" name="data_wh" value={formData.data_wh} onChange={handleChange}>
        <option value="" disabled>Seleccione su nivel.</option>
        <option value="No tiene conocimientos en el área.">Nulo</option>
        <option value="Tiene conocimientos básicos, pero no puede realizar tareas por su cuenta.">Utilice el programa, pero necesito una tutoría.</option>
        <option value="Tiene conocimientos básicos, puede realizar tareas sencillas.">Puedo realizar algunos comandos básicos, por cuenta propia.</option>
        <option value="Tiene experiencia, puede realizar tareas complejas.">Tengo más de 2 años de experiencia en el lenguaje, y lo conozco en profundidad.</option>
        <option value="Amplia experiencia en el área, con certificaciones que avalan sus conocimientos.">Tengo más de 5 años de experiencia en el lenguaje, y certificaciones.</option>
      </select>
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Experiencia en otras áreas de IT (si es aplicable)</label>
      <textarea className="form-control" name="extra_it" value={formData.extra_it} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Experiencia en desarrollo de software</label>
      <textarea className="form-control" name="experiencia_dev" value={formData.experiencia_dev} onChange={handleChange} />
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Experiencia en IT (en general)</label>
      <textarea className="form-control" name="experiencia_it" value={formData.experiencia_it} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Debilidades</label>
      <textarea className="form-control" name="debilidades" value={formData.debilidades} onChange={handleChange} />
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Experiencia adicional en sistemas</label>
      <textarea className="form-control" name="extra_sistemas" value={formData.extra_sistemas} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Nivel de inglés</label>
      <select className="form-control" name="ingles" value={formData.ingles} onChange={handleChange}>
        <option value="Nulo">Nulo</option>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
        <option value="Nativo">Nativo</option>
      </select>
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Idiomas adicionales</label>
      <textarea className="form-control" name="extra_idiomas" value={formData.extra_idiomas} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Trabajo actual</label>
      <textarea className="form-control" name="trabajo_actual" value={formData.trabajo_actual} onChange={handleChange} />
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Disponibilidad</label>
      <textarea className="form-control" name="disponibilidad" value={formData.disponibilidad} onChange={handleChange} />
    </div>
  </div>

  <div className="row">
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Remuneración actual</label>
      <textarea className="form-control" name="remuneracion_actual" value={formData.remuneracion_actual} onChange={handleChange} />
    </div>
    <div className="col-sm-6 col-6">
      <label className="form-label mt-4 ms-0">Remuneración pretendida</label>
      <textarea className="form-control" name="remuneracion_pretendida" value={formData.remuneracion_pretendida} onChange={handleChange} />
    </div>
  </div>

        <div className="row mt-3">
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
        </div>
    </div>
        
        
    </form>
  );
};

export default FormularioRegistro;
