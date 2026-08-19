import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/" replace />

  function handleSubmit(e) {
    e.preventDefault()
    if (!login(email, password)) {
      setError('Credenciales incorrectas. Verificá tu correo y contraseña.')
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="min-vh-100 d-flex align-items-center hn-auth-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card hn-card border-0 shadow-sm p-4">
              <div className="card-body">
                <h1 className="hn-section-title fs-3 text-center mb-1">
                  holy nails ✨
                </h1>
                <p className="text-center text-muted small mb-4">
                  Iniciá sesión para reservar tu turno
                </p>

                {error && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      id="loginEmail"
                      type="email"
                      className="form-control"
                      placeholder="tucorreo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="loginPassword" className="form-label">
                      Contraseña
                    </label>
                    <input
                      id="loginPassword"
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <button type="submit" className="btn btn-hn-dark w-100 fw-bold">
                    INICIAR SESIÓN
                  </button>
                </form>

                <p className="small text-muted text-center mt-3 mb-0">
                  ¿No tenés cuenta?{' '}
                  <Link to="/register" className="fw-bold">
                    Registrate
                  </Link>
                </p>
                <p className="small text-center text-muted mt-3 mb-0">
                  Demo: <code>demo@holynails.com</code> / <code>123456</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login