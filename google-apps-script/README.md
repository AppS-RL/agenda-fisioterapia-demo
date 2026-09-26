# Conexión con Google Sheets

1. Abre **Base de datos de demos** y entra a **Extensiones → Apps Script**.
2. Copia el contenido de `Code.gs`.
3. Ejecuta `setupAgendaCompleta` y autoriza el acceso.
4. Copia la clave del registro de ejecución.
5. Implementa como **Aplicación web**, ejecutando como propietario y con acceso para cualquier usuario con el enlace.
6. Guarda la URL `/exec` y la clave como secretos del puente seguro. La app pública solo debe incluir la dirección del puente en `js/cloud-config.js`.
