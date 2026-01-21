import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

function CartIcon() {
  const cart = useContext(CartContext);
  if (!cart) return null;

  return (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        `relative p-2 rounded-lg transition-colors ${isActive
          ? "text-primary bg-[#b9855e22]"
          : "text-gray-700 hover:text-primary hover:bg-gray-100"
        }`
      }
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {cart.cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cart.cartCount > 99 ? "99+" : cart.cartCount}
        </span>
      )}
    </NavLink>
  );
}

export default CartIcon;
