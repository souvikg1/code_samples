const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployerProfile extends Model {
    static associate(models) {
      EmployerProfile.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASECADE',
        onUpdate: 'CASECADE',
      });
      EmployerProfile.belongsTo(models.company_sizes, {
        foreignKey: 'organization_size_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      EmployerProfile.belongsTo(models.hiring_frequency, {
        foreignKey: 'hiring_frequency_type_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      EmployerProfile.belongsTo(models.employer_position, {
        foreignKey: 'position_type_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      EmployerProfile.belongsTo(models.organization_types, {
        foreignKey: 'organization_type_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      EmployerProfile.hasMany(models.Payment, {
        foreignKey: 'employer_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  EmployerProfile.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      organization_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      how_do_you_hire_talent: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      hiring_frequency_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      organization_size_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      organization_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      position_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      profile_completeness: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.ENUM,
        values: ['0', '1'],
        allowNull: false,
        defaultValue: '1',
      },
      is_deleted: {
        type: Sequelize.ENUM,
        values: ['0', '1'],
        allowNull: false,
        defaultValue: '0',
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'EmployerProfile',
      timestamps: true,
      underscored: true,
    },
  );
  return EmployerProfile;
};
