import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        {/* Logo */}
        <div className="mb-8">
          <Link to="/" className="flex align-center justify-center">
            <img
              src={logo}
              alt="Cushion Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          {/* Content */}
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
