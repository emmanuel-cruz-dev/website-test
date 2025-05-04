import { useEffect, useState } from "react";

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
}

export interface Patient extends BaseItem {
  dni: string;
  hasInsurance: boolean;
  paymentType: string;
}

interface TableProps<T> {
  items: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
}

export const GenericTable = <T extends BaseItem>({
  items,
  columns,
}: TableProps<T>) => {
  return (
    <article className="overflow-x-auto mb-8">
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
    </article>
  );
};

function Professionals() {
  const [responses, setResponses] = useState<Professional[]>([]);
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    const fetchProfessionals = async () => {
      const urls = Array.from(
        { length: 10 },
        (_, i) => `https://clinica-08df.onrender.com/professionals/${i + 1}`
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
        {responses.length > 0 ? (
          <GenericTable
            items={responses}
            columns={[
              { key: "id", header: "ID" },
              { key: "name", header: "Nombre" },
              { key: "lastName", header: "Apellido" },
              { key: "country", header: "País" },
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
        ) : (
          <span>No hay resultados</span>
        )}

        <div className="mt-8">
          <button className="btn__primary" onClick={handleToggle}>
            Ver Json
          </button>
          {responses.length > 0 &&
            show &&
            responses.map((professional, index) => (
              <div className="my-4" key={index}>
                <h2>Profesional N°{index + 1}</h2>
                <p>{JSON.stringify(professional, null, 2)}</p>
              </div>
            ))}
        </div>
      </article>
    </section>
  );
}

export default Professionals;
