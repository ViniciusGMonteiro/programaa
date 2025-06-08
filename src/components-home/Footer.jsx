"use client"

import { Heart, Github, Linkedin, Twitter } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"

const Footer = () => {
  const { isDarkTheme } = useTheme()

  // MELHORIA: Aplicada cor #224D94 no footer para o modo claro
  const bgColor = isDarkTheme ? "bg-[#1E1E1E]" : "bg-[#224D94]"
  const textColor = isDarkTheme ? "text-[#F5F5F5]" : "text-white" // Texto branco no modo claro para contraste com #224D94
  const subtextColor = isDarkTheme ? "text-gray-300" : "text-gray-200" // Ajustado para melhor contraste com #224D94
  const borderColor = isDarkTheme ? "border-gray-700" : "border-[#1a3d7a]" // Ajustado para combinar com #224D94

  return (
    <footer className={`transition-colors duration-300 ${bgColor} ${textColor}`}>
      {/* SEÇÃO PRINCIPAL COMPACTA */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex justify-center">
          {/* COLUNA 1: Informações da Programin */}
          <div className="space-y-3 text-center">
            <h3 className="text-lg font-bold">Programin</h3>
            <p className={`text-sm leading-relaxed ${subtextColor}`}>
              Plataforma completa para aprender desenvolvimento web com metodologia prática.
            </p>
            {/* REDES SOCIAIS */}
            <div className="flex space-x-3 pt-1 justify-center">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 ${
                    isDarkTheme
                      ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                      : "hover:bg-[#1a3d7a] text-gray-200 hover:text-white" // Ajustado para combinar com #224D94
                  }`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE COPYRIGHT */}
      <div className={`border-t ${borderColor} py-3`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <span className={`text-xs ${subtextColor}`}>
              &copy; {new Date().getFullYear()} Programin. Todos os direitos reservados.
            </span>

            <div className="flex items-center space-x-1">
              <span className={`text-xs ${subtextColor}`}>Feito com</span>
              <Heart size={14} className="text-red-400 fill-red-400 animate-pulse" />
              <span className={`text-xs ${subtextColor}`}>para desenvolvedores</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer