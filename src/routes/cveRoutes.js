const express = require('express');
const { listCVEs, getCVEById } = require('../controllers/cveController');
const router = express.Router();

router.get('/', listCVEs);
router.get('/:id', getCVEById);

module.exports = router;

