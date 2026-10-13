# TP4 — Matriz de Pruebas: Holy Nails

## Información del proyecto

- **Proyecto:** Holy Nails
- **Dominio:** Servicios de manicurería + Turnos
- **Backend:** Django + Django REST Framework
- **Auth:** JWT (SimpleJWT)
- **Base de datos:** PostgreSQL

## Roles del sistema

| Rol | Descripción | Permisos principales |
|-----|-------------|---------------------|
| `ADMIN` | Administrador del sistema | CRUD servicios, ver todos los turnos, gestionar usuarios |
| `VENDEDOR` | Empleado/vendedor | CRUD servicios |
| `CLIENTE` | Usuario final | Ver servicios, crear/gestionar sus propios turnos |

## Endpoints disponibles

| Endpoint | Métodos | Autenticación | Roles permitidos |
|----------|---------|---------------|-----------------|
| `api/servicios/` | GET, POST | GET: No / POST: Sí | Público / ADMIN, VENDEDOR |
| `api/servicios/{id}/` | GET, PUT, PATCH, DELETE | GET: No / Otros: Sí | Público / ADMIN, VENDEDOR |
| `api/turnos/` | GET, POST | Sí | ADMIN (todos), CLIENTE (propios) |
| `api/turnos/{id}/` | GET, PUT, PATCH, DELETE | Sí | Owner o Admin |
| `api/auth/register/` | POST | No | Público |
| `api/auth/login/` | POST | No | Público |
| `api/auth/refresh/` | POST | No | Público |
| `api/auth/profile/` | GET, PUT, PATCH | Sí | Cualquier autenticado |
| `api/users/` | GET, POST, PUT, PATCH, DELETE | Sí | Admin Django |

---

## 1. Roles y permisos

### 1.1 Servicios — Crear

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| S-C01 | Roles | `api/servicios/` | Sin auth | Crear servicio | `{"nombre":"Semi","duracion":"01:00","precio":5000}` | Credenciales no proporcionadas | `401` | | |
| S-C02 | Roles | `api/servicios/` | CLIENTE | Crear servicio | `{"nombre":"Semi","duracion":"01:00","precio":5000}` | Acción no permitida | `403` | | |
| S-C03 | Roles | `api/servicios/` | VENDEDOR | Crear servicio | `{"nombre":"Semi","duracion":"01:00","precio":5000}` | Servicio creado | `201` | | |
| S-C04 | Roles | `api/servicios/` | ADMIN | Crear servicio | `{"nombre":"Kapping","duracion":"01:30","precio":8000}` | Servicio creado | `201` | `201` | ✅ Pass |

### 1.2 Servicios — Editar

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| S-E01 | Roles | `api/servicios/{id}/` | Sin auth | Editar servicio | `{"precio":6000}` | Credenciales no proporcionadas | `401` | | |
| S-E02 | Roles | `api/servicios/{id}/` | CLIENTE | Editar servicio | `{"precio":6000}` | Acción no permitida | `403` | | |
| S-E03 | Roles | `api/servicios/{id}/` | VENDEDOR | Editar servicio | `{"precio":6000}` | Servicio actualizado | `200` | | |
| S-E04 | Roles | `api/servicios/{id}/` | ADMIN | Editar servicio | `{"precio":6000}` | Servicio actualizado | `200` | `200` | ✅ Pass |

### 1.3 Servicios — Borrar

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| S-D01 | Roles | `api/servicios/{id}/` | Sin auth | Borrar servicio | — | Credenciales no proporcionadas | `401` | | |
| S-D02 | Roles | `api/servicios/{id}/` | CLIENTE | Borrar servicio | — | Acción no permitida | `403` | | |
| S-D03 | Roles | `api/servicios/{id}/` | VENDEDOR | Borrar servicio | — | Servicio eliminado | `204` | | |
| S-D04 | Roles | `api/servicios/{id}/` | ADMIN | Borrar servicio | — | Servicio eliminado | `204` | | |

### 1.4 Servicios — Listar/Ver

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| S-L01 | Roles | `api/servicios/` | Sin auth | Listar servicios | — | Solo servicios activos (sin campo `is_active`) | `200` | `200` | ✅ Pass |
| S-L02 | Roles | `api/servicios/` | CLIENTE | Listar servicios | — | Solo servicios activos (sin campo `is_active`) | `200` | | |
| S-L03 | Roles | `api/servicios/` | ADMIN | Listar servicios | — | Todos los servicios (con campo `is_active`) | `200` | `200` | ✅ Pass |
| S-L04 | Roles | `api/servicios/{id}/` | Sin auth | Ver servicio inactivo | ID de servicio inactivo | No encontrado o sin campo `is_active` | `404` | | |

