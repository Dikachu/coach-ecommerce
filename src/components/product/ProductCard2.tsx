import React from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageSrc: string;
  link: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) * 100
      )
    : 0;

  return (
    <a
      href={product.link}
      className="group flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
              NEW
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-base font-medium text-black group-hover:text-gray-700 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-semibold text-black">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
