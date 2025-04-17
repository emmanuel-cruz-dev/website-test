import { ChangeEvent, useState } from "react";
import CalendarComponent from "./CalendarComponent/CalendarComponent";
// import Calendar from "./Calendar";
// import { schedules } from "../../data/schedules";

type Specialty =
  | "fonoaudiologia"
  | "psicologia"
  | "psicopedagogía"
  | "terapia-ocupacional";

function Schedule() {
  const [specialty, setSpecialty] = useState<Specialty>("fonoaudiologia");

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selection = e.target.value as Specialty;
    setSpecialty(selection);
  };

  // Mapeo para transformar los valores en títulos legibles
  // const specialtyTitles: Record<Specialty, string> = {
  //   fonoaudiologia: "Fonoaudiología",
  //   psicologia: "Psicología",
  //   psicopedagogía: "Psicopedagogía",
  //   "terapia-ocupacional": "Terapia Ocupacional",
  // };

  return (
    <section className="container my-12">
      <article className="text-center lg:col-span-3">
        <h1 className="text-3xl uppercase mb-8">Turnos Disponibles</h1>
        <div className="mb-4">
          <select
            className="w-60 py-2 px-2 cursor-pointer rounded-sm"
            onChange={handleSelection}
            name="specialty"
            id="specialty"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una especialidad
            </option>
            <option value="fonoaudiologia">Fonoaudiología</option>
            <option value="psicologia">Psicología</option>
            <option value="psicopedagogía">Psicopedagogía</option>
            <option value="terapia-ocupacional">Terapia Ocupacional</option>
          </select>
        </div>
        {/* <Calendar
          title={specialtyTitles[specialty as Specialty] || "Fonoaudiología"}
          events={schedules[specialty]}
        /> */}
        <CalendarComponent />
      </article>
    </section>
  );
}

export default Schedule;
