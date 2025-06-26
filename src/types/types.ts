export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  weight: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  promotion: boolean;
}

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
