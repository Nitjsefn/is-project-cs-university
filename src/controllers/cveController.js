const { CVE } = require('../models'); 

exports.listCVEs = async (req, res) => {
  try {
    const cves = await CVE.findAll();
    res.json(cves);
  } catch (err) {
    console.error('CVEs error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCVEById = async (req, res) => {
  try {
    const { cve_id } = req.params;

    const cve = await CVE.findOne({
      where: { cve_id }
    });

    if (!cve) {
      return res.status(404).json({ error: 'CVE not found' });
    }

    res.json(cve);
  } catch (error) {
    console.error('Error fetching CVE by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listLimitedCVEs = async (req, res) => {
  const limit = parseInt(req.params.limit, 10);
  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  try {
    const cves = await CVE.findAll({ limit });
    res.json(cves);
  } catch (err) {
    console.error('CVEs error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
