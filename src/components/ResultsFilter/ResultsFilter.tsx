import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { ResultsFilterProps } from "../../types/types";

function ResultsFilter({ inputId, placeholder, onSearch }: ResultsFilterProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      onSearch(value);
    } else {
      onSearch("");
    }
  };

  return (
    <article className="flex items-center border border-neutral-300 rounded-xl overflow-hidden">
      <input
        className="pl-2 py-1 focus:outline-none"
        type="text"
        name="patients-filter"
        id={inputId}
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button
        className="py-1 px-2 text-white bg-blue-400 hover:bg-blue-600 transition-colors duration-300 w-full h-full cursor-pointer"
        onClick={() => onSearch(query)}
        title="Buscar"
      >
        <MdOutlineSearch size={26} />
      </button>
    </article>
  );
}

export default ResultsFilter;
