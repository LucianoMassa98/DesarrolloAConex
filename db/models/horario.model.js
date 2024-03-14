const {Model,DataTypes, Sequelize} = require('sequelize');
const {ESPECIALIDAD_TABLE}=require('./especialidad.model');
const {PROFESIONAL_TABLE}=require('./profesional.model');
const {CLINICA_TABLE}=require('./clinica.model');

const HORARIO_TABLE = 'horarios';
const horarioSchema  = {
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
  especialidadId: {
    field: 'especialidad_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ESPECIALIDAD_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  nroDia:{
    field: 'nro_día',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  vigenciaDesde: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  vigenciaHasta: {
    allowNull: false,
    type: DataTypes.DATE
  },
  horaDesde: {
    allowNull: false,
    type: DataTypes.TIME
  },
  horaHasta: {
    allowNull: false,
    type: DataTypes.TIME
  },
  intervalo: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

class Horario extends Model{
  // crear metodos estaticos
  static associate(models){
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: HORARIO_TABLE,
      modelName: 'Horario',
      timestamps: false
    }
  }
}
module.exports = {
  HORARIO_TABLE,
  horarioSchema,
  Horario
}
