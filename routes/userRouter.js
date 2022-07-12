// import controllers review, products
const userController = require('../components/user/UserController');


// router
const router = require('express').Router()

router.get('/user', userController.getAllUsers)
router.get('/user/:id', userController.getSingleUserById)

module.exports = router