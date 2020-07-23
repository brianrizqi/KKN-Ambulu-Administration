const express = require('express');
const router = express.Router();
const LetterService = require('../services/letter');
const {verifyToken} = require('../middlewares/auth');

router.use(verifyToken);

router.get('/categories', LetterService.getLetterCategories);
router.post('/create', LetterService.createLetter);

module.exports = router;
