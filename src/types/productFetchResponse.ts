import type { Product } from "./product";

export interface ProductsFetchResponse {
    first: number | null,
    prev: number | null,
    next: number | null,
    last: number | null,
    pages: number | null,
    items: number | null,
    data: Product[],
}