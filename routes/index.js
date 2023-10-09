const express = require('express');

const clinicasRouter = require('./clinicas.router');
const rolesRouter = require('./roles.router');
const usuariosRouter = require('./usuarios.router');
const perfilesRouter = require('./perfiles.router');
const profesionalesRouter = require('./profesionales.router');
const pacientesRouter = require('./pacientes.router');
const horariosRouter = require('./horarios.router');
const especialidadesRouter = require('./especialidades.router');
const ausenciasRouter = require('./ausencias.router');
const turnosRouter = require('./turnos.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/clinicas', clinicasRouter);
  router.use('/roles', rolesRouter);
  router.use('/usuarios', usuariosRouter);
  router.use('/perfiles', perfilesRouter);
  router.use('/profesionales', profesionalesRouter);
  router.use('/pacientes', pacientesRouter);
  router.use('/horarios', horariosRouter);
  router.use('/especialidades', especialidadesRouter);
  router.use('/ausencias', ausenciasRouter);
  router.use('/turnos', turnosRouter);

}
module.exports = routerApi;
