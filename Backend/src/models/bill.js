module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('Bill', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        id_client: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        total_products: {
            type: DataTypes.BIGINT(),
            allowNull: false,
        },
        total_price: {
            type: DataTypes.BIGINT(),
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            freezeTableName: true,
            tableName: 'bill',
        }
    );

    Bill.associate = (models) => {
        Bill.belongsTo(models.User, {
            foreignKey: 'id_client',
        });

        Bill.hasMany(models.Bill_Details, {
            foreignKey: 'id_bill',
        });
    };

    return Bill;
}