
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    cve_id: {
      type: DataTypes.STRING,
      primaryKey: true,    // lub false, jeśli nie chcesz PK tutaj
    },
    vulnerable_product: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'Products',
    timestamps: false,
    id: false             // wyłącz automatyczne id
  });
};

