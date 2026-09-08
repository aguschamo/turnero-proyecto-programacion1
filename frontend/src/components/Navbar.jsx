import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'
import Avatar from './Avatar.jsx'

function Navbar() {
  const { usuario, role, logout } = useAuth()
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const enlaces = (
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/" onClick={cerrarMenu}>
          INICIO
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/#servicios" onClick={cerrarMenu}>
          SERVICIOS
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/#galeria" onClick={cerrarMenu}>
          GALERÍA
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link hn-nav-link" to="/#contacto" onClick={cerrarMenu}>
          CONTACTO
        </Link>
      </li>

      {usuario && role === 'cliente' && (
        <>
          <li className="nav-item">
            <Link className="nav-link hn-nav-link" to="/agendar" onClick={cerrarMenu}>
              AGENDAR
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link hn-nav-link" to="/mis-turnos" onClick={cerrarMenu}>
              MIS TURNOS
            </Link>
          </li>
        </>
      )}

      {usuario && role === 'admin' && (
        <li className="nav-item">
          <Link className="nav-link hn-nav-link" to="/admin" onClick={cerrarMenu}>
            PANEL ADMIN
          </Link>
        </li>
      )}

      {usuario && (
        <li className="nav-item">
          <Link className="nav-link hn-nav-link" to="/perfil" onClick={cerrarMenu}>
            PERFIL
          </Link>
        </li>
      )}
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg sticky-top hn-navbar">
      <div className="container">
        <Link className="navbar-brand hn-brand" to="/" onClick={cerrarMenu}>
          holy nails ✨
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          aria-controls="hnNavbarMenu"
          aria-expanded={menuAbierto}
          aria-label="Abrir navegación"
          onClick={() => setMenuAbierto((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse${menuAbierto ? ' show' : ''}`} id="hnNavbarMenu">
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
                  onClick={() => { cerrarMenu(); handleLogout() }}
                >
                  CERRAR SESIÓN ⏻
                </button>
              </>
            ) : (
              <>
                <Link to="/agendar" className="btn btn-hn-dark rounded-pill fw-bold" onClick={cerrarMenu}>
                  AGENDAR TURNO ✨
                </Link>
                <Link to="/register" className="btn btn-hn-outline rounded-pill fw-bold" onClick={cerrarMenu}>
                  REGISTRARTE
                </Link>
                <Link to="/login" className="btn btn-hn-pink rounded-pill fw-bold" onClick={cerrarMenu}>
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
