const joi = require('joi');
const categoriaId = joi.number().integer();
const negocioId = joi.number().integer();
const nombre = joi.string().min(3);

const createcategoriaSchema = joi.object({
  negocioId: negocioId.required(),
  nombre: nombre.required()
});
const updatecategoriaSchema = joi.object({
  nombre
});
const getcategoriaSchema = joi.object({

  negocioId: negocioId.required(),
  categoriaId: categoriaId.required()
});

module.exports = {
  createcategoriaSchema,
  updatecategoriaSchema,
  getcategoriaSchema
  };
