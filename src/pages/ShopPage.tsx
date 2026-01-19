// import { useState, useMemo, useRef, useEffect } from "react";
// import ProductFilters from "@/components/product/ProductFilters";
// import ProductGrid from "@/components/product/ProductGrid";
// import { useProducts } from "@/hooks/useProducts";
// import type { FilterState } from "@/types/filterState";
// import Loader from "@/components/ui/Loader";

// function Shop() {
//   const { products, loading, loadingMore, error, loadMore, hasMore } =
//     useProducts();
//   const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

//   const [filters, setFilters] = useState<FilterState>({
//     categories: [],
//     discount: "all",
//     colors: [],
//     minPrice: 0,
//     maxPrice: 1000000,
//     searchQuery: "",
//   });

//   // Extract available colors from products
//   const availableColors = useMemo(() => {
//     const colors = new Set(products.map((p) => p.color));
//     return Array.from(colors).sort();
//   }, [products]);

//   // Calculate price range
//   const priceRange = useMemo(() => {
//     const prices = products.map((p) => p.price);
//     return {
//       min: Math.min(...prices),
//       max: Math.max(...prices),
//     };
//   }, [products]);

//   // Filter products based on active filters
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       // Category filter
//       if (
//         filters.categories.length > 0 &&
//         !filters.categories.includes(product.category)
//       ) {
//         return false;
//       }

//       // Discount filter
//       if (filters.discount === "discount" && !product.discountPrice) {
//         return false;
//       }
//       if (filters.discount === "no-discount" && product.discountPrice) {
//         return false;
//       }

//       // Color filter
//       if (
//         filters.colors.length > 0 &&
//         !filters.colors.includes(product.color)
//       ) {
//         return false;
//       }

//       // Price filter
//       const price = product.discountPrice || product.price;
//       if (price < filters.minPrice || price > filters.maxPrice) {
//         return false;
//       }

//       // Search filter
//       if (filters.searchQuery) {
//         const query = filters.searchQuery.toLowerCase();
//         return (
//           product.name.toLowerCase().includes(query) ||
//           product.description.toLowerCase().includes(query) ||
//           product.category.toLowerCase().includes(query)
//         );
//       }

//       return true;
//     });
//   }, [filters, products]);

//   // Intersection Observer for infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const first = entries[0];
//         if (first.isIntersecting && hasMore && !loadingMore) {
//           loadMore();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const currentTrigger = loadMoreTriggerRef.current;
//     if (currentTrigger) {
//       observer.observe(currentTrigger);
//     }

//     return () => {
//       if (currentTrigger) {
//         observer.unobserve(currentTrigger);
//       }
//     };
//   }, [hasMore, loadingMore, loadMore]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
//           <p className="text-gray-600">
//             Showing {filteredProducts.length} of {products.length} products
//           </p>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:col-span-1">
//             <ProductFilters
//               filters={filters}
//               onFilterChange={setFilters}
//               availableColors={availableColors}
//               priceRange={priceRange}
//             />
//           </div>

//           {/* Products Grid */}
//           <div className="lg:col-span-3">
//             <ProductGrid
//               products={filteredProducts}
//               loading={loading}
//               error={error}
//             />

//             {/* Infinite Scroll Trigger */}
//             {!loading && (
//               <div ref={loadMoreTriggerRef} className="py-8">
//                 {loadingMore && (
//                   <div className="flex justify-center">
//                     <Loader />
//                   </div>
//                 )}
//                 {!hasMore && products.length > 0 && (
//                   <p className="text-center text-gray-500">
//                     You've reached the end of the products
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shop;

import { useState, useMemo, useRef, useEffect } from "react";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import type { FilterState } from "@/types/filterState";
import Loader from "@/components/ui/Loader";
import { useParams } from "react-router-dom";

function ShopPage() {
  const [limit, setLimit] = useState(12);
  const { products, loading, error, hasMore } = useProducts(limit);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const { category } = useParams<{ category: string }>();
  // console.log(category);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // Only fetch if visible AND we aren't already loading
        if (target.isIntersecting && !loading && hasMore) {
          setLimit((prev) => prev + 12);
        }
      },
      { threshold: 1.0 }
    ); // Trigger when 100% visible

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => observer.disconnect(); // Clean up on unmount
  }, [loading, hasMore]);

  const [filters, setFilters] = useState<FilterState>({
    categories: category ? [category] : [],
    discount: "all",
    colors: [],
    minPrice: 0,
    maxPrice: 1000000,
    searchQuery: "",
  });

  let filteredProducts = products;

  // Extract available colors from products
  const availableColors = useMemo(() => {
    const colors = new Set(products.map((p) => p.color));
    return Array.from(colors).sort();
  }, [products]);

  // Calculate price range
  const priceRange = useMemo(() => {
    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  // Filter products based on active filters
  filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Discount filter
      if (filters.discount === "discount" && !product.discountPrice) {
        return false;
      }
      if (filters.discount === "no-discount" && product.discountPrice) {
        return false;
      }

      // Color filter
      if (
        filters.colors.length > 0 &&
        !filters.colors.includes(product.color)
      ) {
        return false;
      }

      // Price filter
      const price = product.discountPrice || product.price;
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [filters, products]);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-6 pt-4 pb-2 sm:pb-4 border-b border-gray-200 w-full bg-gray-100 p-6 sm:p-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Our Collection
        </h1>
        <p className="text-lg text-gray-500">
          Discover hand-picked items just for you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <p className="mb-4 text-[#b9855e]">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              availableColors={availableColors}
              priceRange={priceRange}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>

      {/* Load more product when user scrolls to the buttom */}
      <div
        ref={loadMoreTriggerRef}
        className="py-8 w-full flex justify-center align-center"
      >
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default ShopPage;
