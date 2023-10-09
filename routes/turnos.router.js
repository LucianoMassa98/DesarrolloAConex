const express=require('express');
const router=express.Router();
const TurnosService = require('../services/turnos.service');
const service = new TurnosService();
const  {
  createturnoSchema,
  updateturnoSchema,
  getturnoSchema
  } = require('../schemas/turno.schema');

  const {getclinicaSchema} = require('../schemas/clinica.schema');
  const validatorHandler = require('../middlewares/validator.handler');


router.post('/',
validatorHandler(createturnoSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newturno = await service.create(body);
    res.json({
      message: 'created',
      data: Newturno
    });
  }catch(err){next(err);}
});
router.patch('/:profesionalId/:turnoId',
validatorHandler(getturnoSchema,'params'),
validatorHandler(updateturnoSchema,'body'),
async (req, res,next) => {
  try{
    const { profesionalId,turnoId } = req.params;
    const body = req.body;
    const xupdate = await service.update(profesionalId,turnoId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:profesionalId/:turnoId',
  validatorHandler(getturnoSchema,'params'),
  async(req, res,next) => {
  try{
    const { profesionalId,turnoId } = req.params;
  const delX = await service.delete(profesionalId,turnoId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
