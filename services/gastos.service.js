const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class GastosService {

  async create(data){
    const dat = await models.Gasto.create(data);
    if(!dat){throw boom.notFound("Gasto not found");}
  }
  async find(negocioId){
    const negocio  = await models.Negocio.findByPk(negocioId,{include:['gastos']});
    if(!negocio){ throw boom.notFound('Negocio Not Found');}
    return negocio.gastos;
  }
  async findOne(negocioId,gastoId){
    const gasto  = await models.Gasto.findByPk(gastoId,{include:['desde','a']});
    if(!gasto){ throw boom.notFound('gasto Not Found');}
    if(gasto.negocioId!=negocioId){throw boom.notFound('El gasto no pertenece al negocio');}
    return gasto;
  }
  async update(negocioId,gastoId,change){
    const gasto = await this.findOne(negocioId,gastoId);
    const rta = await gasto.update(change);
    if(!rta){ throw boom.notFound('gasto Not Found');}
    return rta;
  }
  async delete(negocioId,gastoId){
    const gasto = await this.findOne(negocioId,gastoId);
    const rta = await gasto.destroy();
    if(!rta){ throw boom.notFound('gasto Not Found');}
    return gasto;
  }
}
module.exports = GastosService;
