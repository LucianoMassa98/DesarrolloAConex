const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class DescuentosService {
  async create(data){
    const dat = await models.Descuento.create(data);
    if(!dat){ throw boom.notFound('descuento Not Found');}
    return dat;
  }
   async find(id){
      const negocio  = await models.Negocio.findByPk(id,{include:['descuentos']});
      if(!negocio){ throw boom.notFound('Negocio Not Found');}
      return negocio.descuentos;
    }
  async findOne(negocioId,descuentoId){
    const descuento  = await models.Descuento.findByPk(descuentoId);
    if(!descuento){ throw boom.notFound('descuento Not Found');}
    if(descuento.negocioId!=negocioId){ throw boom.notFound('El descuento no pertenece al negocio');}
     return descuento;
  }
  async update(negocioId,descuentoId, change){
   const descuento = await this.findOne(negocioId,descuentoId);
   const rta = await descuento.update(change);
   if(!rta){ throw boom.notFound('descuento Not Found');}
   return rta;
  }
  async delete(negocioId,descuentoId){
    const descuento = await this.findOne(negocioId,descuentoId);
    const rta = await descuento.destroy();
    if(!rta){ throw boom.notFound('descuento Not Found');}
    return descuento;
  }
}
module.exports = DescuentosService;
