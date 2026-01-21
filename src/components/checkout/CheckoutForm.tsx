import type { CheckoutFormData } from "@/types/checkoutFormData";
import { useState } from "react";

interface CheckoutFormProps {
  onSubmit?: (formData: CheckoutFormData) => void;
}



const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-black mb-6">
          Contact Information
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-black mb-6">Shipping Address</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="123 Main St"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="zipCode" className={labelClass}>
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="country" className={labelClass}>
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={inputClass}
              disabled
            >
              <option value="nigeria">Nigeria</option>
              {/* <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option> */}
            </select>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-black mb-6">Shipping Method</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
            <input
              type="radio"
              name="shippingMethod"
              value="standard"
              checked={formData.shippingMethod === "standard"}
              onChange={handleInputChange}
              className="w-5 h-5 text-black"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <span className="font-medium text-black">
                  Standard Shipping
                </span>
                <p className="text-sm text-gray-600">5-7 business days</p>
              </div>
              <span className="font-semibold text-black">$5.99</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
            <input
              type="radio"
              name="shippingMethod"
              value="express"
              checked={formData.shippingMethod === "express"}
              onChange={handleInputChange}
              className="w-5 h-5 text-black"
            />
            <div className="flex-1 flex justify-between">
              <div>
                <span className="font-medium text-black">Express Shipping</span>
                <p className="text-sm text-gray-600">2-3 business days</p>
              </div>
              <span className="font-semibold text-black">$15.99</span>
            </div>
          </label>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-black mb-6">Payment Method</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleInputChange}
              className="w-5 h-5 text-black"
            />
            <span className="font-medium text-black">Credit / Debit Card</span>
          </label>

          <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={handleInputChange}
              className="w-5 h-5 text-black"
            />
            <span className="font-medium text-black">PayPal</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-4 rounded-full font-semibold text-base hover:bg-gray-800 transition-all duration-300"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutForm;
