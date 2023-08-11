const {models} = require('../libs/sequelize');
const boom = require('@hapi/boom');

class UsuariosService {

  async create(data){
    const dat = await models.Usuario.create(data);
    if(!dat){ throw boom.notFound('Usuario not found');}
    return dat;
  }
  async addRole(data){
    const dat = await models.RoleUsuario.create(data);
    if(!dat){ throw boom.notFound('Usuario not found');}
    return dat;
  }
  async subtractRole(roleId,usuarioId){
    const user = await models.RoleUsuario.findOne({where:{
      roleId: roleId,
      usuarioId: usuarioId
    }});
    if(!user){ throw boom.notFound('User not found'); }

    const rta = await user.destroy();
    if(!rta){ throw boom.notFound('Delete User not found'); }
    return rta;
  }
  async login(username, password){


    const user = await models.Usuario.findOne({where: {username: username}, include:['roles','perfil']});
    if(!user){ throw boom.notFound('Usuario not found');}
    if(user.dataValues.password!=password){ throw boom.notFound('Contraseña incorrecta');}
    return user;
  }
  async find(negocioId){
    const negocio  = await models.Negocio.findByPk(negocioId,{include:['usuarios']});
    if(!negocio){ throw boom.notFound('Negocio not found'); }
    return negocio.usuarios;
  }
  async findOne(negocioId,usuarioId){


    const user = await models.Usuario.findByPk(usuarioId,{include:['perfil']});
    if(!user){ throw boom.notFound('User not found'); }

    if(user.dataValues.negocioId!=negocioId){ throw boom.notFound('El usuario no pertenece al negocio'); }
    return user;
  }
  async update(negocioId,usuarioId,changes){
    const user = await this.findOne(negocioId, usuarioId);
    const rta = await user.update(changes);
    if(!rta){ throw boom.notFound('User not found'); }
    return rta;
  }
  async delete(negocioId,usuarioId){
    const user = await this.findOne(negocioId,usuarioId);
    const rta = await user.destroy();
    if(!rta){ throw boom.notFound('User not found'); }
    return rta;
  }
}
module.exports = UsuariosService;
