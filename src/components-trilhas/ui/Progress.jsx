export default function Progress({ value = 0, className = "", ...props }) {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-100 ${className}`} {...props}>
      <div
        className="h-full w-full flex-1 bg-blue-600 transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}
