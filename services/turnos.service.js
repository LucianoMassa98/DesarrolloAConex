const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const {Op} = require('sequelize');


class TurnosService {
  async create(data) {
    const rta = await models.Turno.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la Turno");}
    return rta;
  }
  async find(clinicaId,query) {

    const options={
      where:{
        clinicaId: clinicaId
      }
    };

    const {libres} = query;
    if(libres){
      options.where.pacienteId=null;

    }

    const {profesionalId} = query;
    if(profesionalId){
      options.where.profesionalId = profesionalId;

    }

    const { fechaDesde, fechaHasta} = query;
    if(fechaDesde && fechaHasta){
      options.where.date={
          [Op.gte]: dateDesde,
          [Op.lte]: dateHasta
      }
    }


    const rta = await models.Turno.findAll(options);
    if(!rta){throw boom.notFound("Turno not found");}
    if(rta.profesionalId != profesionalId){throw boom.notFound("Turno not found");}
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
