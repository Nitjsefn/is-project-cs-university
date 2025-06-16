const express = require('express');
const cveController = require('../controllers/cveController');
const router = express.Router();


router.get('/id/:cve_id', cveController.getCVEById);
router.get('/:limit', cveController.listLimitedCVEs);
router.get('/', cveController.listCVEs);

module.exports = router;
