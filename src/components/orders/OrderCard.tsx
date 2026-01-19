import { useState } from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import type { OrderStatus } from "./OrderStatusBadge";
import OrderItemPreview from "./OrderItemPreview";
import type { OrderItemType } from "./OrderItemPreview";
import { formatPrice } from "@/utils/formatPrice";
import Button from "../ui/Button";

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItemType[];
  trackingNumber?: string;
}

interface OrderCardProps {
  order: Order;
  // onViewDetails?: (orderId: string) => void;
  // onTrackOrder?: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  // onViewDetails,
  // onTrackOrder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // const handleViewDetails = () => {
  //   if (onViewDetails) {
  //     onViewDetails(order.id);
  //   }
  // };

  // const handleTrackOrder = () => {
  //   if (onTrackOrder) {
  //     onTrackOrder(order.id);
  //   }
  // };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Order Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-black">
                {order.orderNumber}
              </h3>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-gray-600">Ordered on {order.date}</p>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-xl font-bold text-black">
              {formatPrice(order.total)}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-6">
        <div className="space-y-3">
          {/* Show first 2 items or all if expanded */}
          {(isExpanded ? order.items : order.items.slice(0, 2)).map((item) => (
            <OrderItemPreview key={item.id} item={item} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {order.items.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-600 hover:text-black font-medium mt-3 flex items-center gap-1"
          >
            {isExpanded
              ? "Show less"
              : `Show ${order.items.length - 2} more item${
                  order.items.length - 2 > 1 ? "s" : ""
                }`}
            <svg
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Tracking Info (if shipped) */}
      {/* {order.trackingNumber && order.status === "shipped" && (
        <div className="px-6 pb-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-900 mb-1">
                  Tracking Number
                </p>
                <p className="text-sm text-purple-700 font-mono">
                  {order.trackingNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Actions */}
      <div className="px-6 pb-6 flex gap-3">
        <Button variant="primary" linkTo={`/order/${order.orderNumber}`} text="View Details" additionalClasses="w-full" />
        {/* <button
          onClick={handleViewDetails}
          className="flex-1 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
        >
          View Details
        </button> */}
        {/* {(order.status === "shipped" || order.status === "delivered") && (
          <button
            onClick={handleTrackOrder}
            className="flex-1 bg-white text-black border-2 border-black py-3 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Track Order
          </button>
        )} */}
      </div>
    </div>
  );
};

export default OrderCard;