module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Vendor', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cve_id: DataTypes.STRING,
    vendor: DataTypes.STRING
  }, { timestamps: false, tableName: 'Vendors' });
};
