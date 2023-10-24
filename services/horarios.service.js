const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const TurnosService = require('../services/turnos.service');
const service = new TurnosService();
class HorariosService {
  async create(data) {

    //console.log(data);
    const fecha = new Date(data.vigenciaDesde);
    if(fecha.getDay()!=data.nroDia){throw boom.notFound("La vigencia debe empezar desde el dia seleccionado");}
    const rta = await models.Horario.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la Horario");}

    // crear turnos correspondientes
    const rta2=await service.generarTurnos(data);

    return rta;
  }

  async findOne(profesionalId,horarioId) {
    const rta = await models.Horario.findByPk(horarioId);
    if(!rta){throw boom.notFound("Horario not found");}
    if(rta.profesionalId != profesionalId){throw boom.notFound("Horario not found");}
    return rta;
  }
  async update(profesionalId, horarioId, change){
    const Horario = await this.findOne(profesionalId,horarioId);
    const rta = await Horario.update(change);
    if(!rta){ throw boom.notFound("Horario not found");}
    return rta;
  }
  async delete(profesionalId, horarioId) {
    const Horario = await this.findOne(profesionalId,horarioId);
    const rta = await Horario.destroy();
    if(!rta){throw boom.notFound("Horario not found");}
    return Horario;
  }
}
module.exports = HorariosService;
