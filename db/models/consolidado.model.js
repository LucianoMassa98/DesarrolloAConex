const { Model, DataTypes, Sequelize } = require('sequelize');
const { NEGOCIO_TABLE } = require('../models/negocio.model');
const CONSOLIDADO_TABLE = 'Consolidados';
const consolidadoSchema = {
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
  totalVenta: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  totalCosto: {
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

class Consolidado extends Model {
  // crear metodos estaticos
  static associate(models) {

    this.belongsTo(models.Negocio, { as: 'negocio' });
    this.belongsToMany(models.Producto, {
      as: 'items',
      through: models.ConsolidadoProducto,
      foreignKey: 'ConsolidadoId',
      otherKey: 'productoId',
    });
  }


  // definir otrto estatico para la conexin
  static config(sequelize) {
    return {
      sequelize,
      tableName: CONSOLIDADO_TABLE,
      modelName: 'Consolidado',
      timestamps: false,
    };
  }
}
module.exports = {
  CONSOLIDADO_TABLE,
  consolidadoSchema,
  Consolidado,
};
