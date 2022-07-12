// import controllers review, products
const productController = require('../components/user/ProductController');


// router
const router = require('express').Router()

router.get('/product', productController.getAllProduct);
router.get('/product/:id', productController.getSingleProductById);

module.exports = router