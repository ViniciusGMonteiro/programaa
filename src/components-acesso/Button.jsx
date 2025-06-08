import React from "react";

// Função para juntar classes de forma condicional
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-100",
  };

  const sizes = {
    default: "h-10 px-4 text-sm",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
