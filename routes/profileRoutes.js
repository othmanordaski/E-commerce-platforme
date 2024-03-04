const express = require('express');
const router = express.Router();

const {getCurrentProfile,updateCurrentProfile,deleteCurrentProfile} = require('../controllers/profileController')
const {isAuthenticated} = require ('../middlewares/isAuthenticated')
const upload = require('../middlewares/multer')

router.route('/')
.get(isAuthenticated,getCurrentProfile)
.patch(isAuthenticated,upload,updateCurrentProfile)
.delete(isAuthenticated,deleteCurrentProfile)

module.exports = router;