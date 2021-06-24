const Products = require('../models/Product')

// Filter, sorting and paginating


const productCtrl = {
    getProducts: async(req, res) =>{
        try {
            console.log(req.query)
            let sort={}
            if(req.query.sortBy==='sales')
            {
                sort={sold:-1}
            }else if(req.query.sortBy==='relevancy')
            {
             sort={}
            }else if(req.query.sortBy==='ctime')
            {
             sort={updatedAt:-1}
            }

            let products;
            let result;
            if(req.query.search){
             products= await Products.find({category:req.query.search}).skip(req.query.page*12).limit(12).sort(sort)
             result= await Products.find({category:req.query.search}).skip(req.query.page*12).sort(sort)
            }
            else{
                products= await Products.find({}).skip(req.query.page*12).limit(112).sort(sort)
                result=await Products.find({}).skip(req.query.page*12).limit(112).sort(sort)
            } 
             

            
            res.json({
                status: 'success',
                result: result.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProductById:async (req,res) =>{
        try {
       const product= await Products.findById(req.params.id)
            res.json({product})
        } catch (error) {
            res.json({msg:error})
            
        }

    },
    createProduct: async(req, res) =>{
        try {
            const {product_id, title, price, description, content, images, category,count,sold,sale,isfreeship} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const product = await Products.findOne({product_id})
            if(product)
                return res.status(400).json({msg: "This product already exists."})

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category,count,sold,sale,isfreeship
            })

            await newProduct.save()
            res.json({msg: "Created a product"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const {title, price, description, content, images, category,count,sold,sale,isfreeship} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Products.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category,count,sold,sale,isfreeship
            })

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    toggleCheckProduct: async(req, res) =>{
        try {
            const {id} = req.body;
            
            let product = await Products.findById(id)
            if(product){
             let current= await Products.findOneAndUpdate({_id: id}, {
                checked:!product.checked
            },)
            console.log(current)

        }

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateRate: async (id,rate)=>{
        await Products.findByIdAndUpdate(id,{rate:rate})
    }
}

exports.updateRate=productCtrl.updateRate
module.exports = productCtrl