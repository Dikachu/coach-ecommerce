export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    shipping: number;
    discountPrice?: number;
    category: string;
    color: string;
    images: string[];
    inStock: boolean;
    features: string[];
    otherSpecifications: {
        [key: string]: string
    };
}