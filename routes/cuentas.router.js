const express=require('express');
const router=express.Router();
const CuentasService = require('../services/cuentas.service');
const service = new CuentasService();

const  {
  createcuentaSchema,
  updatecuentaSchema,
  getcuentaSchema
  } = require('../schemas/cuenta.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');

  const validatorHandler = require('../middlewares/validator.handler');

  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const cuentas=await service.find(negocioId);
    res.json(cuentas);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:cuentaId',
validatorHandler(getcuentaSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,cuentaId}=req.params;
  const cuenta = await service.findOne(negocioId,cuentaId);
  res.json(cuenta);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createcuentaSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newcuenta = await service.create(body);
    res.json({
      message: 'created',
      data: Newcuenta
    });
  }catch(err){next(err);}
});
router.patch('/:negocioId/:cuentaId',
validatorHandler(getcuentaSchema,'params'),
validatorHandler(updatecuentaSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId,cuentaId } = req.params;
    const body = req.body;
    const xupdate = await service.update(negocioId,cuentaId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId/:cuentaId',
  validatorHandler(getcuentaSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,cuentaId } = req.params;
  const delX = await service.delete(negocioId,cuentaId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
