import api from "@/services/api";
import { 
  IGetProductsParams,
  IGetProductsResponse,
  IGetProductResponse,
  ICreateProductParams,
  ICreateProductResponse,
  IUpdateProductParams,
  IUpdateProductResponse
} from "@/services/api/product/interfaces";
import { createQueryParams, removeProp } from "@/utilities/utils";

export default class ProductService {
  static async getProducts(params?: IGetProductsParams) {
    console.log(params)
    return api.get<IGetProductsResponse>(`/products?${createQueryParams({ ...params })}`);
  }

  static async getProduct(id: string|number) {
    return api.get<IGetProductResponse>(`/products/${id}`);
  }

  static async create(params: ICreateProductParams) {
    return api.post<ICreateProductResponse>("/products", params);
  }

  static async update(params: IUpdateProductParams) {
    return api.put<IUpdateProductResponse>(`/products/${params.id}`, {...removeProp(params, "id")});
  }

  static async delete(id: string|number) {
    return api.delete(`/products/${id}`);
  }
}