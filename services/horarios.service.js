const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const TurnosService = require('../services/turnos.service');
const service = new TurnosService();

const EspecialidadService = require('../services/especialidades.service');
const serviceEsp = new EspecialidadService();
class HorariosService {
  async create(data) {

    //console.log(data);
    const fecha = new Date(data.vigenciaDesde);


    const esp = await serviceEsp.findOne(data.clinicaId,data.especialidadId);
    if(!esp){throw boom.notFound("Especialidad no correspondiente a la clinica");}

    const horario = await models.Horario.findOne({where:{
      clinicaId: data.clinicaId,
      profesionalId: data.profesionalId,
      especialidadId: data.especialidadId,
      nroDia: data.nroDia,
      vigenciaDesde:data.vigenciaDesde,
      vigenciaHasta: data.vigenciaHasta,
      horaDesde: data.horaDesde,
      horaHasta: data.horaHasta,
      intervalo: data.intervalo
    }});
    if(horario){throw boom.notFound("Ya existe un horario similar para este profesional");}
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

    const turnos = await service.find(Horario.clinicaId,{profesionalId: Horario.profesionalId, fechaDesde: Horario.fechaDesde, fechaHasta: Horario.fechaHasta })

    turnos.forEach(async element => {
     const rta= await element.destroy();
      if(!rta){throw boom.notFound("No se pudo eliminar turnos");}
    });

    const rta = await Horario.destroy();
    if(!rta){throw boom.notFound("Horario not found");}
    return Horario;
  }
}
module.exports = HorariosService;
