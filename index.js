const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');

const app = express();
const {longError,errorHandler,BoomErrorHandler,ormErrorHandler}= require('./middlewares/error.handler');
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

app.use(cors(options));
//app.use(cors());
routerApi(app);

app.use(longError);
app.use(ormErrorHandler);
app.use(BoomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port'+port);
});


