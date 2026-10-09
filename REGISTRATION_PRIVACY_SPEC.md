# Turito — Registro, condiciones y privacidad

Especificación pendiente de implementar en los flujos **Registrar negocio** y **Unirme al equipo** de la aplicación.

Última revisión: 28 de septiembre de 2026.

## Criterio

No utilizar «Al registrarte aceptas el tratamiento de tus datos» ni mezclar todas las finalidades en una sola casilla.

- Cuenta y servicio: contrato o medidas precontractuales.
- Obligaciones fiscales, contables o laborales: obligación legal aplicable.
- Seguridad: ejecución del servicio e interés legítimo cuando proceda.
- Marketing: consentimiento separado, opcional y revocable.
- Plantilla: el negocio es normalmente responsable y Turito actúa como encargado.

## Registro de negocio

Antes de **Crear negocio** se mostrará:

> Responsable: titular legal de Turito. Finalidad: crear y proteger tu cuenta, prestar el servicio y atender soporte. Base: contrato, obligaciones legales e interés legítimo en la seguridad. Derechos: privacidad@turito.es. Más información en la Política de privacidad.

Elementos:

1. Casilla obligatoria y vacía: **«He leído y acepto las Condiciones de uso»**.
2. Enlaces visibles a `https://www.turito.es/legal.html` y `https://www.turito.es/privacy.html`.
3. Botón desactivado hasta aceptar las Condiciones.
4. Casilla opcional y vacía: **«Quiero recibir novedades y comunicaciones comerciales de Turito»**.

## Registro de trabajador

Antes de **Enviar solicitud** se mostrará:

> El negocio que te invita es responsable de los datos usados para gestionar tu relación laboral. Turito los trata por cuenta del negocio y es responsable de los datos necesarios para crear y proteger tu cuenta.

Se exigirá la misma aceptación expresa de Condiciones. No se pedirá al trabajador que consienta el registro de jornada como base general del tratamiento.

## Evidencia en backend

El backend debe impedir el alta si falta la aceptación obligatoria y guardar un evento inmutable con:

- identificador de usuario o solicitud;
- tipo y versión del documento;
- fecha UTC generada por servidor;
- contexto (`business_signup` o `worker_invitation`);
- plataforma, versión de la app e idioma.

El consentimiento comercial se guardará por separado, con fecha de alta y retirada. No registrar contraseñas, tokens ni datos salariales. La IP solo se conservará si se justifica y se define su plazo.

## Bloqueos antes del registro real

- Completar titular legal, NIF/CIF y domicilio.
- Implementar las casillas y la primera capa en ambos formularios.
- Validar la aceptación también en backend, no solo en interfaz.
- Versionar Condiciones y Política de privacidad.
- Cerrar el acuerdo de encargo con cada negocio.
- Revisión final por asesoría especializada en privacidad, laboral y SaaS.
