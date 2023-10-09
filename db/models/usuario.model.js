const {Model,DataTypes, Sequelize} = require('sequelize');
const {CLINICA_TABLE}=require('../models/clinica.model');
const {PERFIL_TABLE}=require('../models/perfil.model');
const {ROLE_TABLE}=require('../models/role.model');

const USUARIO_TABLE = 'usuarios';


const usuarioSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  clinicaId:{
    field: 'clinica_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CLINICA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  perfilId:{
    field: 'perfil_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERFIL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Usuario extends Model{
  // crear metodos estaticos
  static associate(models){

    this.belongsTo(models.Clinica, {as: 'clinica'});


    this.belongsTo(models.Perfil, {as: 'perfil'});

    this.belongsToMany(models.Role, {
      as: 'roles',
      through: models.RoleUsuario,
      foreignKey: 'usuarioId',
      otherKey: 'roleId',
    });

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false
    }
  }
}
module.exports = {
  USUARIO_TABLE,
  usuarioSchema,
  Usuario
}
