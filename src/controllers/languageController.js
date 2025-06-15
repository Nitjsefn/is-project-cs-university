const { Language } = require('../models');

exports.listLanguages = async (req, res) => {
  const data = await Language.findAll();
  res.json(data);
};

exports.getLanguage = async (req, res) => {
  const lang = await Language.findByPk(req.params.id);
  if (!lang) return res.status(404).json({ message: 'Not found' });
  res.json(lang);
};
