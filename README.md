# TURU landing

Landing estatica para `www.turito.es`.

## Archivos principales

- `index.html`: pagina principal con hero, producto, acceso, precios y enlaces de ayuda.
- `privacy.html`: politica de privacidad inicial.
- `cookies.html`: politica de cookies y almacenamiento tecnico.
- `legal.html`: aviso legal inicial.
- `faq.html`: preguntas frecuentes.
- `guia.html`: guia de producto y primeros pasos.
- `PRIVACY_SECURITY_COMPLIANCE.md`: auditoria interna y plan previo al lanzamiento.
- `robots.txt` y `sitemap.xml`: preparacion SEO basica.

## Acceso al panel

La landing no autentica usuarios ni recibe contraseñas. Todos los enlaces de acceso llevan a `https://app.turito.es/`, donde la aplicación web gestiona el login, el registro y la sesión con Supabase.

Este flujo es necesario porque `www.turito.es` y `app.turito.es` son orígenes distintos y no comparten el almacenamiento local de sesión del navegador. Autenticar directamente en el panel evita transferir tokens por la URL y mantiene la sesión disponible para la aplicación.

`app-config.js` contiene `appUrl`, la dirección pública del panel. Los enlaces conservan también esa URL en el HTML para funcionar aunque JavaScript no se cargue.

### Requisitos para que el enlace funcione en producción

1. Integrar en la rama `main` de la aplicación el target web y el workflow `deploy-web-app.yml`.
2. Activar GitHub Pages con `GitHub Actions` como fuente en el repositorio de la aplicación.
3. Sustituir el destino DNS actual de `app.turito.es` por un CNAME a `Javicas20.github.io`.
4. Configurar `app.turito.es` como dominio personalizado de GitHub Pages y esperar a que el certificado HTTPS esté activo.
5. Mantener `https://app.turito.es/**` entre las Redirect URLs autorizadas de Supabase Auth.

Hasta completar esos pasos, `app.turito.es` puede redirigir a la landing o fallar por HTTPS aunque los enlaces de la landing ya apunten al destino correcto.

## Publicar `www.turito.es`

1. Publica esta carpeta en GitHub Pages usando el workflow del repositorio (`.github/workflows/deploy-landing.yml`).
2. En GitHub, entra en `Settings > Pages`, selecciona `GitHub Actions` como fuente y espera al primer despliegue.
3. En el registrador del dominio, crea el CNAME `www` apuntando a `JaviWL.github.io`.
4. En GitHub Pages, añade el dominio personalizado `www.turito.es` y activa HTTPS.
5. Configura `turito.es` con una redirección al `www` o con los registros A/ALIAS que indique el registrador.
6. En Supabase, abre `Authentication > URL Configuration` y añade `https://www.turito.es/**` y `https://turito.es/**` a `Redirect URLs`.
7. Publica la aplicación web en `https://app.turito.es/` y verifica que su pantalla de autenticación carga correctamente.

## Pendiente antes de publicar

- Completar datos reales del titular en `legal.html`.
- Sustituir la politica de privacidad inicial por la version revisada con identidad, proveedores, plazos y bases juridicas definitivas.
- Cerrar todos los bloqueos P0 de `PRIVACY_SECURITY_COMPLIANCE.md`.
