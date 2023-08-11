const express=require('express');
const router=express.Router();
const ClientesService = require('../services/clientes.service');
const service = new ClientesService();
const  {
  createclienteSchema,
  getclienteSchema
  } = require('../schemas/cliente.schema');

  const {getnegocioSchema} = require('../schemas/negocio.schema');
  const validatorHandler = require('../middlewares/validator.handler');

  router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const clientes=await service.find(negocioId);
    res.json(clientes);
  }catch(err){
    next(err);
  }
});
router.get('/:negocioId/:clienteId',
validatorHandler(getclienteSchema, 'params'),
async (req,res,next)=>{
  try{
    const{negocioId,clienteId}=req.params;
  const cliente = await service.findOne(negocioId,clienteId);
  res.json(cliente);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createclienteSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newcliente = await service.create(body);
    res.json({
      message: 'created',
      data: Newcliente
    });
  }catch(err){next(err);}
});


router.delete('/:negocioId/:clienteId',
  validatorHandler(getclienteSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId,clienteId } = req.params;
  const delClie = await service.delete(negocioId,clienteId);
  res.json({message:'deleted',data:delClie});
  }catch(err){
    next(err);
  }
});

module.exports=router;
