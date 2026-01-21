import type { FilterState } from "@/types/filterState";
import { useState } from "react";
// import { useParams } from "react-router-dom";

// ==================== TYPES ====================
interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableColors: string[];
  priceRange: { min: number; max: number };
}

// ==================== CONSTANTS ====================
const CATEGORIES = [
  { value: "royal-antics", label: "Royal Antics" },
  { value: "english-chairs", label: "English Chairs" },
  { value: "center-tables", label: "Center Tables" },
  { value: "dinning", label: "Dinning" },
  { value: "royal-dinning", label: "Royal Dinning" },
  { value: "office-equipment", label: "Office Equipment" },
  { value: "sitout", label: "Sitout" },
  { value: "wall-panels", label: "Wall Panels" },
  { value: "stands", label: "Stands" },
  { value: "other", label: "Other" },
];

// ==================== COMPONENT ====================
function ProductFilters({
  filters,
  onFilterChange,
  availableColors,
  priceRange,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const { category } = useParams<{ category: string }>();
  // console.log(category);
  

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors: newColors });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value) || 0;
    console.log(numValue);
    
    if (type === "min") {
      onFilterChange({ ...filters, minPrice: numValue });
    } else {
      onFilterChange({ ...filters, maxPrice: numValue });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      discount: "all",
      colors: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      searchQuery: "",
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.colors.length +
    (filters.discount !== "all" ? 1 : 0) +
    (filters.minPrice !== priceRange.min || filters.maxPrice !== priceRange.max
      ? 1
      : 0);

  const defaultInputStyles =
    "w-4 h-4 border-gray-300 rounded focus:ring-blue-500 accent-primary focus:ring-primary focus:ring-offset-1";

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 font-medium"
        >
          <span>
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filters Panel */}
      <aside
        className={`bg-white rounded-lg shadow-sm p-6 space-y-6 ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Search Products
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Categories
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {CATEGORIES.map((category) => (
              <label
                key={category.value}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.value)}
                  onChange={() => toggleCategory(category.value)}
                  className={defaultInputStyles}
                />
                <span className="ml-2 text-sm text-gray-700">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Discount</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="discount"
                checked={filters.discount === "all"}
                onChange={() => onFilterChange({ ...filters, discount: "all" })}
                className={defaultInputStyles}
              />
              <span className="ml-2 text-sm text-gray-700">All Products</span>
            </label>
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="discount"
                checked={filters.discount === "discount"}
                onChange={() =>
                  onFilterChange({ ...filters, discount: "discount" })
                }
                className={defaultInputStyles}
              />
              <span className="ml-2 text-sm text-gray-700">On Discount</span>
            </label>
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="discount"
                checked={filters.discount === "no-discount"}
                onChange={() =>
                  onFilterChange({ ...filters, discount: "no-discount" })
                }
                className={defaultInputStyles}
              />
              <span className="ml-2 text-sm text-gray-700">Regular Price</span>
            </label>
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const isSelected = filters.colors.includes(color);
              return (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-[#b9855e44] text-primary"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Price Range
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Min Price (₦)
              </label>
              <input
                type="number"
                min={priceRange.min}
                max={filters.maxPrice}
                value={filters.minPrice}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Max Price (₦)
              </label>
              <input
                type="number"
                min={filters.minPrice}
                max={priceRange.max}
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="w-full py-3 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </aside>
    </>
  );
}

export default ProductFilters;
