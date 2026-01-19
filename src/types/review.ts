export default interface Review {
    id: string;
    productId: string;
    name: string;
    role?: string;
    image?: string;
    rating: number;
    comment: string;
}