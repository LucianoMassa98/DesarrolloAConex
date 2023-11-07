const joi = require('joi');
const id = joi.number().integer();
const password=joi.string().min(8);
const username=joi.string().min(3);

const createusuarioSchema = joi.object({
  clinicaId: id.required(),
  perfilId: id.required(),
  username: username.required(),
  password: password.required(),

});
const addroleSchema = joi.object({
  usuarioId: id.required(),
  roleId: id.required()

});
const subtractroleSchema = joi.object({
  usuarioId: id.required(),
  roleId: id.required()

});
const updateusuarioSchema = joi.object({
  username,
  password
});
const loginusuarioSchema = joi.object({
  usernameclinica: username.required(),
  username: username.required(),
  password: password.required()

});
const getusuarioSchema = joi.object({
  clinicaId: id.required(),
  usuarioId: id.required()
});

module.exports = {
  createusuarioSchema,
  updateusuarioSchema,
  getusuarioSchema,
  loginusuarioSchema,
  addroleSchema,
  subtractroleSchema
  };



