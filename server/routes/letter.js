const express = require('express');
const router = express.Router();
const LetterService = require('../services/letter');
const {verifyToken} = require('../middlewares/auth');
const LetterCategoryService = require('../services/letter_category');
const multer = require('multer');

const upload = multer({
  dest: './templates'
});

router.use(verifyToken);

router.get('/categories', LetterService.getLetterCategories);
router.get('/find', LetterService.findLetter);
router.get('/', LetterService.getLetter);
router.post('/create', LetterService.createLetter);
router.post('/download', LetterService.downloadLetter);
router.post('/update', LetterService.updateLetter);

router.get('/download/example', LetterCategoryService.downloadExample);
router.post('/:category/add', LetterCategoryService.addCategory);
router.put('/:category/:type', LetterCategoryService.updateCategoryType);
router.delete('/:category/:type', LetterCategoryService.deleteCategoryType);
router.get('/download/:category/:slug', LetterCategoryService.downloadType);


module.exports = router;
