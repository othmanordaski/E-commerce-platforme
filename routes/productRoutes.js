const express = require('express');
const router = express.Router();
const {isAuthenticated} = require ('../middlewares/isAuthenticated')
const upload = require('../middlewares/multer')
const {getAllProducts,getSingleProduct,createProduct,deleteProduct,updateProduct} = require('../controllers/productsController');

router.route('/')
.get(getAllProducts)

.post(isAuthenticated,upload,createProduct)

router.route('/:id')
.get(getSingleProduct)
.put(isAuthenticated,upload,updateProduct)
.delete(isAuthenticated,deleteProduct)
module.exports = router;