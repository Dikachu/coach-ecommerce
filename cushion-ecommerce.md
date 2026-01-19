import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

// ==================== TYPES ====================
// types/product.ts
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

// types/cart.ts
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] };

// ==================== UTILITIES ====================
// utils/formatPrice.ts
const formatPrice = (price: number): string => {
  return `₦${price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// ==================== DATA ====================
// data/products.json (simulated)
const productsData: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Sofa',
    description: 'Luxurious 3-seater leather sofa with ergonomic design and premium cushioning.',
    price: 450000,
    category: 'Sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    inStock: true
  },
  {
    id: '2',
    name: 'Modern Fabric Couch',
    description: 'Contemporary fabric couch with removable covers and deep seating comfort.',
    price: 280000,
    category: 'Sofas',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    inStock: true
  },
  {
    id: '3',
    name: 'Executive Office Chair',
    description: 'Ergonomic office chair with lumbar support and adjustable height.',
    price: 85000,
    category: 'Chairs',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop',
    inStock: true
  },
  {
    id: '4',
    name: 'Dining Chair Set (4)',
    description: 'Set of 4 solid wood dining chairs with cushioned seats.',
    price: 120000,
    category: 'Chairs',
    image: 'https://images.unsplash.com/photo-1598300188992-fb5c3408c9a5?w=400&h=300&fit=crop',
    inStock: true
  },
  {
    id: '5',
    name: 'L-Shaped Sectional',
    description: 'Spacious L-shaped sectional perfect for family rooms.',
    price: 550000,
    category: 'Sofas',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop',
    inStock: false
  },
  {
    id: '6',
    name: 'Accent Armchair',
    description: 'Stylish accent chair with velvet upholstery and wooden legs.',
    price: 95000,
    category: 'Chairs',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop',
    inStock: true
  },
  {
    id: '7',
    name: 'Recliner Sofa',
    description: '2-seater recliner with USB charging ports and cup holders.',
    price: 380000,
    category: 'Sofas',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop',
    inStock: true
  },
  {
    id: '8',
    name: 'Gaming Chair Pro',
    description: 'High-back gaming chair with RGB lighting and memory foam.',
    price: 125000,
    category: 'Chairs',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop',
    inStock: true
  }
];

// ==================== SERVICES ====================
// services/api.ts
class ProductAPI {
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async getProducts(): Promise<Product[]> {
    await this.delay(500);
    return productsData;
  }

  static async getProductById(id: string): Promise<Product | undefined> {
    await this.delay(300);
    return productsData.find(p => p.id === id);
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    await this.delay(400);
    return productsData.filter(p => p.category === category);
  }
}

// ==================== HOOKS ====================
// hooks/useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

// hooks/useFetch.ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(fetchFn: () => Promise<T>): FetchState<T> {
  const [state, setState] = React.useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const result = await fetchFn();
        if (!cancelled) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err as Error });
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

// hooks/useProducts.ts
function useProducts() {
  return useFetch(() => ProductAPI.getProducts());
}

function useProduct(id: string) {
  return useFetch(() => ProductAPI.getProductById(id));
}

// ==================== CART CONTEXT ====================
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        items: [...state.items, { product: action.payload, quantity: 1 }]
      };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'CLEAR_CART':
      return { items: [] };
    case 'HYDRATE':
      return { items: action.payload };
    default:
      return state;
  }
}

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cushion-cart');
      if (saved) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cushion-cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// hooks/useCart.ts
function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  const { state, dispatch } = context;

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}

// ==================== UI COMPONENTS ====================
// components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// components/ui/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
}

// components/ui/Loader.tsx
function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

// components/layout/Navbar.tsx
function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Cushion
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-blue-600">
              Shop
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// components/layout/Footer.tsx
function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600">
          <p>&copy; 2025 Cushion. Premium furniture for your home.</p>
        </div>
      </div>
    </footer>
  );
}

// components/layout/PageContainer.tsx
function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  );
}

// components/product/ProductPrice.tsx
function ProductPrice({ price }: { price: number }) {
  return <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>;
}

// components/product/ProductCard.tsx
function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <ProductPrice price={product.price} />
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="text-sm px-3 py-1"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// components/product/ProductGrid.tsx
function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// components/cart/CartItem.tsx
function CartItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.product.category}</p>
        <ProductPrice price={item.product.price} />
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Remove
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// components/cart/CartSummary.tsx
function CartSummary() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">Free</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <Button fullWidth onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </Button>
    </div>
  );
}

// ==================== PAGES ====================
// pages/Home.tsx
function Home() {
  const { data: products, loading, error } = useProducts();

  return (
    <PageContainer>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Cushion
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Premium furniture for your perfect home
        </p>
        <Button onClick={() => window.location.href = '/shop'}>
          Shop Now
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      {loading && <Loader />}
      {error && (
        <div className="text-center py-12 text-red-600">
          Failed to load products. Please try again.
        </div>
      )}
      {products && <ProductGrid products={products.slice(0, 4)} />}
    </PageContainer>
  );
}

// pages/Shop.tsx
function Shop() {
  const { data: products, loading, error } = useProducts();
  const [filter, setFilter] = React.useState<string>('All');

  const categories = ['All', 'Sofas', 'Chairs'];

  const filteredProducts = products
    ? filter === 'All'
      ? products
      : products.filter(p => p.category === filter)
    : [];

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Shop</h1>
      
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <Loader />}
      {error && (
        <div className="text-center py-12 text-red-600">
          Failed to load products. Please try again.
        </div>
      )}
      {products && <ProductGrid products={filteredProducts} />}
    </PageContainer>
  );
}

// pages/Product.tsx
function Product() {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error } = useProduct(id!);
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (loading) return <PageContainer><Loader /></PageContainer>;
  if (error || !product) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Product not found.</p>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <button
        onClick={() => navigate('/shop')}
        className="text-blue-600 hover:text-blue-700 mb-6 flex items-center"
      >
        ← Back to Shop
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <ProductPrice price={product.price} />
          <p className="text-gray-700 my-6">{product.description}</p>
          
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <Button
            onClick={() => {
              addItem(product);
              navigate('/cart');
            }}
            disabled={!product.inStock}
            fullWidth
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

// pages/Cart.tsx
function Cart() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {items.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
            <div className="mt-4">
              <Button variant="danger" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </PageContainer>
  );
}

// pages/Checkout.tsx
function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: ''
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate('/success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
            
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" fullWidth>
              Complete Order
            </Button>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

// pages/Success.tsx
function Success() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed and will be delivered soon.
        </p>
        
        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

// ==================== APP ====================
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}