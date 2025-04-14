import { FC, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AccordionProps } from "../../types/types";

export const Accordion: FC<AccordionProps> = ({ id, title, content }) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setActiveIndexes(activeIndexes.includes(index) ? [] : [index]);
  };

  return (
    <div key={id} className="text-left">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold">{title}</span>
        <span className="background__accent-lime rounded-full p-2">
          {activeIndexes.includes(id) ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </span>
      </button>

      {activeIndexes.includes(id) && (
        <div className="p-4 bg-gray-50 text-gray-700 transition-all duration-300 ease-in-out">
          {content}
        </div>
      )}
    </div>
  );
};
