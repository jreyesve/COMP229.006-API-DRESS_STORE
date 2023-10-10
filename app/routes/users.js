var express = require('express');
var router = express.Router();

let userController = require('../controllers/users');


router.get('/list', userController.list);
router.post('/create', userController.create);
router.get('/:userId', userController.userByID, userController.read);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.remove);

module.exports = router;
