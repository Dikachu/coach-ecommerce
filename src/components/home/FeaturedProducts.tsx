import ProductGrid from "../product/ProductGrid"
import { useProducts } from "@/hooks/useProducts";
import Button from "../ui/Button";


function FeaturedProducts() {
    const { loading, error, featuredProductsList } = useProducts();

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-base md:text-lg">Discover our most popular items</p>
        </div>

        {/* Category Tabs */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
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
        </div> */}

        {/* Products Grid */}
        <ProductGrid products={featuredProductsList} loading={loading} error={error} isHomepage={true} />

        {/* Show More Button */}
        {/* {featuredProductsList.length > displayProducts.length && ( */}
          <div className="flex justify-center mt-12">
            {/* <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
              View All Products
            </button> */}
            <Button variant="primary" text="View All Products" linkTo="/shop" />
          </div>
        {/* )} */}
      </div>
    </section>
  )
}

export default FeaturedProducts;
