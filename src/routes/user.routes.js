const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');

router.post('/token', userController.getToken);

module.exports = router;