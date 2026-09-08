# Diagrama de diseño inicial — Holy Nails

Estructura de componentes de la Home (TP5). Renderizable en GitHub con Mermaid.

```mermaid
flowchart TB
  subgraph App
    direction TB
    Home["Home (vista)"]
  end

  subgraph Home
    direction TB
    Navbar["Navbar"]
    Hero["Sección Hero"]
    Servicios["Sección Servicios"]
    Galeria["Sección Galería"]
    Contacto["Sección Contacto"]
    CTA["Banner CTA"]
    Footer["Footer"]
  end

  subgraph Componentes
    NavbarComp["Navbar.jsx"]
    FooterComp["Footer.jsx"]
  end

  subgraph Assets
    HeroImg["hero.jpg"]
    Iconos["icons/ (semi, kapping, esculpidas)"]
    GaleriaImg["galeria/ (trabajos 1-4)"]
  end

  Home --> Navbar
  Home --> Hero
  Home --> Servicios
  Home --> Galeria
  Home --> Contacto
  Home --> CTA
  Home --> Footer

  Navbar --> NavbarComp
  Footer --> FooterComp

  Hero --> HeroImg
  Servicios --> Iconos
  Galeria --> GaleriaImg
```

## Navegación

| Sección | Anchor | Contenido |
| --- | --- | --- |
| Inicio | `#inicio` | Hero con imagen y CTA a reservar turno |
| Servicios | `#servicios` | Tarjetas: Semipermanente, Kapping, Esculpidas |
| Galería | `#galeria` | Trabajos destacados + link a Instagram |
| Contacto | `#contacto` | WhatsApp, Instagram, ubicación y horarios |

## Stack

- **Cliente (frontend/):** React 19 + Vite + Bootstrap 5 (port 3000)
- **API (backend/ en raíz):** Django + Django REST Framework