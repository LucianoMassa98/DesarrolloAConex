const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const {longError,errorHandler,BoomErrorHandler,ormErrorHandler}= require('./middlewares/error.handler');
const CapitalesService = require('./services/capitales.service');
const serviceCapital = new CapitalesService();
const ConsolidadosService = require('./services/consolidados.service');
const serviceConsolidado = new ConsolidadosService();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000','http://myapp.com'];
const options = {
  origin: (origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('acceso no permitido'));
    }
  }
}

//app.use(cors(options));
app.use(cors());
routerApi(app);

app.use(longError);
app.use(ormErrorHandler);
app.use(BoomErrorHandler);
app.use(errorHandler);

cron.schedule('00 06 * * 1', async() => {
  try {
    console.log('Operación automática ejecutada los Lunes a las 06:00AM');

      await serviceCapital.create();
     await serviceConsolidado.create();


  } catch (error) {
    console.error('Error en la tarea:', error);
    console.error('No se crearon los informes');
  }
});

app.listen(port, ()=>{
  console.log('Mi port'+port);
});


