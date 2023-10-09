const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class EspecialidadesService {
  async create(data) {
    const rta = await models.Especialidad.create(data);
    if(!rta){throw boom.notFound("No se pudo crear la Especialidad");}
    return rta;
  }
  async find(clinicaId) {
    const rta = await models.Especialidad.findAll({where:{clinicaId: clinicaId}});
    if(!rta){throw boom.notFound("Especialidads not found");}
    return rta;
  }
  async findOne(clinicaId,especialidadId) {
    const rta = await models.Especialidad.findByPk(especialidadId);
    if(!rta){throw boom.notFound("Especialidad not found");}
    if(rta.clinicaId != clinicaId){throw boom.notFound("Especialidad not found");}
    return rta;
  }
  async update(clinicaId, especialidadId, change){
    const Especialidad = await this.findOne(clinicaId,especialidadId);
    const rta = await Especialidad.update(change);
    if(!rta){ throw boom.notFound("Especialidad not found");}
    return rta;
  }
  async delete(clinicaId, especialidadId) {
    const Especialidad = await this.findOne(clinicaId,especialidadId);
    const rta = await Especialidad.destroy();
    if(!rta){throw boom.notFound("Especialidad not found");}
    return Especialidad;
  }
}
module.exports = EspecialidadesService;
