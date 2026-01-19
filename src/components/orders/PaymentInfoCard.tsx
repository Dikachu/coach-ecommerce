import React from "react";

export interface PaymentInfo {
  method: "card" | "paypal";
  last4?: string;
  cardType?: string;
  email?: string;
}

interface PaymentInfoCardProps {
  payment: PaymentInfo;
}

const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({ payment }) => {
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-black mb-1">Payment Method</h3>
          <p className="text-sm text-gray-600">How you paid</p>
        </div>
      </div>

      <div className="space-y-1 text-sm">
        {payment.method === "card" ? (
          <>
            <p className="font-medium text-black">
              {payment.cardType || "Credit Card"}
            </p>
            {payment.last4 && (
              <p className="text-gray-600">•••• •••• •••• {payment.last4}</p>
            )}
          </>
        ) : (
          <>
            <p className="font-medium text-black">PayPal</p>
            {payment.email && <p className="text-gray-600">{payment.email}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentInfoCard;