import { api } from "./api";
import type { Product } from "@/types/product";

export const fetchProducts = async ( limit: number ): Promise<Product[]> => {
    const res = await api.get<Product[]>(`/products?_limit=${limit}`);
    return res.data;
};
export const fetchProductById = async (id: string): Promise<Product> => {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
};
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const res = await api.get<Product[]>(`/products?category=${category}`);
    return res.data;
};
export const featuredProducts = async (): Promise<Product[]> => {
    const res = await api.get<Product[]>(`/products?featured=true&_limit=4`);
    return res.data;
};
// Fetch multiple products by IDs
export const fetchProductsByIds = async (
    ids: string[]
): Promise<Product[]> => {
    if (ids.length === 0) return [];

    // JSON Server / REST-style query
    const query = ids.map(id => `id=${id}`).join("&");

    const res = await api.get<Product[]>(`/products?${query}`);
    return res.data;
};