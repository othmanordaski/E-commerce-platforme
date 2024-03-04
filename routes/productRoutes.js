const express = require('express');
const router = express.Router();
const {isAuthenticated} = require ('../middlewares/isAuthenticated')
const upload = require('../middlewares/multer')
const {getAllProducts,getSingleProduct,createProduct,deleteProduct,
    updateProduct,getProductByCategory,queriesfunctionality} = require('../controllers/productsController');

router.get('/',queriesfunctionality) 

router.route('/:id')
    .get(getSingleProduct)
    .put(isAuthenticated,upload,updateProduct)
    .delete(isAuthenticated,deleteProduct)

router.route('/')
.post(isAuthenticated,upload,createProduct)





module.exports = router;

