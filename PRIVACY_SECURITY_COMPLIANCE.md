# Turito — Plan de privacidad, seguridad y cumplimiento

> Documento interno de trabajo. No sustituye la revisión de un profesional jurídico. No declarar el producto «conforme» hasta cerrar todos los bloqueos de la sección 2.

Última revisión: 23 de septiembre de 2026.

## 1. Criterio de cumplimiento

Turito necesita separar dos funciones jurídicas:

1. **Turito como responsable del tratamiento**: cuentas de clientes, contratación, facturación, soporte, comunicaciones comerciales, seguridad del servicio y gestión de solicitudes de derechos.
2. **Turito como encargado del tratamiento**: datos de trabajadores que cada negocio introduce para organizar su plantilla. El negocio cliente será normalmente el responsable y deberá dar instrucciones documentadas a Turito mediante un acuerdo de tratamiento de datos (DPA).

Los textos públicos son solo una parte. El cumplimiento exige que las políticas coincidan con el producto real, los contratos, los proveedores, las medidas de seguridad y los procedimientos internos.

## 2. Bloqueos antes de producción

### P0 — Impiden un lanzamiento comercial correcto

- [ ] Completar titular legal: nombre o razón social, NIF/CIF, domicilio, email legal y datos registrales si existen.
- [ ] Confirmar quién factura el servicio y si existe sociedad, autónomo o proyecto pre-constitución.
- [ ] Firmar o aceptar los DPA de Supabase, Google/Firebase, Apple y cualquier proveedor de email, soporte, pagos o monitorización.
- [ ] Confirmar la región real de Supabase y documentar cualquier transferencia internacional y su garantía.
- [ ] Crear el DPA Turito–cliente conforme al artículo 28 RGPD, con anexo de datos, finalidades, medidas técnicas y subencargados.
- [ ] Crear el Registro de Actividades de Tratamiento de Turito como responsable y como encargado.
- [ ] Aprobar una tabla de conservación y automatizar borrado, bloqueo o anonimización.
- [ ] Implementar procedimiento verificable de acceso, rectificación, supresión, oposición, limitación y portabilidad.
- [ ] Implementar baja de cuenta/empresa sin destruir registros laborales que el cliente deba conservar legalmente.
- [ ] Añadir información de primera capa en registro, invitación, soporte, newsletter y activación de notificaciones.
- [ ] Preparar protocolo de incidentes y brechas, registro de incidentes y responsables de decisión dentro del plazo de 72 horas.
- [ ] Realizar análisis de riesgos RGPD y documentar si procede o no una Evaluación de Impacto (EIPD).
- [ ] Revisión final por asesoría especializada en privacidad, laboral y SaaS antes del lanzamiento.

### P1 — Seguridad y operación necesaria

- [ ] MFA obligatorio para cuentas de administración de Supabase, GitHub, Firebase, Apple Developer, registrador y correo.
- [ ] Inventario y rotación de secretos; prohibición de secretos de servidor en clientes, repositorios y registros.
- [ ] Política de acceso interno con mínimo privilegio, altas/bajas y revisión trimestral.
- [ ] Copias de seguridad verificadas y prueba periódica de restauración.
- [ ] Política de parches y dependencias con revisión de vulnerabilidades.
- [ ] Pruebas automáticas de aislamiento entre empresas y permisos en cada migración.
- [ ] Retención y depuración de logs para impedir que contraseñas, tokens, salarios o notas aparezcan en registros técnicos.
- [ ] Plan de respuesta ante indisponibilidad y recuperación.
- [ ] Cabeceras HTTP en producción: HSTS, CSP mediante cabecera, `X-Content-Type-Options`, `Permissions-Policy` y protección frente a framing. La CSP por `meta` añadida a la landing es una defensa parcial; GitHub Pages no permite gestionar todas las cabeceras.
- [ ] Verificar la sesión web. En Android se cifra con AES-GCM/Android Keystore y en iOS se usa Keychain, pero web utiliza el almacenamiento por defecto de la librería de autenticación y depende especialmente de prevenir XSS.

## 3. Inventario de datos verificado en el producto

| Categoría | Datos | Interesados | Uso |
|---|---|---|---|
| Identificación | nombre, email, identificadores internos, avatar | encargados y trabajadores | cuenta, invitación y perfil |
| Organización | empresa, rol, estado, zonas y puestos | encargados y trabajadores | gestión de plantilla |
| Disponibilidad | fecha, tramo, estado y nota libre | trabajadores | preparar cuadrantes |
| Planificación | fechas, entrada/salida, zona, puesto y estado | trabajadores | publicar turnos |
| Jornada | entrada/salida real, correcciones, motivo y nota | trabajadores | registro horario y cierre |
| Retribución | tipo de salario, importe por hora o mensual, moneda y horas contratadas | trabajadores | estimación y cálculo de costes |
| Comunicaciones | avisos, recordatorios, lectura y tokens de dispositivo | usuarios | notificaciones operativas |
| Auditoría | usuario actor, entidad, acción, fecha y detalles | usuarios | trazabilidad y seguridad |
| Suscripción | plan, estado, periodo y número de plazas | negocios | acceso y facturación futura |
| Técnicos | sesión, dispositivo, plataforma, errores y metadatos de infraestructura | usuarios | autenticación, seguridad y soporte |

