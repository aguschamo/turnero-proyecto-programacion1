import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'
import Avatar from './Avatar.jsx'

function Navbar() {
  const { usuario, role, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const enlaces = (
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/" data-bs-dismiss="collapse">
          INICIO
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/#servicios" data-bs-dismiss="collapse">
          SERVICIOS
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/#galeria" data-bs-dismiss="collapse">
          GALERÍA
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/#contacto" data-bs-dismiss="collapse">
          CONTACTO
        </Link>
      </li>

      {usuario && role === 'cliente' && (
        <>
          <li className="nav-item">
            <Link className="nav-link hn-nav-link" to="/agendar" data-bs-dismiss="collapse">
              AGENDAR
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link hn-nav-link" to="/mis-turnos" data-bs-dismiss="collapse">
              MIS TURNOS
            </Link>
          </li>
        </>
      )}

      {usuario && role === 'admin' && (
        <li className="nav-item">
          <Link className="nav-link hn-nav-link" to="/admin" data-bs-dismiss="collapse">
            PANEL ADMIN
          </Link>
        </li>
      )}

      {usuario && (
        <li className="nav-item">
          <Link className="nav-link hn-nav-link" to="/perfil" data-bs-dismiss="collapse">
            PERFIL
          </Link>
        </li>
      )}
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg sticky-top hn-navbar">
      <div className="container">
        <Link className="navbar-brand hn-brand" to="/" data-bs-dismiss="collapse">
          holy nails ✨
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hnNavbarMenu"
          aria-controls="hnNavbarMenu"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="hnNavbarMenu">
          {enlaces}

          <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mt-2 mt-lg-0">
            {usuario ? (
              <>
                <span className="small text-dark d-flex align-items-center gap-2">
                  <Avatar nombre={usuario.nombre} photo={usuario.photo} size="sm" />
                  {usuario.nombre}
                </span>
                <button
                  type="button"
                  className="btn btn-hn-pink rounded-pill fw-bold"
                  onClick={handleLogout}
                >
                  CERRAR SESIÓN ⏻
                </button>
              </>
            ) : (
              <>
                <Link to="/agendar" className="btn btn-hn-dark rounded-pill fw-bold">
                  AGENDAR TURNO ✨
                </Link>
                <Link to="/register" className="btn btn-hn-outline rounded-pill fw-bold">
                  REGISTRARTE
                </Link>
                <Link to="/login" className="btn btn-hn-pink rounded-pill fw-bold">
                  INICIAR SESIÓN 👤
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar