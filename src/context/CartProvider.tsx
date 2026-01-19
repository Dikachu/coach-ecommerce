import { useState, useEffect, useMemo, useCallback } from "react";
import { CartContext } from "./CartContext";
import type { Product } from "@/types/product";
import type {
  StoredCartItem,
  CartItem,
  CartContextValue,
} from "@/types/cart";
import { fetchProductsByIds } from "@/services/products";

interface Props {
  children: React.ReactNode;
}

const STORAGE_KEY = "cart";
const STORAGE_COUPON_KEY = "cart_coupon";

export function CartProvider({ children }: Props) {
  // 1️⃣ IDs + qty ONLY
  const [storedItems, setStoredItems] = useState<StoredCartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as StoredCartItem[]) : [];
  });

  
  // Get stored coupon code
  const [storedCoupon, setStoredCoupon] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_COUPON_KEY);
    return saved ? saved : null;
  });

  // store new coupon code or update it
  const storeCoupon = useCallback((code: string | null) => {
    if (code) {
      localStorage.setItem(STORAGE_COUPON_KEY, code);
    } else {
      localStorage.removeItem(STORAGE_COUPON_KEY);
    }
    setStoredCoupon(code);
  }, []);

  // 2️⃣ Products fetched from server
  const [products, setProducts] = useState<Product[]>([]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
  }, [storedItems]);

  // Fetch products by IDs
  useEffect(() => {
    if (!storedItems.length) {
      setProducts([]);
      return;
    }

    const ids = storedItems.map(i => i.productId);
    fetchProductsByIds(ids).then(setProducts);
  }, [storedItems]);

  // 3️⃣ Hydrated cart
  const cartItems: CartItem[] = useMemo(() => {
    return storedItems.flatMap(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return [];

      return [{ product, quantity: item.quantity }];
    });
  }, [storedItems, products]);

  // ADD
  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      if (!product.inStock) return;

      setStoredItems(prev => {
        const existing = prev.find(i => i.productId === product.id);

        if (existing) {
          return prev.map(i =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }

        return [...prev, { productId: product.id, quantity: qty }];
      });
    },
    []
  );

  // UPDATE
  const updateQuantity = useCallback(
    (productId: string, action: "increase" | "decrease") => {
      setStoredItems(prev =>
        prev.map(item => {
          if (item.productId !== productId) return item;

          const quantity =
            action === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          return { ...item, quantity };
        })
      );
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setStoredItems(prev =>
      prev.filter(item => item.productId !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setStoredItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const inCart = useCallback(
    (id: string) => storedItems.some(i => i.productId === id),
    [storedItems]
  );

  const cartCount = useMemo(
    () => storedItems.reduce((sum, i) => sum + i.quantity, 0),
    [storedItems]
  );

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price =
        item.product.discountPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const value: CartContextValue = {
    cartItems,
    cartCount,
    cartSubtotal,
    storedCoupon,
    storeCoupon,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    inCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}


















// import { useState, useEffect, useMemo, useCallback } from "react";
// import { CartContext } from "./CartContext";
// import type { CartItemProps } from "@/types/cart";
// import type { Product } from "@/types/product";

// interface Props {
//   children: React.ReactNode;
// }

// export function CartProvider({ children }: Props) {
//   const [cartItems, setCartItems] = useState<CartItemProps[]>(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Persist cart
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ADD TO CART (Product → CartItem)
//   const addToCart = useCallback((product: Product, quality?: number) => {
//     if (!product.inStock) return;

//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.productId === product.id);

//       if (existing) {
//         return prev.map((item) =>
//           item.productId === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }

//       const cartItem: CartItemProps = {
//         productId: product.id,
//         title: product.name,
//         price: product.discountPrice ?? product.price,
//         image: product.images[0],
//         color: product.color,
//         quantity: quality ? quality : 1,
//       };

//       return [...prev, cartItem];
//     });
//   }, []);

//   const updateQuantity = useCallback(
//     (productId: string, action: "increase" | "decrease") => {
//       setCartItems((prev) =>
//         prev.map((item) => {
//           if (item.productId !== productId) {
//             return item;
//           }

//           if (action === "increase") {
//             return { ...item, quantity: item.quantity + 1 };
//           }

//           if (action === "decrease") {
//             return {
//               ...item,
//               quantity: Math.max(1, item.quantity - 1),
//             };
//           }

//           return item;
//         })
//       );
//     },
//     []
//   );


//   //   Product already in cart
//   const inCart = (id: string) => {
//     const found = cartItems.find((item) => item.productId === id);
//     return Boolean(found);
//   };

//   const removeFromCart = useCallback((productId: string) => {
//     setCartItems((prev) => prev.filter((item) => item.productId !== productId));
//   }, []);

//   const clearCart = useCallback(() => {
//     setCartItems([]);
//     localStorage.removeItem("cart");
//   }, []);

//   const cartCount = useMemo(() => {
//     return cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [cartItems]);

//   const cartTotal = useMemo(() => {
//     return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   }, [cartItems]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount,
//         cartTotal,
//         inCart,
//         updateQuantity,
//         addToCart,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
