import { useState } from 'react'

import { Link } from 'react-router-dom'

function Agendar() {
  const [servicio, setServicio] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [aviso, setAviso] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setAviso(true)
  }

  return (
    <section className="hn-auth-bg py-5">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center mb-4">
              <h1 className="hn-section-title mb-1">✦ AGENDAR TURNO ✦</h1>
              <p className="text-muted small mb-0">
                Elegí el servicio que quieras y el momento que te quede cómodo
              </p>
            </div>

            <div className="card hn-card border-0 shadow-sm p-4">
              <div className="card-body">
                {aviso && (
                  <div className="alert alert-info py-2 small" role="alert">
                    La reserva se conectará al backend en el TP8. Por ahora solo
                    queda registrada la vista.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="agendarServicio" className="form-label">
                      Servicio
                    </label>
                    <select
                      id="agendarServicio"
                      className="form-select"
                      value={servicio}
                      onChange={(e) => setServicio(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Seleccioná un servicio...
                      </option>
                      <option>SEMIPERMANENTE</option>
                      <option>KAPPING</option>
                      <option>ESCULPIDAS</option>
                    </select>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <label htmlFor="agendarFecha" className="form-label">
                        Fecha
                      </label>
                      <input
                        id="agendarFecha"
                        type="date"
                        className="form-control"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="agendarHora" className="form-label">
                        Hora
                      </label>
                      <input
                        id="agendarHora"
                        type="time"
                        className="form-control"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-hn-dark w-100 fw-bold">
                    RESERVAR TURNO ✨
                  </button>
                </form>

                <p className="small text-center text-muted mt-3 mb-0">
                  ¿Ya tenés turnos?{' '}
                  <Link to="/mis-turnos" className="fw-bold">
                    Ver mis turnos
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Agendar