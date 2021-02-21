

const express = require('express');

const artikelController = require('../controller/artikel');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/', artikelController.getArticles);
router.get('/add-article', isAuth, artikelController.getAddArticle);
router.post('/add-article', artikelController.postAddArticle);
router.get('/get-article/:artikelId', artikelController.getArticle);
router.post('/add-article', artikelController.postDelete);

module.exports = router;
