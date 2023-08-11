const joi = require('joi');
const pagoId = joi.number().integer();
const compraId = joi.number().integer();
const negocioId = joi.number().integer();
const proveedorId = joi.number().integer();
const monto = joi.number().integer();
const cuentaId = joi.number().integer();

const createpagoSchema = joi.object({
  negocioId: negocioId.required(),
  compraId: compraId.required(),
  cuentaId: cuentaId.required(),
  monto: monto.required()
});
const updatepagoSchema = joi.object({
  monto
});
const getpagoSchema = joi.object({
  negocioId: negocioId.required(),
  pagoId: pagoId.required()
});

module.exports = {
  createpagoSchema,
  updatepagoSchema,
  getpagoSchema
  };
