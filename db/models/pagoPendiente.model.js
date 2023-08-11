const {Model,DataTypes, Sequelize} = require('sequelize');
const {NEGOCIO_TABLE}=require('./negocio.model');
const {COMPRA_TABLE}=require('./compra.model');
const {CUENTA_TABLE}=require('./cuenta.model');
const PAGO_PENDIENTE_TABLE = 'pagosPendientes';
const pagoPendienteSchema  = {
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
  compraId:{
    field: 'compra_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPRA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  cuentaId:{
    field: 'cuenta_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'

  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class PagoPendiente extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Negocio, {as: 'negocio'});
   this.belongsTo(models.Cuenta, {as: 'cuenta'});
   this.belongsTo(models.Compra, {as: 'compra'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName:  PAGO_PENDIENTE_TABLE,
      modelName: 'PagoPendiente',
      timestamps: false
    }
  }
}
module.exports = {
  PAGO_PENDIENTE_TABLE,
  pagoPendienteSchema,
  PagoPendiente
}
