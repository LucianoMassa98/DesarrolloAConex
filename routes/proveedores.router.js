const express=require('express');
const router=express.Router();
const ProveedoresService = require('../services/proveedores.service');
const service = new ProveedoresService();
const  {
  createproveedorSchema,
  getproveedorSchema
  } = require('../schemas/proveedor.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');

  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const proveedors=await service.find(negocioId);
    res.json(proveedors);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:proveedorId',
validatorHandler(getproveedorSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,proveedorId}=req.params;
  const proveedor = await service.findOne(negocioId,proveedorId);
  res.json(proveedor);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createproveedorSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newproveedor = await service.create(body);
    res.json({
      message: 'created',
      data: Newproveedor
    });
  }catch(err){next(err);}
});

router.delete('/:negocioId/:proveedorId',
  validatorHandler(getproveedorSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,proveedorId } = req.params;
  const delX = await service.delete(negocioId,proveedorId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
