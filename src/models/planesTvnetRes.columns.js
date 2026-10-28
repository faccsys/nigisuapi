// Vista dbo.v_Fc_PlanesTvnetRes: resumen de planes contratados por cliente/direccion
// (agrupa v_fc_PlanesTvnet por percodigo+addcodigo, con el nombre del primer
// articulo y la suma de los valores). Es una vista de solo lectura: no tiene
// llave primaria real ni admite INSERT/UPDATE/DELETE.
module.exports = [
  {
    name: 'percodigo',
    type: 'number',
    readOnly: true,
    description: 'Codigo de persona/cliente',
  },
  {
    name: 'addcodigo',
    type: 'number',
    readOnly: true,
    description: 'Codigo de direccion/instalacion (puede ser nulo)',
  },
  {
    name: 'artnombre',
    type: 'string',
    length: 250,
    readOnly: true,
    description: 'Nombre del plan/articulo (primero del grupo)',
  },
  {
    name: 'valtot',
    type: 'number',
    readOnly: true,
    description: 'Suma del valor total de los planes del grupo',
  },
];
