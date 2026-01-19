import { useState, useRef, useEffect } from "react";
import Button from "../ui/Button";

interface Collection {
  id: string;
  title: string;
  imageSrc: string;
  link: string;
}

interface Collections {
  collections: Collection[];
}

const TopCollections: React.FC<Collections> = ({ collections }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setItemsPerPage(2); // Mobile: 2 items
      } else if (width < 900) {
        setItemsPerPage(3); // Tablet: 3 items
      } else {
        setItemsPerPage(5); // Desktop: 5 items (show all)
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(collections.length / itemsPerPage);
  const shouldShowPagination = totalPages > 1;

  // Update current page based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const itemWidth = scrollRef.current.scrollWidth / collections.length;
        const newPage = Math.round(scrollLeft / (itemWidth * itemsPerPage));
        setCurrentPage(Math.min(newPage, totalPages - 1));
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [collections.length, itemsPerPage, totalPages]);

  const handlePageClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / collections.length;
      const scrollPosition = pageIndex * itemWidth * itemsPerPage;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Top Collection
          </h2>
          <p className="text-gray-600 text-base md:text-lg mx-auto max-w-xl">
            Explore our exclusive range of top collections, curated to bring
            style and comfort to your home.
          </p>
        </div>

        {/* Collections Container */}
        <div className="relative">
          {/* Scrollable Collections */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {collections.map((collection) => (
              <div
                key={collection.id}
                // href={collection.link}
                className="group flex flex-col flex-shrink-0 snap-start"
                style={{
                  width: `calc((100% - ${
                    itemsPerPage - 1
                  } * 24px) / ${itemsPerPage})`,
                }}
              >
                {/* Image Container */}
                <div className="relative group aspect-square bg-gray-100 overflow-hidden mb-4">
                  <img
                    src={collection.imageSrc}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Button
                      linkTo={collection.link}
                      variant="primary"
                      text="Shop Now"
                      additionalClasses="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-center text-base md:text-lg font-medium transition-colors text-black group-hover:text-red-600">
                  {collection.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {shouldShowPagination && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentPage === index
                      ? "bg-red-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopCollections;
