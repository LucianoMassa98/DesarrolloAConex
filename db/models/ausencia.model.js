const {Model,DataTypes, Sequelize} = require('sequelize');
const {PROFESIONAL_TABLE}=require('./profesional.model');

const AUSENCIA_TABLE = 'ausencias';
const ausenciaSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  profesionalId: {
    field: 'profesional_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROFESIONAL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  vigenciaDesde: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  vigenciaHasta: {
    allowNull: false,
    type: DataTypes.DATE
  }
}

class Ausencia extends Model{
  // crear metodos estaticos
  static associate(models){
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: AUSENCIA_TABLE,
      modelName: 'Ausencia',
      timestamps: false
    }
  }
}
module.exports = {
  AUSENCIA_TABLE,
  ausenciaSchema,
  Ausencia
}
