import { useParams, Link } from "react-router-dom";
import { fetchProductById, fetchProductsByCategory } from "@/services/products";
import type { Product } from "@/types/product";
import { useEffect, useState, useContext } from "react";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { formatPrice } from "@/utils/formatPrice";
import ProductCard from "@/components/product/ProductCard";
import { CartContext } from "@/context/CartContext";
import type Review from "@/types/review";
import { fetchProductReviewsById } from "@/services/reviews";
import { RenderStar } from "@/components/ui/RenderStar";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const cart = useContext(CartContext);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Effect 1: Fetch Main Product
  useEffect(() => {
    if (!id) return;

    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product details"))
      .finally(() => setLoading(false));
  }, [id]);

  // Effect 2: Fetch Related Products
  useEffect(() => {
    // Guard Clause: Only fetch if we have a product and a category
    if (!product?.category) return;

    fetchProductsByCategory(product.category)
      .then((data) => {
        // Exclude the current product from the related list
        const filtered = data.filter((p) => p.id !== product.id && p.inStock);
        setRelatedProducts(filtered.slice(0, 4));
      })
      .catch(() => console.error("Failed to load related products"));
    //   .finally(() => setLoadingRelatedProducts(false));
  }, [product?.category, product?.id]); // Precise dependencies

  // Effect 1: Fetch Product Reviews
  useEffect(() => {
    if (!id) return;

    fetchProductReviewsById(id)
      .then((data) => setProductReviews(data))
      .catch(() => setError("Failed to load product reviews"))
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");

  // Calculate average rating from reviews
  const averageRating =
    productReviews.length > 0
      ?
      productReviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
      productReviews.length
      : 0;
  // const roundedRating = Math.round(averageRating);

  if (!cart) return null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist. {error}
          </p>
          <Button variant="outline" linkTo="/shop" text="Back To Shop" />
        </div>
      </div>
    );
  }

  //   set product specifications
  const allSpecifications = {
    category: product.category.replace("-", " "),
    color: product.color,
    ...product.otherSpecifications,
  };

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
      ((product.price - product.discountPrice!) / product.price) * 100
    )
    : 0;

  const finalPrice = product.discountPrice || product.price;

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };


  //   const handleBuyNow = () => {
  //     handleAddToCart();
  //     navigate("/checkout");
  //   };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-gray-700">
              Shop
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              to={`/product/${product.id}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {product.name}
            </Link>
          </nav>

          {/* Product Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Images Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative">
                <img
                  src={product.images[selectedImage]}
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                    -{discountPercentage}% OFF
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                      ? "border-[#b9855ea1] ring-2 ring-primary"
                      : "border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Category */}
              <div>
                <span className="inline-block px-3 py-1 bg-[#b9855e22] text-primary text-sm font-medium rounded-full capitalize">
                  {product.category.replace("-", " ")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {averageRating > 0 ? (
                    <>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <RenderStar key={index} index={index + 1} rating={averageRating} />
                      ))}
                      <span className="text-gray-600 text-sm">
                        {`(${averageRating}) ${productReviews.length} Reviews`}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400">No ratings yet</span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 flex-wrap">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(finalPrice)}
                  {/* ₦{finalPrice.toLocaleString("en-NG")} */}
                </span>
                {hasDiscount && (
                  <span className="text-2xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                />
                <span
                  className={`font-medium ${product.inStock ? "text-green-700" : "text-red-700"
                    }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Color */}
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Color:{" "}
                <span className="text-base font-bold text-gray-900">
                  {product.color}
                </span>
              </h3>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className="flex flex-col sm:flex-row gap-4"> */}
              {/* Add to Cart Button */}
              {cart.inCart(product.id) ? (
                <Button
                  onClick={() => cart.removeFromCart(product.id)}
                  disabled={!product.inStock}
                  aria-label="Remove from cart"
                  variant="danger"
                  additionalClasses="cursor-pointer w-full"
                  size="small"
                  radius="lg"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove From Cart
                </Button>
              ) : (
                <Button
                  onClick={() => cart.addToCart(product, quantity)}
                  disabled={!product.inStock}
                  aria-label="Add to cart"
                  variant="primary"
                  additionalClasses="cursor-pointer w-full disabled:cursor-not-allowed"
                  size="small"
                  radius="lg"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </Button>
              )}
              {/* <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  Buy Now
                </button>
              </div> */}

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-green-600 flex-shrink-0"
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
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Quality Assured
                    </p>
                    <p className="text-gray-600 text-xs">Premium materials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Free Delivery
                    </p>
                    <p className="text-gray-600 text-xs">Orders above ₦200k</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-purple-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Warranty
                    </p>
                    <p className="text-gray-600 text-xs">1-year coverage</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-orange-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Easy Returns
                    </p>
                    <p className="text-gray-600 text-xs">
                      14-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-16">
            <div className="border-b mb-6">
              <div className="flex space-x-8 justify-start scrollbar-hide overflow-x-auto text-nowrap">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`pb-4 font-semibold transition-colors relative ${activeTab === "description"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Description
                  {activeTab === "description" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`pb-4 font-semibold transition-colors relative ${activeTab === "specifications"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Specifications
                  {activeTab === "specifications" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 font-semibold transition-colors relative ${activeTab === "reviews"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Reviews ({productReviews.length})
                  {activeTab === "reviews" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="prose max-w-none">
              {activeTab === "description" && (
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-4">{product.description}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Features:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {product.features.map((feature, index) => {
                      return <li key={index}>{feature}</li>;
                    })}
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(allSpecifications).map(([key, spec]) => {
                    return (
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium text-gray-900">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>
                        <span className="text-gray-600 capitalize">{spec}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {productReviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet.</p>
                  ) : (
                    productReviews.map((review) => (
                      <div className="flex items-start space-x-4 pb-6 border-b" key={review.id}>
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                          {review.image ? (
                            <img
                              src={review.image}
                              alt={review.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="font-bold">
                              {review.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {review.name}
                            </h4>
                            {/* <span className="text-sm text-gray-500">
                              2 weeks ago
                            </span> */}
                          </div>
                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, index) => {
                              return <RenderStar key={index} index={index + 1} rating={review.rating ?? 0} />;
                            })}
                          </div>
                          <p className="text-gray-600">
                            Absolutely love this! Quality is top-notch and delivery
                            was super fast. The installation team was professional
                            and courteous. Highly recommend!
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {/* <div className="flex items-start space-x-4 pb-6 border-b">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      TN
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          Tunde Nnamdi
                        </h4>
                        <span className="text-sm text-gray-500">
                          1 month ago
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(4)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg
                          className="w-4 h-4 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Great product! Very comfortable and looks exactly as
                        pictured. Only wish delivery was a bit faster, but
                        overall satisfied.
                      </p>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
