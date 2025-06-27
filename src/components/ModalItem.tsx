import { useEffect, useState } from "react";
import { Search, X, ShoppingCart } from "lucide-react";
import { products } from "../data/products";
import { ApiProductsProps, ModalItemProps } from "../types/types";

const ModalItem = ({ modalRef, inputRef, closeModal }: ModalItemProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ApiProductsProps[]>(
    []
  );

  useEffect(() => {
    const normalizeString = (str: string) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const debounceTimeout = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        const filtered = products.filter(
          (product) =>
            normalizeString(product.name)
              .toLowerCase()
              .includes(normalizeString(searchTerm).toLowerCase()) ||
            normalizeString(product.brand)
              .toLowerCase()
              .includes(normalizeString(searchTerm).toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleAddToCart = (product: ApiProductsProps) => {
    console.log("Agregado al carrito:", product);
    // TODO implementar lógica para agregar al carrito
  };

  return (
    <article className="fixed inset-0 bg-black/40 bg-opacity-50 z-50 flex items-start justify-center pt-4 px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header del modal */}
        <header className="flex items-center p-4 border-b border-gray-200">
          <div className="flex items-center flex-1 bg-gray-100 border border-pink-300 rounded-full px-4 py-2">
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
            aria-label="Cerrar modal"
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
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
            <article>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-center items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <figure className="w-26 h-26 bg-[#d2eafc] rounded-2xl p-3">
                    <img
                      src={product.image ?? ""}
                      className="w-full object-cover"
                      alt={product.name}
                    />
                  </figure>

                  <aside className="flex flex-col gap-1">
                    <h3 className="font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      ${product.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 text-sm bg-[#8de68a] hover:bg-[#7ace77] px-6 py-2 rounded-full transition-colors cursor-pointer"
                    >
                      <ShoppingCart />
                      Agregar
                    </button>
                  </aside>
                </div>
              ))}
            </article>
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
  );
};

export default ModalItem;
