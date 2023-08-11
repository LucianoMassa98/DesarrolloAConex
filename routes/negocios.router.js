const express=require('express');
const router=express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const {
  createnegocioSchema,
  updatenegocioSchema,
  getnegocioSchema}= require('../schemas/negocio.schema');

const negociosService = require('../services/negocios.service');
const service = new negociosService();
router.get('/',
async (req,res,next)=>{
  try{
    const negocio=await service.find();
    res.json(negocio);
  }catch(err){
    next(err);
  }
});

router.get('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
async (req,res,next)=>{
  try{
    const {negocioId} = req.params;
    const negocio=await service.findOne(negocioId);
    res.json(negocio);
  }catch(err){
    next(err);
  }
});

router.post('/',
validatorHandler(createnegocioSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newnegocio = await service.create(body);
    res.json({
      message: 'created',
      data: Newnegocio
    });
  }catch(err){next(err);}
});

router.patch('/:negocioId',
validatorHandler(getnegocioSchema,'params'),
validatorHandler(updatenegocioSchema,'body'),
async (req, res,next) => {
  try{
    const { negocioId } = req.params;
    const body = req.body;
    const negUpdate = await service.update(negocioId,body);
    res.json(negUpdate);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:negocioId',
  validatorHandler(getnegocioSchema,'params'),
  async(req, res,next) => {
  try{
    const { negocioId } = req.params;
  const delNeg = await service.delete(negocioId);
  res.json(delNeg);
  }catch(err){
    next(err);
  }
});


module.exports=router;