Las notas libres pueden contener datos inesperados. Deben limitarse, advertir al usuario para que no incluya salud, afiliación sindical u otras categorías especiales y aplicar controles de longitud y acceso.

## 4. Mapa de finalidades y bases jurídicas propuesto

La asesoría deberá validar este mapa con el modelo contractual final.

| Tratamiento | Papel de Turito | Base propuesta | Observación |
|---|---|---|---|
| Alta del negocio, cuenta y prestación SaaS | Responsable | ejecución del contrato | informar antes del registro |
| Soporte solicitado | Responsable | ejecución del contrato / interés legítimo | conservar solo lo necesario |
| Seguridad, antifraude y auditoría | Responsable | interés legítimo y obligación legal | documentar ponderación |
| Facturación y contabilidad | Responsable | contrato y obligación legal | incorporar proveedor de pagos cuando exista |
| Marketing por email | Responsable | consentimiento | separado, revocable y no premarcado |
| Plantilla, salarios, disponibilidad y jornadas | Encargado | instrucciones del negocio cliente | requiere DPA; el cliente define su base jurídica laboral |
| Notificaciones de turno | Encargado | instrucciones del negocio / prestación | permiso del sistema operativo no equivale por sí solo a base RGPD |

No se han identificado decisiones automatizadas con efectos jurídicos. Turito no debe presentar la disponibilidad como asignación automática ni calcular decisiones laborales sin intervención del encargado.

## 5. Conservación propuesta para aprobación

| Información | Plazo propuesto | Acción final |
|---|---|---|
| Registros diarios de jornada | 4 años | bloqueo y eliminación al vencer, salvo litigio |
| Cuadrantes vinculados al registro | 4 años | eliminar o anonimizar tras el plazo |
| Disponibilidad no convertida en jornada | 12 meses | eliminación automática |
| Notificaciones operativas | 90 días | eliminación automática |
| Tokens push | hasta baja, revocación o 90 días de inactividad | desactivar y eliminar |
| Logs de seguridad | 12 meses | eliminación o agregación |
| Tickets de soporte | 24 meses desde cierre | eliminación, salvo disputa |
| Auditoría laboral | 4 años cuando respalde registros | eliminar o anonimizar |
| Caché local | hasta logout/borrado de app | purga inmediata |
| Backups | 30 días rotatorios | sobrescritura segura |
| Datos contractuales/fiscales | plazo legal aplicable | confirmar con asesoría fiscal |

El Estatuto de los Trabajadores exige conservar el registro diario de jornada durante cuatro años. La supresión de una cuenta no debe borrar esos registros si el negocio tiene obligación de conservarlos; deben bloquearse y quedar accesibles solo para la finalidad legal.

## 6. Subencargados que deben documentarse

| Proveedor | Función actual o prevista | Verificación pendiente |
|---|---|---|
| Supabase | autenticación, PostgreSQL, API, funciones y tiempo real | entidad contractual, DPA, región, copias y transferencias |
| Google Firebase | entrega push Android | DPA, datos enviados, región y transferencias |
| Apple APNs | entrega push iOS | condiciones, datos enviados y transferencias |
| GitHub Pages | hosting web actual | idoneidad para producción y datos técnicos de acceso |
| Proveedor de correo | confirmación, soporte y avisos | aún no definido |
| Proveedor de pagos | suscripciones futuras | aún no definido |

Mantener una lista pública de subencargados y un mecanismo para informar a los clientes antes de cambios relevantes.

## 7. Contenido mínimo del DPA con clientes

- Objeto, duración, naturaleza y finalidad del tratamiento.
- Categorías de interesados y tipos de datos.
- Tratamiento solo bajo instrucciones documentadas.
- Confidencialidad de las personas autorizadas.
- Medidas técnicas y organizativas anexas.
- Régimen de subencargados y aviso de cambios.
- Asistencia en derechos, brechas, análisis de riesgos y EIPD.
- Notificación de incidentes del encargado al cliente sin dilación indebida, con un SLA interno corto.
- Devolución o eliminación de datos al terminar, respetando bloqueo y conservación legal.
- Evidencias, auditorías y cooperación.
- Ubicación y transferencias internacionales.

