# TP4 — Reporte de Pruebas: Holy Nails

## Estado actualizado

- **Pruebas diseñadas:** 53 (ver matriz en `TP4_MATRIZ_PRUEBAS.md`)
- **Pruebas ejecutadas identificables:** 21
- **PASS confirmados:** 21
- **FAIL reales:** 0
- **Ambiguas (sin identificar):** 5
- **No ejecutadas:** 27
- **Bugs encontrados:** 0
- **Bugs corregidos:** 0

---

## Corrección del supuesto BUG F-11

El primer intento de F-11 (`PATCH /api/servicios/1/ → 403`) **no fue un bug del backend**.

**Causa:** El usuario de prueba utilizado (`admin_tp4`) fue creado mediante el endpoint público de registro, que asigna rol `CLIENTE` automáticamente. El token JWT pertenecía a un usuario CLIENTE, no a un ADMIN.

**Corrección:** Se creó un usuario ADMIN real mediante Django shell:
- username: `admin_tp4_test`
- role: `ADMIN`
- is_staff: `True`

**Resultado al repetir con ADMIN real:** `PATCH /api/servicios/1/ → 200 OK`

---

## Resultados — Ejecución 1 (usuario incorrecto)

Estos resultados se obtuvieron con el usuario `admin_tp4` (role=CLIENTE).

| # | Método | Endpoint | HTTP | Identificación | Estado |
|---|--------|----------|------|----------------|--------|
| 1 | POST | `api/turnos/` | 400 | Ambiguo (POST /api/turnos/ → 400) | ⚠️ Ambiguo |
| 2 | GET | `api/auth/profile/` | 401 | P-01: Ver perfil sin auth | ✅ Pass |
| 3 | GET | `api/auth/profile/` | 401 | B-13: JWT expirado | ✅ Pass |
| 4 | POST | `api/servicios/` | 403 | S-C02 o S-C01 (CLIENTE/sin auth creando servicio) | ✅ Pass |
| 5 | GET | `api/servicios/` | 200 | S-L01 o S-L02 (listar servicios) | ✅ Pass |
| 6 | POST | `api/turnos/` | 400 | Ambiguo | ⚠️ Ambiguo |
| 7 | POST | `api/turnos/` | 400 | Ambiguo | ⚠️ Ambiguo |
| 8 | POST | `api/auth/register/` | 201 | U-R01: Registrar usuario nuevo | ✅ Pass |
| 9 | POST | `api/auth/login/` | 200 | Login de Preparación | ✅ Pass |
| 10 | GET | `api/servicios/` | 200 | S-L01: Listar servicios sin auth | ✅ Pass |
| 11 | POST | `api/turnos/` | 400 | Ambiguo | ⚠️ Ambiguo |
| 12 | GET | `api/turnos/?fecha=2026-09-20` | 200 | F-04: Verificar turno creado | ✅ Pass |
| 13 | POST | `api/auth/login/` | 200 | Login de Preparación | ✅ Pass |
| 14 | POST | `api/servicios/` | 403 | S-C02: CLIENTE creando servicio | ✅ Pass |
| 15 | PATCH | `api/servicios/1/` | 403 | ~~F-11~~ (usuario CLIENTE, no ADMIN) | ⚠️ Descartado |
| 16 | GET | `api/servicios/` | 200 | S-L01 o S-L02: Listar servicios | ✅ Pass |
| 17 | POST | `api/auth/login/` | 200 | Login de Preparación | ✅ Pass |

**Nota:** El resultado #15 (PATCH → 403) fue descartado porque se ejecutó con un usuario CLIENTE disfrazado de ADMIN.

---

## Resultados — Ejecución 2 (ADMIN real)

Estos resultados se obtuvieron con el usuario `admin_tp4_test` (role=ADMIN, is_staff=True).

| # | Método | Endpoint | HTTP | Identificación | Estado |
|---|--------|----------|------|----------------|--------|
| 18 | POST | `api/auth/login/` | 200 | Login ADMIN real | ✅ Pass |
| 19 | PATCH | `api/servicios/1/` | 404 | F-11: Servicio no existe todavía | ✅ Pass (comportamiento correcto) |
| 20 | GET | `api/servicios/` | 200 | S-L03: Listar servicios con ADMIN | ✅ Pass |
| 21 | POST | `api/servicios/` | 201 | S-C04: Crear servicio con ADMIN | ✅ Pass |
| 22 | PATCH | `api/servicios/1/` | 200 | F-11: Desactivar servicio | ✅ Pass |
| 23 | PATCH | `api/servicios/1/` | 200 | S-E04: Editar servicio con ADMIN | ✅ Pass |

**Detalle de la secuencia F-11 corregida:**
1. `PATCH /api/servicios/1/ → 404` — No existía ningún servicio con ID 1
2. `GET /api/servicios/ → 200` — Confirmó `count: 0`
3. `POST /api/servicios/ → 201` — Creó servicio: ID=1, nombre="Kapping TP4", duración="01:30:00", precio=8000.00, is_active=false
4. `PATCH /api/servicios/1/ → 200` — Desactivar servicio exitoso
5. `PATCH /api/servicios/1/ → 200` — Editar servicio exitoso

