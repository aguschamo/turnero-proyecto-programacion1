# Programacion1
# 💅 Sistema de Turnos para Manicurista

## 📌 Descripción del sistema

El sistema consiste en una API para la gestión de turnos de una manicurista.
Los usuarios podrán registrarse, iniciar sesión y reservar turnos para distintos servicios disponibles.

---

## 🧩 Entidades

### 👤 Usuario

* id_usuario (PK)
* nombre
* email
* contraseña

---

### 💅 Servicio

* id_servicio (PK)
* nombre
* duracion
* precio

---

### 📅 Turno

* id_turno (PK)
* fecha
* hora
* id_usuario (FK)
* id_servicio (FK)
* estado (pendiente, confirmado, cancelado)

---

## 🔗 Relaciones

* Un usuario puede tener múltiples turnos (1:N)
* Un servicio puede estar asociado a múltiples turnos (1:N)
* Un turno pertenece a un único usuario y a un único servicio

---

## 🧠 Reglas del sistema

* Un usuario debe estar registrado para poder reservar un turno
* No pueden existir dos turnos en la misma fecha y hora
* Cada turno debe estar asociado a un servicio válido

---

## 🚀 Futuras mejoras

* Implementar autenticación de usuarios
* Agregar gestión de horarios disponibles
* Incorporar cancelación y modificación de turnos
