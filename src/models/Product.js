module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cve_id: DataTypes.STRING,
    vulnerable_product: DataTypes.STRING,
    VendorProduct: DataTypes.STRING
  }, { timestamps: false, tableName: 'Products' });
};
