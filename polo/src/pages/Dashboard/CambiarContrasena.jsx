import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ title, subtitle }) => (
  <Box mb="20px">
    <Typography variant="h2" fontWeight="bold" sx={{ mb: "5px" }}>
      {title}
    </Typography>
    <Typography variant="h5">{subtitle}</Typography>
  </Box>
);

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [mode, setMode] = useState("light");
  const [event, setEvent] = useState(null); // Ya no es un array, sino un objeto
  const navigate = useNavigate();

  const colors = {
    light: {
      primary: "#f0f0f0",
      greenAccent: "#4caf50",
    },
    dark: {
      primary: "#333333",
      greenAccent: "#66bb6a",
    },
  };

  const selectedColors = colors[mode];

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      try {
        const decodedToken = jwtDecode(cookieToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.error("El token ha expirado");
          Cookies.remove("token");
          navigate("/login");
        } else {
          setToken(cookieToken);
          setUserId(decodedToken.userId || decodedToken.id); // Asegúrate del campo correcto
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/events?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (response.data.events && response.data.events.length > 0) {
          // Aquí, cada evento ya debería tener la información poblada del usuario
          console.log(response.data.events);
          setCurrentEvents(response.data.events);
        } else {
          console.error("No se encontraron eventos para este usuario.");
        }
      } catch (error) {
        console.error("Error al cargar los eventos:", error);
      }
    };
    
  
    if (token) {
      fetchEvents();
    }
  }, [token, userId]);


  const handleDateClick = async (selected) => {
    const title = prompt("Por favor ingresa un título para el evento:");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const startDate = new Date(selected.start);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 1);

      const newEvent = {
        title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        allDay: false,
        userId,
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/api/events",
          newEvent,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        calendarApi.addEvent({
          id: response.data._id,
          ...newEvent,
        });
      } catch (error) {
        console.error("Error al agregar evento:", error);
        alert("Hubo un error al agregar el evento.");
      }
    }
  };

  
  const handleEventClick = async (selected) => {
    // Asegúrate de que el userId esté presente en el evento
    if (selected.event.extendedProps.userId !== userId) {
      alert("No tienes permiso para eliminar este evento.");
      return;
    }
  
    if (window.confirm(`¿Estás seguro que deseas eliminar el evento '${selected.event.title}'?`)) {
      try {
        await axios.delete(`http://localhost:4000/api/events/${selected.event.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        selected.event.remove();
      } catch (error) {
        console.error("Error al eliminar evento:", error);
        alert("Hubo un error al eliminar el evento.");
      }
    }
  };
  return (
    <Box m="20px">
      <Header title="Calendario" subtitle="Página interactiva de calendario" />

      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 20%" backgroundColor={selectedColors.primary} p="15px" borderRadius="4px">
          <Typography variant="h5">Eventos</Typography>
          <List>
            {currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <ListItem key={event._id} sx={{ backgroundColor: selectedColors.greenAccent, margin: "10px 0", borderRadius: "2px" }}>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No hay eventos disponibles</Typography>
            )}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
