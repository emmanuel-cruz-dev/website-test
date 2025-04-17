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

// El componente Modal permanece igual que en el ejemplo anterior

// import React, { useState, useRef, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import {
//   EventClickArg,
//   DateSelectArg,
//   EventApi,
//   DatesSetArg,
// } from "@fullcalendar/core";
// import Modal from "../Modal/Modal";
// import {
//   addDays,
//   addMinutes,
//   format,
//   startOfWeek,
//   isBefore,
//   isSameDay,
//   parseISO,
// } from "date-fns";

// interface Appointment {
//   id: string;
//   title: string;
//   start: Date;
//   end: Date;
//   status: "available" | "booked";
// }

// const CalendarComponent: React.FC = () => {
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
//   const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [visibleDateRange, setVisibleDateRange] = useState<{
//     start: Date;
//     end: Date;
//   }>({
//     start: new Date(),
//     end: addDays(new Date(), 7),
//   });

//   const calendarRef = useRef<FullCalendar>(null);

//   // Configuración de horarios
//   const businessHours = {
//     startTime: "08:00",
//     endTime: "20:00",
//     slotDuration: 30, // minutos
//     daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // 0=domingo, 1=lunes, ..., 6=sábado
//   };

//   // Generar slots disponibles para el rango visible
//   useEffect(() => {
//     generateAvailableSlots();
//   }, [visibleDateRange]);

//   const generateAvailableSlots = () => {
//     const { start: visibleStart, end: visibleEnd } = visibleDateRange;
//     const newAvailableSlots: Appointment[] = [];
//     const bookedAppointments = appointments.filter(
//       (app) => app.status === "booked"
//     );

//     // Empezar desde el inicio de la semana
//     let currentDate = startOfWeek(visibleStart);

//     // Generar slots para 14 días (2 semanas)
//     for (let day = 0; day < 14; day++) {
//       if (businessHours.daysOfWeek.includes(currentDate.getDay())) {
//         // Hora de inicio del día
//         let currentTime = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate(),
//           parseInt(businessHours.startTime.split(":")[0]),
//           parseInt(businessHours.startTime.split(":")[1])
//         );

//         // Hora de fin del día
//         const endTime = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate(),
//           parseInt(businessHours.endTime.split(":")[0]),
//           parseInt(businessHours.endTime.split(":")[1])
//         );

//         // Generar slots para este día
//         while (isBefore(currentTime, endTime)) {
//           const slotStart = new Date(currentTime);
//           const slotEnd = addMinutes(currentTime, businessHours.slotDuration);

//           // Verificar si este slot ya existe como reservado
//           const isBooked = bookedAppointments.some((booking) => {
//             const bookingStart = new Date(booking.start);
//             return (
//               isSameDay(bookingStart, slotStart) &&
//               format(bookingStart, "HH:mm") === format(slotStart, "HH:mm")
//             );
//           });

//           // Si no está reservado, agregar como disponible
//           if (!isBooked) {
//             const slotId = `available-${format(slotStart, "yyyy-MM-dd-HH-mm")}`;

//             // Verificar si este slot disponible ya existe para no duplicarlo
//             const slotExists = appointments.some(
//               (app) =>
//                 app.status === "available" &&
//                 isSameDay(new Date(app.start), slotStart) &&
//                 format(new Date(app.start), "HH:mm") ===
//                   format(slotStart, "HH:mm")
//             );

//             if (!slotExists) {
//               newAvailableSlots.push({
//                 id: slotId,
//                 title: "Disponible",
//                 start: slotStart,
//                 end: slotEnd,
//                 status: "available",
//               });
//             }
//           }

//           // Avanzar al siguiente slot
//           currentTime = slotEnd;
//         }
//       }

//       // Avanzar al siguiente día
//       currentDate = addDays(currentDate, 1);
//     }

//     // Actualizar los appointments agregando los nuevos slots disponibles
//     setAppointments((prevAppointments) => {
//       // Filtrar los appointments booked existentes
//       const existingBooked = prevAppointments.filter(
//         (app) => app.status === "booked"
//       );
//       // Combinar con nuevos slots disponibles
//       return [...existingBooked, ...newAvailableSlots];
//     });
//   };

//   const handleDatesSet = (dateInfo: DatesSetArg) => {
//     setVisibleDateRange({
//       start: dateInfo.start,
//       end: dateInfo.end,
//     });
//   };

//   const handleDateSelect = (selectInfo: DateSelectArg) => {
//     setModalMode("add");
//     setSelectedDate(selectInfo.start);
//     setSelectedEvent(null);
//     setModalOpen(true);
//   };

//   const handleEventClick = (clickInfo: EventClickArg) => {
//     setModalMode("edit");
//     setSelectedEvent(clickInfo.event);
//     setSelectedDate(null);
//     setModalOpen(true);
//   };

