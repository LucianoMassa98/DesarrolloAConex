 const joi = require('joi');
const id = joi.number().positive();

const cantidad = joi.number().positive();
const monto = joi.number().positive();
const precio = joi.number().positive();
const confirmDeposito = joi.boolean();
const confirmCobro = joi.boolean();
const detalle = joi.boolean();
const dateDesde = joi.date();
const dateHasta = joi.date();
const limit = joi.number().integer();
const offset = joi.number().integer();

const createventaSchema = joi.object({
  negocioId: id.required(),
  clienteId: id.required(),
  usuarioId: id.required(),
});
const updateventaSchema = joi.object({
  confirmDeposito,
  confirmCobro
});
const getventaSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required()
});

const addItemSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required(),
  productoId: id.required(),
  cantidad: cantidad.required(),
  valor: precio.required()

});
const subItemSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required(),
  productoId: id.required()
});
const addCobroSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required(),
  cuentaId: id.required(),
  monto: monto.required()

});

const subCobroSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required(),
  cobroId: id.required()
});
const addCobroPendienteSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required(),
  cuentaId: id.required(),
  monto: monto.required()

});
const subCobroPendienteSchema = joi.object({
  negocioId: id.required(),
  ventaId: id.required(),
  cobroIdPendiente: id.required()
});
const queryCompraSchema = joi.object({
  limit,
  offset,
  dateDesde,
  dateHasta,
  confirmDeposito,
  detalle,
  confirmCobro: confirmCobro.when('confirm_deposito',{
    is: true,
    then: joi.required()
  })
});

module.exports = {
  createventaSchema,
  updateventaSchema,
  getventaSchema,
  queryCompraSchema,
  addItemSchema,
  subItemSchema,
  addCobroSchema,
  subCobroSchema,
  addCobroPendienteSchema,
  subCobroPendienteSchema,
  };
