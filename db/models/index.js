
const {Usuario, usuarioSchema}= require('./usuario.model');
const {Clinica, clinicaSchema}= require('./clinica.model');
const {Role, roleSchema}= require('./role.model');
const {Perfil, perfilSchema}= require('./perfil.model');
const {RoleUsuario, roleUsuarioSchema}= require('./roleUsuario.model');
const {Profesional, profesionalSchema}= require('./profesional.model');
const {Especialidad, especialidadSchema}= require('./especialidad.model');
const {Paciente, pacienteSchema}= require('./paciente.model');
const {Horario, horarioSchema}= require('./horario.model');
const {Ausencia, ausenciaSchema}= require('./ausencia.model');
const {Turno, turnoSchema}= require('./turno.model');
const {Feriado, feriadoSchema}= require('./feriado.model');

function setupModels(sequelize){

Clinica.init(clinicaSchema,Clinica.config(sequelize));
Perfil.init(perfilSchema,Perfil.config(sequelize));
Usuario.init(usuarioSchema,Usuario.config(sequelize));
Role.init(roleSchema,Role.config(sequelize));
RoleUsuario.init(roleUsuarioSchema,RoleUsuario.config(sequelize));
Profesional.init(profesionalSchema,Profesional.config(sequelize));
Especialidad.init(especialidadSchema,Especialidad.config(sequelize));
Paciente.init(pacienteSchema,Paciente.config(sequelize));
Horario.init(horarioSchema,Horario.config(sequelize));
Ausencia.init(ausenciaSchema,Ausencia.config(sequelize));
Turno.init(turnoSchema,Turno.config(sequelize));
Feriado.init(feriadoSchema,Feriado.config(sequelize));

Clinica.associate(sequelize.models);
Perfil.associate(sequelize.models);
Usuario.associate(sequelize.models);
Role.associate(sequelize.models);
RoleUsuario.associate(sequelize.models);
Profesional.associate(sequelize.models);
Especialidad.associate(sequelize.models);
Paciente.associate(sequelize.models);
Horario.associate(sequelize.models);
Ausencia.associate(sequelize.models);
Turno.associate(sequelize.models);
Feriado.associate(sequelize.models);
}
module.exports = setupModels;
