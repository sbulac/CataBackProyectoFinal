module.exports = (sequelize, DataTypes) => {
    const Parameter_Values = sequelize.define('Parameter_Values', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        parameter_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        state: {
            type: DataTypes.TINYINT(4),
            defaultValue: 1,
        },
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
            tableName: 'parameter_values',
        }
    );

    Parameter_Values.associate = (models) => {
        Parameter_Values.belongsTo(models.Parameter, {
            foreignKey: 'parameter_id',
        });
    };

    return Parameter_Values;
}