### 1.5 Turnos — Crear

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| T-C01 | Roles | `api/turnos/` | Sin auth | Crear turno | `{"fecha":"2026-09-01","hora":"10:00","servicio":1}` | Credenciales no proporcionadas | `401` | | |
| T-C02 | Roles | `api/turnos/` | CLIENTE | Crear turno | `{"fecha":"2026-09-01","hora":"10:00","servicio":1}` | Turno creado (asignado al usuario) | `201` | | |
| T-C03 | Roles | `api/turnos/` | ADMIN | Crear turno | `{"fecha":"2026-09-01","hora":"11:00","servicio":1}` | Turno creado | `201` | | |

### 1.6 Turnos — Ver/Listar

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| T-L01 | Roles | `api/turnos/` | Sin auth | Listar turnos | — | Credenciales no proporcionadas | `401` | | |
| T-L02 | Roles | `api/turnos/` | CLIENTE | Listar turnos | — | Solo sus propios turnos | `200` | | |
| T-L03 | Roles | `api/turnos/` | ADMIN | Listar turnos | — | Todos los turnos | `200` | | |
| T-L04 | Roles | `api/turnos/{id}/` | CLIENTE | Ver turno propio | ID propio | Turno del usuario | `200` | | |
| T-L05 | Roles | `api/turnos/{id}/` | CLIENTE | Ver turno ajeno | ID de otro usuario | No encontrado | `404` | | |

### 1.7 Turnos — Editar

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| T-E01 | Roles | `api/turnos/{id}/` | CLIENTE | Editar turno propio | `{"hora":"14:00"}` | Turno actualizado | `200` | | |
| T-E02 | Roles | `api/turnos/{id}/` | CLIENTE | Editar turno ajeno | `{"hora":"14:00"}` | No encontrado | `404` | | |
| T-E03 | Roles | `api/turnos/{id}/` | ADMIN | Editar cualquier turno | `{"estado":"confirmado"}` | Turno actualizado | `200` | | |

### 1.8 Turnos — Borrar

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| T-D01 | Roles | `api/turnos/{id}/` | CLIENTE | Borrar turno propio | — | Turno eliminado | `204` | | |
| T-D02 | Roles | `api/turnos/{id}/` | CLIENTE | Borrar turno ajeno | — | No encontrado | `404` | | |
| T-D03 | Roles | `api/turnos/{id}/` | ADMIN | Borrar cualquier turno | — | Turno eliminado | `204` | | |

### 1.9 Registro de usuario

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| U-R01 | Roles | `api/auth/register/` | Sin auth | Registrar usuario nuevo | `{"username":"nuevo","email":"nuevo@test.com","password":"test1234","nombre":"Nuevo"}` | Usuario creado con rol CLIENTE | `201` | `201` | ✅ Pass |
| U-R02 | Roles | `api/auth/register/` | CLIENTE | Registrar usuario estando logueado | `{"username":"otro","email":"otro@test.com","password":"test1234"}` | Usuario creado (registro es público) | `201` | | |

### 1.10 Usuarios — CRUD (Admin Django)

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| U-A01 | Roles | `api/users/` | Sin auth | Listar usuarios | — | Credenciales no proporcionadas | `401` | | |
| U-A02 | Roles | `api/users/` | CLIENTE | Listar usuarios | — | Acción no permitida (requiere is_staff) | `403` | | |
| U-A03 | Roles | `api/users/` | ADMIN | Listar usuarios | — | Lista de usuarios | `200` | | |

### 1.11 Perfil

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| P-01 | Roles | `api/auth/profile/` | Sin auth | Ver perfil | — | Credenciales no proporcionadas | `401` | `401` | ✅ Pass |
| P-02 | Roles | `api/auth/profile/` | CLIENTE | Ver perfil propio | — | Datos del usuario | `200` | | |
| P-03 | Roles | `api/auth/profile/` | CLIENTE | Editar perfil | `{"nombre":"Agus"}` | Perfil actualizado | `200` | | |

---

## 2. Validaciones

