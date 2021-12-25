const router = require('express').Router()
const products = require('../controller/productController')
router.get('/product',products.getProducts)
router.post('/product',products.creatProduct)
router.put('/product/:id',products.updateProduct)
router.delete('/product/:id',products.deleteProduct)

module.exports = router