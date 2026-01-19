import Button from "@/components/ui/Button";
import { formatPrice } from "@/utils/formatPrice";
import React from "react";

interface SuccessProps {
  orderNumber?: string;
  email?: string;
  estimatedDelivery?: string;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
}

const SuccessPage: React.FC<SuccessProps> = ({
  orderNumber = "#ORD-2024-0123",
  email = "customer@example.com",
  estimatedDelivery = "Jan 20 - Jan 25, 2026",
  subtotal = 107000,
  shipping = 5000,
  tax = 8000,
  total = 122000,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon and Message */}
        <div className="text-center mb-12">
          {/* Animated Success Icon */}
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            {/* Pulse Ring */}
            <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full animate-ping opacity-20"></div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to{" "}
            <span className="font-medium text-black">{email}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-6 shadow-sm">
          {/* Order Number and Status */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-xl font-bold text-black">{orderNumber}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                ✓ Confirmed
              </span>
            </div>
          </div>

          {/* Delivery Estimate */}
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-gray-700"
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
              </div>
              <div>
                <p className="font-semibold text-black mb-1">
                  Estimated Delivery
                </p>
                <p className="text-gray-600">{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-black mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-black">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-black">
                  {formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-medium text-black">
                  {formatPrice(tax)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold text-black text-lg">Total</span>
                <span className="font-bold text-black text-xl">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="font-semibold text-black mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                1
              </div>
              <div>
                <p className="font-medium text-black">Order Processing</p>
                <p className="text-sm text-gray-600">
                  We're preparing your items for shipment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                2
              </div>
              <div>
                <p className="font-medium text-black">Shipping Notification</p>
                <p className="text-sm text-gray-600">
                  You'll receive a tracking number and other details via email
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                3
              </div>
              <div>
                <p className="font-medium text-black">Delivery</p>
                <p className="text-sm text-gray-600">
                  Your order arrives at your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" text="View Order Details" linkTo={`/orders/${orderNumber}`} additionalClasses="flex-1" />
          <Button variant="outline" text="Continue Shopping" linkTo="/shop" additionalClasses="flex-1" />
          {/* <a
            href="/orders"
            className="flex-1 bg-black text-white py-4 rounded-full font-semibold text-center hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Order Details
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a> */}
          {/* <a
            href="/shop"
            className="flex-1 bg-white text-black border-2 border-black py-4 rounded-full font-semibold text-center hover:bg-gray-50 transition-all duration-300"
          >
            Continue Shopping
          </a> */}
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help with your order?
          </p>
          <a href="mailto:support@coach.com" className="text-black font-medium hover:underline">
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
