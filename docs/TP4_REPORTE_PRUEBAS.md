# TP4 — Reporte de Pruebas: Holy Nails

## Estado actualizado

- **Casos diseñados en la matriz:** 96 IDs (ver `TP4_MATRIZ_PRUEBAS.md`)
- **Requests en la colección Postman:** 69 (cada uno con aserción `pm.test` de status esperado)
- **PASS confirmados:** 18
- **FAIL reales:** 0
- **Ambiguos (sin identificar):** 4
- **Descartados (ejecución inválida):** 1
- **No ejecutados (sin evidencia manual aún):** resto de la matriz
- **Bugs encontrados:** 0
- **Bugs corregidos:** 0

> **Nota de verificabilidad (corrección post-revisión):** la colección original no tenía
> aserciones `pm.test`, por lo que ningún resultado era reproducible. Se agregó una aserción
> `pm.test('espera <status>')` a los 69 requests, aserciones duras en los logins (200 + presencia
> de `access`/`refresh`) y captura dinámica de `servicio_id`/`turno_id`. Los conteos de este
> reporte se recalcularon para reconciliar con las propias tablas.

---

## Corrección del supuesto BUG F-11

El primer intento de F-11 (`PATCH /api/servicios/1/ → 403`) **no fue un bug del backend**.

**Causa:** El usuario de prueba utilizado (`admin_tp4`) fue creado mediante el endpoint público de registro, que asigna rol `CLIENTE` automáticamente. El token JWT pertenecía a un usuario CLIENTE, no a un ADMIN.

**Corrección:** Se creó un usuario ADMIN real mediante Django shell:
- username: `admin_demo`
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

Estos resultados se obtuvieron con el usuario `admin_demo` (role=ADMIN, is_staff=True).

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

### PASS confirmados (18)

| ID | Prueba | HTTP esperado | HTTP obtenido | Evidencia |
|----|--------|---------------|---------------|-----------|
| P-01 | Ver perfil sin auth | 401 | 401 | Resultado #2 |
| B-13 | Token inválido (no expirado) | 401 | 401 | Resultado #3 |
| S-C02 | CLIENTE creando servicio | 403 | 403 | Resultado #4 o #14 |
| S-L01 | Listar servicios sin auth | 200 | 200 | Resultado #5, #10 o #16 |
| U-R01 | Registrar usuario nuevo | 201 | 201 | Resultado #8 |
| Preparación | Login | 200 | 200 | Resultado #9, #13 o #17 |
| F-04 | Verificar turno creado | 200 | 200 | Resultado #12 |
| S-L03 | Listar servicios con ADMIN | 200 | 200 | Resultado #20 |
| S-C04 | Crear servicio con ADMIN | 201 | 201 | Resultado #21 |
| F-11 | Desactivar servicio (PATCH) | 200 | 200 | Resultado #22 |
| S-E04 | Editar servicio con ADMIN | 200 | 200 | Resultado #23 |

### Ambiguos (4)

Todos son `POST /api/turnos/ → 400`. No se puede determinar a qué caso pertenecen sin inspeccionar el body de cada request.

**Posibles casos (sin confirmar):**
- V-T03: Fecha en el pasado → 400 (pass si coincide)
- V-T04: Hora antes de 09:00 → 400 (pass si coincide)
- V-T05: Hora después de 20:00 → 400 (pass si coincide)
- B-03: Turno a las 08:59 → 400 (pass si coincide)
- B-04: Turno a las 20:01 → 400 (pass si coincide)

> **Corrección post-revisión:** la ejecución manual registró 4 ambiguos (no 5). Los cuerpos de
> estos `POST /api/turnos/ → 400` siguen sin poder mapearse a un caso concreto sin el historial.
> La colección ahora incluye aserciones automáticas, de modo que una re-ejecución con Newman
> los identificaría de forma determinística.

### No ejecutados (resto de la matriz)

> La matriz define 96 IDs; la colección cubre 69 requests con aserciones. Los IDs restantes de la
> matriz aún no tienen ejecución manual asociada. La ejecución manual histórica cubrió 18 PASS,
> 4 ambiguos y 1 descartado (23 resultados identificables).

**Roles — sin request en la colección:** S-E01, S-E02, S-D01, S-D02, S-D04, S-L04, T-L01 (parcial), U-R02.

**Validaciones — sin request en la colección:** V-U02, V-U03, V-U05, V-L02, V-L03, V-N03, V-N04.

**Casos de borde — sin request en la colección:** B-05, B-06, B-09, B-10, B-11.

**Reglas de negocio — sin request en la colección:** R-02, R-06.

**Flujos — sin request en la colección:** F-05, F-06, F-07, F-08.

> **Nota:** S-C03/S-E03/S-D03 (VENDEDOR), T-E01/T-E02/T-E03, T-D01/T-D02/T-D03, T-L04/T-L05,
> V-S02/V-S03/V-S06, V-T06 y R-07 **ya fueron agregados** a la colección con sus aserciones en
> esta corrección; solo falta ejecutarlos y volcar los resultados aquí.

---

## Resumen final

| Métrica | Cantidad |
|---------|----------|
| Casos diseñados (matriz) | 96 |
| Requests en colección (con aserciones) | 69 |
| Ejecución manual identificable | 23 |
| PASS confirmados | 18 |
| FAIL reales | 0 |
| Ambiguos | 4 |
| Descartados (ejecución inválida) | 1 |
| Bugs encontrados | 0 |

### Evidencia que falta para completar el TP4

1. **Ejecutar la colección corregida:** correr los 69 requests (Newman o Postman Runner) y volcar los resultados reales en la matriz y en este reporte. La colección ya tiene aserciones automáticas, por lo que la ejecución es determinística.
2. **IDs de matriz sin request en la colección:** completar (o marcar explícitamente como `NO EJECUTADA` por fila) los IDs listados en la sección *No ejecutados*.
3. **Usuario VENDEDOR:** crear `vendedor_tp4` vía Django shell (el registro público asigna CLIENTE); hacer login para obtener `vendedor_token`.
4. **Identificar los ambiguos:** con la colección asertada, los 4 `POST /api/turnos/ → 400` quedan mapeados automáticamente a V-T03/V-T04/V-T05/B-03/B-04 según el body.
5. **Capturas de 401/403:** screenshots de al menos 1 respuesta 401 y 1 respuesta 403.
6. **Token expirado real (opcional):** el caso `token_expired` requiere `ACCESS_TOKEN_LIFETIME=0` en settings de test; B-13 cubre hoy el caso `token_invalid`.

---

## Pull Requests creados

No se crearon PRs. No hubo bugs del backend que corregir.

| PR | Descripción | Rama | Estado |
|----|-------------|------|--------|
| — | — | — | No aplica |
