import { useState } from "react";
import OrderCard from "@/components/orders/OrderCard";
import type { Order } from "@/components/orders/OrderCard";
import OrderFilters from "@/components/orders/OrderFilters";
import type { OrderStatus } from "@/components/orders/OrderStatusBadge";

const Orders: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample orders data
  const allOrders: Order[] = [
    {
      id: "1",
      orderNumber: "#ORD-2024-0125",
      date: "Jan 10, 2026",
      status: "processing",
      total: 122000,
      items: [
        {
          id: "1",
          name: "Gentle Foaming Cleanser",
          imageSrc: "/images/orders/order1.webp",
          quantity: 2,
          price: 24000,
        },
        {
          id: "2",
          name: "Vitamin C Brightening Serum",
          imageSrc: "/images/orders/order2.avif",
          quantity: 1,
          price: 45000,
        },
      ],
    },
    {
      id: "2",
      orderNumber: "#ORD-2024-0118",
      date: "Jan 5, 2026",
      status: "shipped",
      total: 89000,
      trackingNumber: "1Z999AA10123456784",
      items: [
        {
          id: "3",
          name: "Daily Hydration Cream",
          imageSrc: "/images/orders/order1.webp",
          quantity: 1,
          price: 35000,
        },
        {
          id: "4",
          name: "Hyaluronic Acid Serum",
          imageSrc: "/images/orders/order5.avif",
          quantity: 1,
          price: 38000,
        },
        {
          id: "5",
          name: "Gentle Eye Makeup Remover",
          imageSrc: "/images/orders/order4.avif",
          quantity: 1,
          price: 16000,
        },
      ],
    },
    {
      id: "3",
      orderNumber: "#ORD-2024-0105",
      date: "Dec 28, 2025",
      status: "delivered",
      total: 1560000,
      trackingNumber: "1Z999AA10123456785",
      items: [
        {
          id: "6",
          name: "Retinol Night Serum",
          imageSrc: "/images/orders/order3.avif",
          quantity: 1,
          price: 52000,
        },
        {
          id: "7",
          name: "Night Repair Moisturizer",
          imageSrc: "/images/orders/order2.avif",
          quantity: 1,
          price: 42000,
        },
        {
          id: "8",
          name: "Acne Spot Treatment",
          imageSrc: "/images/orders/order4.avif",
          quantity: 2,
          price: 19000,
        },
      ],
    },
    {
      id: "4",
      orderNumber: "#ORD-2024-0098",
      date: "Dec 20, 2025",
      status: "cancelled",
      total: 67.98,
      items: [
        {
          id: "9",
          name: "Deep Clean Purifying Gel",
          imageSrc: "/images/orders/order5.avif",
          quantity: 2,
          price: 28000,
        },
      ],
    },
  ];

  // Filter orders
  const filteredOrders = allOrders.filter((order) => {
    const matchesFilter =
      activeFilter === "all" || order.status === activeFilter;
    const matchesSearch = order.orderNumber
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate order counts
  const orderCounts = {
    all: allOrders.length,
    processing: allOrders.filter((o) => o.status === "processing").length,
    shipped: allOrders.filter((o) => o.status === "shipped").length,
    delivered: allOrders.filter((o) => o.status === "delivered").length,
    cancelled: allOrders.filter((o) => o.status === "cancelled").length,
  };

  // const handleViewDetails = (orderId: string) => {
  //   console.log("View details for order:", orderId);
  //   // Navigate to order details page
  //   window.location.href = `/orders/${orderId}`;
  // };

  // const handleTrackOrder = (orderId: string) => {
  //   console.log("Track order:", orderId);
  //   // Open tracking page
  //   window.location.href = `/orders/${orderId}/track`;
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order number..."
              className="w-full md:w-96 px-5 py-3 pl-12 border border-gray-300 rounded-full focus:border-[#b9855e] focus:ring-2 focus:ring-[#b9855e]/20 focus:outline-none transition-all duration-200"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters */}
          <OrderFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            orderCounts={orderCounts}
          />
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <svg
              className="w-20 h-20 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No orders found
            </h2>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search"
                : activeFilter === "all"
                ? "You haven't placed any orders yet"
                : `No ${activeFilter} orders`}
            </p>
            {activeFilter === "all" && !searchQuery && (
              <a
                href="/shop"
                className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                // onViewDetails={handleViewDetails}
                // onTrackOrder={handleTrackOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;