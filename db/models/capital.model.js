const { Model, DataTypes, Sequelize } = require('sequelize');
const { NEGOCIO_TABLE } = require('../models/negocio.model');
const CAPITAL_TABLE = 'Capitales';
const capitalSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  negocioId: {
    field: 'negocio_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: NEGOCIO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  saldo: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  }
};

class Capital extends Model {
  // crear metodos estaticos
  static associate(models) {

    this.belongsTo(models.Negocio, { as: 'negocio' });
    this.belongsToMany(models.Producto, {
      as: 'items',
      through: models.CapitalCuenta,
      foreignKey: 'capitalId',
      otherKey: 'cuentaId',
    });
  }


  // definir otrto estatico para la conexin
  static config(sequelize) {
    return {
      sequelize,
      tableName: CAPITAL_TABLE,
      modelName: 'Capital',
      timestamps: false,
    };
  }
}
module.exports = {
  CAPITAL_TABLE,
  capitalSchema,
  Capital,
};
