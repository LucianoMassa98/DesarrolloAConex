const express=require('express');
const router=express.Router();
const ComprasService = require('../services/compras.service');
const service = new ComprasService();
const  {
  createcompraSchema,
  updatecompraSchema,
  getcompraSchema,
  queryCompraSchema,
  addItemSchema,
  subItemSchema,
  addPagoSchema,
  subPagoSchema,
  addPagoPendienteSchema,
  subPagoPendienteSchema,
  } = require('../schemas/compra.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');

  router.get('/:negocioId',
  validatorHandler(queryCompraSchema,'query'),
  validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const compras=await service.find(negocioId,req.query);
    res.json(compras);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:compraId',
validatorHandler(getcompraSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,compraId}=req.params;
  const compra = await service.findOne(negocioId,compraId);
  res.json(compra);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createcompraSchema,'body'),
async (req, res,next) => {
 try{
  const body = req.body;
  const compra = await service.create(body);
  res.json({
    message: 'created',
    data: compra
  });
 }catch(err){
  next(err);
 }
});


router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res,next) => {
   try{
    const body = req.body;
    const compra = await service.addItem(body);
    res.json({
      message: 'created item',
      data: compra,
    });
   }catch(err){next(err);}
  }
);
router.post(
  '/add-pago',
  validatorHandler(addPagoSchema, 'body'),
  async (req, res,next) => {
    try{
      const body = req.body;
    const compra = await service.addPago(body);
    res.json({
      message: 'created Pago',
      data: compra,
    });
    }catch(err){next(err);}
  }
);
router.post(
  '/add-pagoPendiente',
  validatorHandler(addPagoPendienteSchema, 'body'),
  async (req, res,next) => {
    try{const body = req.body;
      const compra = await service.addPagoPendiente(body);
      res.json({
        message: 'created PagoPendiente',
        data: compra,
      });}catch(err){next(err);}
  }
);


router.delete(
  '/sub-item/:negocioId/:compraId/:productoId',
  validatorHandler(subItemSchema, 'params'),
  async (req, res,next) => {
    try{
      const xdel = await service.subItem(req.params);
      res.json({
        message: 'deleted item',
        data: xdel,
      });
    }catch(err){next(err);}
  }
);
router.delete(
  '/sub-pago/:negocioId/:ventaId/:pagoId',
  validatorHandler(subPagoSchema, 'params'),
  async (req, res,next) => {
    try{
      const xdel = await service.subPago(req.params);
      res.json({
        message: 'deleted Pago',
        data: xdel,
      });
    }catch(err){next(err);}
  }
);
router.delete(
  '/sub-pagoPendiente/:negocioId/:compraId/:pagoPendienteId',
  validatorHandler(subPagoPendienteSchema, 'params'),
  async (req, res,next) => {
   try{
    const xdel = await service.subPagoPendiente(req.params);
    res.json({
      message: 'deleted Pago pendinte',
      data: xdel,
    });
   }catch(err){next(err);}
  }
);





router.patch('/:negocioId/:compraId',
validatorHandler(getcompraSchema,'params'),
validatorHandler(updatecompraSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,compraId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,compraId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:compraId',
  validatorHandler(getcompraSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,compraId } = req.params;
  const delX = await service.delete(negocioId,compraId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});


module.exports=router;
