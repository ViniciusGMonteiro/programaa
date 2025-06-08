"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import RecoverPassword from "./pages/RecoverPassword"
import Home from "./pages/Home"
import HomePage from "./pages/HomePage"
import ModulesPage from "./pages/ModulesPage"
import LessonsPage from "./pages/LessonsPage"
import ActivityPage from "./pages/ActivityPage"
import TrilhaCSS from "./components-trilhas/TrilhaCSS"
import TrilhaJavaScript from "./components-trilhas/TrilhaJavaScript"

import { NotificationProvider } from "./contexts/NotificationContext"
import { ThemeProvider } from "./contexts/ThemeContext"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true")

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true")
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false")
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="min-h-screen">
          <Router>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
              <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/" /> : <Register onLogin={handleLogin} />}
              />
              <Route path="/recover-password" element={<RecoverPassword />} />

              {/* Rota principal protegida */}
              <Route path="/" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />

              {/* Rotas protegidas das trilhas */}
              <Route path="/trilha-html" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/trilha-css" element={isAuthenticated ? <TrilhaCSS /> : <Navigate to="/login" />} />
              <Route
                path="/trilha-javascript"
                element={isAuthenticated ? <TrilhaJavaScript /> : <Navigate to="/login" />}
              />

              {/* Rotas protegidas de navegação por módulos */}
              <Route path="/homepage" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/modules" element={isAuthenticated ? <ModulesPage /> : <Navigate to="/login" />} />
              <Route
                path="/modules/:moduleId/lessons"
                element={isAuthenticated ? <LessonsPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/modules/:moduleId/lessons/:lessonId"
                element={isAuthenticated ? <ActivityPage /> : <Navigate to="/login" />}
              />
            </Routes>
          </Router>
        </div>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App