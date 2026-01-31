import { reviewsCol } from "@/firebase/lib/firestore";
import type Review from "@/types/review";
import { getDocs, query, where, limit as firestoreLimit } from "firebase/firestore";


/**
 * Fetches reviews with an optional limit.
 * We usually order reviews by 'createdAt' so the newest appear first.
 */
export const fetchReviews = async (limitNum?: number): Promise<Review[]> => {
    try {
        // 1. Start with a basic query (ordered by date if you have that field)
        let q = query(reviewsCol);

        // 2. If a limit is provided and valid, apply it
        if (limitNum && limitNum > 0) {
            q = query(q, firestoreLimit(limitNum));
        }

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
    } catch (error: unknown) {
        console.error("Error fetching reviews:", error);
        return [];
    }
};

export const fetchProductReviewsById = async (productId: string): Promise<Review[]> => {
    const q = query(reviewsCol, where("productId", "==", productId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};








// import { api } from "./api";
// import type Review from "@/types/review";

// export const fetchReviews = async (limit: number): Promise<Review[]> => {
//     const res = await api.get<Review[]>(`/reviews?_limit=${Boolean(limit) ? limit : ''}`);
//     return res.data;
// };
// export const fetchProductReviewsById = async (id: string): Promise<Review[]> => {
//     const res = await api.get<Review[]>(`/reviews/?productId=${id}`);
//     return res.data;
// };
// export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
//     const res = await api.get<Product[]>(`/products?category=${category}`);
//     return res.data;
// };
// export const featuredProducts = async (): Promise<Product[]> => {
//     const res = await api.get<Product[]>(`/products?featured=true&_limit=4`);
//     return res.data;
// };