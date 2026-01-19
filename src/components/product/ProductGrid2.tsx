import React, { useState } from "react";
import ProductCard from "./ProductCard2";
import type { Product } from "./ProductCard2";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  title = "Featured Products",
  subtitle = "Discover our most popular items",
}) => {
  const categories = [
    "All",
    "Facial Cleansers",
    "Makeup Removers",
    "Serums",
    "Moisturizers",
    "Spot Treatments",
  ];

  const allProducts: Product[] = [
    // Facial Cleansers
    {
      id: "1",
      name: "Gentle Foaming Cleanser",
      category: "Facial Cleansers",
      price: 24.99,
      originalPrice: 34.99,
      imageSrc:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80",
      link: "/product/gentle-foaming-cleanser",
      isNew: true,
    },
    {
      id: "2",
      name: "Deep Clean Purifying Gel",
      category: "Facial Cleansers",
      price: 28.99,
      imageSrc:
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&q=80",
      link: "/product/deep-clean-gel",
    },
    {
      id: "3",
      name: "Hydrating Cream Cleanser",
      category: "Facial Cleansers",
      price: 32.99,
      originalPrice: 42.99,
      imageSrc:
        "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&q=80",
      link: "/product/hydrating-cream-cleanser",
    },
    // Makeup Removers
    {
      id: "4",
      name: "Micellar Cleansing Water",
      category: "Makeup Removers",
      price: 18.99,
      imageSrc:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&q=80",
      link: "/product/micellar-water",
      isNew: true,
    },
    {
      id: "5",
      name: "Oil-Based Makeup Remover",
      category: "Makeup Removers",
      price: 22.99,
      originalPrice: 29.99,
      imageSrc:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
      link: "/product/oil-makeup-remover",
    },
    {
      id: "6",
      name: "Gentle Eye Makeup Remover",
      category: "Makeup Removers",
      price: 16.99,
      imageSrc:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&q=80",
      link: "/product/eye-makeup-remover",
    },
    // Serums
    {
      id: "7",
      name: "Vitamin C Brightening Serum",
      category: "Serums",
      price: 45.99,
      originalPrice: 59.99,
      imageSrc:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
      link: "/product/vitamin-c-serum",
      isNew: true,
    },
    {
      id: "8",
      name: "Hyaluronic Acid Serum",
      category: "Serums",
      price: 38.99,
      imageSrc:
        "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&q=80",
      link: "/product/hyaluronic-serum",
    },
    {
      id: "9",
      name: "Retinol Night Serum",
      category: "Serums",
      price: 52.99,
      imageSrc:
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
      link: "/product/retinol-serum",
    },
    // Moisturizers
    {
      id: "10",
      name: "Daily Hydration Cream",
      category: "Moisturizers",
      price: 35.99,
      originalPrice: 45.99,
      imageSrc:
        "https://images.unsplash.com/photo-1556228852-80c63c1e3e48?w=500&q=80",
      link: "/product/hydration-cream",
    },
    {
      id: "11",
      name: "Night Repair Moisturizer",
      category: "Moisturizers",
      price: 42.99,
      imageSrc:
        "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=500&q=80",
      link: "/product/night-moisturizer",
      isNew: true,
    },
    {
      id: "12",
      name: "Lightweight Day Cream",
      category: "Moisturizers",
      price: 29.99,
      imageSrc:
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&q=80",
      link: "/product/day-cream",
    },
    // Spot Treatments
    {
      id: "13",
      name: "Acne Spot Treatment",
      category: "Spot Treatments",
      price: 19.99,
      originalPrice: 26.99,
      imageSrc:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
      link: "/product/acne-spot-treatment",
      isNew: true,
    },
    {
      id: "14",
      name: "Dark Spot Corrector",
      category: "Spot Treatments",
      price: 34.99,
      imageSrc:
        "https://images.unsplash.com/photo-1556228852-8c89e6adf883?w=500&q=80",
      link: "/product/dark-spot-corrector",
    },
    {
      id: "15",
      name: "Blemish Control Gel",
      category: "Spot Treatments",
      price: 24.99,
      imageSrc:
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&q=80",
      link: "/product/blemish-control",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);

  // Show up to 3 products when filtered, or 6 when showing all
  const displayProducts =
    activeCategory === "All"
      ? filteredProducts.slice(0, 6)
      : filteredProducts.slice(0, 3);

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">{subtitle}</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Show More Button */}
        {filteredProducts.length > displayProducts.length && (
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
              View All {activeCategory === "All" ? "Products" : activeCategory}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
