# Registro de municipalidades interesadas

Pagina independiente del formulario para compartir durante una presentacion. Incluye sus propios estilos, codigo e imagenes. No requiere la guia completa ni una cuenta de ChatGPT.

## Publicar y compartir

1. Descomprime `registro-municipalidades-2026-10-10.zip`.
2. Sube todo su contenido a tu alojamiento, conservando la carpeta `assets`.
3. Deja `index.html` en la raiz de ese sitio.
4. Comparte la direccion publica con los funcionarios. Para un QR de la presentacion, utiliza esa direccion publicada.

Tambien puedes subir la carpeta `RegistroMunicipalidades` junto a la web completa y compartir la direccion que termine en `/RegistroMunicipalidades/`.

Para revisar el formulario localmente, abre el `index.html` de esta carpeta.

## Conexion existente

`registro.js` conserva la misma direccion de Apps Script que `app.js` de la guia:

https://script.google.com/macros/s/AKfycbxlG32r0qH5MEjenSVBpeqAbJ2bkimRaU7_mJdddmXSvlKgpvAbtB0PZs8TIJLMbuM/exec

Envia los mismos 11 campos: `fecha`, `nombre`, `cargo`, `municipalidad`, `region`, `provincia`, `distrito`, `correo`, `telefono`, `fase`, `necesidad`.

La hoja utilizada anteriormente es:

https://docs.google.com/spreadsheets/d/1oTEStAnbTAOVkOCb5ZhWTUqWG4bKXxrlpL2zAmk06UY/edit?usp=sharing

Los campos de gestion `estado`, `prioridad`, `responsable`, `ultima_atencion` y `proxima_accion` se gestionan en Apps Script o en la hoja. La pagina no los sobrescribe.

## Comprobar antes de la presentacion

1. Desde la direccion publicada, envia una solicitud identificada como `PRUEBA PRESENTACION`.
2. Abre tu hoja y confirma que haya una nueva fila en `Solicitudes`.
3. Verifica region, provincia y distrito en columnas separadas.

El navegador envia mediante `no-cors` y no puede leer la respuesta del servidor para confirmar que la fila quedo guardada. El mensaje de envio no sustituye la comprobacion en la hoja.

El destino real depende del Apps Script que ya tienes implementado. Si cambias la implementacion y su direccion, actualiza `assistanceEndpoint` en `registro.js` y vuelve a subir esta pagina.

Esta pagina no publica registros ni incluye acceso al dashboard o a la hoja de datos.
