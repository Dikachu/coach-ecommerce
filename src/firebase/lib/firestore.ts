import { collection, CollectionReference, type DocumentData } from "firebase/firestore";
import type { Product } from "@/types/product";
import type { Coupon } from "@/types/coupon";
import type Review from "@/types/review";
import { db } from "../config";

// Helper to create typed collection references
const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>;
};

export const productsCol = createCollection<Product>("products");
export const couponsCol = createCollection<Coupon>("coupons");
export const reviewsCol = createCollection<Review>("reviews");