import singleProductImage from "../../assets/images/single-product.avif";
import Button from "../ui/Button";


const ProductShowcase = () => {
  return (
    <section className="w-full bg-white p-8 lg:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl md:gap-12 mx-auto">
        {/* Image Section */}
        <div className="relative aspect-[3/2] ">
          <img
            src={singleProductImage}
            alt="Product showcase"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center pt-8 md:pt-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Royal Palace Sofa
          </h2>

          <p className="text-gray-600 text-base md:text-lg mb-10 max-w-md">
            Experience the epitome of luxury and comfort with our Royal Palace
            Sofa.
          </p>

          <Button linkTo="/shop/royal-antics" text="Shop Now" variant="primary" additionalClasses="w-fit" />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;