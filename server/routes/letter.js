const express = require('express');
const router = express.Router();
const LetterService = require('../services/letter');
const {verifyToken} = require('../middlewares/auth');

router.use(verifyToken);

router.get('/categories', LetterService.getLetterCategories);
router.get('/find', LetterService.findLetter);
router.get('/', LetterService.getLetter);
router.post('/create', LetterService.createLetter);
router.post('/download', LetterService.downloadLetter);
router.post('/update', LetterService.updateLetter);

module.exports = router;