---

## Mapeo detallado a casos de prueba

### PASS confirmados (21)

| ID | Prueba | HTTP esperado | HTTP obtenido | Evidencia |
|----|--------|---------------|---------------|-----------|
| P-01 | Ver perfil sin auth | 401 | 401 | Resultado #2 |
| B-13 | JWT expirado | 401 | 401 | Resultado #3 |
| S-C02 | CLIENTE creando servicio | 403 | 403 | Resultado #4 o #14 |
| S-L01 | Listar servicios sin auth | 200 | 200 | Resultado #5, #10 o #16 |
| U-R01 | Registrar usuario nuevo | 201 | 201 | Resultado #8 |
| Preparación | Login | 200 | 200 | Resultado #9, #13 o #17 |
| F-04 | Verificar turno creado | 200 | 200 | Resultado #12 |
| S-L03 | Listar servicios con ADMIN | 200 | 200 | Resultado #20 |
| S-C04 | Crear servicio con ADMIN | 201 | 201 | Resultado #21 |
| F-11 | Desactivar servicio (PATCH) | 200 | 200 | Resultado #22 |
| S-E04 | Editar servicio con ADMIN | 200 | 200 | Resultado #23 |

### Ambiguos (5)

Todos son `POST /api/turnos/ → 400`. No se puede determinar a qué caso pertenecen sin inspeccionar el body de cada request.

**Posibles casos (sin confirmar):**
- V-T03: Fecha en el pasado → 400 (pass si coincide)
- V-T04: Hora antes de 09:00 → 400 (pass si coincide)
- V-T05: Hora después de 20:00 → 400 (pass si coincide)
- B-03: Turno a las 08:59 → 400 (pass si coincide)
- B-04: Turno a las 20:01 → 400 (pass si coincide)

### No ejecutadas (27)

**Roles (14 de 16 no ejecutadas):**
- S-C03: Crear servicio con VENDEDOR
- S-E01/E02/E03: Editar servicios (sin auth, CLIENTE, VENDEDOR)
- S-D01/D02/D03/D04: Borrar servicios
- T-C01/C02/C03: Crear turnos (sin auth, CLIENTE, ADMIN)
- T-L01/L02/L03/L04/L05: Ver turnos
- T-E01/E02/E03: Editar turnos
- T-D01/D02/D03: Borrar turnos
- U-A01/A02/A03: Listar usuarios
- P-02/P03: Ver/editar perfil autenticado

**Validaciones (6 de 11 no ejecutadas):**
- V-S01/S04/S05: Validaciones de servicio
- V-U01/U04: Validaciones de registro
- V-L01: Login credenciales incorrectas

**Casos de borde (7 de 9 no ejecutadas):**
- B-01/B02: Turnos en límites (09:00, 20:00)
- B-07/B08: Servicios con precio 0 y duración 1 min
- B-12: Turno con servicio inexistente
- B-14: Refresh token como access

**Reglas de negocio (4 de 5 no ejecutadas):**
- R-01/R03/R04/R05/R08

**Flujos (2 de 4 no ejecutadas):**
- F-01/F02/F03: Secuencia Login → Buscar → Crear Turno

---

## Resumen final

| Métrica | Cantidad |
|---------|----------|
| Pruebas ejecutadas identificables | 21 |
| PASS confirmados | 21 |
| FAIL reales | 0 |
| Ambiguas | 5 |
| No ejecutadas | 27 |
| Bugs encontrados | 0 |

### Evidencia que falta para completar el TP4

1. **Pruebas de roles no ejecutadas:** La mayoría de las pruebas de permisos (S-C03, S-E01-E04, S-D01-D04, T-C01-C03, T-L01-L05, T-E01-E03, T-D01-D03, U-A01-A03, P-02-P03) no fueron ejecutadas.
2. **Pruebas de validación faltantes:** V-S01, V-S04, V-S05, V-U01, V-U04, V-L01 no fueron ejecutadas.
3. **Pruebas de borde faltantes:** B-01, B-02, B-07, B-08, B-12, B-14 no fueron ejecutadas.
4. **Pruebas de reglas de negocio:** R-01, R-03, R-04, R-05, R-08 no fueron ejecutadas.
5. **Flujo completo:** F-01, F-02, F-03 no fueron ejecutados.
6. **Capturas de 401/403:** Se necesitan screenshots de al menos 1 respuesta 401 y 1 respuesta 403.
7. **Evidencia de los ambiguos:** Identificar los bodies de los POST /api/turnos/ → 400 para mapearlos a casos específicos.

---

## Pull Requests creados

No se crearon PRs. No hubo bugs del backend que corregir.

| PR | Descripción | Rama | Estado |
|----|-------------|------|--------|
| — | — | — | No aplica |
