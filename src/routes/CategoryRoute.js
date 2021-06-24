const express = require('express')
const CategoryCtrl=require('../app/controller/CategoryCtrl')
const auth=require('../app/middleware/auth');
const authAdmin = require('../app/middleware/authAdmin');
const router = express.Router();

router.post('/create',auth,authAdmin,CategoryCtrl.createCategory)
router.delete('/delete/:id',auth,authAdmin,CategoryCtrl.deleteCategory)
router.put('/update/:id',auth,authAdmin,CategoryCtrl.updateCategory)
router.get('/getcategorys', CategoryCtrl.getCategories)


module.exports=router