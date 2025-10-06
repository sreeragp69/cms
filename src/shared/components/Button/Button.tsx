import clsx from "clsx";
import type { ReactNode } from "react";
interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  type?: "button" | "submit" | "reset"; // Button type
}


const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {

     const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };


  const variantClasses = {
    primary:
      "bg-gradient-to-r from-them to-themeGradientColorTo text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/[0.3] dark:text-gray-400 dark:ring-white/[0.3] dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };
 return (
    <button
      className={clsx(
        `rounded-xl inline-flex from-themePrimary  to-[#00198f] items-center justify-center gap-2  transition ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
