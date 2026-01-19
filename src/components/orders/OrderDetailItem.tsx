import { formatPrice } from "@/utils/formatPrice";
import React from "react";

export interface OrderDetailItemType {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

interface OrderDetailItemProps {
  item: OrderDetailItemType;
}

const OrderDetailItem: React.FC<OrderDetailItemProps> = ({ item }) => {
  return (
    <div className="flex gap-4 py-5 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.imageSrc}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-base font-medium text-black mb-2">{item.name}</h4>
          
          <div className="flex gap-4 text-sm text-gray-600">
            Color: <b>{item.color?.toUpperCase()}</b>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
          <span className="text-base font-semibold text-black">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;