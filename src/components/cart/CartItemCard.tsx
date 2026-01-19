import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/utils/formatPrice";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";


const CartItemCard: React.FC<CartItem> = ({
  product,
  quantity
}) => {
  const cart = useContext(CartContext);
  if (!cart) return null;

  return (
    <div className="flex gap-4 border-b border-gray-200 last:border-b-0 mb-6 last:mb-0 pb-4 last:pb-0">
      {/* Product Image */}
      <div className="w-18 h-18 md:w-28 md:h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-medium text-black mb-2">
            {product.name}
          </h3>

          {/* Variants */}
          <div className="flex gap-4 text-sm text-black mb-3">
            Color: <b className="capitalize">{product.color}</b>
          </div>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between flex-wrap gap-y-4 gap-x-8">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => cart.updateQuantity(product.id, "decrease")}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="text-base font-medium min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => cart.updateQuantity(product.id, "increase")}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-8">
            <span className="text-lg font-semibold text-black">
              {formatPrice((product.discountPrice ?? product.price) * quantity)}
            </span>

            {/* Remove Button */}
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete item, this action can't be reversed")) {
                  cart.removeFromCart(product.id);
                }
              }}
              className="text-red-600 hover:text-red-800 transition-colors"
              aria-label="Remove item"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
