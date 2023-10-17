const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class FeriadosService {
  async create(data) {

    const rta = await models.Feriado.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la Feriado");}
    return rta;
  }
  async find(clinicaId) {
    console.log(clinicaId);
    const rta = await models.Feriado.findAll({where:{clinicaId: clinicaId}});
    if(!rta){throw boom.notFound("Feriado not found");}
    return rta;
  }
  async findOne(clinicaId,feriadoId) {
    const rta = await models.Feriado.findByPk(feriadoId);
    if(!rta){throw boom.notFound("Feriado not found");}
    if(rta.clinicaId != clinicaId){throw boom.notFound("Feriado not found");}
    return rta;
  }
  async update(clinicaId, feriadoId, change){
    const Feriado = await this.findOne(clinicaId,feriadoId);
    const rta = await Feriado.update(change);
    if(!rta){ throw boom.notFound("Feriado not found");}
    return rta;
  }
  async delete(clinicaId, feriadoId) {
    const Feriado = await this.findOne(clinicaId,feriadoId);
    const rta = await Feriado.destroy();
    if(!rta){throw boom.notFound("Feriado not found");}
    return Feriado;
  }
}
module.exports = FeriadosService;
