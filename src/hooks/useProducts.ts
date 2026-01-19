// import { useEffect, useState, useCallback } from "react";
// import { fetchProducts } from "@/services/products";
// import type { Product } from "@/types/product";

// export const useProducts = (initialLimit: number = 20) => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [loadingMore, setLoadingMore] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [currentLimit, setCurrentLimit] = useState(initialLimit);
//     const [hasMore, setHasMore] = useState(true);

//     useEffect(() => {
//         fetchProducts(currentLimit)
//             .then((data) => {
//                 setProducts(data);
//                 // If we get fewer products than requested, there are no more
//                 if (data.length < currentLimit) {
//                     setHasMore(false);
//                 }
//             })
//             .catch(() => setError("Failed to load products"))
//             .finally(() => setLoading(false));
//     }, [currentLimit]);

//     const loadMore = useCallback(() => {
//         if (loadingMore || !hasMore) return;

//         setLoadingMore(true);
//         const newLimit = currentLimit + 20;

//         fetchProducts(newLimit)
//             .then((data) => {
//                 setProducts(data);
//                 setCurrentLimit(newLimit);
//                 // Check if we've reached the end
//                 if (data.length < newLimit) {
//                     setHasMore(false);
//                 }
//             })
//             .catch(() => setError("Failed to load more products"))
//             .finally(() => setLoadingMore(false));
//     }, [currentLimit, loadingMore, hasMore]);

//     return { products, loading, loadingMore, error, loadMore, hasMore };
// };




















import { useEffect, useState } from "react";
import { fetchProducts, featuredProducts } from "@/services/products";
import type { Product } from "@/types/product";

export const useProducts = (limit: number = 20) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [featuredProductsList, setFeaturedProductsList] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchProducts(limit)
            .then((data) => {
                setProducts(data);
                // Check if we've reached the end
                if (data.length < limit) {
                    setHasMore(false);
                }
            })
            .catch(() => setError("Failed to load products"))
            .finally(() => setLoading(false));
    }, [limit]);

    useEffect(() => {
        const loadFeaturedProducts = async () => {
            const featured = await featuredProducts();
            setFeaturedProductsList(featured);
        };
        loadFeaturedProducts();
    }, []);

    return { products, loading, error, hasMore, featuredProductsList };
};