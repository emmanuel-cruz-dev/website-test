import Calendar from "./Calendar";

const Schedule = () => {
  return (
    <section className="container my-12">
      <article className="text-center lg:col-span-3">
        <h1 className="text-3xl uppercase mb-8">Turnos Disponibles</h1>
        <Calendar />
      </article>
    </section>
  );
};

export default Schedule;
