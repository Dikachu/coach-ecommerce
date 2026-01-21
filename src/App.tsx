import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ScrollRestoration, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      {/* 1. This now works perfectly because we are using a Data Router */}
      <ScrollRestoration />

      <Navbar />

      <main className="flex-1 mb-8">
        {/* 2. Outlet renders whatever child route is active */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;





















// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import { Routes, Route, ScrollRestoration, Outlet } from 'react-router-dom';
// import Home from './pages/HomePage';
// import Shop from './pages/ShopPage';
// import AboutPage from './pages/AboutPage';
// import FaqPage from './pages/FaqPage';
// import Cart from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import Success from './pages/SuccessPage';
// import Orders from './pages/orders/Orders';
// import OrderDetails from './pages/orders/OrderDetails';
// import ProductPage from './pages/ProductPage';
// import NotFoundPage from './pages/NotFoundPage';


// function App() {

//   return (
//     <>
//       <Navbar />
//       <ScrollRestoration />
//       <Outlet />
//       <main className="flex-1 mb-8">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/shop/:category?" element={<Shop />} />
//           <Route path="/product/:id" element={<ProductPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/faq" element={<FaqPage />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/success" element={<Success />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/order/:orderNumber?" element={<OrderDetails />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default App
