import { useEffect, useState } from "react";
import { fetchReviews } from "@/services/reviews";
import type Review from "@/types/review";

export const useReviews = (limit?: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchReviews(limit ? limit : 0)
            .then((data) => {
                setReviews(data);
                // // Check if we've reached the end
                // if (data.length < limit) {
                //     setHasMore(false);
                // }
            })
            .catch(() => setError("Failed to load products"))
            .finally(() => setLoading(false));
    }, [limit]);

    // useEffect(() => {
    //     const loadFeaturedProducts = async () => {
    //         const featured = await featuredProducts();
    //         setFeaturedProductsList(featured);
    //     };
    //     loadFeaturedProducts();
    // }, []);

    return { reviews, loading, error };
};