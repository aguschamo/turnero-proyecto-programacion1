# TP 1 - Programacion 1

## Sistema de Turnos para Manicurista

API para la gestion de turnos de una manicurista. Los usuarios pueden registrarse, iniciar sesion y reservar turnos para distintos servicios.

## Modelo de datos

### Entidades

#### Usuario

| Campo | Descripcion |
| --- | --- |
| id_usuario (PK) | Identificador del usuario |
| nombre | Nombre y apellido |
| email | Email unico |
| contrasena | Contrasena del usuario |

#### Servicio

| Campo | Descripcion |
| --- | --- |
| id_servicio (PK) | Identificador del servicio |
| nombre | Nombre del servicio |
| duracion | Duracion del servicio |
| precio | Precio del servicio |

#### Turno

| Campo | Descripcion |
| --- | --- |
| id_turno (PK) | Identificador del turno |
| fecha | Fecha del turno |
| hora | Hora del turno |
| id_usuario (FK) | Usuario que reserva el turno |
| id_servicio (FK) | Servicio asociado al turno |
| estado | `pendiente` / `confirmado` / `cancelado` |

### Relaciones

- Un `Usuario` puede tener multiples `Turnos` (1:N)
- Un `Servicio` puede estar asociado a multiples `Turnos` (1:N)
- Cada `Turno` pertenece a un unico `Usuario` y a un unico `Servicio`

## Reglas del sistema

- Un usuario debe estar registrado para poder reservar un turno
- No pueden existir dos turnos en la misma fecha y hora
- Cada turno debe estar asociado a un servicio valido

## Configuracion local

Copiar `.env.example` a `.env` y completar los datos de PostgreSQL locales:

```env
DB_NAME=programacion1_db
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
```
