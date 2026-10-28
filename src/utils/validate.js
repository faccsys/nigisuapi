function isPlainNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'string' && value.trim() !== '') return Number.isFinite(Number(value));
  return false;
}

function isPlainBoolean(value) {
  return typeof value === 'boolean' || value === 0 || value === 1 || value === '0' || value === '1';
}

function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  return value === 1 || value === '1';
}

function isPlainDate(value) {
  return !Number.isNaN(new Date(value).getTime());
}

/**
 * Validates and normalizes a payload against column metadata.
 * - On create (isUpdate=false): required, non-nullable columns without a DB default must be present.
 * - On update (isUpdate=true): the primary key is never accepted from the body.
 */
function validatePayload(data, columns, { isUpdate = false } = {}) {
  const errors = [];
  const value = {};
  const writable = columns.filter(
    (c) => !c.readOnly && !(isUpdate && c.pk) && !(!isUpdate && c.autoIncrement)
  );
  const writableByName = new Map(writable.map((c) => [c.name, c]));

  Object.keys(data || {}).forEach((key) => {
    if (!writableByName.has(key)) {
      errors.push(`Campo desconocido o de solo lectura: '${key}'`);
    }
  });

  writable.forEach((col) => {
    const raw = data ? data[col.name] : undefined;
    const isMissing = raw === undefined || raw === null || raw === '';

    if (isMissing) {
      if (!isUpdate && col.required) {
        errors.push(`El campo '${col.name}' es requerido`);
      }
      return;
    }

    switch (col.type) {
      case 'number':
        if (!isPlainNumber(raw)) {
          errors.push(`El campo '${col.name}' debe ser numerico`);
        } else {
          value[col.name] = Number(raw);
        }
        break;
      case 'boolean':
        if (!isPlainBoolean(raw)) {
          errors.push(`El campo '${col.name}' debe ser booleano`);
        } else {
          value[col.name] = toBoolean(raw);
        }
        break;
      case 'date':
        if (!isPlainDate(raw)) {
          errors.push(`El campo '${col.name}' debe ser una fecha valida`);
        } else {
          value[col.name] = raw;
        }
        break;
      default:
        if (typeof raw !== 'string') {
          errors.push(`El campo '${col.name}' debe ser texto`);
        } else if (col.length && raw.length > col.length) {
          errors.push(`El campo '${col.name}' excede la longitud maxima de ${col.length}`);
        } else {
          value[col.name] = raw;
        }
    }
  });

  return { errors, value };
}

module.exports = { validatePayload };
