const { Model } = require('sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class PacientesService {
  async create(data) {
    const rta = await models.Paciente.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la Paciente");}
    return rta;
  }
  async find(clinicaId) {
    // falta devolver perfiles
    const rta = await models.Paciente.findAll({where:{clinicaId: clinicaId},include:['perfil']});
    if(!rta){throw boom.notFound("Pacientes not found");}
    return rta;
  }
  async findOne(query) {
    const {clinicaId, pacienteId, celular} = query;
    let options = {where:{},include:[]};
    if(clinicaId){options.where={clinicaId: clinicaId}}
    if(pacienteId){
      options.where={...options.where, id: pacienteId}
      options.include.push('perfil');
    }
    if(celular){
      options.include.push({
        association: 'perfil',
        where: { celular: celular }
      });
    }
    const rta = await models.Paciente.findOne(options);
    if(!rta){throw boom.notFound("Paciente not found");}
    return rta;
  }
  async update(clinicaId, pacienteId, change){
    const Paciente = await this.findOne(clinicaId,pacienteId);
    const rta = await Paciente.update(change);
    if(!rta){ throw boom.notFound("Paciente not found");}
    return rta;
  }
  async delete(clinicaId, pacienteId) {
    const Paciente = await this.findOne(clinicaId,pacienteId);
    const rta = await Paciente.destroy();
    if(!rta){throw boom.notFound("Paciente not found");}
    return Paciente;
  }
}
module.exports = PacientesService;
