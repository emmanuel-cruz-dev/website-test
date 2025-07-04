import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import ModalItem from "./ModalItem";

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Enfocar input cuando se abre el modal
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="lg:py-6 px-4 max-w-2xl mx-auto pb-6">
      {/* Input de búsqueda principal */}
      <article className="relative w-full mx-auto mb-6">
        <div
          onClick={openModal}
          className="flex items-center w-full px-4 py-3 bg-white border-2 border-neutral-300 rounded-full cursor-text"
        >
          <span className="text-gray-500 flex-1 text-left">
            Busca por nombre o marca
          </span>
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </article>

      {/* Modal de búsqueda */}
      {isOpen && (
        <ModalItem
          modalRef={modalRef}
          inputRef={inputRef}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

export default SearchModal;
