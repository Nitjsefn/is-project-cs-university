const { CVE, Product, Vendor } = require('../models');

exports.listCVEs = async (req, res) => {
  try {
    const cves = await CVE.findAll({
      include: [
        { model: Product, as: 'Products' },
        { model: Vendor, as: 'Vendors' },
      ],
    });
    res.json(cves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCVEById = async (req, res) => {
  try {
    const cve = await CVE.findByPk(req.params.id, {
      include: [
        { model: Product, as: 'Products' },
        { model: Vendor, as: 'Vendors' },
      ],
    });
    if (!cve) return res.status(404).json({ message: 'Not found' });
    res.json(cve);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

