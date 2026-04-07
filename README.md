# Programacion1
# Sistema de Turnos para Manicurista

## Descripción del Sistema

El sistema consiste en una API para la gestión de turnos de una manicurista.
Los usuarios podrán registrarse, iniciar sesión y reservar turnos para distintos servicios disponibles.

## Entidades

### Usuario

- id_usuario (PK)
- nombre
- email
- contraseña

### Servicio

- id_servicio (PK)
- nombre
- duracion
- precio

### Turno

- id_turno (PK)
- fecha
- hora
- id_usuario (FK)
- id_servicio (FK)
- estado (pendiente, confirmado, cancelado)

## Relaciones

- Usuario - Turno: 1:N (un usuario puede tener múltiples turnos)
- Servicio - Turno: 1:N (un servicio puede estar asociado a múltiples turnos)
- Turno - Usuario: N:1 (un turno pertenece a un único usuario)
- Turno - Servicio: N:1 (un turno pertenece a un único servicio)

## Reglas del Sistema

- Un usuario debe estar registrado para poder reservar un turno
- No pueden existir dos turnos en la misma fecha y hora
- Cada turno debe estar asociado a un servicio válido
