const {Model,DataTypes, Sequelize} = require('sequelize');
const {CLINICA_TABLE}=require('../models/clinica.model');
const {PERFIL_TABLE}=require('../models/perfil.model');

const PROFESIONAL_TABLE = 'profesionales';


const profesionalSchema  = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  clinicaId:{
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
  perfilId:{
    field: 'perfil_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERFIL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'

  },
  matricula: {
    allowNull: false,
    type: DataTypes.DOUBLE,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Profesional extends Model{
  // crear metodos estaticos
  static associate(models){

    this.belongsTo(models.Clinica, {as: 'clinica'});
    this.belongsTo(models.Perfil, {as: 'perfil'});
    this.hasMany(models.Turno, {as: 'turnos', foreignKey: 'profesionalId',onDelete: 'CASCADE'});
    this.hasMany(models.Horario, {as: 'horarios', foreignKey: 'profesionalId',onDelete: 'CASCADE'});
    this.hasMany(models.Ausencia, {as: 'ausencias', foreignKey: 'profesionalId',onDelete: 'CASCADE'});

  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: PROFESIONAL_TABLE,
      modelName: 'Profesional',
      timestamps: false
    }
  }
}
module.exports = {
  PROFESIONAL_TABLE,
  profesionalSchema,
  Profesional
}
