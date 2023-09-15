const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const {PERFIL_TABLE}=require('../models/perfil.model');

const PROVEEDOR_TABLE = 'proveedores';

const proveedorSchema  = {
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
    onDelete: 'CASCADE'

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

  saldo: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Proveedor extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});
    this.hasMany(models.Compra, {as: 'compras', foreignKey: 'proveedorId'});

    this.belongsTo(models.Perfil, {as: 'perfil'});

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  PROVEEDOR_TABLE,
      modelName: 'Proveedor',
      timestamps: false
    }
  }
}
module.exports = {
  PROVEEDOR_TABLE,
  proveedorSchema,
  Proveedor
}
