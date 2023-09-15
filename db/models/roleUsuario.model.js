const {Model,DataTypes, Sequelize} = require('sequelize');

const { USUARIO_TABLE } = require('./usuario.model');
const { ROLE_TABLE } = require('./role.model');

const ROLE_USUARIO_TABLE = 'roleUsuarios';

const roleUsuarioSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  usuarioId: {
    field: 'usuario_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}

class RoleUsuario extends Model{
  // crear metodos estaticos
  static associate(models){




  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  ROLE_USUARIO_TABLE,
      modelName: 'RoleUsuario',
      timestamps: false
    }
  }
}
module.exports = {
  ROLE_USUARIO_TABLE,
  roleUsuarioSchema,
  RoleUsuario
}
