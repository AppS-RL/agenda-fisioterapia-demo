# Publicación de la agenda demo

Esta versión está preparada para mostrarse a posibles clientes sin conectarse a la agenda ni a la base de datos de ningún negocio real.

## Privacidad de la demostración

- Las citas se guardan únicamente en `localStorage`, dentro del navegador que abre la demo.
- No existen funciones de servidor, API, autenticación ni conexión con Google Sheets.
- No se incluyen claves, contraseñas, cuentas bancarias, domicilios ni nombres reales.
- Borrar los datos del sitio en el navegador elimina las citas creadas durante la prueba.

## Publicación

Puede publicarse como sitio estático en GitHub Pages, Cloudflare Pages, Netlify o cualquier hospedaje de archivos HTML.

- Comando de compilación: ninguno.
- Directorio de salida: la raíz del proyecto.
- Archivo de entrada: `index.html`.

## Antes de convertirla en una agenda real

1. Sustituir el nombre y el identificador visual del negocio.
2. Configurar servicios, horarios, dirección, ubicación y políticas.
3. Configurar los datos bancarios únicamente con autorización del negocio.
4. Diseñar una conexión nueva y aislada para la información del cliente.
5. Añadir autenticación y controles de acceso antes de almacenar datos reales en línea.

