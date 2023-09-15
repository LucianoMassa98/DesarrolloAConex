const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('../models/negocio.model');
const DESCUENTO_TABLE = 'descuentos';
const descuentoSchema  = {
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
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cntRequerida: {
    field: 'cnt_requerida',
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  prcDescuento: {
    field: 'prc_descuento',
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Descuento extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  DESCUENTO_TABLE,
      modelName: 'Descuento',
      timestamps: false
    }
  }
}
module.exports = {
  DESCUENTO_TABLE,
  descuentoSchema,
  Descuento
}
