const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

class TurnosService {
  async create(data) {
    const rta = await models.Turno.create(data);
    if (!rta) {
      throw boom.notFound('No se pudo crear la Turno');
    }
    return rta;
  }
  async generarTurnos(horario) {

    console.log("llegue aqui en produccion");

    for (
      let fecha = new Date(horario.vigenciaDesde);
      fecha <= new Date(horario.vigenciaHasta);
      fecha.setDate(fecha.getDate() + 7)
    ) {
        console.log(fecha);
        console.log("---------------");
        const [horas, minutos] = horario.horaDesde.split(":");
        fecha.setHours(parseInt(horas, 10));
        fecha.setMinutes(parseInt(minutos, 10));

        let fechaHorarioHasta = new Date(fecha.toDateString());
        const [horas2, minutos2] = horario.horaHasta.split(":");
        fechaHorarioHasta.setHours(parseInt(horas2, 10));
        fechaHorarioHasta.setMinutes(parseInt(minutos2, 10));


        for(let hora = fecha; hora<=fechaHorarioHasta; hora.setMinutes(hora.getMinutes()+horario.intervalo)){
          console.log(hora);
          const rta = await this.create({
            clinicaId: horario.clinicaId,
            profesionalId: horario.profesionalId,
            especialidadId: horario.especialidadId,
            date: hora,
          });



        }



    }

  }
  async find(clinicaId, query) {
    const options = {
      where: {
        clinicaId: clinicaId,
      },
      include:[{
        model: models.Paciente, // Modelo Cliente
        as: 'paciente', // Alias 'cliente'
        include: ['perfil'], // Incluir el perfil del cliente
      }]
    };


    const { especialidadId } = query;
    if (especialidadId) {
      options.where.especialidadId = especialidadId;
    }
    const { libres } = query;
    console.log(query);
    console.log(libres);
    if (libres=='true') {
      options.where.pacienteId = null;
    }else if(libres=='false'){
      console.log("entro al false");
      options.where.pacienteId={
        [Op.ne]: null
      }
    }

    const { profesionalId } = query;
    if (profesionalId) {
      options.where.profesionalId = profesionalId;
    }

    const { fechaDesde, fechaHasta } = query;
    if (fechaDesde && fechaHasta) {

      let dateDesde = new Date(fechaDesde);
      let dateHasta = new Date(fechaHasta);
      dateHasta.setHours(parseInt(23, 10)); // parseInt convierte la cadena a un número
      dateHasta.setMinutes(parseInt(59, 10));


      options.where.date = {
        [Op.gte]: dateDesde,
        [Op.lte]: dateHasta,
      };
    }
    console.log("-----------");
    console.log(options);
    const rta = await models.Turno.findAll(options);
    if (!rta) {
      throw boom.notFound('Turno not found');
    }

    return rta;
  }
  async findOne(profesionalId, turnoId) {
    const rta = await models.Turno.findByPk(turnoId);
    if (!rta) {
      throw boom.notFound('Turno not found');
    }
    if (rta.profesionalId != profesionalId) {
      throw boom.notFound('Turno not found');
    }
    return rta;
  }
  async update(profesionalId, turnoId, change) {
    const Turno = await this.findOne(profesionalId, turnoId);
    const rta = await Turno.update(change);
    if (!rta) {
      throw boom.notFound('Turno not found');
    }
    return rta;
  }
  async delete(profesionalId, turnoId) {
    const Turno = await this.findOne(profesionalId, turnoId);
    const rta = await Turno.destroy();
    if (!rta) {
      throw boom.notFound('Turno not found');
    }
    return Turno;
  }
}
module.exports = TurnosService;
