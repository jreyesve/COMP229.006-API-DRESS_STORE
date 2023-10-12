var express = require('express');
var router = express.Router();

let productController = require('../controllers/products');

/*Search ALL */
router.get('/list', productController.list);

/*Search By ID */
router.get('/:id', productController.productByID, productController.read);

/*Create NEW PRODUCT */
router.post('/create', productController.create);

/*Update PRODUCT BY ID*/
router.put('/:id', productController.update);

/*Delete ALL PRODUCTS */
router.delete('', productController.remove);

module.exports = router;
