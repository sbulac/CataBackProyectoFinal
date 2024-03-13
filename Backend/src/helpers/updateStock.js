const { sequelize } = require("../models");

const updateStock = async (productId) => {
    await sequelize.query(`
      UPDATE product
      SET stock = stock - 1
      WHERE id = ${productId};
    `);
};

// const updateStock = async (product) => {
//     product.stock--;
//     await product.save();
// };

module.exports = { updateStock };