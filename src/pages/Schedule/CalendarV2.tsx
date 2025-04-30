import { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

export default function CalendarV2() {
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [mesVisible, setMesVisible] = useState(new Date());

  const formatoMesAno = (date: Date) => {
    console.log(mesVisible);

    return new Intl.DateTimeFormat("es", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const encabezadoPersonalizado = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: ReactDatePickerCustomHeaderProps) => (
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

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <DatePicker
        selected={fecha}
        onChange={(date) => setFecha(date)}
        onMonthChange={setMesVisible}
        locale={es}
        inline
        renderCustomHeader={encabezadoPersonalizado}
        calendarClassName=""
        dayClassName={() => "text-center"}
      />
    </div>
  );
}
