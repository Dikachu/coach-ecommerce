export interface FilterState {
    categories: string[];
    discount: "all" | "discount" | "no-discount";
    colors: string[];
    minPrice: number;
    maxPrice: number;
    searchQuery: string;
}