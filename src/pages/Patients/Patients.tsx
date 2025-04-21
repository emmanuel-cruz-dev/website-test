import patients from "../../data/patients.json";
import {
  GenericTable,
  Patient,
} from "../OurServices/Professionals/Professionals";

function Patients() {
  return (
    <section>
      <article className="container text-center">
        <h2 className="font-semibold text-3xl my-8">Pacientes</h2>
        <GenericTable<Patient>
          items={patients}
          columns={[
            { key: "name", header: "Nombre" },
            { key: "lastName", header: "Apellido" },
            { key: "dni", header: "DNI" },
            {
              key: "hasInsurance",
              header: "Tiene seguro",
              render: (item) => (item.hasInsurance ? "Sí" : "No"),
            },
            { key: "paymentType", header: "Método de pago" },
            {
              key: "photoUrl",
              header: "Foto",
              render: (item) => (
                <img
                  src={item.photoUrl}
                  alt="Foto"
                  className="w-10 h-10 rounded-full"
                />
              ),
            },
          ]}
        />
      </article>
    </section>
  );
}

export default Patients;
