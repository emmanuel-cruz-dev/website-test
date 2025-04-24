import { ChangeEvent, useState } from "react";
import { schedules } from "../../data/schedules";
import CalendarComponent from "./CalendarComponent/CalendarComponent";

type Specialty =
  | "fonoaudiologia"
  | "psicologia"
  | "psicopedagogia"
  | "terapiaOcupacional";

function Schedule() {
  const [specialty, setSpecialty] = useState<Specialty>("fonoaudiologia");

  const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selection = e.target.value as Specialty;
    setSpecialty(selection);
  };

  // Mapeo para transformar los valores en títulos legibles
  const specialtyTitles: Record<Specialty, string> = {
    fonoaudiologia: "Fonoaudiología",
    psicologia: "Psicología",
    psicopedagogia: "Psicopedagogía",
    terapiaOcupacional: "Terapia Ocupacional",
  };

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
            <option value="psicopedagogia">Psicopedagogía</option>
            <option value="terapiaOcupacional">Terapia Ocupacional</option>
          </select>
        </div>

        <CalendarComponent
          title={specialtyTitles[specialty as Specialty] || "Fonoaudiología"}
          events={schedules[specialty]}
        />
      </article>
    </section>
  );
}

export default Schedule;
