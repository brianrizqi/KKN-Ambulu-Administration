const express = require('express');
const UserService = require('../services/user');
const {verifyToken} = require('../middlewares/auth');
const router = express.Router();

router.post('/login', UserService.authLogin);
router.get('/check', verifyToken, UserService.authCheck);

module.exports = router;
