import { useState, useEffect, useCallback } from "react";
import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";
import hero4 from "../../assets/images/hero/hero4.jpg";
import hero5 from "../../assets/images/hero/hero5.jpg";
import Button from "../ui/Button";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: hero1,
    title: "Royal Antics Collection",
    description:
      "Bold, statement pieces crafted to bring luxury and authority into your living space",
    ctaText: "Shop Royal Antics",
    ctaLink: "/shop/royal-antics",
  },
  {
    id: 2,
    image: hero2,
    title: "English Chairs",
    description:
      "Classic English chair designs built for comfort, balance, and everyday elegance",
    ctaText: "View Chairs",
    ctaLink: "/shop/english-chairs",
  },
  {
    id: 3,
    image: hero3,
    title: "Dining & Royal Dining Sets",
    description:
      "Functional dining furniture designed for homes that value style and durability",
    ctaText: "Explore Dining",
    ctaLink: "/shop/dinning",
  },
  {
    id: 4,
    image: hero4,
    title: "Office & Workspaces",
    description:
      "Office chairs, tables, and equipment designed for productivity and long hours",
    ctaText: "Shop Office",
    ctaLink: "/shop/office-equipment",
  },
  {
    id: 5,
    image: hero5,
    title: "Interior Essentials",
    description:
      "Center tables, wall panels, stands, and finishing pieces that complete your space",
    ctaText: "Browse Essentials",
    ctaLink: "/shop",
  },
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);


  return (
    <section
      className="relative h-screen  w-full overflow-hidden"
      style={{ maxHeight: "500px" }}
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-2xl w-[80%] mx-auto px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm p-6 sm:p-8">
          <div className="">
            {/* Animated Text Content */}
            <div className="relative">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-all duration-700 text-center ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-8 absolute pointer-events-none"
                  }`}
                >
                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <Button linkTo={slide.ctaLink} variant="secondary" text={slide.ctaText} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 sm:w-6 h-2 sm:h-2.5 bg-white"
                : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows (Desktop Only) */}
      {/* <button
        onClick={() => {
          if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            );
            setTimeout(() => setIsAnimating(false), 800);
          }
        }}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 text-white"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
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

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 text-white"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
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
      </button> */}
    </section>
  );
}

export default HeroSection;