## 8. Controles técnicos ya presentes

- RLS habilitada en todas las tablas de negocio identificadas.
- Revocación del acceso anónimo y permisos explícitos para usuarios autenticados.
- Separación por empresa y claves foráneas compuestas para evitar referencias cruzadas.
- Salarios visibles solo para responsables y para el propio trabajador.
- Tokens push no legibles directamente desde clientes.
- Funciones de backend con secretos de Firebase/APNs fuera de la aplicación cliente.
- Realtime privado por empresa.
- Registro de acciones relevantes y correcciones de jornada.
- Sesión Android cifrada con AES-GCM y clave de Android Keystore.
- Sesión iOS guardada en Keychain y ligada al dispositivo.
- Caché local purgable por usuario.
- Pruebas SQL de aislamiento, salarios, suspensiones, tokens push, cierres y suscripciones.

Estos controles son positivos, pero no sustituyen una revisión de configuración real en producción ni pruebas de intrusión.

## 9. Derechos de las personas

Crear un procedimiento único en `caserojavier3@gmail.com` mientras no exista un buzón de privacidad corporativo:

1. Registrar fecha, identidad, derecho solicitado y responsable interno.
2. Verificar identidad sin recopilar documentación excesiva.
3. Determinar si Turito actúa como responsable o debe reenviar la solicitud al negocio cliente.
4. Bloquear cambios destructivos mientras se tramita.
5. Responder en un mes, registrando prórrogas justificadas cuando procedan.
6. Exportar datos en formato legible y, para portabilidad cuando aplique, estructurado.
7. Registrar la resolución y las acciones técnicas sin conservar más documentación de la necesaria.

La aplicación necesita herramientas internas para exportar el perfil completo, desactivar sesiones, anonimizar lo no sujeto a conservación y eliminar tokens/dispositivos.

## 10. Protocolo mínimo de brechas

1. Contener el incidente, preservar evidencias y rotar credenciales expuestas.
2. Registrar hechos, sistemas, categorías de datos, personas afectadas y cronología.
3. Evaluar riesgo para derechos y libertades, no solo impacto empresarial.
4. Avisar al negocio cliente inmediatamente si Turito actúa como encargado.
5. Si Turito es responsable y existe riesgo, notificar a la AEPD dentro de 72 horas desde que se tenga constancia.
6. Si el riesgo es alto, comunicar también a las personas afectadas en lenguaje claro.
7. Documentar siempre la decisión, incluso cuando no se notifique.
8. Ejecutar correcciones y una revisión posterior con responsables y fechas.

## 11. Cookies y tecnologías equivalentes

- La landing ya no usa cookies ni `localStorage`; se eliminó el aviso que existía únicamente para recordarse a sí mismo.
- El panel utiliza almacenamiento de sesión estrictamente necesario. Debe documentarse con el nombre real de la clave y su duración cuando el despliegue sea definitivo.
- No incorporar analítica, píxeles o chat de terceros sin actualizar el inventario y, cuando proceda, bloquearlos hasta obtener consentimiento.
- Si se añaden cookies no esenciales, `Aceptar` y `Rechazar` deben aparecer al mismo nivel y con visibilidad equivalente, con panel granular y retirada sencilla.

## 12. Evidencias que deben mantenerse

- RAT y versiones de políticas.
- DPA con clientes y proveedores.
- Lista y cambios de subencargados.
- Análisis de riesgos y decisión de EIPD.
- Matriz de accesos y revisiones.
- Pruebas de RLS, seguridad y restauración.
- Registro de derechos e incidentes.
- Ponderaciones de interés legítimo.
- Consentimientos de marketing y retirada.
- Formación y compromisos de confidencialidad.

## 13. Fuentes regulatorias de referencia

- RGPD, en especial artículos 5, 6, 12–22, 25, 28, 30, 32–35: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679
- AEPD — deber de información: https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/6-el-deber-de-informacion/FAQ-0217-que-informacion-debe-facilitarse-cuando-los-datos-se-obtengan-directamente-del-afectado
- AEPD — contratos de encargado: https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/8-responsable-y-encargado-del-tratamiento/FAQ-0238-cual-seria-el-contenido-del-contrato-de-encargo-de-tratamiento
- AEPD — privacidad desde el diseño: https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/9-analisis-de-riesgos/FAQ-0224-que-es-la-proteccion-de-datos-desde-el-diseno-y-por-defecto
- AEPD — brechas de datos: https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/brechas-de-datos-personales-notificacion
- AEPD — guía de cookies (mayo de 2024): https://www.aepd.es/guias/guia-cookies.pdf
- Estatuto de los Trabajadores, artículo 34.9: https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430
