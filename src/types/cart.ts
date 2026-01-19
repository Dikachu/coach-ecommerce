// import type { Product } from "./product";

// export interface CartItemProps {
//     productId: string,
//     title: string,
//     price: number,
//     image: string,
//     color: string,
//     quantity: number,
// }

// export interface CartContextType {
//     cartItems: CartItemProps[];
//     cartCount: number;
//     cartTotal: number;
//     inCart: (productId: string) => boolean;
//     updateQuantity: (productId: string, action: "increase" | "decrease") => void;
//     addToCart: (product: Product, quantity?: number) => void;
//     removeFromCart: (productId: string) => void;
//     clearCart: () => void;
// }

// import type { Coupon, CouponResult } from "./coupon";
// import type { Coupon } from "./coupon";
import type { Product } from "./product";

export interface StoredCartItem {
    productId: string;
    quantity: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartContextValue {
    cartItems: CartItem[];
    cartCount: number;
    cartSubtotal: number;

    storedCoupon: string | null;
    storeCoupon: (code: string | null) => void;

    addToCart: (product: Product, qty?: number) => void;
    updateQuantity: (
        productId: string,
        action: "increase" | "decrease"
    ) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    inCart: (id: string) => boolean;
}
