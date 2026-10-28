// Metadata de la tabla genpclplan (Planes/items contratados por un cliente),
// obtenida directamente del catalogo de SQL Anywhere via la DSN 'sql tvnet'.
// pvlplannumtrx es la PK y SI es autoincremental (default = 'autoincrement'
// en la base) -> la API nunca la pide al crear, la devuelve en la respuesta.
module.exports = [
  { name: 'pvlplannumtrx', type: 'number', pk: true, autoIncrement: true, description: 'Numero de transaccion del plan (autogenerado por la base)' },
  { name: 'percodigo', type: 'number', description: 'Codigo del cliente (FK genpcl00.percodigo)' },
  { name: 'artcodigo', type: 'number', description: 'Codigo de articulo/plan (FK genart00)' },
  { name: 'dmvcantidad', type: 'number', description: 'Cantidad' },
  { name: 'dmvpvta', type: 'number', description: 'Precio de venta' },
  { name: 'tdocodigo', type: 'number', description: 'Codigo de tipo de documento' },
  { name: 'pclplanfechainicio', type: 'date', description: 'Fecha de inicio del plan' },
  { name: 'pclplanfrqven', type: 'number', description: 'Frecuencia de venta/facturacion' },
  { name: 'addcodigo', type: 'number', description: 'Codigo de direccion asociada (FK genperad.addcodigo)' },
  { name: 'pclplanpordscto', type: 'number', description: 'Porcentaje de descuento' },
  { name: 'pclplanvaldscto', type: 'number', description: 'Valor de descuento' },
  { name: 'plclplanvalor', type: 'number', description: 'Valor del plan' },
  { name: 'dtoacceso', type: 'number', description: 'Codigo de descuento de acceso' },
  { name: 'pclgenerarcxc', type: 'string', length: 1, description: 'Generar cuenta por cobrar (S/N)' },
  { name: 'pclplanobserv', type: 'string', length: 250, description: 'Observaciones del plan' },
  { name: 'pcldscto3eraedad', type: 'string', length: 1, description: 'Descuento tercera edad (S/N)' },
  { name: 'pcldsctodiscapacidad', type: 'string', length: 1, description: 'Descuento discapacidad (S/N)' },
  { name: 'pcldsctobonosolidario', type: 'string', length: 1, description: 'Descuento bono solidario (S/N)' },
  { name: 'pcldsctobonogerencia', type: 'string', length: 1, description: 'Descuento bono gerencia (S/N)' },
  { name: 'dmvpvtaold', type: 'number', description: 'Precio de venta anterior' },

  // Columnas de auditoria
  { name: 'usralt', type: 'string', readOnly: true, description: 'Usuario que creo el registro' },
  { name: 'usrchg', type: 'string', readOnly: true, description: 'Usuario que modifico el registro' },
  { name: 'fecalt', type: 'date', readOnly: true, description: 'Fecha de creacion' },
  { name: 'fecchg', type: 'date', readOnly: true, description: 'Fecha de modificacion' },
  { name: 'hosalt', type: 'string', readOnly: true, description: 'Host/IP de creacion' },
  { name: 'hoschg', type: 'string', readOnly: true, description: 'Host/IP de modificacion' },
];
