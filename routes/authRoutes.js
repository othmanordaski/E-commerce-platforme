const express = require('express');
const router = express.Router();

const {login,registerUser} = require('../controllers/authControllers');
const upload = require('../middlewares/multer');


router.route('/login').post(login)

router.route('/register').post(upload,registerUser)

module.exports = router;