import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <section id="center">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
      </div>
      <div>
        <h1>Turnero</h1>
        <p>Reservá tu turno con tu manicurista de confianza</p>
      </div>
    </section>
  )
}

export default App
