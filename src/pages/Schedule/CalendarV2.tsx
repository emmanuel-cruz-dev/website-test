import { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

// Este componente simula un calendario similar al mostrado en la imagen
export default function CalendarV2() {
  const [fecha, setFecha] = useState(new Date());
  const [mesVisible, setMesVisible] = useState(new Date());

  // Para navegar entre meses
  const anteriorMes = () => {
    const nuevoMes = new Date(mesVisible);
    nuevoMes.setMonth(nuevoMes.getMonth() - 1);
    setMesVisible(nuevoMes);
  };

  const siguienteMes = () => {
    const nuevoMes = new Date(mesVisible);
    nuevoMes.setMonth(nuevoMes.getMonth() + 1);
    setMesVisible(nuevoMes);
  };

  // Formatear nombre del mes y año
  const formatoMesAno = (date) => {
    return new Intl.DateTimeFormat("es", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Personalización del encabezado del calendario
  const encabezadoPersonalizado = ({ date, decreaseMonth, increaseMonth }) => (
    <div className="flex items-center justify-between mb-4 px-2">
      <div className="text-base font-semibold">{formatoMesAno(date)}</div>
      <div className="flex space-x-2">
        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={decreaseMonth}
          type="button"
        >
          <FaChevronLeft size={12} />
        </button>
        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={increaseMonth}
          type="button"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );

  // Día personalizado para mostrar un círculo en el día seleccionado
  const diaPersonalizado = (dateProps) => {
    const { date, selected } = dateProps;
    return (
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full
        ${selected ? "bg-indigo-600 text-white" : ""}`}
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <DatePicker
        selected={fecha}
        onChange={(date) => setFecha(date)}
        onMonthChange={setMesVisible}
        locale={es}
        inline
        renderCustomHeader={encabezadoPersonalizado}
        // renderDayContents={diaPersonalizado}
        calendarClassName=""
        dayClassName={() => "text-center"}
      />
    </div>
  );
}
