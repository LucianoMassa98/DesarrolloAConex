const express=require('express');
const router=express.Router();
const AusenciasService = require('../services/ausencias.service');
const service = new AusenciasService();
const  {
  createausenciaSchema,
  updateausenciaSchema,
  getausenciaSchema
  } = require('../schemas/ausencia.schema');

  const {getclinicaSchema} = require('../schemas/clinica.schema');
  const validatorHandler = require('../middlewares/validator.handler');



router.post('/',
validatorHandler(createausenciaSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newausencia = await service.create(body);
    res.json({
      message: 'created',
      data: Newausencia
    });
  }catch(err){next(err);}
});
router.patch('/:profesionalId/:ausenciaId',
validatorHandler(getausenciaSchema,'params'),
validatorHandler(updateausenciaSchema,'body'),
async (req, res,next) => {
  try{
    const { profesionalId,ausenciaId } = req.params;
    const body = req.body;
    const xupdate = await service.update(profesionalId,ausenciaId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:profesionalId/:ausenciaId',
  validatorHandler(getausenciaSchema,'params'),
  async(req, res,next) => {
  try{
    const { profesionalId,ausenciaId } = req.params;
  const delX = await service.delete(profesionalId,ausenciaId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