//   const handleSaveAppointment = (appointmentData: Partial<Appointment>) => {
//     if (modalMode === "add" && selectedDate) {
//       // Crear nuevo turno (siempre será "booked" al agregarlo manualmente)
//       const newAppointment: Appointment = {
//         id: Date.now().toString(),
//         title: appointmentData.title || "Turno Ocupado",
//         start: appointmentData.start || selectedDate,
//         end:
//           appointmentData.end ||
//           new Date(
//             selectedDate.getTime() + businessHours.slotDuration * 60 * 1000
//           ),
//         status: "booked", // Siempre ocupado al agregarlo manualmente
//       };

//       // Eliminar el "available" que corresponde a este mismo horario si existe
//       const updatedAppointments = appointments.filter(
//         (app) =>
//           !(
//             app.status === "available" &&
//             isSameDay(new Date(app.start), new Date(newAppointment.start)) &&
//             format(new Date(app.start), "HH:mm") ===
//               format(new Date(newAppointment.start), "HH:mm")
//           )
//       );

//       setAppointments([...updatedAppointments, newAppointment]);
//     } else if (modalMode === "edit" && selectedEvent) {
//       const eventId = selectedEvent.id;
//       const eventStatus = selectedEvent.extendedProps?.status || "available";

//       if (eventStatus === "available") {
//         // Si estamos editando un slot disponible, lo convertimos en booked
//         const bookedAppointment: Appointment = {
//           id: Date.now().toString(), // Nuevo ID para el turno ocupado
//           title: appointmentData.title || "Turno Ocupado",
//           start:
//             appointmentData.start ||
//             new Date(selectedEvent.start || new Date()),
//           end: appointmentData.end || new Date(selectedEvent.end || new Date()),
//           status: "booked",
//         };

//         // Reemplazar el disponible con el ocupado
//         const updatedAppointments = appointments.filter(
//           (app) => app.id !== eventId
//         );
//         setAppointments([...updatedAppointments, bookedAppointment]);
//       } else {
//         // Actualizar turno ocupado existente
//         const updatedAppointments = appointments.map((app) =>
//           app.id === eventId
//             ? {
//                 ...app,
//                 title: appointmentData.title || app.title,
//                 start: appointmentData.start || app.start,
//                 end: appointmentData.end || app.end,
//               }
//             : app
//         );
//         setAppointments(updatedAppointments);
//       }
//     }

//     setModalOpen(false);
//     if (calendarRef.current) {
//       calendarRef.current.getApi().refetchEvents();
//     }
//   };

//   const handleDeleteAppointment = () => {
//     if (selectedEvent) {
//       const eventId = selectedEvent.id;
//       const eventStatus = selectedEvent.extendedProps?.status || "available";
//       const eventStart = new Date(selectedEvent.start || new Date());
//       const eventEnd = new Date(selectedEvent.end || new Date());

//       if (eventStatus === "booked") {
//         // Si eliminamos un turno ocupado, volvemos a crear el disponible
//         const availableSlot: Appointment = {
//           id: `available-${format(eventStart, "yyyy-MM-dd-HH-mm")}`,
//           title: "Disponible",
//           start: eventStart,
//           end: eventEnd,
//           status: "available",
//         };

//         // Eliminar el turno ocupado y agregar el disponible
//         const updatedAppointments = appointments.filter(
//           (app) => app.id !== eventId
//         );
//         setAppointments([...updatedAppointments, availableSlot]);
//       }

//       setModalOpen(false);
//       if (calendarRef.current) {
//         calendarRef.current.getApi().refetchEvents();
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold">Calendario de Turnos</h1>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <FullCalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="timeGridWeek"
//           headerToolbar={{
//             left: "prev,next today",
//             center: "title",
//             right: "dayGridMonth,timeGridWeek,timeGridDay",
//           }}
//           selectable={true}
//           selectMirror={true}
//           dayMaxEvents={true}
//           weekends={true}
//           select={handleDateSelect}
//           eventClick={handleEventClick}
//           datesSet={handleDatesSet}
//           events={appointments.map((appointment) => ({
//             id: appointment.id,
//             title: appointment.title,
//             start: appointment.start,
//             end: appointment.end,
//             backgroundColor:
//               appointment.status === "available" ? "#10B981" : "#EF4444",
//             borderColor:
//               appointment.status === "available" ? "#059669" : "#DC2626",
//             extendedProps: {
//               status: appointment.status,
//             },
//           }))}
//           locale="es"
//           height="auto"
//           slotMinTime={businessHours.startTime}
//           slotMaxTime={businessHours.endTime}
//           allDaySlot={false}
//           slotDuration={`00:${businessHours.slotDuration}:00`}
//           eventTimeFormat={{
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           }}
//         />
//       </div>

//       {modalOpen && (
//         <Modal
//           mode={modalMode}
//           isAvailableSlot={selectedEvent?.extendedProps?.status === "available"}
//           initialData={
//             selectedEvent
//               ? {
//                   id: selectedEvent.id,
//                   title: selectedEvent.title,
//                   start: selectedEvent.start || new Date(),
//                   end: selectedEvent.end || new Date(),
//                   status: selectedEvent.extendedProps?.status || "available",
//                 }
//               : {
//                   start: selectedDate || new Date(),
//                   end: selectedDate
//                     ? new Date(
//                         selectedDate.getTime() +
//                           businessHours.slotDuration * 60 * 1000
//                       )
//                     : new Date(),
//                   status: "booked", // Nuevos turnos siempre son ocupados
//                 }
//           }
//           onSave={handleSaveAppointment}
//           onDelete={handleDeleteAppointment}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// export default CalendarComponent;

