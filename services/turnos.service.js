const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class TurnosService {
  async create(data) {
    const rta = await models.Turno.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la Turno");}
    return rta;
  }
  async findOne(profesionalId,turnoId) {
    const rta = await models.Turno.findByPk(turnoId);
    if(!rta){throw boom.notFound("Turno not found");}
    if(rta.profesionalId != profesionalId){throw boom.notFound("Turno not found");}
    return rta;
  }
  async update(profesionalId, turnoId, change){
    const Turno = await this.findOne(profesionalId,turnoId);
    const rta = await Turno.update(change);
    if(!rta){ throw boom.notFound("Turno not found");}
    return rta;
  }
  async delete(profesionalId, turnoId) {
    const Turno = await this.findOne(profesionalId,turnoId);
    const rta = await Turno.destroy();
    if(!rta){throw boom.notFound("Turno not found");}
    return Turno;
  }
}
module.exports = TurnosService;
