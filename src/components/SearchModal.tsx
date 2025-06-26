import { useState, useEffect, useRef } from "react";
import { Search, X, ShoppingCart } from "lucide-react";
import { products } from "../data/products";
import { ProductCardProps } from "@/types/types";

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filtrar productos en tiempo real
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(
        (producto) =>
          producto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          producto.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

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
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const handleAddToCart = (product: ProductCardProps) => {
    console.log("Agregado al carrito:", product);
    // TODO implementar lógica para agregar al carrito
  };

  return (
    <>
      {/* Input de búsqueda principal */}
      <article className="relative w-full max-w-md mx-auto mb-6">
        <div
          onClick={openModal}
          className="flex items-center w-full px-4 py-3 bg-white border-2 border-pink-300 rounded-full cursor-pointer hover:border-pink-400 transition-colors"
        >
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <span className="text-gray-500 flex-1 text-left">
            Busca por nombre o marca
          </span>
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </article>

      {/* Modal de búsqueda */}
      {isOpen && (
        <article className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-4 px-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Header del modal */}
            <header className="flex items-center p-4 border-b border-gray-200">
              <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Busca por nombre o marca"
                  className="flex-1 bg-transparent outline-none text-gray-700"
                />
              </div>
              <button
                onClick={closeModal}
                className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </header>

            {/* Contenido del modal */}
            <main className="p-4 max-h-96 overflow-y-auto">
              {searchTerm.trim() === "" ? (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Comienza a escribir para buscar productos</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No se encontraron productos para "{searchTerm}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={product.image}
                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-3"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {product.name}
                        </h3>
                        <p className="font-bold text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        <span className="text-sm">Agregar</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </main>

            {/* Footer del modal */}
            {filteredProducts.length > 0 && (
              <footer className="border-t border-gray-200 p-4 bg-gray-50">
                <p className="text-sm text-gray-600 text-center">
                  {filteredProducts.length} producto
                  {filteredProducts.length !== 1 ? "s" : ""} encontrado
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </footer>
            )}
          </div>
        </article>
      )}
    </>
  );
};

export default SearchModal;
