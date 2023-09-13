const { Model, DataTypes, Sequelize } = require('sequelize');

const { CAPITAL_TABLE } = require('./capital.model');
const { CUENTA_TABLE } = require('./cuenta.model');

const CAPITAL_CUENTA_TABLE = 'capitales_cuentas';

const capitalCuentaSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  capitalId: {
    field: 'capital_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CAPITAL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  cuentaId: {
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
  debe: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  haber: {
    allowNull: false,
    type: DataTypes.DOUBLE
  }
}

class CapitalCuenta extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CAPITAL_CUENTA_TABLE,
      modelName: 'CapitalCuenta',
      timestamps: false
    }
  }
}

module.exports = { CapitalCuenta, capitalCuentaSchema, CAPITAL_CUENTA_TABLE };
