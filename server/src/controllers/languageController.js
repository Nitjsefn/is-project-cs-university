const { LangPopularity } = require('../models');

exports.listLanguages = async (req, res) => {
  try {
    const data = await LangPopularity.findAll();
    res.json(data);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getLanguage = async (req, res) => {
  try {
    const lang = await LangPopularity.findByPk(req.params.id);
    if (!lang) return res.status(404).json({ message: 'Not found' });
    res.json(lang);
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.listLimitedLanguages = async (req, res) => {
  const limit = parseInt(req.params.limit, 10);
  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  try {
    const data = await LangPopularity.findAll({ limit });
    res.json(data);
  } catch (error) {
    console.error('Error fetching limited languages:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
