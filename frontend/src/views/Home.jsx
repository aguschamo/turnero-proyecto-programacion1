import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import heroImg from '../assets/hero.jpg'

import semiIcon from '../assets/icons/semi.jpg'
import kappingIcon from '../assets/icons/kapping.jpg'
import esculpidasIcon from '../assets/icons/esculpidas.jpg'

import galeria1 from '../assets/galeria/trabajo1.jpg'
import galeria2 from '../assets/galeria/trabajo2.jpg'
import galeria3 from '../assets/galeria/trabajo3.jpg'
import galeria4 from '../assets/galeria/trabajo4.jpg'

const servicios = [
  {
    icon: semiIcon,
    titulo: 'SEMIPERMANENTE',
    duracion: '2 hs',
    precio: null,
    descripcion:
      'Color intenso y brillo por semanas con acabado impecable.',
  },
  {
    icon: kappingIcon,
    titulo: 'KAPPING',
    duracion: '2 hs',
    precio: null,
    descripcion:
      'Refuerzo de gel para proteger y hacer crecer tus uñas naturales.',
  },
  {
    icon: esculpidasIcon,
    titulo: 'ESCULPIDAS',
    duracion: '2:30 hs',
    precio: null,
    descripcion:
      'Extensión en acrílico o gel con el largo y forma que sueñes.',
  },
]


const trabajosGaleria = [
  { id: 1, imagen: galeria1 },
  { id: 2, imagen: galeria2 },
  { id: 3, imagen: galeria3 },
  { id: 4, imagen: galeria4 },
]

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <header id="inicio" className="hn-hero-section">
        <div className="container">
          <div className="row align-items-center g-5 text-center text-lg-start">
            <div className="col-12 col-lg-6">
              <span className="hn-badge-pink mb-3">
                MANICURA & NAIL ART
              </span>
              <h1 className="hn-hero-title mb-3">
                TU PRÓXIMA <br />
                <span className="gothic-accent">manicura</span> <br />
                EMPIEZA ACÁ ✨
              </h1>
              <p className="lead text-muted mb-4 fs-6">
                Diseños únicos, calidad y detalles para que tus uñas hablen por vos.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <a href="#servicios" className="btn btn-hn-dark">
                  RESERVAR TURNO ✨
                </a>
              </div>
            </div>

            <div className="col-12 col-lg-6 text-center">
              <div className="hn-hero-img-wrapper">
                <img
                  src={heroImg}
                  alt="Holy Nails - Muestra de manicura"
                  className="hn-hero-img"
                />
                <span className="hn-hero-butterfly" role="img" aria-label="Mariposa">
                  🦋
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SERVICIOS SECTION */}
      <section id="servicios" className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="hn-section-title mb-2">✦ NUESTROS SERVICIOS ✦</h2>
            <p className="text-muted small">
              Elegí el servicio que mejor se adapte a vos
            </p>
          </div>

          <div className="row g-4">
            {servicios.map((s) => (
              <div className="col-12 col-md-4" key={s.titulo}>
                <div className="card hn-card h-100 text-center p-4">
                  <div className="card-body d-flex flex-column align-items-center">
                    <div className="hn-card-icon">
                      <img src={s.icon} alt={s.titulo} className="img-fluid" />
                    </div>
                    <h3 className="h5 font-weight-bold fw-bold mt-2 mb-2">
                      {s.titulo}
                    </h3>
                    <p className="small text-muted mb-2">
                      ⏱️ Duración: <strong>{s.duracion}</strong>
                    </p>
                    <p className="small text-dark fw-bold mb-3">
                      💰 {s.precio ?? 'Consultar'}
                    </p>
                    <p className="card-text small text-muted mb-4">
                      {s.descripcion}
                    </p>
                    <a href="#contacto" className="btn btn-hn-pink mt-auto">
                      VER MÁS
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA SECTION */}
      <section id="galeria" className="py-5 bg-white border-top border-bottom">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="hn-section-title mb-2">✦ ALGUNOS TRABAJOS ✦</h2>
            <p className="text-muted small">
              Especialistas en diseños cute & dark hechos a mano
            </p>
          </div>

          <div className="row g-3 justify-content-center">
            {trabajosGaleria.map((t) => (
              <div className="col-6 col-md-6 col-lg-3" key={t.id}>
                <div className="hn-gallery-card h-100">
                  <div className="hn-gallery-thumb">
                    <img src={t.imagen} alt={"Trabajo de Holy Nails"} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <a
              href="https://instagram.com/holy.nails.demo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-hn-outline"
            >
              VER MÁS EN INSTAGRAM 📷
            </a>
          </div>
        </div>
      </section>

      {/* CONTACTO SECTION */}
      <section id="contacto" className="py-5">
        <div className="container">
          <div className="hn-contacto-section text-center">
            <h2 className="hn-section-title mb-2">¿TENÉS UNA CONSULTA?</h2>
            <p className="text-muted mb-4">
              Escribinos por WhatsApp y te ayudamos con tu pedido o dudas.
            </p>

            <div className="row justify-content-center g-4 my-3 text-start">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                  <p className="fw-bold mb-2">💬 WhatsApp</p>
                  <p className="small text-muted mb-0">+54 9 260 000 0000</p>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                  <p className="fw-bold mb-2">📷 Instagram</p>
                  <p className="small text-muted mb-0">@holy.nails.demo</p>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                  <p className="fw-bold mb-2">📍 Ubicación</p>
                  <p className="small text-muted mb-0">
                    Av. Ejemplo 123, San Rafael, Mendoza
                  </p>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                  <p className="fw-bold mb-2">⏰ Horarios</p>
                  <p className="small text-muted mb-0">
                    Atención con turnos previos. Consultá disponibilidad.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="https://wa.me/5492600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-hn-whatsapp"
              >
                HABLAR POR WHATSAPP 💬
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER PRE-FOOTER */}
      <section className="py-4">
        <div className="container">
          <div className="hn-banner-cta text-center">
            <h3 className="hn-section-title mb-2">
              ¿LISTA PARA TU PRÓXIMO SET? ✨
            </h3>
            <p className="text-muted mb-4">
              Reservá tu turno de forma rápida y sencilla.
            </p>
            <a href="#contacto" className="btn btn-hn-dark">
              RESERVAR TURNO ✨
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
