import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

const RUTAS_CLIENTE = ['/agendar', '/mis-turnos', '/perfil']

function Login() {
  const { login, isAuthenticated, role } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname
  const registroOk = Boolean(location.state?.registroOk)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to={role === 'admin' ? '/admin' : '/perfil'} replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    const sesion = login(email, password)
    if (!sesion) {
      setError('Credenciales incorrectas. Verificá tu correo y contraseña.')
      return
    }

    const destino =
      sesion.role === 'admin'
        ? '/admin'
        : RUTAS_CLIENTE.includes(from)
          ? from
          : '/perfil'

    navigate(destino, { replace: true })
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
                  Iniciá sesión para reservar tus turnos
                </p>

                {registroOk && (
                  <div className="alert alert-success py-2 small" role="alert">
                    ¡Cuenta creada! Ya podés iniciar sesión.
                  </div>
                )}

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

                <div className="small text-center text-muted mt-4 pt-3 border-top">
                  <p className="mb-1">Usuarios de prueba:</p>
                  <p className="mb-0">
                    Cliente: <code>cliente@holynails.com</code> /{' '}
                    <code>1234</code>
                    <br />
                    Admin: <code>admin@holynails.com</code> / <code>1234</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login