### 2.1 Servicios — Validaciones de entrada

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| V-S01 | Validación | `api/servicios/` | ADMIN | Crear servicio sin nombre | `{"duracion":"01:00","precio":5000}` | Error: nombre requerido | `400` | | |
| V-S02 | Validación | `api/servicios/` | ADMIN | Crear servicio sin duración | `{"nombre":"Test","precio":5000}` | Error: duración requerida | `400` | | |
| V-S03 | Validación | `api/servicios/` | ADMIN | Crear servicio sin precio | `{"nombre":"Test","duracion":"01:00"}` | Error: precio requerido | `400` | | |
| V-S04 | Validación | `api/servicios/` | ADMIN | Duración inválida (0 minutos) | `{"nombre":"Test","duracion":"00:00","precio":5000}` | Error: duración mínima 1 minuto | `400` | | |
| V-S05 | Validación | `api/servicios/` | ADMIN | Precio negativo | `{"nombre":"Test","duracion":"01:00","precio":-100}` | Error: precio mínimo 0 | `400` | | |
| V-S06 | Validación | `api/servicios/` | ADMIN | Nombre excede 100 caracteres | `{"nombre":"A"*101,"duracion":"01:00","precio":5000}` | Error: max_length 100 | `400` | | |

### 2.2 Turnos — Validaciones de entrada

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| V-T01 | Validación | `api/turnos/` | CLIENTE | Crear turno sin fecha | `{"hora":"10:00","servicio":1}` | Error: fecha requerida | `400` | | |
| V-T02 | Validación | `api/turnos/` | CLIENTE | Crear turno sin hora | `{"fecha":"2026-09-01","servicio":1}` | Error: hora requerida | `400` | | |
| V-T03 | Validación | `api/turnos/` | CLIENTE | Fecha en el pasado | `{"fecha":"2020-01-01","hora":"10:00","servicio":1}` | Error: fecha no puede ser anterior a hoy | `400` | `400` | ✅ Pass |
| V-T04 | Validación | `api/turnos/` | CLIENTE | Hora antes de las 09:00 | `{"fecha":"2026-09-01","hora":"08:00","servicio":1}` | Error: horario entre 09:00 y 20:00 | `400` | `400` | ✅ Pass |
| V-T05 | Validación | `api/turnos/` | CLIENTE | Hora después de las 20:00 | `{"fecha":"2026-09-01","hora":"21:00","servicio":1}` | Error: horario entre 09:00 y 20:00 | `400` | `400` | ✅ Pass |
| V-T06 | Validación | `api/turnos/` | CLIENTE | Fecha+Hora duplicada | `{"fecha":"2026-09-01","hora":"10:00","servicio":1}` (ya existe) | Error: horario ocupado | `400` | | |

### 2.3 Registro — Validaciones de entrada

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| V-U01 | Validación | `api/auth/register/` | Sin auth | Email ya existente | `{"username":"test","email":"existente@test.com","password":"test1234"}` | Error: email ya registrado | `400` | | |
| V-U02 | Validación | `api/auth/register/` | Sin auth | Username ya existente | `{"username":"admin","email":"nuevo@test.com","password":"test1234"}` | Error: username ya tomado | `400` | | |
| V-U03 | Validación | `api/auth/register/` | Sin auth | Sin email | `{"username":"test","password":"test1234"}` | Error: email requerido | `400` | | |
| V-U04 | Validación | `api/auth/register/` | Sin auth | Email inválido | `{"username":"test","email":"no-es-email","password":"test1234"}` | Error: formato de email inválido | `400` | | |
| V-U05 | Validación | `api/auth/register/` | Sin auth | Sin password | `{"username":"test","email":"test@test.com"}` | Error: password requerido | `400` | | |

### 2.4 Login — Validaciones

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| V-L01 | Validación | `api/auth/login/` | Sin auth | Credenciales incorrectas | `{"username":"admin","password":"wrong"}` | Error: credenciales inválidas | `401` | | |
| V-L02 | Validación | `api/auth/login/` | Sin auth | Usuario inexistente | `{"username":"noexiste","password":"test"}` | Error: credenciales inválidas | `401` | | |
| V-L03 | Validación | `api/auth/login/` | Sin auth | Token refresh inválido | Token refresh corrupto | Error: token inválido | `401` | | |

### 2.5 Recursos inexistentes

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| V-N01 | Validación | `api/servicios/99999/` | ADMIN | Ver servicio inexistente | — | No encontrado | `404` | `404` | ✅ Pass |
| V-N02 | Validación | `api/turnos/99999/` | ADMIN | Ver turno inexistente | — | No encontrado | `404` | `404` | ✅ Pass |
| V-N03 | Validación | `api/servicios/99999/` | ADMIN | Editar servicio inexistente | `{"precio":5000}` | No encontrado | `404` | | |
| V-N04 | Validación | `api/turnos/99999/` | ADMIN | Borrar turno inexistente | — | No encontrado | `404` | | |

