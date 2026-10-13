import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { api, clearTokens, getAccessToken, onAuthCleared, setTokens } from '../services/api.js'

const AuthContext = createContext(null)

function normalizeRole(role) {
  return role ? role.toLowerCase() : null
}

function normalizeUser(profile) {
  if (!profile) return null
  return {
    id: profile.id,
    nombre: profile.nombre || '',
    email: profile.email || '',
    username: profile.username || '',
    role: normalizeRole(profile.role),
    photo: null,
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // Se activa cuando ocurre login o logout mientras restore() está pendiente,
  // para que restore no sobrescriba el resultado de esa acción posterior.
  const authActionRef = useRef(false)

  // Restaura la sesión al montar: si hay access token, verifica el perfil contra el backend.
  // api.js maneja el refresh automático si el access está vencido.
  useEffect(() => {
    let cancelled = false

    async function restore() {
      if (!getAccessToken()) {
        if (!cancelled) setIsLoading(false)
        return
      }
      try {
        const profile = await api.get('/api/auth/profile/')
        if (!cancelled && !authActionRef.current) setUsuario(normalizeUser(profile))
      } catch {
        if (!cancelled && !authActionRef.current) setUsuario(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    restore()
    return () => {
      cancelled = true
    }
  }, [])

  // Si api.js limpia los tokens (refresh falló), sincroniza el estado.
  useEffect(() => {
    return onAuthCleared(() => {
      setUsuario(null)
    })
  }, [])

  const login = useCallback(async (email, password) => {
    authActionRef.current = true
    const data = await api.post(
      '/api/auth/login/',
      { email, password },
      { skipAuth: true },
    )
    setTokens({ access: data.access, refresh: data.refresh })
    const profile = await api.get('/api/auth/profile/')
    const user = normalizeUser(profile)
    setUsuario(user)
    return user
  }, [])

  const register = useCallback(async ({ nombre, username, email, password }) => {
    await api.post(
      '/api/auth/register/',
      { nombre, username, email, password },
      { skipAuth: true },
    )
    // El backend no devuelve tokens: el usuario debe iniciar sesión después.
  }, [])

  const logout = useCallback(() => {
    authActionRef.current = true
    clearTokens()
    setUsuario(null)
  }, [])

  const value = useMemo(
    () => ({
      usuario,
      role: usuario ? usuario.role : null,
      isAuthenticated: Boolean(usuario),
      isLoading,
      login,
      register,
      logout,
    }),
    [usuario, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
