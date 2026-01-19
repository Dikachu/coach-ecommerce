import CartItemCard from "../components/cart/CartItemCard";
import OrderSummary from "../components/cart/OrderSummary";
import Button from "@/components/ui/Button";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartProps {
  onCheckout?: () => void;
}

const CartPage: React.FC<CartProps> = ({ onCheckout }) => {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  if (!cart) return null;

  const cartCount = cart.cartCount;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Cart Content */}
        {cartCount === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to get started
            </p>
            <Button variant="primary" text="Continue shopping" linkTo="/shop" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                  Shopping Cart
                </h1>
                <p className="text-[#b9855e]">
                  <b>{cartCount}</b>{" "}
                  {cartCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <Button
                variant="danger"
                radius="lg"
                additionalClasses="whitespace-nowrap h-fit cursor-pointer"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to clear the cart? This action can't be reversed!"
                    )
                  ) {
                    cart.clearCart();
                  }
                }}
              >
                <span>Clear Cart</span>
                <svg
                  className="w-5 h-5 shrink-0"
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
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-2 md:p-4">
                  {cart.cartItems.map((item) => (
                    <CartItemCard key={item.product.id} product={item.product} quantity={item.quantity} />
                  ))}
                </div>

                {/* Continue Shopping Link */}
                <div className="mt-6">
                  <a
                    href="/shop"
                    className="inline-flex items-center gap-2 text-black font-medium hover:gap-3 transition-all"
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
                    Continue Shopping
                  </a>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div >
  );
};

export default CartPage;


