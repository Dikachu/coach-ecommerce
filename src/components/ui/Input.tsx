interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  additionalClasses?: string;
//   size?: "small" | "medium" | "large";
}

function Input({ fullWidth = false, additionalClasses}: InputProps) {
    const baseStyles =
      "pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200";

    const widthStyle = fullWidth ? "w-full" : "w-fit";

    const combinedStyles = `${baseStyles} ${widthStyle} ${additionalClasses ?? ""}`;

    // const sizeStyles = {
    //   small: "px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm",
    //   medium: "px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base",
    //   large: "px-8 sm:px-10 py-4 sm:py-6 text-base sm:text-lg",
    // };

  return (
    <input
      className={combinedStyles}
    />
  );
}

export default Input;
