// Metadata de la tabla genperad (Direcciones adicionales / datos de servicio
// de una persona), obtenida directamente del catalogo de SQL Anywhere via la
// DSN 'sql tvnet'. addcodigo es la PK (NO autoincremental: el cliente debe
// enviarla, igual que percodigo en genper00/genpcl00). percodigo es la FK
// hacia genper00.percodigo.
module.exports = [
  { name: 'percodigo', type: 'number', required: true, description: 'Codigo de la persona (FK genper00.percodigo)' },
  { name: 'perdireccion', type: 'string', length: 500, description: 'Direccion' },
  { name: 'perreferencia', type: 'string', length: 500, description: 'Punto de referencia' },
  { name: 'pertelefono', type: 'string', length: 30, description: 'Telefono' },
  { name: 'perfax', type: 'string', length: 30, description: 'Fax' },
  { name: 'tdicodigo', type: 'number', required: true, description: 'Codigo de tipo de direccion/instalacion' },
  { name: 'permonitoreo', type: 'string', length: 30, description: 'Codigo de monitoreo' },
  { name: 'perestatus', type: 'boolean', description: 'Estatus activo/inactivo' },
  { name: 'addcodigo', type: 'number', pk: true, required: true, description: 'Codigo unico de la direccion (clave primaria)' },
  { name: 'peremail', type: 'string', length: 1000, description: 'Correo electronico de esta direccion' },
  { name: 'percontrato', type: 'string', length: 10, description: 'Numero de contrato' },
  { name: 'peradfecini', type: 'date', description: 'Fecha de inicio del servicio en esta direccion' },
  { name: 'peradfecfin', type: 'date', description: 'Fecha de fin del servicio en esta direccion' },
  { name: 'peradtc', type: 'string', length: 1, description: 'Tipo de direccion (T=titular, etc.)' },
  { name: 'perautdebito', type: 'string', length: 20, description: 'Cuenta de auto-debito' },
  { name: 'pclnaps', type: 'string', length: 100, description: 'NAPS' },
  { name: 'pcldireccionip', type: 'string', length: 50, description: 'Direccion IP asignada' },
  { name: 'pclplan', type: 'string', length: 50, description: 'Plan asignado (texto libre)' },
  { name: 'zoncodigo', type: 'number', description: 'Codigo de zona' },
  { name: 'perfecinstalacion', type: 'date', description: 'Fecha de instalacion' },
  { name: 'perproximafact', type: 'number', description: 'Dia de proxima facturacion' },
  { name: 'pclfecreinstalacion', type: 'date', description: 'Fecha de reinstalacion' },
  { name: 'pclfecprorroga', type: 'date', description: 'Fecha de prorroga' },
  { name: 'pclfecactualizacion', type: 'date', description: 'Fecha de ultima actualizacion de plan' },
  { name: 'pclvaltotalplan', type: 'number', description: 'Valor total del plan' },
  { name: 'percodcorp', type: 'number', description: 'Codigo de persona corporativa relacionada' },
  { name: 'mtvcodigo', type: 'number', description: 'Codigo de motivo' },
  { name: 'pclfecmtv', type: 'date', description: 'Fecha del motivo' },
  { name: 'pclpagoparciales', type: 'string', length: 1, description: 'Acepta pagos parciales (S/N)' },
  { name: 'peradrazoncomercial', type: 'string', length: 250, description: 'Razon comercial' },
  { name: 'pclfecactprog', type: 'date', description: 'Fecha de actualizacion programada' },
  { name: 'pclvalmanutencion', type: 'number', description: 'Valor de manutencion' },
  { name: 'pclreportable', type: 'string', length: 1, description: 'Reportable (S/N)' },

  // Columna calculada
  { name: 'perfecinstalacions', type: 'string', readOnly: true, description: 'Fecha de instalacion en formato texto (calculada)' },

  // Columnas de auditoria
  { name: 'usralt', type: 'string', readOnly: true, description: 'Usuario que creo el registro' },
  { name: 'usrchg', type: 'string', readOnly: true, description: 'Usuario que modifico el registro' },
  { name: 'fecalt', type: 'date', readOnly: true, description: 'Fecha de creacion' },
  { name: 'fecchg', type: 'date', readOnly: true, description: 'Fecha de modificacion' },
  { name: 'hosalt', type: 'string', readOnly: true, description: 'Host/IP de creacion' },
  { name: 'hoschg', type: 'string', readOnly: true, description: 'Host/IP de modificacion' },
];
