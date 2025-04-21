import { FC, useEffect, useState } from "react";

interface Professional {
  id: number;
  dni: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  photoUrl: string;
  birthDate: string;
  licenseNumber: string;
  specialty: string;
}

interface Professional {
  id: number;
  dni: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  photoUrl: string;
  birthDate: string;
  licenseNumber: string;
  specialty: string;
}

interface ProfessionalsTableProps {
  professionals: Professional[];
}

const ProfessionalsTable: FC<ProfessionalsTableProps> = ({ professionals }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">País</th>
            <th className="py-2 px-4 border-b">Especialidad</th>
            <th className="py-2 px-4 border-b">Foto</th>
          </tr>
        </thead>
        <tbody>
          {professionals.map((professional) => (
            <tr
              key={professional.id}
              className="odd:bg-slate-300 even:bg-neutral-200"
            >
              <td className="py-2 px-4 border-b text-center">
                {professional.id}
              </td>
              <td className="py-2 px-4 border-b">{professional.name}</td>
              <td className="py-2 px-4 border-b">{professional.lastName}</td>
              <td className="py-2 px-4 border-b">{professional.country}</td>
              <td className="py-2 px-4 border-b">{professional.specialty}</td>
              <td className="py-2 px-4 border-b">
                {professional.photoUrl && (
                  <img
                    src={professional.photoUrl}
                    alt={`Foto de ${professional.name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function Professionals() {
  const [responses, setResponses] = useState<Professional[]>([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      const urls = Array.from(
        { length: 5 },
        (_, i) => `https://clinica-08df.onrender.com/professionals/${i + 2}`
      );

      try {
        const results = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );
        setResponses(results);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };

    fetchProfessionals();
  }, []);

  return (
    <section>
      <article className="container text-center">
        <h1 className="font-semibold text-3xl my-8">Profesionales</h1>
        {/* {responses.length > 0 ? (
          responses.map((professional, index) => (
            <div key={index}>
              <h2>Profesional N°{professional.id}</h2>
              <p>Nombre: {professional.name}</p>
              <p>Apellido: {professional.lastName}</p>
              <p>{JSON.stringify(professional, null, 2)}</p>
            </div>
          ))
        ) : (
          <p>Cargando...</p>
        )} */}
        {responses.length > 0 && (
          <ProfessionalsTable professionals={responses} />
        )}
      </article>
    </section>
  );
}

export default Professionals;
