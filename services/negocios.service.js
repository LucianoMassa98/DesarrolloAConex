const { boom } = require("@hapi/boom");
const {models} = require('../libs/sequelize');

class NegociosService {

  async create(data){
    const rta = await models.Negocio.create(data);
    return rta;
  }
  async find(){


    const rta = await models.Negocio.findAll();
    return rta;
  }
  async findOne(id){
    const rta = await models.Negocio.findByPk(id,{include:['categorias','productos','usuarios','clientes','proveedores']});
   if(!rta){throw boom.notFound('Negocio Not Found');}
    return rta;
  }
  async update(id,changes){
    const newNegocio = await this.findOne(id);
    const rta = await newNegocio.update(changes);
    return rta;
  }
  async delete(id){
    const newNegocio = await this.findOne(id);
    const rta = await newNegocio.destroy();
    return rta;
  }

}
module.exports = NegociosService;
