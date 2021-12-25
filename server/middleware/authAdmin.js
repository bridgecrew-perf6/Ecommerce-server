const Users = require('../model/userModel')

const authAdmin = async (req,res,next)=>{
    try {
        const user = await Users.findById(req.user.id)
        if(user.role === 0){
            return res.status(400).json({mesage:"Admin resourses access denied"})
        }
        next()
    } catch (error) {
        return res.status(500).json({err:error.message})
    }
}
module.exports = {authAdmin}