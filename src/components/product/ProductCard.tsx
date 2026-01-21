import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import Button from "../ui/Button";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

interface ProductCardProps {
  product: Omit<Product, 'quantity'>;
  // onAddToCart?: (product: Product) => void;
}

// ==================== COMPONENT ====================
function ProductCard({ product }: ProductCardProps) {
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
      ((product.price - product.discountPrice!) / product.price) * 100
    )
    : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  if (!cart) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
      {/* Image Container */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-gray-200"
        onClick={handleCardClick}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category.replace("-", " ")}
          </span>

          {/* Color */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Color:</span>
            <span className="text-xs font-bold">
              {product.color.toLocaleUpperCase()}
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[2rem]">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Product Price */}
        {hasDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(Number(product.discountPrice))}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(Number(product.price))}
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(Number(product.price))}
          </span>
        )}

        {/* Add to Cart Button */}
        {cart.inCart(product.id) ? (
          // <Button
          //   aria-label="Remove from cart"
          //   variant="outline"
          //   additionalClasses="cursor-pointer w-full mt-4"
          //   size="small"
          //   radius="lg"
          //   text="View Carts"
          //   linkTo="/cart"
          // />

          <Button
            onClick={() => cart.removeFromCart(product.id)}
            disabled={!product.inStock}
            aria-label="Remove from cart"
            variant="danger"
            additionalClasses="cursor-pointer w-full mt-4"
            size="small"
            radius="lg"
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
            Remove From Cart
          </Button>
        ) : (
          <Button
            onClick={() => cart.addToCart(product)}
            disabled={!product.inStock}
            aria-label="Add to cart"
            variant="primary"
            additionalClasses="cursor-pointer w-full mt-4"
            size="small"
            radius="lg"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;