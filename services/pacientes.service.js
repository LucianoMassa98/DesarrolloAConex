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
  async findOne(clinicaId,pacienteId) {
    // falta devolver perfiles
    const rta = await models.Paciente.findByPk(pacienteId,{include:['perfil']});
    if(!rta){throw boom.notFound("Paciente not found");}
    if(rta.clinicaId != clinicaId){throw boom.notFound("Paciente not found");}
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
