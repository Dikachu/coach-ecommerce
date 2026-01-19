import React from "react";

interface TextCarouselProps {
  text?: string;
  speed?: number;
}

const Carousel: React.FC<TextCarouselProps> = ({
  text = "Premium Cushions • Interior Materials • Home Decor • Quality Fabrics",
}) => {
  return (
    <div className="w-full overflow-hidden bg-black py-4">
      <div className="flex animate-scroll hover:pause whitespace-nowrap">
        {/* Repeat the text multiple times for seamless loop */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white text-2xl md:text-3xl font-medium px-8">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
