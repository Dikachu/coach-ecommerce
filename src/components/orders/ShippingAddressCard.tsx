import React from "react";

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

interface ShippingAddressCardProps {
  address: ShippingAddress;
}

const ShippingAddressCard: React.FC<ShippingAddressCardProps> = ({
  address,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-white"
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
        <div className="flex-1">
          <h3 className="font-semibold text-black mb-1">Shipping Address</h3>
          <p className="text-sm text-gray-600">Delivery destination</p>
        </div>
      </div>

      <div className="space-y-1 text-sm">
        <p className="font-medium text-black">{address.name}</p>
        <p className="text-gray-600">{address.address}</p>
        <p className="text-gray-600">
          {address.city}, {address.state} {address.zipCode}
        </p>
        <p className="text-gray-600">{address.country}</p>
        <div className="pt-3 mt-3 border-t border-gray-200 space-y-1">
          <p className="text-gray-600">
            <span className="font-medium text-black">Phone:</span>{" "}
            {address.phone}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-black">Email:</span>{" "}
            {address.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressCard;