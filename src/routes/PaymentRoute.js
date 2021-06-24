const express = require('express')
const paymentCtrl=require('../app/controller/PaymentCtrl')
const auth=require('../app/middleware/auth')
const router = express.Router();


router.post('/create',auth,paymentCtrl.createPayment)
router.get('/get',auth,paymentCtrl.getPayments)


module.exports=router