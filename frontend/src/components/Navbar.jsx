import { useState } from 'react'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top hn-navbar">
      <div className="container">
        <a className="navbar-brand hn-brand" href="#inicio" onClick={cerrarMenu}>
          holy nails ✨
        </a>

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
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <a className="nav-link hn-nav-link" href="#inicio" onClick={cerrarMenu}>
                INICIO
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link hn-nav-link" href="#servicios" onClick={cerrarMenu}>
                SERVICIOS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link hn-nav-link" href="#galeria" onClick={cerrarMenu}>
                GALERÍA
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link hn-nav-link" href="#contacto" onClick={cerrarMenu}>
                CONTACTO
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center justify-content-center mt-2 mt-lg-0">
            <a href="#contacto" className="btn btn-hn-pink rounded-pill fw-bold" onClick={cerrarMenu}>
              INICIAR SESIÓN 👤
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
