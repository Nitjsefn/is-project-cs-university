const soap = require('soap');
const fs = require('fs');
const { CVE } = require('../models');

module.exports = (app) => {
  const wsdlXml = fs.readFileSync('./src/services/cve.wsdl', 'utf8');

  const service = {
    CVEService: {
      CVEServicePort: {
        getCVECountByLanguage: async ({ language }) => {
          const count = await CVE.count({ where: { language } });
          return { count };
        },
        getCVEById: async ({ cve_id }) => {
          const cve = await CVE.findOne({ where: { cve_id } });
          if (!cve) throw new Error('CVE not found');
          return cve;
        },
        // inne metody CVE
      },
    },
  };

  soap.listen(app, '/api/v1/soap/cve', service, wsdlXml);
};
