import { useState } from "react";
// import { fetchProductById } from "@/services/products";
import { useReviews } from "@/hooks/useReviews";
import Loader from "../ui/Loader";


const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {reviews, loading, error} = useReviews(4);

  if (!reviews) return null;

  if (loading) {
    return <Loader />;
  }

  if(error) {
    return <p>{error}</p>;
  }

  const testimonials = reviews;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="w-full bg-gray-50 py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-16">
          What Our Customers Say
        </h2>

        {/* Main Testimonial Card */}
        <div className="relative">
          {/* Quote Mark */}
          <div className="absolute -top-8 left-0 text-8xl text-gray-200 font-serif leading-none">
            "
          </div>

          {/* Content */}
          <div className="relative bg-white rounded-2xl p-4 sm:p-10 shadow-sm">
            {/* Testimonial Text */}
            <div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                {activeTestimonial.comment}
              </p>

              {/* <img src="" alt="" /> */}
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {activeTestimonial.image && (
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={activeTestimonial.image}
                    alt={activeTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Name and Role */}
              <div className="">
                <h4 className="text-base font-semibold text-black">
                  {activeTestimonial.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {activeTestimonial.role}
                </p>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 justify-end flex-wrap flex-1 align-start">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      index < activeTestimonial.rating
                        ? "text-primary fill-current"
                        : "text-gray-300 fill-current"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer"
            aria-label="Previous testimonial"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-8 h-2 bg-black"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer"
            aria-label="Next testimonial"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
