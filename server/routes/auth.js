const express = require('express');
const UserService = require('../services/user');
const router = express.Router();

router.post('/login', UserService.authLogin);

module.exports = router;
