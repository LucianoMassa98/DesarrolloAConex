const joi = require('joi');
const id = joi.number().integer();
const nombre = joi.string().min(3);
const importe =  joi.number().positive();
const creategastoSchema = joi.object({
  negocioId: id.required(),
  usuarioId: id.required(),
  cuentaEmisorId: id.required(),
  cuentaReceptorId: id.required(),
  monto: importe.required()
});
const updategastoSchema = joi.object({
//--
});
const getgastoSchema = joi.object({
  negocioId: id.required(),
  gastoId: id.required()
});

module.exports = {
  creategastoSchema,
  updategastoSchema,
  getgastoSchema
  };
