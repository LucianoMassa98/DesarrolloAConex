const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class PagosService {
  async create(data){

    const dat = await models.Pago.create(data);
    return dat;
  }
   async find(id){

      const negocio  = await models.Negocio.findByPk(id,{include:['pagos']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.pagos;
    }
  async findOne(negocioId,pagoId){
    const pago  = await models.Pago.findByPk(pagoId);
    if(!pago){ throw boom.notFound('pago Not Found');}
    if(pago.negocioId!=negocioId){ throw boom.notFound('El pago no pertenece al negocio');}
     return pago;
  }

  async delete(negocioId,pagoId){
    const pago = await this.findOne(negocioId,pagoId);
    const rta = await pago.destroy();
    if(!rta){ throw boom.notFound('El pago no se pudo eliminar');}
    return pago;
  }
}
module.exports = PagosService;
