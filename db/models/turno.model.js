const {Model,DataTypes, Sequelize} = require('sequelize');
const {PACIENTE_TABLE}=require('./paciente.model');
const {PROFESIONAL_TABLE}=require('./profesional.model');
const {CLINICA_TABLE}=require('./clinica.model');
const { ESPECIALIDAD_TABLE } = require('./especialidad.model');

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
  especialidadId: {
    field: 'especialidad_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ESPECIALIDAD_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  presentismo:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  observacion:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  obraSocial:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  habilitado:{
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  }
}

class Turno extends Model{
  // crear metodos estaticos
  static associate(models){
    this.belongsTo(models.Paciente, {as: 'paciente'});

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
