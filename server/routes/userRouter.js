const router = require("express").Router()
const userController = require("../controller/userController")
const {auth} = require("../middleware/auth")
router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/logout",userController.logout)
router.get('/info',auth,userController.getUser)
router.put('/addcart',auth,userController.addCart)
router.get('/history',auth,userController.history)

module.exports = router