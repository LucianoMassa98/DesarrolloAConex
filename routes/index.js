const express = require('express');

const categoriasRouter = require('./categorias.router');
const clientesRouter = require('./clientes.router');
const comprasRouter = require('./compras.router');
const cuentasRouter = require('./cuentas.router');
const gastosRouter = require('./gastos.router');
//const impresorasRouter = require('./impresoras.router');
const productosRouter = require('./productos.router.js');
const negociosRouter = require('./negocios.router');

const proveedoresRouter = require('./proveedores.router');
const rolesRouter = require('./roles.router');
const usuariosRouter = require('./usuarios.router');
const ventasRouter = require('./ventas.router');
const perfilesRouter = require('./perfiles.router');
const informesRouter = require('./informes.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/productos', productosRouter);
  router.use('/negocios', negociosRouter);
  router.use('/categorias', categoriasRouter);
  router.use('/clientes', clientesRouter);
  router.use('/compras', comprasRouter);
  router.use('/ventas', ventasRouter);
  router.use('/cuentas', cuentasRouter);
  router.use('/gastos', gastosRouter);
  //router.use('/impresoras', impresorasRouter);
  router.use('/proveedores', proveedoresRouter);
  router.use('/roles', rolesRouter);
  router.use('/usuarios', usuariosRouter);
  router.use('/perfiles', perfilesRouter);
  router.use('/informes', informesRouter);
}
module.exports = routerApi;
