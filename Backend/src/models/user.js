module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        role: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(500),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        state: {
            type: DataTypes.BIGINT(20),
            defaultValue: 1,
        },
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
            tableName: 'user',
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Bill, {
            foreignKey: 'id_client',
        });
    };

    return User;
}