---

## 3. Reglas de negocio

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| R-01 | Regla negocio | `api/servicios/` | ADMIN | Crear servicio con `is_active=false` | `{"nombre":"Test","duracion":"01:00","precio":5000,"is_active":false}` | Servicio creado pero inactivo (no visible para clientes) | `201` | | |
| R-02 | Regla negocio | `api/servicios/` | ADMIN | Desactivar servicio existente | `{"is_active":false}` (PATCH) | Servicio desactivado | `200` | | |
| R-03 | Regla negocio | `api/servicios/` | CLIENTE | Ver servicio desactivado | GET lista | No aparece en la lista | `200` (sin el servicio) | `200` | ✅ Pass |
| R-04 | Regla negocio | `api/turnos/` | CLIENTE | Crear turno → verificar usuario asignado | `{"fecha":"2026-09-02","hora":"10:00","servicio":1}` | `usuario` asignado automáticamente al usuario autenticado | `201` | | |
| R-05 | Regla negocio | `api/turnos/` | CLIENTE | Intentar asignar turno a otro usuario | `{"fecha":"2026-09-02","hora":"11:00","servicio":1,"usuario":2}` | `usuario` ignorado (read_only), asignado al token owner | `201` | | |
| R-06 | Regla negocio | `api/turnos/{id}/` | CLIENTE | Cambiar estado del turno | `{"estado":"confirmado"}` | `estado` es read_only, no se modifica | `200` (estado sin cambios) | | |
| R-07 | Regla negocio | `api/turnos/{id}/` | ADMIN | Cambiar estado del turno | `{"estado":"confirmado"}` | Estado actualizado (ADMIN puede) | `200` | | |
| R-08 | Regla negocio | `api/auth/register/` | Sin auth | Registro crea usuario con rol CLIENTE | `{"username":"nuevo","email":"n@test.com","password":"test1234"}` | Rol asignado: CLIENTE (no se puede elegir otro rol) | `201` | | |

---

## 4. Flujo completo

### 4.1 Flujo principal: Login → Crear Turno → Verificar

| ID | Paso | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| F-01 | 1 | `api/auth/login/` | CLIENTE | Login | `{"username":"cliente1","password":"test1234"}` | Token de acceso + refresh | `200` | | |
| F-02 | 2 | `api/servicios/` | CLIENTE | Buscar servicios | — | Lista de servicios activos | `200` | | |
| F-03 | 3 | `api/turnos/` | CLIENTE | Crear turno | `{"fecha":"2026-09-03","hora":"10:00","servicio":1}` | Turno creado con estado PENDIENTE | `201` | | |
| F-04 | 4 | `api/turnos/{id}/` | CLIENTE | Verificar turno creado | — | Turno con datos correctos, estado PENDIENTE | `200` | `200` | ✅ Pass |

### 4.2 Flujo: Login → Verificar Turnos → Editar

| ID | Paso | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| F-05 | 1 | `api/auth/login/` | CLIENTE | Login | `{"username":"cliente1","password":"test1234"}` | Token de acceso | `200` | | |
| F-06 | 2 | `api/turnos/` | CLIENTE | Ver mis turnos | — | Lista con turnos del usuario | `200` | | |
| F-07 | 3 | `api/turnos/{id}/` | CLIENTE | Modificar hora del turno | `{"hora":"14:00"}` | Turno actualizado | `200` | | |
| F-08 | 4 | `api/turnos/{id}/` | CLIENTE | Verificar cambio | — | Hora actualizada a 14:00 | `200` | | |

### 4.3 Flujo: Admin gestiona servicios

| ID | Paso | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| F-09 | 1 | `api/auth/login/` | ADMIN | Login | `{"username":"admin","password":"admin1234"}` | Token de acceso | `200` | `200` | ✅ Pass |
| F-10 | 2 | `api/servicios/` | ADMIN | Crear servicio | `{"nombre":"Manicuría Full","duracion":"02:00","precio":12000}` | Servicio creado | `201` | | |
| F-11 | 3 | `api/servicios/{id}/` | ADMIN | Desactivar servicio | `{"is_active":false}` | Servicio desactivado | `200` | `200` | ✅ Pass (corregido) |
| F-12 | 4 | `api/servicios/` | CLIENTE | Verificar que no aparece | — | Servicio desactivado no visible | `200` (sin el servicio) | `200` | ✅ Pass |

---

## 5. Casos de borde

