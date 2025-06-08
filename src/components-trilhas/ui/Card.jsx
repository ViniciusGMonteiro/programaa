"use client"

export default function Card({ className = "", children, onClick, ...props }) {
  return (
    <div className={`rounded-lg border bg-white text-gray-950 shadow-sm ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  )
}
