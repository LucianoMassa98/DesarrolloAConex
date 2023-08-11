const joi = require('joi');
const id = joi.number().integer();
const categoriaId = joi.number().integer();
//const codBarra = joi.string();
const nombre = joi.string().min(3);
const codigo = joi.string().min(3);
const valor =  joi.number().positive();
const cantidad =  joi.number().positive();
const valor_min =  joi.number().positive();
const valor_max =  joi.number().positive();
const descripcion = joi.string();
const imagen = joi.string().uri();
//const cantidad =  joi.number().positive();
const margen =  joi.number().positive();

const limit = joi.number().integer();
const offset = joi.number().integer();
const createproductoSchema = joi.object({
  negocioId: categoriaId.required(),
  categoriaId: id.required(),
  codigo: codigo,
  nombre: nombre.required(),
  imagen,
  descripcion: descripcion.required(),
  cantidad: cantidad.required(),
  valor: valor.required(),
  margen: margen.required(),

});
const updateproductoSchema = joi.object({
 imagen,
 nombre,
 cantidad,
 valor,
 codigo,
 descripcion,
 margen
});
const getproductoSchema = joi.object({
  negocioId: id.required(),
  productoId: id.required()
});
const queryProductoSchema = joi.object({
  limit,
  offset,
  valor,

});

module.exports = {
  createproductoSchema,
  updateproductoSchema,
  getproductoSchema,
  queryProductoSchema
  };
