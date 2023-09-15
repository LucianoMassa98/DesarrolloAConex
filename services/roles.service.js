const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');
class RolesService {
  async create(data){
    const dat = await models.Role.create(data);
    if(!dat){throw boom.notFound("Rol not found");}
    return dat;
  }
  async find(){
    const roles = await models.Role.findAll();
    return roles;
  }
  async findOne(id){
    const rol = await models.Role.findByPk(id);
    if(!rol){throw boom.notFound("Rol not found");}
    return rol;
  }
  async update(id,changes){
    const rol = await this.findOne(id);
    const rta = await rol.update(changes);
    if(!rta){throw boom.notFound("Rol not found");}
    return rta;
  }
  async delete(id){
    const rol = await this.findOne(id);
    const rta = await rol.destroy();
    if(!rta){throw boom.notFound("Rol not found");}
    return rol;
  }
}
module.exports = RolesService;
