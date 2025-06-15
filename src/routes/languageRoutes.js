const express = require('express');
const { listLanguages, getLanguage } = require('../controllers/languageController');
const router = express.Router();

router.get('/', listLanguages);
router.get('/:id', getLanguage);

module.exports = router;
