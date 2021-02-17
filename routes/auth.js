const express = require('express');

const authController = require('../controller/auth');

const router = express.Router();

// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/login', authController.getlogin);
router.post('/postlogin', authController.postLogin);

router.get('/signup', authController.getSignup);
router.post('/postSignup', authController.postSignup);

router.post('/logout', authController.postLogout);


module.exports = router;
