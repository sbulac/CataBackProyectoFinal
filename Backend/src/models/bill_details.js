module.exports = (sequelize, DataTypes) => {
    const Bill_Details = sequelize.define('Bill_Details', {
        id_bill: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        id_product: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
    },
        {
            updatedAt: false,
            createdAt: false,
            freezeTableName: true,
            tableName: 'bill_details',
        }
    );

    Bill_Details.associate = (models) => {
        Bill_Details.belongsTo(models.Bill, {
            foreignKey: 'id_bill',
        });

        Bill_Details.belongsTo(models.Product, {
            foreignKey: 'id_product',
        });
    };

    return Bill_Details;
}