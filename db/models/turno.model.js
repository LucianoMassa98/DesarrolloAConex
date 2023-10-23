const {Model,DataTypes, Sequelize} = require('sequelize');
const {PACIENTE_TABLE}=require('./paciente.model');
const {PROFESIONAL_TABLE}=require('./profesional.model');
const {CLINICA_TABLE}=require('./clinica.model');

const TURNO_TABLE = 'turnos';
const turnoSchema  = {
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
    onDelete: 'SET NULL'
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
    onDelete: 'SET NULL'
  },
  pacienteId: {
    field: 'paciente_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: PACIENTE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  presentismo:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  observacion:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  }
}

class Turno extends Model{
  // crear metodos estaticos
  static associate(models){
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: TURNO_TABLE,
      modelName: 'Turno',
      timestamps: false
    }
  }
}
module.exports = {
  TURNO_TABLE,
  turnoSchema,
  Turno
}
