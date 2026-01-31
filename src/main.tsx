import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Index CSS
import "./index.css";

import App from "./App";
import Home from "./pages/HomePage";
import Shop from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import Cart from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Success from "./pages/SuccessPage";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";
import NotFoundPage from "./pages/NotFoundPage";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import { CartProvider } from "@/context/CartProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { GuestRoute } from "@/routes/GuestRoute";
import { AuthenticatedRoutes } from "./routes/AuthenticatedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /** Public routes */
      { index: true, element: <Home /> },
      { path: "shop/:category?", element: <Shop /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "cart", element: <Cart /> },

      /** Guest-only routes */
      {
        element: <GuestRoute />,
        children: [
          { path: "signin", element: <SignIn /> },
          { path: "signup", element: <SignUp /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },

      /** Protected routes */
      {
        element: <AuthenticatedRoutes />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "success", element: <Success /> },
          { path: "orders", element: <Orders /> },
          { path: "order/:orderNumber", element: <OrderDetails /> },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CartProvider>
  </StrictMode>,
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// // import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "@/context/CartProvider";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <CartProvider>
//         <App />
//       </CartProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
