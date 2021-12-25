const router = require('express').Router()
const categoryController = require("../controller/categoryController")
const {auth} = require('../middleware/auth')
const {authAdmin} = require('../middleware/authAdmin')

router.get('/category',categoryController.getCategories)
router.post('/creatCategory',auth,authAdmin,categoryController.creatCategory)
router.delete('/deleteCategory/:id',auth,authAdmin,categoryController.deleteCategory)
router.put('/updateCategory/:id',auth,authAdmin,categoryController.updateCategory)



module.exports = router