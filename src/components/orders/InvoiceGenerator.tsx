import { formatPrice } from "@/utils/formatPrice";
import companyLogo from "../../assets/images/logo.png";

export interface InvoiceData {
  orderNumber: string;
  date: string;
  invoiceNumber: string;
  companyInfo: {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
  };
  customerInfo: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    color?: string;
    quantity: number;
    price: number;
  }>;
  pricing: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

interface InvoiceGeneratorProps {
  invoiceData: InvoiceData;
  onDownload?: () => void;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({
  invoiceData,
  onDownload,
}) => {
  const generatePDF = () => {
    // Create invoice HTML
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${invoiceData.invoiceNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; color: #000; }
          .invoice { max-width: 800px; margin: 0 auto; background: white; }
          .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #000; }
          .company-info h1 { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .company-info p { font-size: 12px; color: #666; line-height: 1.6; }
          .invoice-info { text-align: right; }
          .invoice-info h2 { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .invoice-info p { font-size: 12px; color: #666; margin-bottom: 4px; }
          .addresses { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .address-block { width: 48%; }
          .address-block h3 { font-size: 14px; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
          .address-block p { font-size: 12px; color: #333; line-height: 1.6; }
          .items-table { width: 100%; margin-bottom: 30px; border-collapse: collapse; }
          .items-table thead { background: #f5f5f5; }
          .items-table th { padding: 12px; text-align: left; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #000; }
          .items-table td { padding: 12px; font-size: 12px; border-bottom: 1px solid #e0e0e0; }
          .items-table tbody tr:last-child td { border-bottom: none; }
          .text-right { text-align: right; }
          .totals { margin-left: auto; width: 300px; }
          .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; }
          .totals-row.subtotal, .totals-row.shipping, .totals-row.tax { color: #666; }
          .totals-row.total { border-top: 2px solid #000; padding-top: 12px; margin-top: 8px; font-size: 16px; font-weight: bold; }
          .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; }
          .footer p { font-size: 11px; color: #999; line-height: 1.6; }
          // .color { color: #999; font-size: 11px; text-transform: uppercase; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <!-- Header -->
          <div class="header">
            <div class="company-info">
              <img src=${companyLogo} alt="Company Logo" style="margin: 10px 0; width: 150px; height: auto;">
              <p>${invoiceData.companyInfo.address}<br>
              ${invoiceData.companyInfo.city}<br>
              ${invoiceData.companyInfo.phone}<br>
              ${invoiceData.companyInfo.email}</p>
            </div>
            <div class="invoice-info">
              <h2>INVOICE</h2>
              <p><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}</p>
              <p><strong>Order #:</strong> ${invoiceData.orderNumber}</p>
              <p><strong>Date:</strong> ${invoiceData.date}</p>
            </div>
          </div>

          <!-- Addresses -->
          <div class="addresses">
            <div class="address-block">
              <h3>Bill To</h3>
              <p><strong>${invoiceData.customerInfo.name}</strong><br>
              ${invoiceData.customerInfo.address}<br>
              ${invoiceData.customerInfo.city}, ${
      invoiceData.customerInfo.state
    } ${invoiceData.customerInfo.zipCode}<br>
              ${invoiceData.customerInfo.country}<br>
              ${invoiceData.customerInfo.email}<br>
              ${invoiceData.customerInfo.phone}</p>
            </div>
            <div class="address-block">
              <h3>Ship To</h3>
              <p><strong>${invoiceData.customerInfo.name}</strong><br>
              ${invoiceData.customerInfo.address}<br>
              ${invoiceData.customerInfo.city}, ${
      invoiceData.customerInfo.state
    } ${invoiceData.customerInfo.zipCode}<br>
              ${invoiceData.customerInfo.country}</p>
            </div>
          </div>

          <!-- Items Table -->
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-right">Quantity</th>
                <th class="text-right">Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items
                .map(
                  (item) => `
                <tr>
                  <td>
                    <strong>${item.name}</strong><br>
                    <span class="color">${item.color}</span>
                  </td>
                  <td class="text-right">${item.quantity}</td>
                  <td class="text-right">${formatPrice(item.price)}</td>
                  <td class="text-right"><strong>${formatPrice(item.price * item.quantity)}</strong></td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <!-- Totals -->
          <div class="totals">
            <div class="totals-row subtotal">
              <span>Subtotal:</span>
              <span>${formatPrice(invoiceData.pricing.subtotal)}</span>
            </div>
            <div class="totals-row shipping">
              <span>Shipping:</span>
              <span>${formatPrice(invoiceData.pricing.shipping)}</span>
            </div>
            <div class="totals-row tax">
              <span>Tax:</span>
              <span>${formatPrice(invoiceData.pricing.tax)}</span>
            </div>
            <div class="totals-row total">
              <span>Total:</span>
              <span>${formatPrice(invoiceData.pricing.total)}</span>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>Thank you for your business!<br>
            For questions about this invoice, please contact ${
              invoiceData.companyInfo.email
            }</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Open print dialog
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();

      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }

    if (onDownload) {
      onDownload();
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
    >
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
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Invoice
    </button>
  );
};

export default InvoiceGenerator;