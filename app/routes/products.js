var express = require('express');
var router = express.Router();

let productController = require('../controllers/products');

/*Search ALL */
router.get('', productController.list);

/*Search By ALL PUBLISHED */
router.get('/published', productController.published);

/*Search By Name which contains  'KW' */
router.get('/name', productController.productByName, productController.readName);

/*Search By ID */
router.get('/:id', productController.productByID, productController.read);

/*Create NEW PRODUCT */
router.post('', productController.create);

/*Update PRODUCT BY ID*/
router.put('/:id', productController.update);

/*Delete ALL PRODUCTS */
router.delete('', productController.remove);

module.exports = router;
