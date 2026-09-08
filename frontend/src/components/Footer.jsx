function Footer() {
  return (
    <footer className="hn-footer py-5 mt-auto">
      <div className="container">
        <div className="row g-4 text-center text-md-start align-items-center">
          <div className="col-12 col-md-4">
            <a href="#inicio" className="font-gothic text-white fs-1 text-decoration-none d-block mb-1">
              holy nails ✨
            </a>
            <p className="text-secondary small mb-0">
              Estética cute & dark. Manicura y Nail Art exclusivo.
            </p>
          </div>

          <div className="col-12 col-md-4 text-center">
            <ul className="list-inline mb-2">
              <li className="list-inline-item mx-2">
                <a href="#inicio" className="small fw-semibold">INICIO</a>
              </li>
              <li className="list-inline-item mx-2">
                <a href="#servicios" className="small fw-semibold">SERVICIOS</a>
              </li>
              <li className="list-inline-item mx-2">
                <a href="#galeria" className="small fw-semibold">GALERÍA</a>
              </li>
              <li className="list-inline-item mx-2">
                <a href="#contacto" className="small fw-semibold">CONTACTO</a>
              </li>
            </ul>
            <p className="text-secondary small mb-0">
              Atención con turnos previos. Consultá disponibilidad.
            </p>
          </div>

          <div className="col-12 col-md-4 text-center text-md-end">
            <p className="small text-secondary mb-0">
              © 2024 Holy Nails. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
