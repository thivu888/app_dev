const express = require('express')
const userCtrl=require('../app/controller/UserCtrl')
const auth=require('../app/middleware/auth')
const router = express.Router();

router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.get('/logout',userCtrl.logout)
router.get('/getuser',auth,userCtrl.getUser)
router.post('/addcart',auth,userCtrl.addCart)
router.put('/avatar',auth,userCtrl.upAvatar)


module.exports=router