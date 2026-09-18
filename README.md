# TURU landing

Landing estatica para `www.turito.es`.

## Archivos principales

- `index.html`: pagina principal con hero, producto, acceso, FAQ y banner de cookies.
- `privacy.html`: politica de privacidad inicial.
- `cookies.html`: politica de cookies inicial.
- `legal.html`: aviso legal inicial.
- `faq.html`: preguntas frecuentes.
- `robots.txt` y `sitemap.xml`: preparacion SEO basica.

## Backend y acceso

La landing ya usa Supabase Auth desde el navegador con la publishable key. El login valida el correo y la contrasena contra el mismo proyecto que usa la app. No se incluye ninguna service-role key.

`app-config.js` contiene la configuracion publica del navegador:

- `supabaseUrl`: URL del proyecto Supabase.
- `supabasePublishableKey`: clave publica para clientes.
- `appUrl`: URL del panel web. Mientras este vacia, el login valida correctamente pero muestra que el panel web aun no esta publicado.
- `authRedirectUrl`: URL que debe autorizarse en Supabase para confirmacion y recuperacion de cuenta.

La aplicacion actual es Kotlin Multiplatform para Android, iOS y escritorio; no tiene target web. Para que el boton pueda abrir un panel desde `www.turito.es` hay que publicar una interfaz web o crear un target web KMP y poner su URL en `appUrl`. La landing no puede convertir automaticamente la app de escritorio en una web.

## Publicar `www.turito.es`

1. Publica esta carpeta en GitHub Pages usando el workflow del repositorio (`.github/workflows/deploy-landing.yml`).
2. En GitHub, entra en `Settings > Pages`, selecciona `GitHub Actions` como fuente y espera al primer despliegue.
3. En el registrador del dominio, crea el CNAME `www` apuntando a `JaviWL.github.io`.
4. En GitHub Pages, añade el dominio personalizado `www.turito.es` y activa HTTPS.
5. Configura `turito.es` con una redirección al `www` o con los registros A/ALIAS que indique el registrador.
6. En Supabase, abre `Authentication > URL Configuration` y añade `https://www.turito.es/**` y `https://turito.es/**` a `Redirect URLs`.
7. Cuando exista el panel web, cambia `appUrl` en `app-config.js` y vuelve a publicar.

## Pendiente antes de publicar

- Completar datos reales del titular en `legal.html`.
- Revisar la politica de privacidad con los servicios finales usados en produccion.
