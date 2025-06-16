module.exports = (sequelize, DataTypes) => {
  return sequelize.define('LangPopularity', {
   
    Date: { type: DataTypes.DATEONLY, primaryKey: true },
    Abap: DataTypes.FLOAT,
    Ada: DataTypes.FLOAT,

    c_cpp: {
      type: DataTypes.FLOAT,
      field: 'C/C++'
    },

    Csharp: {
      type: DataTypes.FLOAT,
      field: 'C#'
    },

    Cobol: DataTypes.FLOAT,
    Dart: DataTypes.FLOAT,

    Delphi_Pascal: {
      type: DataTypes.FLOAT,
      field: 'Delphi/Pascal'
    },

    Go: DataTypes.FLOAT,
    Groovy: DataTypes.FLOAT,
    Haskell: DataTypes.FLOAT,
    Java: DataTypes.FLOAT,
    JavaScript: DataTypes.FLOAT,
    Julia: DataTypes.FLOAT,
    Kotlin: DataTypes.FLOAT,
    Lua: DataTypes.FLOAT,
    Matlab: DataTypes.FLOAT,

    Objective_C: {
      type: DataTypes.FLOAT,
      field: 'Objective-C'
    },

    Perl: DataTypes.FLOAT,
    PHP: DataTypes.FLOAT,
    Powershell: DataTypes.FLOAT,
    Python: DataTypes.FLOAT,
    R: DataTypes.FLOAT,
    Ruby: DataTypes.FLOAT,
    Rust: DataTypes.FLOAT,
    Scala: DataTypes.FLOAT,
    Swift: DataTypes.FLOAT,
    TypeScript: DataTypes.FLOAT,
    VBA: DataTypes.FLOAT,

    Visual_Basic: {
      type: DataTypes.FLOAT,
      field: 'Visual Basic'
    },


  }, { timestamps: false, tableName: 'LangPopularity' });
};
