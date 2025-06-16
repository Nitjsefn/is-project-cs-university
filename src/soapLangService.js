const soap = require('soap');
const fs = require('fs');
const { LangPopularity } = require('../models');

module.exports = (app) => {
  const wsdlXml = fs.readFileSync('./src/services/langPopularity.wsdl', 'utf8');

  const service = {
    LangService: {
      LangServicePort: {
        getLanguagePopularity: async ({ language }) => {
          const lang = await LangPopularity.findOne({ where: { language } });
          if (!lang) throw new Error('Language not found');
          return lang;
        },
        listLanguages: async () => {
          const langs = await LangPopularity.findAll();
          return { langs };
        },
        // inne metody
      },
    },
  };

  soap.listen(app, '/api/v1/soap/lang', service, wsdlXml);
};
