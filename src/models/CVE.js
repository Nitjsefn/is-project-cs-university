module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CVE', {
    cve_id: { type: DataTypes.STRING, primaryKey: true },
    language: DataTypes.STRING,
    mod_date: DataTypes.DATE,
    pub_date: DataTypes.DATE,
    cvss: DataTypes.FLOAT,
    cwe_code: DataTypes.STRING,
    cwe_name: DataTypes.STRING,
    summary: DataTypes.TEXT,
    access_authentication: DataTypes.STRING,
    access_complexity: DataTypes.STRING,
    access_vector: DataTypes.STRING,
    impact_availability: DataTypes.STRING,
    impact_confidentiality: DataTypes.STRING,
    impact_integrity: DataTypes.STRING
  }, { timestamps: false, tableName: 'CVE' });
};

