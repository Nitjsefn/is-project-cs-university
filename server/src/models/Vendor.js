module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    cve_id: {
      type: DataTypes.STRING,
      primaryKey: true,    
    },
    vulnerable_product: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'Products',
    timestamps: false,
    id: false 
  });
};

