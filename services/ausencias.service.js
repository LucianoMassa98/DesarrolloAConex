const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class AusenciasService {
  async create(data) {
    const rta = await models.Ausencia.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la ausencia");}
    return rta;
  }

  async findOne(profesionalId,ausenciaId){
    const rta = await models.Ausencia.findByPk(ausenciaId);
    if(!rta){throw boom.notFound("Ausencia not found");}
    if(rta.profesionalId!=profesionalId){throw boom.notFound("Ausencia not found");}
    return rta;
  }

  async update(profesionalId,ausenciaId, change){
    const Ausencia = await this.findOne(profesionalId,ausenciaId);
    const rta = await Ausencia.update(change);
    if(!rta){ throw boom.notFound('Ausencia not found');}
    return rta;
  }
  async delete(profesionalId, ausenciaId) {
    const ausencia = await this.findOne(profesionalId,ausenciaId);
    const rta = await ausencia.destroy();
    if(!rta){throw boom.notFound("Ausencia not found");}
    return ausencia;
  }
}
module.exports = AusenciasService;
