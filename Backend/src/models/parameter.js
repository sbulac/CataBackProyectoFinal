module.exports = (sequelize, DataTypes) => {
    const Parameter = sequelize.define('Parameter', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        parameter_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        state: {
            type: DataTypes.TINYINT(4),
            defaultValue: 1,
        }
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
            tableName: 'parameter',
        }
    );

    Parameter.associate = (models) => {
        Parameter.hasMany(models.Parameter_Values, {
            foreignKey: 'parameter_id',
        });
    };

    return Parameter;
}