import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline" | "danger";
  linkTo?: string;
  text?: string;
  additionalClasses?: string;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "none"
}

function Button({ 
  variant = 'primary', 
  linkTo, 
  text, 
  additionalClasses, 
  children, 
  size = 'medium', 
  radius = "full",
  ...rest
}: ButtonProps) {
  const isLink = Boolean(linkTo);

  const baseStyles = `group inline-flex items-center justify-center gap-3 rounded-${radius} font-semibold disabled:opacity-50`;

  const sizeStyles = {
    small: "px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm",
    medium: "px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base",
    large: "px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg",
  };

  const variantStyles = {
    primary:
      "bg-black text-white hover:translate-y-1 transition-transform duration-300",
    secondary:
      "bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300",
    outline:
      "border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300",
    danger:
      "bg-red-600 text-white hover:bg-red-700 transition-all duration-300",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${additionalClasses ?? "" } ${sizeStyles[size]}`;

  return (
    <>
      {isLink ? (
        <Link to={linkTo!} className={combinedStyles}>
          {children ?? (
            <>
              {text}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          )}
        </Link>
      ) : (
        <button className={combinedStyles} {...rest}>
          {children ? children : text}
        </button>
      )}
    </>
  );
}

export default Button;
