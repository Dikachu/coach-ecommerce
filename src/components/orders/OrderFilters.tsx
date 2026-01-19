import React from "react";
import type { OrderStatus } from "./OrderStatusBadge";

interface OrderFiltersProps {
  activeFilter: OrderStatus | "all";
  onFilterChange: (filter: OrderStatus | "all") => void;
  orderCounts?: {
    all: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  activeFilter,
  onFilterChange,
  orderCounts = {
    all: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  },
}) => {
  const filters: { value: OrderStatus | "all"; label: string }[] = [
    { value: "all", label: "All Orders" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.value
              ? "bg-black text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
          {orderCounts[filter.value] > 0 && (
            <span
              className={`ml-2 ${
                activeFilter === filter.value ? "text-white" : "text-gray-500"
              }`}
            >
              ({orderCounts[filter.value]})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default OrderFilters;