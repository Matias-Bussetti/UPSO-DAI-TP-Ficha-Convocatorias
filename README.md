# Trabajo Práctico:

## Ficha Convocatoria

### Consigna

- Se desea crear un documento Web que al presionar el botón _SOLICITAR CONVOCTORIA_ recupere mediante técnicas AJAX el archivo ficha_convocatorias.xml, el cual se adjunta en esta tarea.
- En una situación real, ese archivo XML se genera automáticamente en backend según los datos extraídos de una base de datos.
- Si la solicitud tiene respuesta satisfactoria, se deberá mostrar en una tabla los siguientes datos:
- Datos de la Convocatoria: expediente_numero, expediente_tipo_documentacion, expediente_ejercicio y asunto_convocatoria, en el formato TIPO NUMERO/AÑO - ASUNTO
- Datos del Pliego: retiro_pliego_direccio, retiro_pliego_plazo_horario, acto_apertura_direccion, acto_apertura_fecha_inicio y acto_apertura_horario_inicio
- Armar una tabla con las condiciones del pliego (pliegos_articulos->registro): numero, titulo y descripcion
- Por último, mostrar los datos que crea relevantes de la etiqueta get_items_solicitados que son los artículos solicitados en el pliego, por los cuales deben licitar los distintos proveedores.
- Los demás datos del archivo XMl son irrelevantes
- Al presionar nuevamente el botón SOLICITAR CONVOCATORIA no se debe agregar al final la información traída, sino que debe reemplazar el contenido anterior.
- Se requiere que el documento sea robusto, y que el usuario reciba un mensaje si ocurre algún error
- El código fuente debe estar comentariado, bien identado, con nombres de funciones y variables intuitivas y bien organizado
  Separe estructura de contenido, presentación y funciones en archivos separados
- El diseño debe ser atractivo e intuitivo
- El documento web debe ser responsivo
