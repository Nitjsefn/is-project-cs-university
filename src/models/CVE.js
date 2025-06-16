module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CVE', {
    cve_id:                  { type: DataTypes.STRING, primaryKey: true },
    mod_date:                { type: DataTypes.DATE },
    pub_date:                { type: DataTypes.DATE },
    cvss:                    { type: DataTypes.FLOAT },
    cwe_code:                { type: DataTypes.STRING },
    cwe_name:                { type: DataTypes.STRING },
    summary:                 { type: DataTypes.TEXT },
    access_authentication:   { type: DataTypes.STRING },
    access_complexity:       { type: DataTypes.STRING },
    access_vector:           { type: DataTypes.STRING },
    impact_availability:     { type: DataTypes.STRING },
    impact_confidentiality:  { type: DataTypes.STRING },
    impact_integrity:        { type: DataTypes.STRING },
  }, {
    timestamps: false,
    tableName: 'CVE',
  });
};
