import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  name: string;
  icon: React.ReactNode;
}

function FaqPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: FAQCategory[] = [
    {
      name: "all",
      icon: (
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      name: "orders",
      icon: (
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "shipping",
      icon: (
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
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
    },
    {
      name: "payment",
      icon: (
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
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      name: "returns",
      icon: (
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
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      ),
    },
    {
      name: "warranty",
      icon: (
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  const faqs: FAQItem[] = [
    // Orders
    {
      question: "How do I place an order?",
      answer:
        "You can place an order through our website by browsing products, adding items to your cart, and proceeding to checkout. Alternatively, visit any of our showrooms or contact our customer service team via phone or WhatsApp for assistance with your order.",
      category: "orders",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "Yes, you can modify or cancel your order within 24 hours of placement. Please contact our customer service immediately at +234 803 456 7890 or support@okeakpuinteriors.ng. Orders that have already been dispatched cannot be cancelled but can be returned following our return policy.",
      category: "orders",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is dispatched, you will receive a tracking number via email and SMS. You can use this number to track your delivery status. You can also contact our customer service team for real-time updates on your order.",
      category: "orders",
    },
    {
      question: "Do you accept bulk orders?",
      answer:
        "Yes, we welcome bulk orders for homes, offices, hotels, and other commercial spaces. We offer special pricing for bulk purchases. Please contact our sales team at sales@okeakpuinteriors.ng or call +234 805 123 4567 for a customized quote.",
      category: "orders",
    },

    // Shipping
    {
      question: "What are your delivery charges?",
      answer:
        "Delivery charges vary based on your location and order size. We offer free delivery on orders above ₦200,000 within major cities (Lagos, Port Harcourt, Abuja). For other locations, delivery fees will be calculated at checkout based on distance and product weight.",
      category: "shipping",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 5-7 business days within major cities and 7-14 business days for other locations. Express delivery (2-3 business days) is available for an additional fee in select areas. Custom-made furniture may take 3-4 weeks for production and delivery.",
      category: "shipping",
    },
    {
      question: "Do you deliver nationwide?",
      answer:
        "Yes, we deliver to all states in Nigeria. However, delivery times and costs may vary depending on your location. Remote areas may require additional delivery time. Contact us for specific delivery information for your area.",
      category: "shipping",
    },
    {
      question: "Will the delivery team help with installation?",
      answer:
        "Yes, our professional delivery team provides free basic assembly and installation for most furniture items. For complex installations or wall-mounted items, additional charges may apply. Our team will ensure your furniture is properly set up and functional.",
      category: "shipping",
    },

    // Payment
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept multiple payment methods including: Bank Transfer, Card Payment (Visa, Mastercard, Verve), USSD, Mobile Money, and Cash on Delivery (available in select locations). All online payments are secure and encrypted.",
      category: "payment",
    },
    {
      question: "Do you offer installment payment options?",
      answer:
        "Yes, we offer flexible installment payment plans for purchases above ₦100,000. You can spread payments over 3, 6, or 12 months with minimal interest. Contact our sales team to discuss available payment plans and requirements.",
      category: "payment",
    },
    {
      question: "Is it safe to pay online?",
      answer:
        "Absolutely. We use industry-standard SSL encryption and secure payment gateways to protect your financial information. We do not store your card details on our servers. All transactions are processed through PCI-compliant payment processors.",
      category: "payment",
    },
    {
      question: "Can I pay on delivery?",
      answer:
        "Cash on Delivery is available for orders within Lagos, Port Harcourt, and Abuja. A 30% deposit is required when placing the order, and the balance is paid upon delivery. This option may not be available for high-value items.",
      category: "payment",
    },

    // Returns
    {
      question: "What is your return policy?",
      answer:
        "We offer a 14-day return policy for unused items in original packaging. Items must be in perfect condition with all tags and accessories. Custom-made or discounted items are not eligible for return. Return shipping costs are borne by the customer unless the item is defective.",
      category: "returns",
    },
    {
      question: "How do I initiate a return?",
      answer:
        "Contact our customer service team within 14 days of delivery at support@okeakpuinteriors.ng or call +234 803 456 7890. Provide your order number and reason for return. Our team will guide you through the return process and arrange pickup if approved.",
      category: "returns",
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Refunds are processed within 7-10 business days after we receive and inspect the returned item. The refund will be credited to your original payment method. For cash payments, we can process a bank transfer to your account.",
      category: "returns",
    },
    {
      question: "Can I exchange an item?",
      answer:
        "Yes, we offer exchanges for items of equal or greater value within 14 days of delivery. The item must be unused and in original condition. Exchange shipping costs apply. Contact our customer service to arrange an exchange.",
      category: "returns",
    },

    // Warranty
    {
      question: "Do your products come with a warranty?",
      answer:
        "Yes, all our furniture comes with a manufacturer's warranty ranging from 6 months to 2 years depending on the product category. The warranty covers manufacturing defects and structural issues but does not cover normal wear and tear or misuse.",
      category: "warranty",
    },
    {
      question: "What does the warranty cover?",
      answer:
        "Our warranty covers manufacturing defects, structural failures, faulty mechanisms, and material defects. It does not cover damage from misuse, accidents, improper assembly, normal wear and tear, or damage from unauthorized repairs.",
      category: "warranty",
    },
    {
      question: "How do I make a warranty claim?",
      answer:
        "Contact our customer service with your order number, purchase date, and photos of the defect. Our team will assess the claim and arrange for repair, replacement, or refund as per warranty terms. Keep your purchase receipt for warranty validation.",
      category: "warranty",
    },
    {
      question: "Can I extend my warranty?",
      answer:
        "Yes, we offer extended warranty plans for up to 5 years on most products. Extended warranty can be purchased at the time of buying or within 30 days of delivery. Contact our sales team for extended warranty pricing and coverage details.",
      category: "warranty",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto py-10 border-b border-gray-200 w-full bg-gray-100 p-6 sm:p-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Find answers to your questions about Okeakpu Interiors products and services
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:border-[#b9855e] focus:ring-2 focus:ring-[#b9855e]/20 focus:outline-none transition-all duration-200"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
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

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex gap-3 justify-start scrollbar-hide overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all capitalize ${selectedCategory === category.name
                    ? "bg-[#b9855e] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
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
                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our customer support team is
            here to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+2348034567890"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#b9855e] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Us
            </a>
            <a
              href="https://wa.me/2348034567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#b9855e] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:support@okeakpuinteriors.ng"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
