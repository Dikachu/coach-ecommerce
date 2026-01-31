import { productsCol } from "@/firebase/lib/firestore";
import type { Product } from "@/types/product";
import {
    getDocs, getDoc, doc, query, where, limit as firestoreLimit, documentId
} from "firebase/firestore";

export const fetchProducts = async (limitNum: number): Promise<Product[]> => {
    const q = query(productsCol, firestoreLimit(limitNum));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
    const docRef = doc(productsCol, id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const q = query(productsCol, where("category", "==", category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const fetchProductsByIds = async (ids: string[]): Promise<Product[]> => {
    if (ids.length === 0) return [];
    // Firestore 'in' operator is limited to 10 or 30 items depending on the version
    const q = query(productsCol, where(documentId(), "in", ids));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

/**
 * Fetches up to 4 products marked as featured.
 */
export const featuredProducts = async (): Promise<Product[]> => {
    try {
        const q = query(
            productsCol,
            where("featured", "==", true),
            firestoreLimit(4)
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
};


















// import { api } from "./api";
// import type { Product } from "@/types/product";

// export const fetchProducts = async ( limit: number ): Promise<Product[]> => {
//     const res = await api.get<Product[]>(`/products?_limit=${limit}`);
//     return res.data;
// };
// export const fetchProductById = async (id: string): Promise<Product> => {
//     const res = await api.get<Product>(`/products/${id}`);
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
// // Fetch multiple products by IDs
// export const fetchProductsByIds = async (
//     ids: string[]
// ): Promise<Product[]> => {
//     if (ids.length === 0) return [];

//     // JSON Server / REST-style query
//     const query = ids.map(id => `id=${id}`).join("&");

//     const res = await api.get<Product[]>(`/products?${query}`);
//     return res.data;
// };