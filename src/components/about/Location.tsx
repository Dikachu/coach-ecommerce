// import { Link } from 'react-router-dom'

interface StoreLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
}

function Location() {
  const locations: StoreLocation[] = [
    {
      city: "Enugu State (Main Store)",
      address: "123 Apakpa Road, Enugu State",
      phone: "+234 803 456 7890",
      email: "enuguheadoffice@cushion.ng",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM, Sun: 12:00 PM - 5:00 PM",
      mapUrl: "https://maps.google.com/?q=Port+Harcourt+Rivers+State+Nigeria",
    },
    {
      city: "Lagos",
      // address: "45 Admiralty Way, Lekki Phase 1, Lagos",
      address: "Coming Soon",
      phone: "+234 805 123 4567",
      email: "lagos@cushion.ng",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM, Sun: 12:00 PM - 5:00 PM",
      mapUrl: "https://maps.google.com/?q=Lekki+Lagos+Nigeria",
    },
    {
      city: "Abuja",
      // address: "78 Gimbiya Street, Area 11, Garki, Abuja",
      address: "Coming Soon",
      phone: "+234 807 890 1234",
      email: "abuja@cushion.ng",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM, Sun: 12:00 PM - 5:00 PM",
      mapUrl: "https://maps.google.com/?q=Garki+Abuja+Nigeria",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Our Showrooms
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience our furniture in person at any of our showrooms across
            Nigeria
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              {/* City Name */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#b9855e21] rounded-full flex items-center justify-center mr-3 shrink-0">
                  <svg
                    className="w-6 h-6 text-[#b9855e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {location.city}
                </h3>
              </div>

              {/* Address */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </div>

                {/* Phone */}
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    className="text-sm text-[#b9855e] hover:text-[#b9856f]"
                  >
                    {location.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${location.email}`}
                    className="text-sm text-[#b9855e] hover:text-[#b9856f]"
                  >
                    {location.email}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">{location.hours}</p>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-transparent text-black rounded-lg hover:bg-black hover:text-white border border-black transition-colors duration-300 font-medium text-sm"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Get Directions
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {/* <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Visit Our Showroom?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              No problem! Shop online and enjoy free delivery on orders above
              ₦200,000 within major cities. We also offer virtual consultations
              to help you choose the perfect furniture for your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
              >
                Shop Online
              </Link>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Location;