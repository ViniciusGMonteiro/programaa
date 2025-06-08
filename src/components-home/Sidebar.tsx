"use client"

import { X } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

const Sidebar = ({ isOpen, onClose }) => {
  const { isDarkTheme } = useTheme()

  const sidebarClass = isOpen ? "translate-x-0" : "-translate-x-full"

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 dark:bg-slate-800 border-r dark:border-slate-700 shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarClass}`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
          aria-label="Close Menu"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="py-4">
        {/* Add your sidebar content here */}
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              Início
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              Cursos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              Artigos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              Sobre Nós
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              Contato
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
