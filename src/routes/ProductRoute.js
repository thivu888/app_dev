const express = require('express')
const ProductCtrl=require('../app/controller/ProductCtrl')
const auth=require('../app/middleware/auth')
const authAdmin=require('../app/middleware/authAdmin')
const router = express.Router();

router.post('/create',auth,authAdmin,ProductCtrl.createProduct)
router.delete('/delete/:id',auth,authAdmin,ProductCtrl.deleteProduct)
router.put('/update/:id',auth,authAdmin,ProductCtrl.updateProduct)
router.put('/toggle',auth,authAdmin,ProductCtrl.toggleCheckProduct)
router.get('/get',ProductCtrl.getProducts)
router.get('/getById/:id',ProductCtrl.getProductById)


module.exports=router