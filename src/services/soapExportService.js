const xml2js = require('xml2js');
const jsYaml = require('js-yaml');
const fs = require('fs');
const soap = require('soap');
const { CVE } = require('../models');

module.exports = (app) => {
  const wsdlXml = fs.readFileSync('./src/services/export.wsdl', 'utf8');
  const xmlBuilder = new xml2js.Builder();

  const service = {
    ExportService: {
      ExportServicePort: {
        exportCVEs: async ({ limit, format }) => {
          let options = {};
          const lim = parseInt(limit);
          if (!isNaN(lim) && lim > 0) {
            options.limit = lim;
          }
          const cves = await CVE.findAll(options);

          if (format === 'yaml') {
            const yamlResult = jsYaml.dump({ cves: cves });
            return { data: yamlResult };
          }
          
          // domyślnie XML
          const xmlResult = xmlBuilder.buildObject({ cves: { cve: cves } });
          return { data: xmlResult };
        }
      }
    }
  };

  soap.listen(app, '/api/v1/soap/export', service, wsdlXml);
};
