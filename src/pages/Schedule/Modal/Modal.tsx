import React, { useState, useEffect } from "react";
import { format } from "date-fns";

interface ModalProps {
  mode: "add" | "edit" | "delete";
  isAvailableSlot?: boolean;
  initialData: {
    id?: string;
    title?: string;
    start: Date;
    end: Date;
    status?: "available" | "booked";
  };
  onSave: (data: any) => void;
  onDelete: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  mode,
  isAvailableSlot,
  initialData,
  onSave,
  onDelete,
  onClose,
}) => {
  const [title, setTitle] = useState<string>(initialData.title || "");
  const [start, setStart] = useState<Date>(initialData.start);
  const [end, setEnd] = useState<Date>(initialData.end);

  useEffect(() => {
    // Si estamos editando un slot disponible, cambiar el título por defecto
    if (isAvailableSlot) {
      setTitle("Turno Ocupado");
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose, isAvailableSlot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      start,
      end,
    });
  };

  const formatDateForInput = (date: Date): string => {
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  // Determinar el título del modal
  let modalTitle = "";
  if (mode === "add") {
    modalTitle = "Reservar Turno";
  } else if (mode === "edit") {
    modalTitle = isAvailableSlot
      ? "Reservar Turno Disponible"
      : "Editar Turno Ocupado";
  } else {
    modalTitle = "Cancelar Turno";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Título/Descripción
            </label>
            <input
              id="title"
              type="text"
              // value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción del turno"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="start"
            >
              Fecha y hora de inicio
            </label>
            <input
              id="start"
              type="datetime-local"
              value={formatDateForInput(start)}
              onChange={(e) => setStart(new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="end"
            >
              Fecha y hora de fin
            </label>
            <input
              id="end"
              type="datetime-local"
              value={formatDateForInput(end)}
              onChange={(e) => setEnd(new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            {mode === "edit" && !isAvailableSlot && (
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Liberar Turno
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isAvailableSlot
                ? "Reservar"
                : mode === "add"
                ? "Crear"
                : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
