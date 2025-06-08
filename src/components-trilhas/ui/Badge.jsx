export default function Badge({ className = "", variant = "default", children, ...props }) {
  const variants = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/80",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    destructive: "bg-red-600 text-white hover:bg-red-600/80",
    outline: "text-gray-950 border border-gray-200",
  }

  const classes = `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
