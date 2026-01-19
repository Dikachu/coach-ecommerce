import { useContext } from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/cart/OrderSummary";
import type { CheckoutFormData } from "@/types/checkoutFormData";
import { CartContext } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

const CheckoutPage: React.FC = () => {
  const cart = useContext(CartContext)
  if (!cart) return null;
  const orderItems = cart.cartItems || [];

  const handleFormSubmit = (formData: CheckoutFormData) => {
    console.log("Form submitted:", formData);
    // Handle order submission
    alert("Order placed successfully!");
  };

  const handlePlaceOrder = () => {
    // This would trigger form validation and submission
    alert("Processing your order...");
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Checkout
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <a href="/cart" className="hover:text-black transition-colors">
              Cart
            </a>
            <span>→</span>
            <span className="font-medium text-black">Checkout</span>
          </div>
        </div>

        {/* Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleFormSubmit} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            {/* Order Items Preview */}
            <div className="mb-6 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-black mb-4">
                Order Items ({orderItems.length})
              </h3>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-black">
                      {formatPrice((item.product.discountPrice ?? item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <OrderSummary
              onCheckout={handlePlaceOrder}
              checkoutButtonText="Place Order"
              isCheckoutPage={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
