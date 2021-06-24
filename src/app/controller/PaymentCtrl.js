const Payments = require('../models/Payments')
const Users = require('../models/User')
const Products = require('../models/Product')


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {

            const payments = await Payments.find({user_id:req.user.id})
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, payment_id, address,money} = req.body;

            const {_id, name, email} = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart, payment_id, address,money
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.product.sold,item.product.count)
            })

            
            await newPayment.save()
            res.json({success:true,msg: "Payment Succes!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold,count) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold,
        count:count-quantity
    })
}

module.exports = paymentCtrl