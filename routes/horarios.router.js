const express=require('express');
const router=express.Router();
const HorariosService = require('../services/horarios.service');
const service = new HorariosService();
const  {
  createhorarioSchema,
  updatehorarioSchema,
  gethorarioSchema
  } = require('../schemas/horario.schema');

  const {getclinicaSchema} = require('../schemas/clinica.schema');
  const validatorHandler = require('../middlewares/validator.handler');

router.post('/',
validatorHandler(createhorarioSchema,'body'),
async (req, res,next) => {
  try{
    const body = req.body;
    const Newhorario = await service.create(body);
    res.json({
      message: 'created',
      data: Newhorario
    });
  }catch(err){next(err);}
});
router.patch('/:profesionalId/:horarioId',
validatorHandler(gethorarioSchema,'params'),
validatorHandler(updatehorarioSchema,'body'),
async (req, res,next) => {
  try{
    const { profesionalId,horarioId } = req.params;
    const body = req.body;
    const xupdate = await service.update(profesionalId,horarioId,body);
    res.json({
      message: 'updated',
      data: xupdate
    });
  }
  catch(err){
    next(err);
  }
});

router.delete('/:profesionalId/:horarioId',
  validatorHandler(gethorarioSchema,'params'),
  async(req, res,next) => {
  try{
    const { profesionalId,horarioId } = req.params;
  const delX = await service.delete(profesionalId,horarioId);
  res.json({
    message: 'deleted',
    data: delX
  });
  }catch(err){
    next(err);
  }
});



module.exports=router;
