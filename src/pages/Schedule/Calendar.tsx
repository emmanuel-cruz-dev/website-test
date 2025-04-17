import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { FC } from "react";
import "./Calendar.css";
import { CalendarProps } from "../../types/types";

const Calendar: FC<CalendarProps> = ({ title, events }) => {
  return (
    <article className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-4xl py-4 pb-6 text-left">{title}</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locales={[esLocale]}
        locale="es"
        allDayText="Horarios"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        events={events}
      />
    </article>
  );
};

export default Calendar;
