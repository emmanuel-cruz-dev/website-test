import { useEffect, useState } from "react";

// interface Professional {
//   id: number;
//   dni: string;
//   name: string;
//   lastName: string;
//   phoneNumber: string;
//   country: string;
//   photoUrl: string;
//   birthDate: string;
//   licenseNumber: string;
//   specialty: string;
// }

// interface ProfessionalsTableProps {
//   items: Professional[];
// }

// Tipos base
interface BaseItem {
  id: number;
  name: string;
  lastName: string;
  country: string;
  photoUrl: string;
}

interface Professional extends BaseItem {
  specialty: string;
  licenseNumber: string;
  // Atributos específicos de profesionales
}

export interface Patient extends BaseItem {
  hasInsurance: boolean;
  paymentType: string;
  // Atributos específicos de pacientes
}

// Props con genéricos
interface TableProps<T> {
  items: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
}
// Componente genérico
export const GenericTable = <T extends BaseItem>({
  items,
  columns,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th className="py-2 px-4 border-b" key={String(column.key)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="odd:bg-slate-300 even:bg-neutral-200">
              {columns.map((column) => (
                <td key={String(column.key)} className="py-2 px-4 border-b">
                  {column.render
                    ? column.render(item)
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// const GenericTable: FC<ProfessionalsTableProps> = ({ items }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-b">ID</th>
//             <th className="py-2 px-4 border-b">Nombre</th>
//             <th className="py-2 px-4 border-b">Apellido</th>
//             <th className="py-2 px-4 border-b">País</th>
//             <th className="py-2 px-4 border-b">Especialidad</th>
//             <th className="py-2 px-4 border-b">Foto</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((professional) => (
//             <tr
//               key={professional.id}
//               className="odd:bg-slate-300 even:bg-neutral-200"
//             >
//               <td className="py-2 px-4 border-b text-center">
//                 {professional.id}
//               </td>
//               <td className="py-2 px-4 border-b">{professional.name}</td>
//               <td className="py-2 px-4 border-b">{professional.lastName}</td>
//               <td className="py-2 px-4 border-b">{professional.country}</td>
//               <td className="py-2 px-4 border-b">{professional.specialty}</td>
//               <td className="py-2 px-4 border-b">
//                 {professional.photoUrl && (
//                   <img
//                     src={professional.photoUrl}
//                     alt={`Foto de ${professional.name}`}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

function Professionals() {
  const [responses, setResponses] = useState<Professional[]>([]);
  // const [show, setShow] = useState(false);

  // const handleToggle = () => {
  //   setShow(!show);
  // };

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
        <h2 className="font-semibold text-3xl my-8">Profesionales</h2>
        {/* {responses.length > 0 && <GenericTable items={responses} />} */}
        {responses.length > 0 && (
          <GenericTable
            items={responses}
            columns={[
              { key: "name", header: "Nombre" },
              { key: "lastName", header: "Apellido" },
              { key: "specialty", header: "Especialidad" },
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
        )}

        {/* <div className="mt-8">
          <button className="btn__primary" onClick={handleToggle}>
            Ver Json
          </button>
          {responses.length > 0 &&
            show &&
            responses.map((professional, index) => (
              <div className="my-4" key={index}>
                <h2>Profesional N°{professional.id}</h2>
                <p>{JSON.stringify(professional, null, 2)}</p>
              </div>
            ))}
        </div> */}
      </article>
    </section>
  );
}

export default Professionals;
