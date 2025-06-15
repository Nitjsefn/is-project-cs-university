const xml2js = require('xml2js');
const jsYaml = require('js-yaml');

const parseXml = async (xmlString) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  return parser.parseStringPromise(xmlString);
};
returns {string}

const buildXml = (jsObject) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(jsObject);
};

const parseYaml = (yamlString) => {
  return jsYaml.load(yamlString);
};

const buildYaml = (jsObject) => {
  return jsYaml.dump(jsObject);
};

module.exports = {
  parseXml,
  buildXml,
  parseYaml,
  buildYaml,
};
