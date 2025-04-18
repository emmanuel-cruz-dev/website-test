// Archivo: CalendarComponent.tsx
import { useState, useRef, FC, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg, DateSelectArg, EventApi } from "@fullcalendar/core";
import Modal from "../Modal/Modal";

export interface Appointment {
  id: string;
  title: string;
  // start: Date;
  // end: Date;
  start: string | Date;
  end: string | Date;
  status: "available" | "booked";
}

interface CalendarComponentProps {
  title: string;
  events: Appointment[];
}

const CalendarComponent: FC<CalendarComponentProps> = ({ title, events }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // const [appointments, setAppointments] = useState<Appointment[]>([
  //   {
  //     id: "1",
  //     title: "Turno Ocupado",
  //     start: new Date("2025-04-17T10:00:00"),
  //     end: new Date("2025-04-17T11:30:00"),
  //     status: "booked",
  //   },
  //   {
  //     id: "2",
  //     title: "Turno Disponible",
  //     start: new Date("2025-04-17T14:00:00"),
  //     end: new Date("2025-04-17T15:00:00"),
  //     status: "available",
  //   },
  // ]);

  useEffect(() => {
    setAppointments(events);
  }, [events]);

  const calendarRef = useRef<FullCalendar>(null);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setModalMode("add");
    setSelectedDate(selectInfo.start);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setModalMode("edit");
    setSelectedEvent(clickInfo.event);
    setSelectedDate(null);
    setModalOpen(true);
  };

  const handleSaveAppointment = (appointmentData: Partial<Appointment>) => {
    if (modalMode === "add" && selectedDate) {
      // Crear nuevo turno
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        title: appointmentData.title || "Nuevo Turno",
        start: appointmentData.start || selectedDate,
        end:
          appointmentData.end ||
          //new Date(selectedDate.getTime() + 60 * 60 * 1000), // +1 hora por defecto
          new Date(selectedDate.getTime() + 30 * 60 * 1000), // +30 media hora por defecto
        status: appointmentData.status || "available",
      };

      setAppointments([...appointments, newAppointment]);
    } else if (modalMode === "edit" && selectedEvent) {
      // Actualizar turno existente
      const updatedAppointments = appointments.map((app) =>
        app.id === selectedEvent.id
          ? {
              ...app,
              title: appointmentData.title || app.title,
              start: appointmentData.start || app.start,
              end: appointmentData.end || app.end,
              status: appointmentData.status || app.status,
            }
          : app
      );
      setAppointments(updatedAppointments);
    }

    setModalOpen(false);
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  };

  const handleDeleteAppointment = () => {
    if (selectedEvent) {
      const updatedAppointments = appointments.filter(
        (app) => app.id !== selectedEvent.id
      );
      setAppointments(updatedAppointments);
      setModalOpen(false);
      if (calendarRef.current) {
        calendarRef.current.getApi().refetchEvents();
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold py-6">Calendario: {title}</h1>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          events={appointments.map((appointment) => ({
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            backgroundColor:
              appointment.status === "available" ? "#10B981" : "#EF4444",
            borderColor:
              appointment.status === "available" ? "#059669" : "#DC2626",
          }))}
          locale="es"
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          slotDuration="00:30:00"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
        />
      </div>

      {modalOpen && (
        <Modal
          mode={modalMode}
          initialData={
            selectedEvent
              ? {
                  id: selectedEvent.id,
                  title: selectedEvent.title,
                  start: selectedEvent.start || new Date(),
                  end: selectedEvent.end || new Date(),
                  status: selectedEvent.extendedProps?.status || "available",
                }
              : {
                  start: selectedDate || new Date(),
                  end: selectedDate
                    ? new Date(selectedDate.getTime() + 30 * 60 * 1000)
                    : new Date(),
                  status: "available",
                }
          }
          onSave={handleSaveAppointment}
          onDelete={handleDeleteAppointment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
