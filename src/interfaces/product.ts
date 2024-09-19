export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image_url?: string|null;
}