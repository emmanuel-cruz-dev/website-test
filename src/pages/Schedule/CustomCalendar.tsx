import { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomCalendar() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="flex justify-center">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        locale={es}
        calendarClassName="rounded-lg bg-gray-100 p-4 text-center"
        dayClassName={() => "text-gray-800 hover:bg-purple-200 rounded-full"}
      />
    </div>
  );
}
