import { IPaginatedResponse } from "@/interfaces/common";
import { IProduct } from "@/interfaces/product";

export interface IGetProductsParams {
  term?: string
  page?: number
  per_page?: number
}

export type IGetProductsResponse = IPaginatedResponse<IProduct>

export interface IGetProductResponse {
  data: IProduct
}

export interface ICreateProductParams {
  name: string
  price: number
  category: string
  description: string
  image?: string|null;
}

export interface ICreateProductResponse {
  data: IProduct
}

export interface IUpdateProductParams {
  id: number|string
  name: string
  price: number
  category: string
  description: string
  image?: string|null;
}

export interface IUpdateProductResponse {
  data: IProduct
}