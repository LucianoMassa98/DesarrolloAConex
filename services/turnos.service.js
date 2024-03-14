const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { date } = require('joi');
const { Op, HasOne } = require('sequelize');


const PacientesService = require('./pacientes.service');
const service1 = new PacientesService();

const PerfilesService = require('./perfiles.service');
const service2 = new PerfilesService();

class TurnosService {
  async create(data) {

    const rta = await models.Turno.create(data);
    if (!rta) {
      throw boom.notFound('No se pudo crear la Turno');
    }
    return rta;
  }



  async generarTurnos(horario) {


    if(horario.horaDesde<horario.horaHasta){
      const intervalo = parseInt(horario.intervalo,10);
      for (
        let fecha = new Date(horario.vigenciaDesde);
        fecha <= new Date( new Date(horario.vigenciaHasta).setDate(new Date(horario.vigenciaHasta).getDate()+1));
        fecha = new Date(fecha.setDate(fecha.getDate() + 7))
      ) {

          const [horas, minutos] = horario.horaDesde.split(":");
          fecha.setHours(parseInt(horas, 10));
          fecha.setMinutes(parseInt(minutos, 10));

          let fechaHorarioHasta = new Date(fecha.toDateString());
          const [horas2, minutos2] = horario.horaHasta.split(":");
          fechaHorarioHasta.setHours(parseInt(horas2, 10));
          fechaHorarioHasta.setMinutes(parseInt(minutos2, 10));


          for(let hora = fecha; hora<=fechaHorarioHasta; hora = new Date(hora.setMinutes(hora.getMinutes()+intervalo))){

            const rta = await this.create({
              clinicaId: horario.clinicaId,
              profesionalId: horario.profesionalId,
              especialidadId: horario.especialidadId,
              date: hora,
            });
          }



      }
    }


  }




  async find(clinicaId, query) {
    console.log(query);
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

    const rta = await models.Turno.findAll(options);
    if (!rta) {
      throw boom.notFound('Turno not found');
    }
    function compararFechasYHoras(a, b) {
     return a.date - b.date;
    }
    rta.sort(compararFechasYHoras);

    return rta;
  }
  async findSemana(clinicaId, query) {

    const { fechaDesde } = query;

    const fechasSemana = await this.obtenerFechasSemana(fechaDesde);
    const dias=[];





    query.fechaDesde = fechasSemana.domingo;
    query.fechaHasta = fechasSemana.domingo;
    const rta = await this.find(clinicaId,query);
    if (rta.length>1) {
      dias.push("Domingo");
    }

    query.fechaDesde = fechasSemana.lunes;
    query.fechaHasta = fechasSemana.lunes;
    const rta2 = await this.find(clinicaId,query);
    if (rta2.length>1) {
      dias.push("Lunes");
    }

    query.fechaDesde = fechasSemana.martes;
    query.fechaHasta = fechasSemana.martes;
    const rta3 = await this.find(clinicaId,query);
    if (rta3.length>1) {
      dias.push("Martes");
    }

    query.fechaDesde = fechasSemana.miercoles;
    query.fechaHasta = fechasSemana.miercoles;
    const rta4 = await this.find(clinicaId,query);
    if (rta4.length>1) {
      dias.push("Miércoles");
    }

    query.fechaDesde = fechasSemana.jueves;
    query.fechaHasta = fechasSemana.jueves;
    const rta5 = await this.find(clinicaId,query);
    if (rta5.length>1) {
      dias.push("Jueves");
    }


    query.fechaDesde = fechasSemana.viernes;
    query.fechaHasta = fechasSemana.viernes;
    const rta6 = await this.find(clinicaId,query);
    if (rta6.length>1) {
      dias.push("Viernes");
    }

    query.fechaDesde = fechasSemana.sabado;
    query.fechaHasta = fechasSemana.sabado;
    const rta7 = await this.find(clinicaId,query);
    if (rta7.length>1) {
      dias.push("Sábado");
    }



    return dias;
  }

  async findOne(profesionalId, turnoId) {
    const rta = await models.Turno.findByPk(turnoId);
    if (!rta) {
      throw boom.notFound('Turno not found');
    }

    if (rta.profesionalId != profesionalId) {
      throw boom.notFound('Turno and Profesional unrelated');
    }
    return rta;
  }
  async update(profesionalId, turnoId, change) {
    console.log(change);
    const {celular} = change;
    if(celular){
      const paciente = await service1.findOne({id:change.pacienteId});
      const newPerfil = await service2.update(paciente.perfilId,{celular:celular});

      const { celular, ...nuevoObjeto } = change;
      change = nuevoObjeto;
      console.log("---------")
      console.log(nuevoObjeto);
      console.log("---------")
    }
    console.log(change);


    const Turno = await this.findOne(profesionalId, turnoId);
    const rta = await Turno.update(change);
    if (!rta) {
      throw boom.notFound('Turno not updated');
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
  async anular(profesionalId, turnoId) {
    const Turno = await this.findOne(profesionalId, turnoId);
    const rta = await Turno.update({
      pacienteId: null,
      observacion:"",
      presentismo:"",
      obraSocial:"",
      habilitado: true});
    if (!rta) {
      throw boom.notFound('Turno not found');
    }
    return Turno;
  }

  async obtenerFechasSemana(fecha) {
    // Crear una copia de la fecha original para no modificarla
    const fechaOriginal = new Date(fecha);

    // Obtener el número de día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const diaSemana = fechaOriginal.getDay();

    // Calcular la fecha del lunes restando el número de días desde el día actual
    const lunes = new Date(fechaOriginal);
    lunes.setDate(fechaOriginal.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1));

    // Calcular la fecha del domingo sumando los días restantes hasta el final de la semana
    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);


      const domingorta = new Date(lunes.setDate(lunes.getDate() - 1));
      const lunesrta = new Date(lunes.setDate(lunes.getDate() + 1));
      const martes = new Date(lunes.setDate(lunes.getDate() + 1));
      const miercoles = new Date(lunes.setDate(lunes.getDate() + 1));
      const jueves = new Date(lunes.setDate(lunes.getDate() + 1));
      const viernes = new Date(lunes.setDate(lunes.getDate() + 1));
      const sabado= new Date(domingo.setDate(domingo.getDate() + 1));
    return {
      domingo: `${(domingorta.getMonth() + 1).toString().padStart(2, '0')}-${domingorta.getDate().toString().padStart(2, '0')}-${domingorta.getFullYear()}`,
      lunes: `${(lunesrta.getMonth() + 1).toString().padStart(2, '0')}-${lunesrta.getDate().toString().padStart(2, '0')}-${lunesrta.getFullYear()}`,
      martes: `${(martes.getMonth() + 1).toString().padStart(2, '0')}-${martes.getDate().toString().padStart(2, '0')}-${martes.getFullYear()}`,
      miercoles: `${(miercoles.getMonth() + 1).toString().padStart(2, '0')}-${miercoles.getDate().toString().padStart(2, '0')}-${miercoles.getFullYear()}`,
      jueves: `${(jueves.getMonth() + 1).toString().padStart(2, '0')}-${jueves.getDate().toString().padStart(2, '0')}-${jueves.getFullYear()}`,
      viernes: `${(viernes.getMonth() + 1).toString().padStart(2, '0')}-${viernes.getDate().toString().padStart(2, '0')}-${viernes.getFullYear()}`,
      sabado: `${(sabado.getMonth() + 1).toString().padStart(2, '0')}-${sabado.getDate().toString().padStart(2, '0')}-${sabado.getFullYear()}`,
    };
  }
}
module.exports = TurnosService;
