const joi = require('joi');
const id = joi.number().integer();
const nombre = joi.string().min(3);
const codigo = joi.string().min(3);
const debe =  joi.number().positive();
const haber =  joi.number().positive();

const createcuentaSchema = joi.object({
  negocioId: id.required(),
  nombre: nombre.required(),
  codigo: codigo.required()
});
const updatecuentaSchema = joi.object({
  nombre,
  codigo,
  debe,
  haber
});
const getcuentaSchema = joi.object({
  negocioId: id.required(),
  cuentaId: id.required()
});

module.exports = {
  createcuentaSchema,
  updatecuentaSchema,
  getcuentaSchema
  };
