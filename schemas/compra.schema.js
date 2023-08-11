const joi = require('joi');
const id = joi.number().integer();
const fecha = joi.date();
const cantidad = joi.number().positive();
const valor = joi.number().positive();
const confirmDeposito = joi.boolean();
const confirmPago = joi.boolean();
const limit = joi.number().integer();
const offset = joi.number().integer();
const createcompraSchema = joi.object({
  negocioId: id.required(),
  proveedorId: id.required(),
  usuarioId: id.required()
});
const updatecompraSchema = joi.object({

  confirmDeposito,
  confirmPago
});
const getcompraSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required()
});

const addItemSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required(),
  productoId: id.required(),
  cantidad: cantidad.required(),
  valor: valor.required()

});
const subItemSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required(),
  productoId: id.required()

});

const addPagoSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required(),
  cuentaId: id.required(),
  monto: valor.required()

});
const subPagoSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required(),
  pagoId: id.required()

});

const addPagoPendienteSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required(),
  cuentaId: id.required(),
  monto: valor.required()

});
const subPagoPendienteSchema = joi.object({
  negocioId: id.required(),
  compraId: id.required(),
  pagoId: id.required()

});


const queryCompraSchema = joi.object({
  limit,
  offset,
  fecha,
  confirmDeposito,
  confirmPago: confirmPago.when('confirm_deposito',{
    is: true,
    then: joi.required()
  })
});

module.exports = {
  createcompraSchema,
  updatecompraSchema,
  getcompraSchema,
  queryCompraSchema,
  addItemSchema,
  subItemSchema,
  addPagoSchema,
  subPagoSchema,
  addPagoPendienteSchema,
  subPagoPendienteSchema,
  };