// import { useState, useRef, FC } from "react";
// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { EventClickArg, DateSelectArg, EventApi } from "@fullcalendar/core";
// import Modal from "../Modal/Modal";

// interface Appointment {
//   id: string;
//   title: string;
//   start: Date;
//   end: Date;
//   status: "available" | "booked";
// }

// const CalendarComponent: FC = () => {
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
//   const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [appointments, setAppointments] = useState<Appointment[]>([
//     {
//       id: "1",
//       title: "Turno Ocupado",
//       start: new Date("2025-04-17T10:00:00"),
//       end: new Date("2025-04-17T11:30:00"),
//       status: "booked",
//     },
//     {
//       id: "2",
//       title: "Turno Disponible",
//       start: new Date("2025-04-17T14:00:00"),
//       end: new Date("2025-04-17T15:00:00"),
//       status: "available",
//     },
//   ]);

//   const calendarRef = useRef<FullCalendar>(null);

//   const handleDateSelect = (selectInfo: DateSelectArg) => {
//     setModalMode("add");
//     setSelectedDate(selectInfo.start);
//     setSelectedEvent(null);
//     setModalOpen(true);
//   };

//   const handleEventClick = (clickInfo: EventClickArg) => {
//     setModalMode("edit");
//     setSelectedEvent(clickInfo.event);
//     setSelectedDate(null);
//     setModalOpen(true);
//   };

//   const handleSaveAppointment = (appointmentData: Partial<Appointment>) => {
//     if (modalMode === "add" && selectedDate) {
//       // Crear nuevo turno
//       const newAppointment: Appointment = {
//         id: Date.now().toString(),
//         title: appointmentData.title || "Nuevo Turno",
//         start: appointmentData.start || selectedDate,
//         end:
//           appointmentData.end ||
//           new Date(selectedDate.getTime() + 60 * 60 * 1000), // +1 hora por defecto
//         status: appointmentData.status || "available",
//       };

//       setAppointments([...appointments, newAppointment]);
//     } else if (modalMode === "edit" && selectedEvent) {
//       // Actualizar turno existente
//       const updatedAppointments = appointments.map((app) =>
//         app.id === selectedEvent.id
//           ? {
//               ...app,
//               title: appointmentData.title || app.title,
//               start: appointmentData.start || app.start,
//               end: appointmentData.end || app.end,
//               status: appointmentData.status || app.status,
//             }
//           : app
//       );
//       setAppointments(updatedAppointments);
//     }

//     setModalOpen(false);
//     if (calendarRef.current) {
//       calendarRef.current.getApi().refetchEvents();
//     }
//   };

//   const handleDeleteAppointment = () => {
//     if (selectedEvent) {
//       const updatedAppointments = appointments.filter(
//         (app) => app.id !== selectedEvent.id
//       );
//       setAppointments(updatedAppointments);
//       setModalOpen(false);
//       if (calendarRef.current) {
//         calendarRef.current.getApi().refetchEvents();
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold">Calendario de Turnos</h1>
//       </div>

//       <div className="p-4 bg-white rounded-lg shadow">
//         <FullCalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="timeGridWeek"
//           headerToolbar={{
//             left: "prev,next today",
//             center: "title",
//             right: "dayGridMonth,timeGridWeek,timeGridDay",
//           }}
//           selectable={true}
//           selectMirror={true}
//           dayMaxEvents={true}
//           weekends={true}
//           select={handleDateSelect}
//           eventClick={handleEventClick}
//           events={appointments.map((appointment) => ({
//             id: appointment.id,
//             title: appointment.title,
//             start: appointment.start,
//             end: appointment.end,
//             backgroundColor:
//               appointment.status === "available" ? "#10B981" : "#EF4444",
//             borderColor:
//               appointment.status === "available" ? "#059669" : "#DC2626",
//           }))}
//           locale="es"
//           height="auto"
//           slotMinTime="08:00:00"
//           slotMaxTime="20:00:00"
//           allDaySlot={false}
//           slotDuration="00:30:00"
//           eventTimeFormat={{
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           }}
//         />
//       </div>

//       {modalOpen && (
//         <Modal
//           mode={modalMode}
//           initialData={
//             selectedEvent
//               ? {
//                   id: selectedEvent.id,
//                   title: selectedEvent.title,
//                   start: selectedEvent.start || new Date(),
//                   end: selectedEvent.end || new Date(),
//                   status: selectedEvent.extendedProps?.status || "available",
//                 }
//               : {
//                   start: selectedDate || new Date(),
//                   end: selectedDate
//                     ? new Date(selectedDate.getTime() + 60 * 60 * 1000)
//                     : new Date(),
//                   status: "available",
//                 }
//           }
//           onSave={handleSaveAppointment}
//           onDelete={handleDeleteAppointment}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// export default CalendarComponent;

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
