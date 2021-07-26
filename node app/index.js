const express=require('express');
const app=express();
const cors=require('cors')
const router=require('./routes');
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(router);
app.use(express.static('public'));
app.listen(8080,()=>{
    console.log('server running on port 3000');

});