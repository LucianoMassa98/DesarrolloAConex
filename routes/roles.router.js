const express=require('express');
const router=express.Router();
const RolesService = require('../services/roles.service');
const service = new RolesService();
const  {
  createrolSchema,
  updaterolSchema,
  getrolSchema
  } = require('../schemas/rol.schema');

  const validatorHandler = require('../middlewares/validator.handler');
  router.get('/',
async (req,res,next)=>{
  try{
    const rols=await service.find();
    res.json(rols);
  }catch(err){
    next(err);
  }
});
router.get('/:rolId',
validatorHandler(getrolSchema, 'params'),
async (req,res,next)=>{
  try{
    const{rolId}=req.params;
  const rol = await service.findOne(rolId);
  res.json(rol);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createrolSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newrol = await service.create(body);
    res.json({
      message: 'created',
      data: Newrol
    });
  }catch(err){next(err);}
});
router.patch('/:rolId',
validatorHandler(getrolSchema,'params'),
validatorHandler(updaterolSchema,'body'),
async (req, res,next) => {
  try{
    const { rolId } = req.params;
    const body = req.body;
    const xupdate = await service.update(rolId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:rolId',
  validatorHandler(getrolSchema,'params'),
  async(req, res,next) => {
  try{
    const { rolId } = req.params;
  const delX = await service.delete(rolId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
