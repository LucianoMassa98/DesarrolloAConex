const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');


class CobrosService {
  async create(data){

    const dat = await models.Cobro.create(data);
    if(!dat){throw boom.notFound('Cobro Not Found');}
    return dat;
  }
   async find(id){

      const negocio  = await models.Negocio.findByPk(id,{include:['cobros']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.cobros;
    }
  async findOne(negocioId,cobroId){
    const cobro  = await models.Cobro.findByPk(cobroId);

    if(!cobro){ throw boom.notFound('cobro Not Found');}
    if(cobro.negocioId!=negocioId){throw boom.notFound('El cobro no pertenece al negocio');}
     return cobro;
  }
  async update(negocioId,cobroId, change){
   const cobro = await this.findOne(negocioId,cobroId);
   const rta = await cobro.update(change);
   if(!rta){ throw boom.notFound('cobro Not Found');}
   return rta;
  }
  async delete(negocioId,cobroId){
    const cobro = await this.findOne(negocioId,cobroId);
    const rta = await cobro.destroy();
    if(!rta){ throw boom.notFound('cobro Not Found');}
    return cobro;
  }
}
module.exports = CobrosService;
