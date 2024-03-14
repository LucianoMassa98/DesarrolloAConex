const {Model,DataTypes, Sequelize} = require('sequelize');

const {CLINICA_TABLE}=require('./clinica.model');

const FERIADO_TABLE = 'feriados';
const feriadoSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  clinicaId: {
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
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE
  }
}

class Feriado extends Model{
  // crear metodos estaticos
  static associate(models){
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: FERIADO_TABLE,
      modelName: 'Feriado',
      timestamps: false
    }
  }
}
module.exports = {
  FERIADO_TABLE,
  feriadoSchema,
  Feriado
}
