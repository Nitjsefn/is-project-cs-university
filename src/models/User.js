module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'Users',
    timestamps: false,
  });
