const express=require('express');
const router=express.Router();
const PerfilesService = require('../services/perfiles.service');
const service = new PerfilesService();
const  {
  createperfilSchema,
  updateperfilSchema,
  getperfilSchema
  } = require('../schemas/perfil.schema');


  const validatorHandler = require('../middlewares/validator.handler');


router.get('/:perfilId',
validatorHandler(getperfilSchema, 'params'),
async (req,res,next)=>{
  try{
    const{perfilId}=req.params;
  const perfil = await service.findOne(perfilId);
  res.json(perfil);
  }catch(err){
    next(err);
  }
});
router.post('/',
validatorHandler(createperfilSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    console.log(body);
  const Newperfil = await service.create(body);
  res.json({
    message: 'created',
    data: Newperfil
  });
  }catch(err){next(err);}
});





router.patch('/:perfilId',
validatorHandler(getperfilSchema,'params'),
validatorHandler(updateperfilSchema,'body'),
async (req, res,next) => {
  try{
    const { perfilId } = req.params;
    const body = req.body;
    const xupdate = await service.update(perfilId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:perfilId',
  validatorHandler(getperfilSchema,'params'),
  async(req, res,next) => {
  try{
    const { perfilId } = req.params;
  const delX = await service.delete(perfilId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
