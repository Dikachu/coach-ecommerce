import MissionAndVision from "../components/about/MissionAndVision";
import WhyChooseUs from "../components/about/WhyChooseUs";
import Location from "../components/about/Location";
import Contact from "../components/about/Contact";
import showRoomImage from "@/assets/images/about-showroom.avif";

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto py-10 border-b border-gray-200 w-full bg-gray-100 p-6 sm:p-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            About Okeakpu Interiors
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Transforming houses into homes with premium quality furniture since
            2014
          </p>
        </div>

        {/* <div className="mb-6 pt-4 pb-2 sm:pb-4 border-b border-gray-200 w-full bg-gray-100 p-6 sm:p-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Our Collection
          </h1>
          <p className="text-lg text-gray-500">
            Discover hand-picked items just for you.
          </p>
        </div> */}
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2014 in Port Harcourt, Cushion began with a simple
                  vision: to make premium quality furniture accessible to every
                  Nigerian home. What started as a small showroom has grown into
                  one of Nigeria's most trusted furniture brands.
                </p>
                <p>
                  Over the years, we've expanded to multiple locations across
                  Nigeria, serving thousands of satisfied customers. Our
                  commitment to quality, affordability, and exceptional customer
                  service has remained unchanged.
                </p>
                <p>
                  Today, Cushion stands as a testament to Nigerian
                  entrepreneurship and excellence. We continue to innovate,
                  bringing the latest designs and comfort to homes across the
                  nation while maintaining our core values of integrity and
                  customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={showRoomImage}
                  alt="Cushion Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white text-black p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-200">
                <div className="text-4xl font-bold mb-1">10+</div>
                <div className="">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <MissionAndVision />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Location */}
      <Location />

      {/* Contact */}
      <Contact />
    </div>
  );
}

export default AboutPage;