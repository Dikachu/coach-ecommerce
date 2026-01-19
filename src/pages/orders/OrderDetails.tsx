import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import type { OrderStatus } from "../../components/orders/OrderStatusBadge";
import OrderTimeline from "../../components/orders/OrderTimeline";
import type { TimelineEvent } from "../../components/orders/OrderTimeline";
import OrderDetailItem from "../../components/orders/OrderDetailItem";
import type { OrderDetailItemType } from "../../components/orders/OrderDetailItem"; 
import ShippingAddressCard, { type ShippingAddress } from "../../components/orders/ShippingAddressCard";
import PaymentInfoCard, { type PaymentInfo } from "../../components/orders/PaymentInfoCard";
import InvoiceGenerator, {
  type InvoiceData,
} from "../../components/orders/InvoiceGenerator";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/formatPrice";

interface OrderDetailsPageProps {
  orderId?: string;
}

const OrderDetails: React.FC<OrderDetailsPageProps> = () => {
  // Sample order data
  const orderData = {
    orderNumber: "#ORD-2024-0118",
    date: "January 5, 2026",
    status: "shipped" as OrderStatus,
    trackingNumber: "1Z999AA10123456784",
    items: [
      {
        id: "1",
        name: "Daily Hydration Cream",
        imageSrc: "/images/orders/order1.webp",
        quantity: 1,
        price: 35000,
        color: "red",
      },
      {
        id: "2",
        name: "Hyaluronic Acid Serum",
        imageSrc: "/images/orders/order5.avif",
        quantity: 1,
        price: 38000,
        color: "Black",
      },
      {
        id: "3",
        name: "Gentle Eye Makeup Remover",
        imageSrc: "/images/orders/order4.avif",
        quantity: 1,
        price: 16000,
        color: "blue",
      },
    ] as OrderDetailItemType[],
    timeline: [
      {
        id: "1",
        title: "Order Placed",
        description: "Your order has been received and confirmed",
        date: "Jan 5",
        time: "10:30 AM",
        completed: true,
      },
      {
        id: "2",
        title: "Processing",
        description: "Your order is being prepared for shipment",
        date: "Jan 5",
        time: "2:15 PM",
        completed: true,
      },
      {
        id: "3",
        title: "Shipped",
        description: "Package has been handed to carrier",
        date: "Jan 6",
        time: "9:00 AM",
        completed: true,
      },
      {
        id: "4",
        title: "Out for Delivery",
        description: "Package is on the way to your location",
        date: "Jan 8",
        time: "—",
        completed: false,
      },
      {
        id: "5",
        title: "Delivered",
        description: "Package will be delivered to your address",
        date: "Jan 8",
        time: "—",
        completed: false,
      },
    ] as TimelineEvent[],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
    } as ShippingAddress,
    payment: {
      method: "card" as const,
      last4: "4242",
      cardType: "Visa",
    } as PaymentInfo,
    pricing: {
      subtotal: 91000,
      shipping: 5000,
      tax: 7000,
      total: 105000,
    },
  };

  // Prepare invoice data
  const invoiceData: InvoiceData = {
    orderNumber: orderData.orderNumber,
    date: orderData.date,
    invoiceNumber: `INV-${orderData.orderNumber.replace("#ORD-", "")}`,
    companyInfo: {
      name: "Okeapku Interiors Ltd.",
      address: "456 Market Street",
      city: "Enugu",
      phone: "+1 (800) 555-0199",
      email: "hello@okeapkuinterior.com",
    },
    customerInfo: orderData.shippingAddress,
    items: orderData.items.map((item) => ({
      id: item.id,
      name: item.name,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
    })),
    pricing: orderData.pricing,
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-medium mb-6 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Orders
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Order {orderData.orderNumber}
            </h1>
            <p className="text-gray-600">Placed on {orderData.date}</p>
          </div>
          <OrderStatusBadge status={orderData.status} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items & Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-black mb-6">Order Items</h2>
              <div>
                {orderData.items.map((item) => (
                  <OrderDetailItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-black mb-6">
                Order Timeline
              </h2>
              <OrderTimeline events={orderData.timeline} />
            </div>

            {/* Tracking Information */}
            {/* {orderData.trackingNumber && (
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="font-semibold text-purple-900 mb-1">
                      Tracking Number
                    </h3>
                    <p className="text-purple-700 font-mono text-sm mb-3">
                      {orderData.trackingNumber}
                    </p>
                    <button className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
                      Track Package
                    </button>
                  </div>
                </div>
              </div>
            )} */}
          </div>

          {/* Right Column - Summary & Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-black mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-black">
                    {formatPrice(orderData.pricing.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-black">
                    {formatPrice(orderData.pricing.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-black">
                    {formatPrice(orderData.pricing.tax)}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between">
                  <span className="font-semibold text-black">Total</span>
                  <span className="font-bold text-black text-lg">
                    {formatPrice(orderData.pricing.total)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* <button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm">
                  Download Invoice
                </button> */}
                <InvoiceGenerator invoiceData={invoiceData} />
                <a className="block w-full bg-white text-black border-2 border-black py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors text-sm text-center" href="mailto:okeapkuinteriors@gmail.com">
                  Contact Support
                </a>
              </div>
            </div>

            {/* Shipping Address */}
            <ShippingAddressCard address={orderData.shippingAddress} />

            {/* Payment Info */}
            <PaymentInfoCard payment={orderData.payment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;