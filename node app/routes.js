const getData = require('./controllers/getData');

const router=require('express').Router();
router.get('/getData',getData);
module.exports=router;
