import { RefObject } from "react";

interface ApiCategoryProps {
  id: string;
  name: string;
  image: string;
}

export interface ApiProductsProps {
  id: string;
  name: string;
  brand: string;
  weight: string;
  description: string;
  price: string;
  stock: number;
  image: string | null;
  status: string;
  category: ApiCategoryProps;
}

export interface NavigationCardProps {
  title: string;
  image: string;
  link: string;
}

export interface ModalItemProps {
  modalRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  closeModal: () => void;
}
