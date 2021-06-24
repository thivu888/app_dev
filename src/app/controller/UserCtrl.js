const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) =>{
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({success:false,msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({success:false,msg: "Password is at least 6 characters long."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // Save mongodb
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken)

            res.json({success:true,accesstoken})

        } catch (err) {
            return res.status(500).json({success:false,msg: err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({success:false,msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({success:false,msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken)

            res.json({success:true,accesstoken})

        } catch (err) {
            return res.status(500).json({success:false,msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken')
            return res.json({success:true,msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({success:false,msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({success:false,msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({success:false,msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({success:true,accesstoken})
            })

        } catch (err) {
            return res.status(500).json({success:false,msg: err.message})
        }
        
    },
    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({success:false,msg: "User does not exist."})

            res.json({success:true,user})
        } catch (err) {
            return res.status(500).json({success:false,msg: err.message})
        }
    },
    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({success:false,msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({success:false,msg: err.message})
        }
    },
    upAvatar: async(req,res)=>{
        try {
            
            const{id,url,pass}={...req.body}
            if(pass.passNew){
                console.log('vào đây rồi')
                const user=await Users.findById(id)
                const isMatch = await bcrypt.compare(pass.passCurrent, user.password)
                if(isMatch && url){
                console.log('vào đây rồi2')
                    const passwordHash = await bcrypt.hash(pass.passNew, 10)
                    await Users.findByIdAndUpdate(id,{img:req.body.url,password:passwordHash})
                    .then(data=>res.json({success:true,msg:'update success'}))
                    .catch(e=>res.status(403).json({success:false,msg:'update fail'}))
                }
                else if(isMatch){
                    const passwordHash = await bcrypt.hash(pass.passNew, 10)
                    await Users.findByIdAndUpdate(id,{password:passwordHash})
                    .then(data=>res.json({success:true,msg:'update success'}))
                    .catch(e=>res.status(403).json({success:false,msg:'update pass fail'}))
                }
                else{
                    res.status(401).json({success:false,msg:'mật khẩu không đúng'})
                }
            }else{
                await Users.findByIdAndUpdate(id,{img:req.body.url})
                .then(data=>res.json({success:true,msg:'update image success'}))
                .catch(e=>res.status(403).json({success:false,msg:'update image fail'}))
            }
        } catch (err) {
            return res.status(500).json({success:false,msg: err.message})
        }
       
    }
 }


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl