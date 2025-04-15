import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

const Calendar = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locales={[esLocale]}
        locale={"es"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        events={[
          {
            title: "Turno ocupado",
            start: "2025-04-16T10:00:00",
            end: "2025-04-16T10:30:00",
            color: "#3D8CC7",
          },
          {
            title: "Disponible",
            start: "2025-04-16T11:00:00",
            end: "2025-04-16T11:30:00",
            color: "#D4EDDA",
          },
        ]}
      />
    </div>
  );
};

export default Calendar;
