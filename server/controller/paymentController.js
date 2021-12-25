const Payment = require('../model/paymentModel')
const Users = require('../model/userModel')
const Products = require('../model/productModel')


const getPayments = async (req,res)=>{
    try {
        const payments = await Payment.find()
        res.status(200).json(payments)
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const sold = async (id,quantity,oldSold)=>{
    await Products.findOneAndUpdate({_id:id},{
        sold: quantity + oldSold
    })
}

const createPayment = async (req,res)=>{
    try {
        const user = await Users.findById(req.user.id).select('name email')
        if(!user)  return res.status(400).json({message:"user does not exist"})
        const {cart,paymentID,address} = req.body
    
        const {_id,name,email} = user
        const newPayment=  new Payment({
            user_id:_id,name,email,cart,paymentID,address
        })
        cart.filter(item =>{
            return sold(item._id,item.quantity,item.sold)
        })
       await newPayment.save()
        res.json({message:'payment was success!'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    getPayments,
    createPayment
}