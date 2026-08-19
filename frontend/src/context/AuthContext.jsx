import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Manicurista Demo', email: 'demo@holynails.com', password: '123456' },
]

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES)
  const [usuario, setUsuario] = useState(null)

  function login(email, password) {
    const encontrado = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    )
    if (!encontrado) return false
    setUsuario({ id: encontrado.id, nombre: encontrado.nombre, email: encontrado.email })
    return true
  }

  function register(nombre, email, password) {
    if (usuarios.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return false
    }
    const nuevo = {
      id: usuarios.length + 1,
      nombre: nombre.trim(),
      email: email.trim(),
      password,
    }
    setUsuarios((prev) => [...prev, nuevo])
    return true
  }

  function logout() {
    setUsuario(null)
  }

  const value = {
    usuario,
    login,
    register,
    logout,
    isAuthenticated: Boolean(usuario),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}