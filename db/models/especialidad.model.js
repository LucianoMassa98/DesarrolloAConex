const {Model,DataTypes, Sequelize} = require('sequelize');
const {CLINICA_TABLE}=require('../models/clinica.model');

const ESPECIALIDAD_TABLE = 'especialidades';


const especialidadSchema  = {
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
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Especialidad extends Model{
  // crear metodos estaticos
  static associate(models){

    this.belongsTo(models.Clinica, {as: 'clinica'});
  }
  // definir otrto estatico para la conexin
  static config(sequelize){
    return {
      sequelize,
      tableName: ESPECIALIDAD_TABLE,
      especialidades: 'Especialidad',
      timestamps: false
    }
  }
}
module.exports = {
  ESPECIALIDAD_TABLE,
  especialidadSchema,
  Especialidad
}
