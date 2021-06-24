const UserRoute = require('./UserRoute')
const CategoryRoute = require('./CategoryRoute')
const ProductRoute = require('./ProductRoute')
const UploadRoute = require('./upload')
const UploadAvatarRoute = require('./UploadAvatar')
const PaymentRoute = require('./PaymentRoute')

const route =(app)=>{
    app.use('/api/user',UserRoute)
    app.use('/api/products',ProductRoute)
    app.use('/api/category',CategoryRoute)
    app.use('/api/file',UploadRoute)
    app.use('/api/avatar',UploadAvatarRoute)
    app.use('/api/payment',PaymentRoute)
}

module.exports=route