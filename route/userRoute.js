const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/register', userController.addUser);
router.post('/login', userController.userLogin);
router.get('/check/:id', userController.checkAdmin);
module.exports = router;