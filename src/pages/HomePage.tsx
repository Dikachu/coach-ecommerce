import FeaturedProducts from "@/components/home/FeaturedProducts";
import Carousel from "../components/home/Carousel";
import Hero from "../components/home/Hero";
import ProductShowcase from "../components/home/ProductShowcase";
import Testimonials from "../components/home/Testimonial";
import TopCollections from "../components/home/TopCollections";
import chair from "@/assets/images/top-collections/chair.jpg";
import dinning from "@/assets/images/top-collections/dinning.jpg";
import royal from "@/assets/images/top-collections/royal.jpg";
import sofa from "@/assets/images/top-collections/sofa.jpg";
import tables from "@/assets/images/top-collections/tables.jpg";

function HomePage() {  

  const collections = [
    {
      id: "1",
      title: "English Chairs",
      imageSrc: chair,
      link: "/shop/english-chairs",
    },
    {
      id: "2",
      title: "Dinning Sets",
      imageSrc: dinning,
      link: "/shop/dinning",
    },
    {
      id: "3",
      title: "Royal Antics Sofas",
      imageSrc: royal,
      link: "/shop/royal-antics",
    },
    {
      id: "4",
      title: "Office Equipment",
      imageSrc: sofa,
      link: "/shop/office-equipment",
    },
    {
      id: "5",
      title: "Center Tables",
      imageSrc: tables,
      link: "/shop/center-tables",
    },
  ];

  return (
    <>
      <Hero />
      <Carousel />
      <ProductShowcase />
      <TopCollections collections={collections} />
      <FeaturedProducts />
      <Testimonials />
    </>
  );
}

export default HomePage;
