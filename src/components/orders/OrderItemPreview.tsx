import { formatPrice } from "@/utils/formatPrice";
import React from "react";

export interface OrderItemType {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
}

interface OrderItemPreviewProps {
  item: OrderItemType;
}

const OrderItemPreview: React.FC<OrderItemPreviewProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Product Image */}
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.imageSrc}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-black truncate">{item.name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
      </div>

      {/* Price */}
      <div className="text-sm font-semibold text-black">
        {formatPrice(item.price)}
      </div>
    </div>
  );
};

export default OrderItemPreview;