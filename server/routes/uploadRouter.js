const router = require('express').Router()
const { auth } = require('../middleware/auth')
const {authAdmin} = require('../middleware/authAdmin')
const Images = require('../controller/uploadController')

router.post('/upload',auth,authAdmin,Images.uploadImage)
router.post('/destroy',auth,authAdmin, Images.deleteImage)

module.exports = router