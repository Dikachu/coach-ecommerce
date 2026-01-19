import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
// import { applyCoupon } from "@/utils/applyCoupon";
// import type { CouponResult } from "@/types/coupon";
import Button from "../ui/Button";
import type { OrderSummaryProps } from "@/types/orderSummaryProps";
import { useCoupon } from "@/hooks/useCoupons";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  onCheckout,
  checkoutButtonText = "Proceed to Checkout",
  isCheckoutPage = false,
}) => {
  const cart = useContext(CartContext);
  if (!cart) return null;
  const { cartItems, cartSubtotal } = cart;

  /* ---------------- PROMO ---------------- */
  const couponData = useCoupon(cartSubtotal);
  if (!couponData) return null;  // Add this check to handle null return from hook
  const {
    code,
    result,
    loading,
    applyCoupon,
    clearCoupon,
  } = couponData;  

  const [promoCode, setPromoCode] = useState(code || "");

  useEffect(() => {
    setPromoCode(code || "");
  }, [code]);

  // console.log(code);

  /* ---------------- TOTALS ---------------- */
  const shippingTotal = useMemo(() => {
    return cartItems.reduce(
      (sum: number, item: { product: { shipping: number }; quantity: number }) =>
        sum + item.product.shipping * item.quantity,
      0
    );
  }, [cartItems]);

  const total = result ? result.discountedTotal + shippingTotal : cartSubtotal + shippingTotal;


  /* ---------------- UI ---------------- */
  return (
    <div className="bg-gray-50 rounded-2xl p-3 md:p-6 sticky top-8">
      <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

      {/* Promo Code */}
      {!isCheckoutPage && (
        <div className="mb-6">
          {!code && (
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  applyCoupon(promoCode);
                }
              }}
              placeholder="Promo code"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-[#b9855e] focus:ring-2 focus:ring-[#b9855e]/20 focus:outline-none transition-all duration-200 text-sm"
            />
            <Button
              variant="primary"
              onClick={() => applyCoupon(promoCode)}
              text="Apply"
              radius="lg"
              disabled={loading}
            />
          </div>
          )}

          {result && result.isValid && (
            <div className="flex items-center justify-between mt-2 gap-4">
              <p className="text-sm text-green-600">
                ✓ {result.message}
              </p>
              <button
                onClick={() => {
                  clearCoupon();
                  setPromoCode("");
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )}

          {result && !result.isValid && result.error && (
            <p className="text-sm text-red-600 mt-2">{result.error}</p>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            {formatPrice(cartSubtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shippingTotal === 0
              ? "Free"
              : formatPrice(shippingTotal)}
          </span>
        </div>

        {result && result.isValid && result.discountAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">
              -{formatPrice(result.discountAmount)}
            </span>
          </div>
        )}

        {/* {couponError && (
          <p className="text-sm text-red-600 mt-2">{couponError}</p>
        )} */}

        {/* {couponResult.message && (
          <p className="text-sm text-red-600 mt-2">
            {couponResult.message}
          </p>
        )} */}

        <div className="border-t my-4" />

        <div className="flex justify-between text-lg">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-xl">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      {onCheckout && (
        <Button
          variant="primary"
          text={checkoutButtonText}
          additionalClasses="w-full"
          linkTo={isCheckoutPage ? "/success" : "/checkout"}
        />
      )}
    </div>
  );
};

export default OrderSummary;



























// import { formatPrice } from "@/utils/formatPrice";
// import { useContext, useState } from "react";
// import Button from "../ui/Button";
// import type { OrderSummaryProps } from "@/types/orderSummaryProps";
// import { CartContext } from "@/context/CartContext";



// const OrderSummary: React.FC<OrderSummaryProps> = ({
//   shipping = 0,
//   discount = 0,
//   showPromoCode = true,
//   onCheckout,
//   checkoutButtonText = "Proceed to Checkout",
//   isCheckoutPage = false,
// }) => {
//   const cart = useContext(CartContext);
//   if (!cart) return null;
  
//   const cartItems = cart.cartItems;

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const [promoCode, setPromoCode] = useState("");
//   const [promoApplied, setPromoApplied] = useState(false);

//   const total = subtotal + shipping - discount;

//   const handleApplyPromo = () => {
//     if (promoCode.trim()) {
//       setPromoApplied(true);
//       // Here you would normally validate and apply the promo code
//     }
//   };

//   return (
//     <div className="bg-gray-50 rounded-2xl p-3 md:p-6 sticky top-8">
//       <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

//       {/* Promo Code Input */}
//       {showPromoCode && !isCheckoutPage && (
//         <div className="mb-6">
//           <div className="flex gap-2 flex-col sm:flex-row">
//             <input
//               type="text"
//               value={promoCode}
//               onChange={(e) => setPromoCode(e.target.value)}
//               placeholder="Promo code"
//               className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-[#b9855e] focus:ring-2 focus:ring-[#b9855e]/20 focus:outline-none transition-all duration-200 text-sm"
//             />
//             <Button
//               variant="primary"
//               onClick={handleApplyPromo}
//               text="Apply"
//               radius="lg"
//             />
//           </div>
//           {promoApplied && (
//             <p className="text-sm text-green-600 mt-2">
//               ✓ Promo code applied successfully
//             </p>
//           )}
//         </div>
//       )}

//       {/* Summary Details */}
//       <div className="space-y-4 mb-6">
//         {/* Subtotal */}
//         <div className="flex justify-between text-base">
//           <span className="text-gray-600">Subtotal</span>
//           <span className="font-medium text-black">
//             {formatPrice(subtotal)}
//           </span>
//         </div>

//         {/* Shipping */}
//         <div className="flex justify-between text-base">
//           <span className="text-gray-600">Shipping</span>
//           <span className="font-medium text-black">
//             {shipping === 0 ? "Free" : `${shipping}`}
//           </span>
//         </div>

//         {/* Tax */}
//         {/* {tax > 0 && (
//           <div className="flex justify-between text-base">
//             <span className="text-gray-600">Tax</span>
//             <span className="font-medium text-black">{formatPrice(tax)}</span>
//           </div>
//         )} */}

//         {/* Discount */}
//         {discount > 0 && (
//           <div className="flex justify-between text-base">
//             <span className="text-gray-600">Discount</span>
//             <span className="font-medium text-green-600">
//               -{formatPrice(discount)}
//             </span>
//           </div>
//         )}

//         {/* Divider */}
//         <div className="border-t border-gray-300 my-4"></div>

//         {/* Total */}
//         <div className="flex justify-between text-lg">
//           <span className="font-semibold text-black">Total</span>
//           <span className="font-bold text-black text-xl">
//             {formatPrice(total)}
//           </span>
//         </div>
//       </div>

//       {/* Checkout Button */}
//       {onCheckout && (
//         <Button
//           variant="primary"
//           text={checkoutButtonText}
//           additionalClasses="w-full"
//           linkTo={isCheckoutPage ? "/success" : "/checkout"}
//         />
//         // <button
//         //   onClick={onCheckout}
//         //   className="w-full bg-black text-white py-4 rounded-full font-semibold text-base hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
//         // >
//         //   {checkoutButtonText}
//         //   <svg
//         //     className="w-5 h-5 group-hover:translate-x-1 transition-transform"
//         //     fill="none"
//         //     stroke="currentColor"
//         //     viewBox="0 0 24 24"
//         //   >
//         //     <path
//         //       strokeLinecap="round"
//         //       strokeLinejoin="round"
//         //       strokeWidth={2}
//         //       d="M17 8l4 4m0 0l-4 4m4-4H3"
//         //     />
//         //   </svg>
//         // </button>
//       )}

//       {/* Additional Info */}
//       {!isCheckoutPage && (
//         <div className="mt-6 space-y-3">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>Secure checkout</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             <span>Free shipping on orders over ₦200,000.00</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderSummary;