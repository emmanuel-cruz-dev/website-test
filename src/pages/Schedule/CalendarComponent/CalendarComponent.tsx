// Archivo: CalendarComponent.tsx
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventClickArg,
  DateSelectArg,
  EventApi,
  DatesSetArg,
} from "@fullcalendar/core";
import Modal from "../Modal/Modal";
import {
  addDays,
  addMinutes,
  format,
  startOfWeek,
  isBefore,
  isSameDay,
  parseISO,
} from "date-fns";

interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: "available" | "booked";
}

const CalendarComponent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Separamos los turnos ocupados y disponibles para mejor manejo
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>(
    []
  );
  const [availableSlots, setAvailableSlots] = useState<Appointment[]>([]);

  // Referencias para evitar regeneración innecesaria
  const visibleRangeRef = useRef<{ start: Date; end: Date }>({
    start: new Date(),
    end: addDays(new Date(), 7),
  });

  const calendarRef = useRef<FullCalendar>(null);
  const slotsGeneratedRef = useRef<boolean>(false);

  // Configuración de horarios
  const businessHours = {
    startTime: "08:00",
    endTime: "20:00",
    slotDuration: 30, // minutos
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // 0=domingo, 1=lunes, ..., 6=sábado
  };

  // Generar slots disponibles para el rango visible sólo una vez cuando el componente se monta
  useEffect(() => {
    if (!slotsGeneratedRef.current) {
      generateAvailableSlots();
      slotsGeneratedRef.current = true;
    }
  }, []);

  // Regenerar slots cuando cambia el rango visible
  const handleDatesSet = (dateInfo: DatesSetArg) => {
    const newStart = dateInfo.start;
    const newEnd = dateInfo.end;

    // Solo regenerar si el nuevo rango es significativamente diferente
    if (
      Math.abs(newStart.getTime() - visibleRangeRef.current.start.getTime()) >
        86400000 || // 1 día en ms
      Math.abs(newEnd.getTime() - visibleRangeRef.current.end.getTime()) >
        86400000
    ) {
      visibleRangeRef.current = {
        start: newStart,
        end: newEnd,
      };

      // Llamar a generateAvailableSlots pero mantener las citas reservadas
      generateAvailableSlots();
    }
  };

  const generateAvailableSlots = () => {
    const { start: visibleStart, end: visibleEnd } = visibleRangeRef.current;
    const newAvailableSlots: Appointment[] = [];

    // Empezar desde el inicio de la semana
    let currentDate = startOfWeek(visibleStart);

    // Generar slots para 14 días (2 semanas)
    for (let day = 0; day < 14; day++) {
      if (businessHours.daysOfWeek.includes(currentDate.getDay())) {
        // Hora de inicio del día
        let currentTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          parseInt(businessHours.startTime.split(":")[0]),
          parseInt(businessHours.startTime.split(":")[1])
        );

        // Hora de fin del día
        const endTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          parseInt(businessHours.endTime.split(":")[0]),
          parseInt(businessHours.endTime.split(":")[1])
        );

        // Generar slots para este día
        while (isBefore(currentTime, endTime)) {
          const slotStart = new Date(currentTime);
          const slotEnd = addMinutes(currentTime, businessHours.slotDuration);

          // Verificar si este slot ya existe como reservado
          const isBooked = bookedAppointments.some((booking) => {
            const bookingStart = new Date(booking.start);
            return (
              isSameDay(bookingStart, slotStart) &&
              format(bookingStart, "HH:mm") === format(slotStart, "HH:mm")
            );
          });

          // Si no está reservado, agregar como disponible
          if (!isBooked) {
            const slotId = `available-${format(slotStart, "yyyy-MM-dd-HH-mm")}`;

            // Verificar si este slot disponible ya existe para no duplicarlo
            const slotExists = availableSlots.some(
              (slot) =>
                isSameDay(new Date(slot.start), slotStart) &&
                format(new Date(slot.start), "HH:mm") ===
                  format(slotStart, "HH:mm")
            );

            if (!slotExists) {
              newAvailableSlots.push({
                id: slotId,
                title: "Disponible",
                start: slotStart,
                end: slotEnd,
                status: "available",
              });
            }
          }

          // Avanzar al siguiente slot
          currentTime = slotEnd;
        }
      }

      // Avanzar al siguiente día
      currentDate = addDays(currentDate, 1);
    }

    // Actualizar los slots disponibles (mantener los que ya están y agregar los nuevos)
    setAvailableSlots((prevSlots) => {
      // Filtrar los slots existentes que podrían estar duplicados
      const existingSlotIds = newAvailableSlots.map((slot) => slot.id);
      const filteredExistingSlots = prevSlots.filter(
        (slot) => !existingSlotIds.includes(slot.id)
      );

      return [...filteredExistingSlots, ...newAvailableSlots];
    });
  };

  // Combinar ambos tipos de citas para el calendario
  const allAppointments = [...bookedAppointments, ...availableSlots];

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
      // Crear nuevo turno ocupado
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        title: appointmentData.title || "Turno Ocupado",
        start: appointmentData.start || selectedDate,
        end:
          appointmentData.end ||
          new Date(
            selectedDate.getTime() + businessHours.slotDuration * 60 * 1000
          ),
        status: "booked",
      };

      // Añadir a la lista de turnos ocupados
      setBookedAppointments((prev) => [...prev, newAppointment]);

      // Eliminar el slot disponible correspondiente
      const startTimeStr = format(newAppointment.start, "yyyy-MM-dd-HH-mm");
      setAvailableSlots((prevSlots) =>
        prevSlots.filter((slot) => slot.id !== `available-${startTimeStr}`)
      );
    } else if (modalMode === "edit" && selectedEvent) {
      const eventId = selectedEvent.id;
      const eventStatus = selectedEvent.extendedProps?.status || "available";

      if (eventStatus === "available") {
        // Convertir slot disponible a ocupado
        const bookedAppointment: Appointment = {
          id: Date.now().toString(),
          title: appointmentData.title || "Turno Ocupado",
          start:
            appointmentData.start ||
            new Date(selectedEvent.start || new Date()),
          end: appointmentData.end || new Date(selectedEvent.end || new Date()),
          status: "booked",
        };

        // Añadir a la lista de turnos ocupados
        setBookedAppointments((prev) => [...prev, bookedAppointment]);

        // Eliminar el slot disponible
        setAvailableSlots((prevSlots) =>
          prevSlots.filter((slot) => slot.id !== eventId)
        );
      } else {
        // Actualizar turno ocupado existente
        setBookedAppointments((prevBooked) =>
          prevBooked.map((app) =>
            app.id === eventId
              ? {
                  ...app,
                  title: appointmentData.title || app.title,
                  start: appointmentData.start || app.start,
                  end: appointmentData.end || app.end,
                }
              : app
          )
        );
      }
    }

    setModalOpen(false);

    // Refrescar eventos del calendario
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();
    }
  };

  const handleDeleteAppointment = () => {
    if (selectedEvent) {
      const eventId = selectedEvent.id;
      const eventStatus = selectedEvent.extendedProps?.status || "available";

      if (eventStatus === "booked") {
        // Eliminar de la lista de turnos ocupados
        setBookedAppointments((prevBooked) =>
          prevBooked.filter((app) => app.id !== eventId)
        );

        // Recrear el slot disponible
        const eventStart = new Date(selectedEvent.start || new Date());
        const eventEnd = new Date(selectedEvent.end || new Date());

        const availableSlot: Appointment = {
          id: `available-${format(eventStart, "yyyy-MM-dd-HH-mm")}`,
          title: "Disponible",
          start: eventStart,
          end: eventEnd,
          status: "available",
        };

        setAvailableSlots((prevSlots) => [...prevSlots, availableSlot]);
      }

      setModalOpen(false);

      // Refrescar eventos del calendario
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents();
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Calendario de Turnos</h1>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
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
          datesSet={handleDatesSet}
          events={allAppointments.map((appointment) => ({
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            backgroundColor:
              appointment.status === "available" ? "#10B981" : "#EF4444",
            borderColor:
              appointment.status === "available" ? "#059669" : "#DC2626",
            extendedProps: {
              status: appointment.status,
            },
          }))}
          locale="es"
          height="auto"
          slotMinTime={businessHours.startTime}
          slotMaxTime={businessHours.endTime}
          allDaySlot={false}
          slotDuration={`00:${businessHours.slotDuration}:00`}
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
          isAvailableSlot={selectedEvent?.extendedProps?.status === "available"}
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
                    ? new Date(
                        selectedDate.getTime() +
                          businessHours.slotDuration * 60 * 1000
                      )
                    : new Date(),
                  status: "booked",
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

// Archivo: App.tsx
// import React from "react";
// import CalendarComponent from "./CalendarComponent";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto py-8">
//         <CalendarComponent />
//       </div>
//     </div>
//   );
// }

// export default App;
