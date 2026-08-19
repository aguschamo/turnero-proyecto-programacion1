import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: 'Cliente Demo',
    email: 'cliente@holynails.com',
    password: '1234',
    role: 'cliente',
    photo: null,
  },
  {
    id: 2,
    nombre: 'Admin Holy Nails',
    email: 'admin@holynails.com',
    password: '1234',
    role: 'admin',
    photo: null,
  },
]

function modeloUsuario({ id, nombre, email, role, photo }) {
  return { id, nombre, email, role, photo }
}

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES)
  const [usuario, setUsuario] = useState(null)

  function login(email, password) {
    const encontrado = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    )
    if (!encontrado) return null
    const sesion = modeloUsuario(encontrado)
    setUsuario(sesion)
    return sesion
  }

  function register(email, password) {
    if (usuarios.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return false
    }
    const nuevo = {
      id: usuarios.length + 1,
      nombre: null,
      email: email.trim().toLowerCase(),
      password,
      role: 'cliente',
      photo: null,
    }
    setUsuarios((prev) => [...prev, nuevo])
    return true
  }

  function logout() {
    setUsuario(null)
  }

  const value = {
    usuario,
    role: usuario ? usuario.role : null,
    isAuthenticated: Boolean(usuario),
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}