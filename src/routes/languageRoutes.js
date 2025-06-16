const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');


router.get('/id/:id', languageController.getLanguage);
router.get('/:limit', languageController.listLimitedLanguages); 
router.get('/', languageController.listLanguages);

module.exports = router;
