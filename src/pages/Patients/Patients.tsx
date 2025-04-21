import patients from "../../data/patients.json";
import {
  GenericTable,
  Patient,
} from "../OurServices/Professionals/Professionals";

function Patients() {
  console.log(patients);

  return (
    <section>
      <article className="container text-center">
        <h2 className="font-semibold text-3xl my-8">Pacientes</h2>
        <GenericTable<Patient>
          items={patients}
          columns={[
            { key: "name", header: "Nombre" },
            { key: "lastName", header: "Apellido" },
            {
              key: "hasInsurance",
              header: "Tiene seguro",
              render: (item) => (item.hasInsurance ? "Sí" : "No"),
            },
            { key: "paymentType", header: "Método de pago" },
          ]}
        />
      </article>
    </section>
  );
}

export default Patients;
