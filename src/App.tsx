import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Shop from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import Cart from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Success from './pages/SuccessPage';
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orders/OrderDetails';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {

  return (
    <>
      <Navbar />
      <main className="flex-1 mb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:category?" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:orderNumber?" element={<OrderDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App
