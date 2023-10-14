var express = require('express');
var router = express.Router();

let productController = require('../controllers/products');

/*Search ALL */
router.get('', productController.list);

/*Create NEW PRODUCT */
router.post('', productController.create);

/*Delete ALL PRODUCTS */
router.delete('', productController.remove);

/*Search By ALL PUBLISHED */
router.get('/published', productController.published);

/*Search By Name which contains  'KW' */
router.get('/name', productController.productByName, productController.readName);

/*Search By ID */
router.get('/:id', productController.productByID, productController.read);

/*Update PRODUCT BY ID*/
router.put('/:id', productController.update);

/*Delete PRODUCT BY ID*/
router.delete('/:id', productController.removeByID);

module.exports = router;
