module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        price: {
            type: DataTypes.BIGINT(),
            allowNull: false,
        },
        pv_product_type: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
        },
        stock: {
            type: DataTypes.BIGINT(),
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
            tableName: 'product',
        }
    );

    Product.associate = (models) => {
        Product.hasMany(models.Bill_Details, {
            foreignKey: 'id_product',
        });
    };

    return Product;
}