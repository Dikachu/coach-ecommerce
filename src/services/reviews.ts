import { api } from "./api";
import type Review from "@/types/review";

export const fetchReviews = async (limit: number): Promise<Review[]> => {
    const res = await api.get<Review[]>(`/reviews?_limit=${Boolean(limit) ? limit : ''}`);
    return res.data;
};
export const fetchProductReviewsById = async (id: string): Promise<Review[]> => {
    const res = await api.get<Review[]>(`/reviews/?productId=${id}`);
    return res.data;
};
// export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
//     const res = await api.get<Product[]>(`/products?category=${category}`);
//     return res.data;
// };
// export const featuredProducts = async (): Promise<Product[]> => {
//     const res = await api.get<Product[]>(`/products?featured=true&_limit=4`);
//     return res.data;
// };