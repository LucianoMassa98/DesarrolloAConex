const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
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
  negocioId:{
    field: 'negocio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NEGOCIO_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

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
    unique: true,
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

    this.belongsTo(models.Negocio, {as: 'negocio'});
    this.hasMany(models.Compra, {as: 'compras', foreignKey: 'usuarioId'});
    this.hasMany(models.Venta, {as: 'ventas', foreignKey: 'usuarioId'});


    this.belongsTo(models.Perfil, {as: 'perfil'});
    this.belongsToMany(models.Role, {
      as: 'roles',
      through: models.RoleUsuario,
      foreignKey: 'usuarioId',
      otherKey: 'roleId'
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
