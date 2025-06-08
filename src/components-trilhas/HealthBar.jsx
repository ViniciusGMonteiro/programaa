export default function HealthBar({ hearts, maxHearts, showInTrail = false }) {
  const renderHeart = (index, filled) => (
    <div key={index} className="relative">
      {filled ? (
        <div className="w-6 h-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 rounded-full transform rotate-45 shadow-lg"></div>
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-b from-red-400 to-red-600 rounded-full transform -translate-x-1/2 shadow-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-lg"></div>
          <div className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-red-200 rounded-full transform -translate-x-1/2 opacity-70"></div>
        </div>
      ) : (
        <div className="w-6 h-6 relative opacity-40">
          <div className="absolute inset-0 border-2 border-gray-400 rounded-full transform rotate-45"></div>
          <div className="absolute top-0 left-1/2 w-3 h-3 border-2 border-gray-400 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-2 border-gray-400 rounded-full"></div>
        </div>
      )}
    </div>
  )

  return (
    <div
      className={`flex items-center gap-2 ${showInTrail ? "bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border" : ""}`}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: maxHearts }, (_, index) => renderHeart(index, index < hearts))}
      </div>
      <span className={`text-sm font-semibold ${showInTrail ? "text-gray-700" : "text-gray-600"}`}>
        {hearts}/{maxHearts}
      </span>
    </div>
  )
}