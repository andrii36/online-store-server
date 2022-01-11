const Router = require('express').Router
const userController = require('../controllers/user-controller')
const productController = require('../controllers/product-controller')
const verify = require('../verifyToken')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/authme', verify, userController.authme)
router.get('/refresh', userController.refresh)
router.get('/products', productController.getAllProducts)
router.get('/products/details', productController.getOneProduct)
router.post('/products/search', productController.getSearchProducts)
router.post('/products/filter', productController.getAdvancedSearchProducts)
router.post('/products/delete', verify, productController.deleteProduct)
router.post('/products/add', verify, productController.addProduct)
router.put('/products/update', verify, productController.updateProduct)

module.exports = router