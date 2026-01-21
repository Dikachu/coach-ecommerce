import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx';
import Home from './pages/HomePage';
import Shop from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import Cart from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Success from './pages/SuccessPage';
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orders/OrderDetails';
import NotFoundPage from './pages/NotFoundPage';
import { CartProvider } from "@/context/CartProvider";
import './index.css';

// Define your routes here
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App now acts as your global layout
    children: [
      { index: true, element: <Home /> },
      { path: "shop/:category?", element: <Shop /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "success", element: <Success /> },
      { path: "orders", element: <Orders /> },
      { path: "order/:orderNumber?", element: <OrderDetails /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
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