| ID | Categoría | Endpoint | Rol | Acción | Datos | Resultado esperado | HTTP esperado | Resultado obtenido | Estado |
|----|-----------|----------|-----|--------|-------|-------------------|---------------|-------------------|--------|
| B-01 | Borde | `api/turnos/` | CLIENTE | Crear turno a las 09:00 (límite inferior) | `{"fecha":"2026-09-01","hora":"09:00","servicio":1}` | Turno creado | `201` | `201` | ✅ Pass |
| B-02 | Borde | `api/turnos/` | CLIENTE | Crear turno a las 20:00 (límite superior) | `{"fecha":"2026-09-01","hora":"20:00","servicio":1}` | Turno creado | `201` | `201` | ✅ Pass |
| B-03 | Borde | `api/turnos/` | CLIENTE | Crear turno a las 08:59 | `{"fecha":"2026-09-01","hora":"08:59","servicio":1}` | Error: horario fuera de rango | `400` | `400` | ✅ Pass |
| B-04 | Borde | `api/turnos/` | CLIENTE | Crear turno a las 20:01 | `{"fecha":"2026-09-01","hora":"20:01","servicio":1}` | Error: horario fuera de rango | `400` | `400` | ✅ Pass |
| B-05 | Borde | `api/turnos/` | CLIENTE | Crear turno hoy a la hora actual (si es posterior a 09:00) | Hora actual del sistema | Turno creado si es válido | `201` | | |
| B-06 | Borde | `api/turnos/` | CLIENTE | Crear turno con servicio inactivo | `servicio` de servicio desactivado | Error o servicio null (SET_NULL) | `400` o `201` | | |
| B-07 | Borde | `api/servicios/` | ADMIN | Crear servicio con precio 0 | `{"nombre":"Gratuito","duracion":"00:30","precio":0}` | Servicio creado | `201` | `201` | ✅ Pass |
| B-08 | Borde | `api/servicios/` | ADMIN | Crear servicio con duración de 1 minuto | `{"nombre":"Rápido","duracion":"00:01","precio":1000}` | Servicio creado | `201` | `201` | ✅ Pass |
| B-09 | Borde | `api/turnos/` | CLIENTE | Crear dos turnos para el mismo día, diferentes horas | Dos requests con misma fecha, distinta hora | Ambos turnos creados | `201` + `201` | | |
| B-10 | Borde | `api/turnos/{id}/` | CLIENTE | Editar turno propio cambiando solo la hora | `{"hora":"15:00"}` (PUT parcial) | Turno actualizado, otros campos sin cambios | `200` | | |
| B-11 | Borde | `api/auth/register/` | Sin auth | Registrar con password numérico corto | `{"username":"test","email":"t@t.com","password":"1234"}` | Rechazado por validadores de contraseña de Django | `400` | | |
| B-12 | Borde | `api/turnos/` | CLIENTE | Crear turno para servicioID inexistente | `{"fecha":"2026-09-01","hora":"10:00","servicio":99999}` | Error: servicio no encontrado | `400` | `400` | ✅ Pass |
| B-13 | Borde | `api/auth/profile/` | CLIENTE | JWT expirado | Token de acceso expirado | Token inválido | `401` | `401` | ✅ Pass |
| B-14 | Borde | `api/auth/profile/` | CLIENTE | JWT refresh token como access token | Usar refresh como Bearer | Token inválido | `401` | | |

---

## Instrucciones para ejecución en Postman

### Variables de entorno sugeridas

| Variable | Valor ejemplo | Descripción |
|----------|---------------|-------------|
| `base_url` | `http://127.0.0.1:8000` | URL base del backend |
| `admin_token` | *(obtener después de login)* | Token JWT de usuario ADMIN |
| `cliente_token` | *(obtener después de login)* | Token JWT de usuario CLIENTE |
| `vendedor_token` | *(obtener después de login)* | Token JWT de usuario VENDEDOR |

### Headers para requests autenticados

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

### Orden de ejecución recomendado

1. **Preparación:** Crear usuarios de prueba (ADMIN, CLIENTE, VENDEDOR) via registro o admin Django
2. **Login:** Obtener tokens para cada rol
3. **Pruebas de roles:** Ejecutar carpetas de permisos
4. **Pruebas de validación:** Ejecutar casos de validación
5. **Pruebas de reglas de negocio:** Ejecutar casos de negocio
6. **Pruebas de flujo completo:** Ejecutar secuencias
7. **Capturar evidencia:** Tomar screenshots de respuestas 401 y 403
